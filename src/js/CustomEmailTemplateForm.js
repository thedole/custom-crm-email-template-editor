var cgi = cgi || {};

cgi.customemailtemplates = cgi.customemailtemplates || {};

cgi.customemailtemplates.formscript = {
	onload: function(){
		cgi.customemailtemplates.formscript.setupMessageListeners();
		cgi.customemailtemplates.formscript.sendReadySignal();
	},
	sendReadySignal: function(){
		var customHtml = Xrm.Page.ui.controls.get("WebResource_customemailtemplate_index"),
		destination = customHtml.getObject().contentWindow,
		messageToPost = {
			messageType: 'xrmloaded'
		};

		destination.postMessage(JSON.stringify(messageToPost), '*');
	},
	setupMessageListeners: function(){
		window.addEventListener('message', function(e){
			var messageToPost,
				data = JSON.parse(e.data);
        
        	if (!data || !data.messageType) {
        		return;
        	};

        	switch(data.messageType){
        		case 'requestContent':
        			cgi.customemailtemplates.formscript.postContent(e.source);
        		break;

        		case 'content':
        			Xrm.Page.getAttribute('cgi_template').setValue(data.content);
        		break;
        	}
		});
	},
	postContent: function(target){
		messageToPost = {
			messageType: 'content',
			content: Xrm.Page.getAttribute('cgi_template').getValue()
		};
		target.postMessage(JSON.stringify(messageToPost), '*');
	}
};
