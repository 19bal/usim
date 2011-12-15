$(function() {
	$(".editable_select").editable("/a/public/ajax/jeditable_save.php", { 
		indicator : '<img src="/a/public/img/jeditable_yukle.gif">',
		data   : "{'sec1':'sec1','sec2':'sec2','sec3':'sec3'}",
		type   : "select",
		submit : "OK",
		style  : "inherit",
		submitdata : function() {
			return {id : 2};
		}
	});
	
	$(".editable_select_json").editable("/a/public/ajax/jeditable_save.php", { 
		indicator : '<img src="/a/public/img/jeditable_yukle.gif">',
		loadurl : "php/json.php",
		type   : "select",
		submit : "OK",
		style  : "inherit"
	});
	
	$(".editable_textarea").editable("/a/public/ajax/jeditable_save.php", { 
		indicator : "<img src='/a/public/img/jeditable_yukle.gif'>",
		type   : 'textarea',
		submitdata: { _method: "put" },
		select : true,
		submit : 'OK',
		cancel : 'cancel',
		cssclass : "editable"
	});

	$(".editable_textile").editable("/a/public/ajax/jeditable_save.php?renderer=textile", { 
		indicator : "<img src='/a/public/img/jeditable_yukle.gif'>",
		loadurl   : "php/load.php",
		type      : "textarea",
		submit    : "OK",
		cancel    : "Cancel",
		tooltip   : "Click to edit..."
	});
		
	$(".click").editable("/a/public/ajax/jeditable_echo.php", { 
		indicator : "<img src='/a/public/img/jeditable_yukle.gif'>",
		tooltip   : "Click to edit...",
		style  : "inherit"
	});

	$(".dblclick").editable("/a/public/ajax/jeditable_echo.php", { 
		indicator : "<img src='/a/public/img/jeditable_yukle.gif'>",
		tooltip   : "Doubleclick to edit...",
		event     : "dblclick",
		style  : "inherit"
	});

	$(".mouseover").editable("/a/public/ajax/jeditable_echo.php", { 
		indicator : "<img src='/a/public/img/jeditable_yukle.gif'>",
		tooltip   : "Move mouseover to edit...",
		event     : "mouseover",
		style  : "inherit"
	});
		
	/* Should not cause error. */
	$("#nosuch").editable("/a/public/ajax/jeditable_echo.php", { 
		indicator : "<img src='/a/public/img/jeditable_yukle.gif'>",
		type   : 'textarea',
		submit : 'OK'
	});
});
