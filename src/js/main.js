var cgi = cgi || {};

cgi.customemailtemplates = cgi.customemailtemplates || {};

cgi.customemailtemplates.customcontrol = (function(){
	var editorLoaded,
		xrmLoaded;
	addEventHandlers();

	return {
		setEditorContent: function(content){
			if (editorLoaded) {};
			setContent(content);
		},
		requestContent: function (){
	    	requestContent();
	    },
	    setEditorLoaded: function(loaded){
	    	if(loaded || loaded === undefined){
	    		editorLoaded = true;
	    	}
	    	if (loaded === false) {
	    		editorLoaded = false;
	    	};

	    },
	    isEditorLoaded: function(){return editorLoaded;},
	    isXrmLoaded: function(){return xrmLoaded;}
	}

	function addEventHandlers(){
		window.addEventListener('message', function(e){
        	console.log(e.data);
        	var data = JSON.parse(e.data),
        		error;
        	if (!data || !data.messageType) {
        		return;
        	};

        	switch(data.messageType){
        		case 'content':
        			if (!editorLoaded) { return;};
        			setContent(data.content);
        			break;

        		case 'xrmloaded':
        			xrmLoaded = true;
        			if (!editorLoaded) { return;};
        			requestContent();
    				break;
        	}
        });	  
	}

	function setContent(content){
		if(!tinymce.activeEditor){
			throw new Error('no active editor');
		}

		tinymce.activeEditor.setContent(content);
	}

	function requestContent(){
		var message = {
    		messageType: 'requestContent'
    	};
    	window.parent.postMessage(JSON.stringify(message), '*');
	}
})();

window.onload = function(){
	tinymce.init({
		mode: "exact",
    	elements: "templateinput",
    	resize: false,
    	height: 370,
    	menubar: false,
    	entity_encoding : "raw",
    	// menu : {
	    //     edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
	    //     format : {title : 'Format', items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
	    //     table  : {title : 'Table' , items : 'inserttable tableprops deletetable | cell row column'}
	    // },
	    toolbar: "cut copy paste | undo redo | styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | table",

    	plugins: "table,paste,image,textcolor",
    	paste_data_images: true,
    	setup: function(editor) {
    		cgi.customemailtemplates.customcontrol.setEditorLoaded(true);
	        editor.on('keyup', changeHandler);
	        editor.on('change', changeHandler);
	        if (!cgi.customemailtemplates.customcontrol.isXrmLoaded()) { return;};
	        cgi.customemailtemplates.customcontrol.requestContent();


	        function changeHandler(e) {
	        	var messageToPost = {
					messageType: 'content',
					content: editor.getContent()
				};

	            window.parent.postMessage(JSON.stringify(messageToPost), '*');
	        }
	    }

	});
};