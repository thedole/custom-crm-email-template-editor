window.onload = function(){
	tinymce.init({
		mode: "exact",
    	elements: "templateinput"
	 });
	setTimeout(
		function(){
			var iFrame = document.querySelector("#WebResource_customemailtemplate_index");
		}, 
		3000);
	};