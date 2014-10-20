window.addEventListener('message', function(e){
	Xrm.Page.getAttribute('cgi_template').setValue(e.data);
});