window.onload = function(){
	tinymce.init({
		mode: "exact",
    	elements: "templateinput",
    	resize: false,
    	height: 370,
    	menubar: false,
    	// menu : {
	    //     edit   : {title : 'Edit'  , items : 'undo redo | cut copy paste pastetext | selectall'},
	    //     format : {title : 'Format', items : 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
	    //     table  : {title : 'Table' , items : 'inserttable tableprops deletetable | cell row column'}
	    // },
	    toolbar: "cut copy paste | undo redo | styleselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | table",

    	plugins: "table,paste,image,textcolor",
    	paste_data_images: true,
    	setup: function(editor) {
	        editor.on('change', function(e) {
	        	var message = editor.getContent();
	            window.parent.postMessage(message, '*');
	        });
	    }

	});
};