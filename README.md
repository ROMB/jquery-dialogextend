jquery-dialogextend 1.0.1 [![project status](http://stillmaintained.com/ROMB/jquery-dialogextend.png)](http://stillmaintained.com/ROMB/jquery-dialogextend)
===

Compatible
===
- jQuery 1.7.2
- jQueryUI 1.8.22

Overview
===
- Neat, simple, and ABSOLUTELY unobtrusive
- Extending (instead of replacing) original jQuery UI dialog
- Maximize and minimize buttons
- Show/Hide close button
- Double-clickable title bar
- Enhanced title bar options
- Configurable icons
- Custom events

Demo
===
- Test Tool : [http://jsbin.com/ehagoy/1/](http://jsbin.com/ehagoy/1/)
- *Stylesheet of JSBin seems to ruin test tool in IE8. Other browsers are fine.*

Tested Browsers
===
- Chrome 20
- Firefox 14
- IE 8

Options
===

#### close <sup>(new in v1.0.1)</sup> ####
Type: *Boolean*

Default: *true*


#### maximize ####
Type: *Boolean*

Default: *false*

#### minimize ####

Type: *Boolean*

Default: *false*

#### dblclick ####

Type: *Boolean*, *String*

Default: *false*

Valid: *false*, *'maximize'*, *'minimize'*, *'collapse'*


#### titlebar ####

Type: *Boolean*, *String*

Default: *false*

Valid: *false*, *'none'*, *'transparent'*


#### icons ####

Type: *Object*

Default:

    {
      "close" : "ui-icon-circle-closethick", // new in v1.0.1
      "maximize" : "ui-icon-extlink",
      "minimize" : "ui-icon-minus",
      "restore" : "ui-icon-newwin"
    }

Valid: *&lt;jQuery UI icon class&gt;*



#### events ####

Type: *Object*

Valid: *&lt;Refer to Events section below&gt;*

Events
===

#### load ####

Type: *load.dialogExtend*

Example:

	//Specify callback as init option
	$("#my-dialog").dialogExtend({
	  "events" : { "load" : function(evt, dlg) { ... } }
	});
	//Bind to event by type
	//NOTE : You must bind() the <load.dialogExtend> event before dialog-extend is created
	$("#my-dialog")
	  .bind("load.dialogExtend", function(evt, dlg) { ... })
	  .dialogExtend();


#### beforeCollapse ####

Type: *beforeCollapse.dialogExtend*

Example:

    //Specify callback as init option
    $("#my-dialog").dialogExtend({
      "events" : { "beforeCollapse" : function(evt, dlg) { ... } }
    });
    //Bind to event by type
    $("#my-dialog").bind("beforeCollapse.dialogExtend", function(evt, dlg) { ... });

#### beforeMaximize ####

Type: *beforeMaximize.dialogExtend*

Example:

	//Specify callback as init option
	$("#my-dialog").dialogExtend({
	  "events" : { "beforeMaximize" : function(evt, dlg) { ... } }
	});
	//Bind to event by type
	$("#my-dialog").bind("beforeMaximize.dialogExtend", function(evt, dlg) { ... });

#### beforeMinimize ####

Type: *beforeMinimize.dialogExtend*

Example:

	//Specify callback as init option
	$("#my-dialog").dialogExtend({
	  "events" : { "beforeMinimize" : function(evt, dlg) { ... } }
	});
	//Bind to event by type
	$("#my-dialog").bind("beforeMinimize.dialogExtend", function(evt, dlg) { ... });

#### beforeRestore ####

Type: *beforeRestore.dialogExtend*

Example:

	//Specify callback as init option
	$("#my-dialog").dialogExtend({
	  "events" : { "beforeRestore" : function(evt, dlg) { ... } }
	});
	//Bind to event by type
	$("#my-dialog").bind("beforeRestore.dialogExtend", function(evt, dlg) { ... });

#### collapse ####

Type: *collapse.dialogExtend*

Example:

	//Specify callback as init option
	$("#my-dialog").dialogExtend({
	  "events" : { "collapse" : function(evt, dlg) { ... } }
	});
	//Bind to event by type
	$("#my-dialog").bind("collapse.dialogExtend", function(evt, dlg) { ... });

#### maximize ####

Type: *maximize.dialogExtend*

Example:

	//Specify callback as init option
	$("#my-dialog").dialogExtend({
	  "events" : { "maximize" : function(evt, dlg) { ... } }
	});
	//Bind to event by type
	$("#my-dialog").bind("maximize.dialogExtend", function(evt, dlg) { ... });

#### minimize ####

Type: *minimize.dialogExtend*

Example:

	//Specify callback as init option
	$("#my-dialog").dialogExtend({
	  "events" : { "minimize" : function(evt, dlg) { ... } }
	});
	//Bind to event by type
	$("#my-dialog").bind("minimize.dialogExtend", function(evt, dlg) { ... });

#### restore ####

Type: *restore.dialogExtend*

Example:

	//Specify callback as init option
	$("#my-dialog").dialogExtend({
	  "events" : { "restore" : function(evt, dlg) { ... } }
	});
	//Bind to event by type
	$("#my-dialog").bind("restore.dialogExtend", function(evt, dlg) { ... });

Methods
===
#### collapse ####

Usage: Collapse the dialog without double-clicking the title bar

Trigger: *beforeCollapse.dialogExtend*, *collapse.dialogExtend*

Example:

	$("#my-dialog").dialogExtend("collapse");
#### maximize ####

Usage: Maximize the dialog without clicking the button

Trigger: *beforeMaximize.dialogExtend*, *maximize.dialogExtend*

Example:

	$("#my-dialog").dialogExtend("maximize");

#### minimize ####

Usage: Minimize the dialog without clicking the button

Trigger: *beforeMinimize.dialogExtend*, *minimize.dialogExtend*

Example:

	$("#my-dialog").dialogExtend("minimize");

#### restore ####

Usage: Restore the dialog from maximized/minimized/collapsed state without clicking the button

Trigger: *beforeRestore.dialogExtend*, *restore.dialogExtend*

Example:

	$("#my-dialog").dialogExtend("restore");

#### state (new in v1.0.1) ####

Usage: Get current state of dialog

Return: *String*

Value: *'normal'*, *'maximized'*, *'minimized'*, *'collapsed'*

Example:
	switch ( $("#my-dialog").dialogExtend("state") ) {
	  case "maximized":
	    alert("The dialog is maximized");
	    break;
	  case "minimized":
	    alert("The dialog is minimized");
	    break;
	  case "collapsed":
	    alert("The dialog is collapsed");
	    break;
	  default:
	    alert("The dialog is normal");
	}

Theming
===
The dialog will have class according to its current state.

	<div class="ui-dialog">
	  <div class="ui-dialog-titlebar">...</div>
	  <div class="ui-dialog-content ui-dialog-{normal|maximized|minimized|collapsed}">...</div>
	</div>
The buttons are wrapped by title bar of jQuery UI Dialog.

*Note : After using dialogExtend, close button will not be a direct child of title bar anymore. It will be wrapped by a button pane element*

	<div class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">
	  ...
	  <div class="ui-dialog-titlebar-buttonpane">
	    <a class="ui-dialog-titlebar-close ui-corner-all" href="#">...</a>
	    <a class="ui-dialog-titlebar-maximize ui-corner-all" href="#"><span class="ui-icon {icons.maximize}">maximize</span></a>
	    <a class="ui-dialog-titlebar-minimize ui-corner-all" href="#"><span class="ui-icon {icons.minimize}">minimize</span></a>
	    <a class="ui-dialog-titlebar-restore ui-corner-all" href="#"><span class="ui-icon {icons.restore}">restore</span></a>
	  </div>
	  ...
	</div>

Example - Basic Config
===
	$(function(){
	  $("#my-button").click(function(){
	    $("<div>This is content</div>")
	      .dialog({ "title" : "My Dialog" })
	      .dialogExtend({
	        "maximize" : true,
	        "dblclick" : "maximize",
	        "icons" : { "maximize" : "ui-icon-arrow-4-diag" }
	      });
	  });
	});
Example - Full Config
===
	$(function(){
	  $("#my-button").click(function(){
	    $("<div>This is  content</div>")
	      .dialog({
	        "title" : "This is dialog title",
	        "buttons" : { "OK" : function(){ $(this).dialog("close"); } }
	       })
	      .dialogExtend({
	        "close" : true,
	        "maximize" : true,
	        "minimize" : true,
	        "dblclick" : "collapse",
	        "titlebar" : "transparent",
	        "icons" : {
	          "close" : "ui-icon-circle-close",
	          "maximize" : "ui-icon-circle-plus",
	          "minimize" : "ui-icon-circle-minus",
	          "restore" : "ui-icon-bullet"
	        },
	        "events" : {
	          "load" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); },
	          "beforeCollapse" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); },
	          "beforeMaximize" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); },
	          "beforeMinimize" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); },
	          "beforeRestore" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); },
	          "collapse" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); },
	          "maximize" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); },
	          "minimize" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); },
	          "restore" : function(evt, dlg){ alert(evt.type+"."+evt.handleObj.namespace); }
	        }
	      });
	  });
	});