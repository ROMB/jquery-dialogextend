$ = jQuery

$.extend true,$.ui.dialogExtend.prototype,
  modes:
    "minimize":
      option:"minimizable"
      state:"minimized"
  options:
    "minimizable" : false
    "minimizeLocation" : "left"
    "icons" :
      "minimize" : "ui-icon-minus"
    # callback
    "beforeMinimize" : null
    "minimize" : null
  
  minimize:()->
    # caculate new dimension
    newHeight = $(@element[0]).dialog("widget").find(".ui-dialog-titlebar").height()+15
    newWidth = 200
    # create container for (multiple) minimized dialogs (when necessary)
    if $("#dialog-extend-fixed-container").length
      fixedContainer = $("#dialog-extend-fixed-container")
    else
      fixedContainer = $('<div id="dialog-extend-fixed-container"></div>').appendTo("body")
    fixedContainer.css
      "position" : "fixed"
      "bottom" : 1
      "left" : 1
      "right" : 1
      "z-index" : 9999
    # WORKAROUND for http://bugs.jqueryui.com/ticket/8722
    overlay = $('<div/>').css
      # float is essential for stacking dialog when there are many many minimized dialogs
      "float" : @options.minimizeLocation,
      "margin" : 1
    fixedContainer.append(overlay)
    $(@element[0]).data("dialog-extend-minimize-overlay",overlay)
    # start!
    # trigger custom event
    @_trigger "beforeMinimize"
    # remember original state
    @_saveSnapshot()
    # disable draggable-handle (for <titlebar=none> only)
    if $(@element[0]).dialog("option","draggable")
      $(@element[0]).dialog("widget")
      .draggable("option", "handle", null)
      .find(".ui-dialog-draggable-handle")
        .css("cursor", "text")
      .end()
    # modify dialog with new config
    $(@element[0])
    .dialog( "option",
      "resizable" : false
      "draggable" : false
      "height" : newHeight
      "width" : newWidth
    )
    # remove overlay on close
    .on('dialogclose',@_minimize_removeOverlay)
    # move dialog from body to container (at lower-left-hand corner)
    .dialog("widget")
      .css("position", "static")
      .appendTo(overlay)
    .find(".ui-dialog-content")
    # avoid title text overlap buttons
    .dialog("widget")
      .find(".ui-dialog-titlebar").each(()->
        titlebar = $(@)
        buttonPane = titlebar.find(".ui-dialog-titlebar-buttonpane")
        titleText = titlebar.find(".ui-dialog-title")
        titleText.css
          'overflow': 'hidden',
          'width' : titlebar.width() - buttonPane.width() + 10
      ).end()
    .find(".ui-dialog-content")
    # hide content
    # hide button-pane
    # make title-bar no-wrap
    .hide()
    .dialog("widget")
      .find(".ui-dialog-buttonpane:visible").hide().end()
      .find(".ui-dialog-titlebar").css("white-space", "nowrap").end()
    .find(".ui-dialog-content")
    # mark new state
    @_setState "minimized"
    # modify dialog button according to new state
    @_toggleButtons()
    # trigger custom event
    @_trigger "minimize"

  _restore_minimized:()->
    original = @_loadSnapshot()
    # restore dialog
    $(@element[0])
      # move dialog back from container to body
      .dialog("widget")
        .appendTo("body")
        .css(
          "float" : "none"
          "margin" : 0
          "position" : original.position.mode
        )
      .find(".ui-dialog-content")
      # revert title text
      .dialog("widget")
        .find(".ui-dialog-title")
          .css("width", "auto")
        .end()
      .find(".ui-dialog-content")
      # show content
      # show button-pane
      # fix title-bar wrap
      .show()
      .dialog("widget")
        .find(".ui-dialog-buttonpane:hidden").show().end()
        .find(".ui-dialog-titlebar").css("white-space", original.titlebar.wrap).end()
      .find(".ui-dialog-content")
      # restore config & size
      .dialog("option",
        "resizable" : original.config.resizable,
        "draggable" : original.config.draggable,
        "height" : original.size.height,
        "width" : original.size.width,
        "maxHeight" : original.size.maxHeight
        "position" :
          my: "left top"
          at: "left+"+original.position.left+" top+"+original.position.top
      )
      # remove close trigger
      .off('dialogclose',@_minimize_removeOverlay)
      # restore draggable-handle (for <titlebar=none> only)
      if $(@element[0]).dialog("option","draggable")
        $(@element[0])
        .dialog("widget")
          .draggable("option", "handle", if $(@element[0]).dialog("widget").find(".ui-dialog-draggable-handle").length then $(@element[0]).dialog("widget").find(".ui-dialog-draggable-handle") else ".ui-dialog-titlebar")
          .find(".ui-dialog-draggable-handle")
          .css("cursor", "move");
    # WORKAROUND FOR http://bugs.jqueryui.com/ticket/8722
    # remove parent
    $(@element[0]).data("dialog-extend-minimize-overlay").remove()
    $(@element[0]).removeData("dialog-extend-overlay")
    

  _initStyles_minimize:()->
    if not $(".dialog-extend-minimize-css").length
      style = ''
      style += '<style class="dialog-extend-minimize-css" type="text/css">'
      style += '.ui-dialog .ui-dialog-titlebar-minimize { width: 19px; height: 18px; }'
      style += '.ui-dialog .ui-dialog-titlebar-minimize span { display: block; margin: 1px; }'
      style += '.ui-dialog .ui-dialog-titlebar-minimize:hover,'
      style += '.ui-dialog .ui-dialog-titlebar-minimize:focus { padding: 0; }'
      style += '</style>'
      $(style).appendTo("body")
  
  _verifyOptions_minimize:()->
    if not @options.minimizeLocation or @options.minimizeLocation not in ['left','right']
      $.error( "jQuery.dialogExtend Error : Invalid <minimizeLocation> value '" + @options.minimizeLocation + "'" )
      @options.minimizeLocation = "left"
  
  _minimize_removeOverlay:()->
    $(@).dialogExtend("restore")
    $(@).dialog("widget").appendTo($('body'))
    $(@).data("dialog-extend-minimize-overlay").remove()
    $(@).removeData("dialog-extend-overlay")
