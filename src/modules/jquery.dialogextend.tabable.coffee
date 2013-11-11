$ = jQuery

$.extend true,$.ui.dialogExtend.prototype,
  modules:
    tabable:true
  options:
    "tabable" : false
  _verifyOptions_tabable:()->
    if @options.titlebar is 'none'
      $.error( "jQuery.dialogExtend Error : Not supported tabble <titlebar> value '" + @options.titlebar + "'" )
  _initModule_tabable:()->
    if @options.tabable
      @_tabs = []
      widget = $(@element[0]).dialog('widget')
      titlebar = widget.find('.ui-dialog-titlebar')
      titlebar.addClass 'ui-dialog-titlebar-tabable'
      header = widget.find('.ui-dialog-title').contents().remove()
      widget.find('.ui-dialog-title').remove()
      data = widget.find('.ui-dialog-content').contents().remove()
      titlebar.droppable
        accept: ".ui-dialog-title-tab"
        drop: (event,ui)=>
          parent = ui.draggable.parent().parent()
          if parent[0] is widget[0]
            return
          else
            tab = parent.find('.ui-dialog-content').dialogExtend('gettab',ui.draggable.data('ui-dialog-extend-tab'))
            @addtab(tab.header,tab.data)
      @addtab(header[0],data)
            
            
  addtab:(header,data,active = true)->
    widget = $(@element[0]).dialog('widget')
    titlebar = widget.find('.ui-dialog-titlebar');
    title = $('<span/>').addClass('ui-dialog-title ui-corner-top ui-dialog-title-tab ui-state-default').append(header)
    title.draggable
        opacity: 0.7
        helper: "clone"
    title.click ()->
      widget.find('.ui-dialog-content').children().hide()
      $(title.data("ui-dialog-extend-tab").data).parent().show()
      titlebar.children().removeClass('ui-state-active ui-dialog-title-tab-active')
      title.addClass('ui-state-active ui-dialog-title-tab-active')
    @_hoverable( title );
    tab = 
      header:header
      data:data
    @_tabs.push tab
    title.data("ui-dialog-extend-tab",tab)
    titlebar.append(title)
    datac = $('<div/>').data("ui-dialog-extend-tab",tab).append(data)
    widget.find('.ui-dialog-content').append(datac)
    if active is true
      widget.find('.ui-dialog-content').children().hide()
      datac.show()
      titlebar.children().removeClass('ui-state-active ui-dialog-title-tab-active')
      title.addClass('ui-state-active ui-dialog-title-tab-active')
    else
      datac.hide()
  gettab:(tabdata)->
    for tab,i in @_tabs
      if tab.header is tabdata.header
        @_tabs.splice(i,1)
        last = $(tab.header).parent().remove()
        if @_tabs.length > 0
          if last.hasClass('ui-dialog-title-tab-active')
            widget = $(@element[0]).dialog('widget')
            widget.find('.ui-dialog-titlebar').find('.ui-dialog-title-tab').first()
              .addClass('ui-state-active ui-dialog-title-tab-active')
              .data("ui-dialog-extend-tab").data.parent().show()
        else
          $(@element[0]).dialog('close')
        return header:tab.header,data:tab.data.remove()
    
  _initStyles_tabable:()->
    if not $(".dialog-extend-tabable-css").length
      style = ''
      style += '<style class="dialog-extend-tabable-css" type="text/css">'
      style += '.ui-dialog .ui-dialog-titlebar-tabable { padding: 0; }'
      style += '.ui-dialog .ui-dialog-title-tab { padding: .4em 1em; width: auto; border-bottom-width: 0; }'
      style += '.ui-dialog .ui-dialog-title-tab-active { padding-bottom: .6em; margin-bottom: -1px; }'
      style += '</style>'
      $(style).appendTo("body")
    
