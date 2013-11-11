(function() {
  var $;

  $ = jQuery;

  $.widget("ui.dialogExtend", {
    version: "2.0.0",
    modes: {},
    modules: {},
    options: {
      "closable": true,
      "dblclick": false,
      "titlebar": false,
      "icons": {
        "close": "ui-icon-closethick",
        "restore": "ui-icon-newwin"
      },
      "load": null,
      "beforeRestore": null,
      "restore": null
    },
    _create: function() {
      this._state = "normal";
      if (!$(this.element[0]).data("ui-dialog")) {
        $.error("jQuery.dialogExtend Error : Only jQuery UI Dialog element is accepted");
      }
      this._verifyOptions();
      this._initStyles();
      this._initButtons();
      this._initTitleBar();
      this._initModules();
      this._setState("normal");
      return this._trigger("load");
    },
    _setState: function(state) {
      $(this.element[0]).removeClass("ui-dialog-" + this._state).addClass("ui-dialog-" + state);
      return this._state = state;
    },
    _verifyOptions: function() {
      var name, _ref, _results;

      if (this.options.dblclick && !(this.options.dblclick in this.modes)) {
        $.error("jQuery.dialogExtend Error : Invalid <dblclick> value '" + this.options.dblclick + "'");
        this.options.dblclick = false;
      }
      if (this.options.titlebar && ((_ref = this.options.titlebar) !== "none" && _ref !== "transparent")) {
        $.error("jQuery.dialogExtend Error : Invalid <titlebar> value '" + this.options.titlebar + "'");
        this.options.titlebar = false;
      }
      for (name in this.modes) {
        if (this["_verifyOptions_" + name]) {
          this["_verifyOptions_" + name]();
        }
      }
      _results = [];
      for (name in this.modules) {
        if (this["_verifyOptions_" + name]) {
          _results.push(this["_verifyOptions_" + name]());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    _initStyles: function() {
      var name, style, _results;

      if (!$(".dialog-extend-css").length) {
        style = '';
        style += '<style class="dialog-extend-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-buttonpane>a { float: right; }';
        style += '.ui-dialog .ui-dialog-titlebar-restore { width: 19px; height: 18px; }';
        style += '.ui-dialog .ui-dialog-titlebar-restore span { display: block; margin: 1px; }';
        style += '.ui-dialog .ui-dialog-titlebar-restore:hover,';
        style += '.ui-dialog .ui-dialog-titlebar-restore:focus { padding: 0; }';
        style += '.ui-dialog .ui-dialog-titlebar ::selection { background-color: transparent; }';
        style += '</style>';
        $(style).appendTo("body");
      }
      for (name in this.modes) {
        this["_initStyles_" + name]();
      }
      _results = [];
      for (name in this.modules) {
        _results.push(this["_initStyles_" + name]());
      }
      return _results;
    },
    _initButtons: function() {
      var buttonPane, mode, name, titlebar, _ref,
        _this = this;

      titlebar = $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar");
      buttonPane = $('<div class="ui-dialog-titlebar-buttonpane"></div>').appendTo(titlebar);
      buttonPane.css({
        "position": "absolute",
        "top": "50%",
        "right": "0.3em",
        "margin-top": "-10px",
        "height": "18px"
      });
      titlebar.find(".ui-dialog-titlebar-close").css({
        "position": "relative",
        "float": "right",
        "top": "auto",
        "right": "auto",
        "margin": 0
      }).find(".ui-icon").removeClass("ui-icon-closethick").addClass(this.options.icons.close).end().appendTo(buttonPane).end();
      buttonPane.append('<a class="ui-dialog-titlebar-restore ui-corner-all ui-state-default" href="#"><span class="ui-icon ' + this.options.icons.restore + '">restore</span></a>').find('.ui-dialog-titlebar-restore').attr("role", "button").mouseover(function() {
        return $(this).addClass("ui-state-hover");
      }).mouseout(function() {
        return $(this).removeClass("ui-state-hover");
      }).focus(function() {
        return $(this).addClass("ui-state-focus");
      }).blur(function() {
        return $(this).removeClass("ui-state-focus");
      }).end().find(".ui-dialog-titlebar-close").toggle(this.options.closable).end().find(".ui-dialog-titlebar-restore").hide().click(function(e) {
        e.preventDefault();
        return _this.restore();
      }).end();
      _ref = this.modes;
      for (name in _ref) {
        mode = _ref[name];
        this._initModuleButton(name, mode);
      }
      return titlebar.dblclick(function(evt) {
        if (_this.options.dblclick) {
          if (_this._state !== "normal") {
            return _this.restore();
          } else {
            return _this[_this.options.dblclick]();
          }
        }
      }).select(function() {
        return false;
      });
    },
    _initModuleButton: function(name, mode) {
      var buttonPane,
        _this = this;

      buttonPane = $(this.element[0]).dialog("widget").find('.ui-dialog-titlebar-buttonpane');
      return buttonPane.append('<a class="ui-dialog-titlebar-' + name + ' ui-corner-all ui-state-default" href="#"><span class="ui-icon ' + this.options.icons[name] + '">' + name + '</span></a>').find(".ui-dialog-titlebar-" + name).attr("role", "button").mouseover(function() {
        return $(this).addClass("ui-state-hover");
      }).mouseout(function() {
        return $(this).removeClass("ui-state-hover");
      }).focus(function() {
        return $(this).addClass("ui-state-focus");
      }).blur(function() {
        return $(this).removeClass("ui-state-focus");
      }).end().find(".ui-dialog-titlebar-" + name).toggle(this.options[mode.option]).click(function(e) {
        e.preventDefault();
        return _this[name]();
      }).end();
    },
    _initTitleBar: function() {
      var handle;

      switch (this.options.titlebar) {
        case false:
          return 0;
        case "none":
          if ($(this.element[0]).dialog("option", "draggable")) {
            handle = $("<div />").addClass("ui-dialog-draggable-handle").css("cursor", "move").height(5);
            $(this.element[0]).dialog("widget").prepend(handle).draggable("option", "handle", handle);
          }
          return $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").find(".ui-dialog-title").html("&nbsp;").end().css({
            "background-color": "transparent",
            "background-image": "none",
            "border": 0,
            "position": "absolute",
            "right": 0,
            "top": 0,
            "z-index": 9999
          }).end();
        case "transparent":
          return $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").css({
            "background-color": "transparent",
            "background-image": "none",
            "border": 0
          });
        default:
          return $.error("jQuery.dialogExtend Error : Invalid <titlebar> value '" + this.options.titlebar + "'");
      }
    },
    _initModules: function() {
      var name, _results;

      _results = [];
      for (name in this.modules) {
        if (this["_initModule_" + name]) {
          _results.push(this["_initModule_" + name]());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    state: function() {
      return this._state;
    },
    restore: function() {
      this._trigger("beforeRestore");
      this._restore();
      this._setState("normal");
      this._toggleButtons();
      return this._trigger("restore");
    },
    _restore: function() {
      if (this._state !== "normal") {
        return this["_restore_" + this._state]();
      }
    },
    _saveSnapshot: function() {
      if (this._state === "normal") {
        this.original_config_resizable = $(this.element[0]).dialog("option", "resizable");
        this.original_config_draggable = $(this.element[0]).dialog("option", "draggable");
        this.original_size_height = $(this.element[0]).dialog("widget").outerHeight();
        this.original_size_width = $(this.element[0]).dialog("option", "width");
        this.original_size_maxHeight = $(this.element[0]).dialog("option", "maxHeight");
        this.original_position_mode = $(this.element[0]).dialog("widget").css("position");
        this.original_position_left = $(this.element[0]).dialog("widget").offset().left - $('body').scrollLeft();
        this.original_position_top = $(this.element[0]).dialog("widget").offset().top - $('body').scrollTop();
        return this.original_titlebar_wrap = $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").css("white-space");
      }
    },
    _loadSnapshot: function() {
      return {
        "config": {
          "resizable": this.original_config_resizable,
          "draggable": this.original_config_draggable
        },
        "size": {
          "height": this.original_size_height,
          "width": this.original_size_width,
          "maxHeight": this.original_size_maxHeight
        },
        "position": {
          "mode": this.original_position_mode,
          "left": this.original_position_left,
          "top": this.original_position_top
        },
        "titlebar": {
          "wrap": this.original_titlebar_wrap
        }
      };
    },
    _toggleButtons: function() {
      var mode, name, _ref, _ref1, _results;

      $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar-restore").toggle(this._state !== "normal").css({
        "right": "1.4em"
      }).end();
      _ref = this.modes;
      for (name in _ref) {
        mode = _ref[name];
        $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar-" + name).toggle(this._state !== mode.state && this.options[mode.option]);
      }
      _ref1 = this.modes;
      _results = [];
      for (name in _ref1) {
        mode = _ref1[name];
        if (mode.state === this._state) {
          _results.push($(this.element[0]).dialog("widget").find(".ui-dialog-titlebar-restore").insertAfter($(this.element[0]).dialog("widget").find(".ui-dialog-titlebar-" + name)).end());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  });

}).call(this);

(function() {
  var $;

  $ = jQuery;

  $.extend(true, $.ui.dialogExtend.prototype, {
    modes: {
      "collapse": {
        option: "collapsable",
        state: "collapsed"
      }
    },
    options: {
      "collapsable": false,
      "icons": {
        "collapse": "ui-icon-triangle-1-s"
      },
      "beforeCollapse": null,
      "collapse": null
    },
    collapse: function() {
      var newHeight;

      newHeight = $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").height() + 15;
      this._trigger("beforeCollapse");
      if (this._state !== "normal") {
        this._restore();
      }
      this._saveSnapshot();
      $(this.element[0]).dialog("option", {
        "resizable": false,
        "height": newHeight,
        "maxHeight": newHeight
      }).on('dialogclose', this._collapse_restore).hide().dialog("widget").find(".ui-dialog-buttonpane:visible").hide().end().find(".ui-dialog-titlebar").css("white-space", "nowrap").end().find(".ui-dialog-content");
      this._setState("collapsed");
      this._toggleButtons();
      return this._trigger("collapse");
    },
    _restore_collapsed: function() {
      var original;

      original = this._loadSnapshot();
      return $(this.element[0]).show().dialog("widget").find(".ui-dialog-buttonpane:hidden").show().end().find(".ui-dialog-titlebar").css("white-space", original.titlebar.wrap).end().find(".ui-dialog-content").dialog("option", {
        "resizable": original.config.resizable,
        "height": original.size.height,
        "maxHeight": original.size.maxHeight
      }).off('dialogclose', this._collapse_restore);
    },
    _initStyles_collapse: function() {
      var style;

      if (!$(".dialog-extend-collapse-css").length) {
        style = '';
        style += '<style class="dialog-extend-collapse-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-collapse { width: 19px; height: 18px; }';
        style += '.ui-dialog .ui-dialog-titlebar-collapse span { display: block; margin: 1px; }';
        style += '.ui-dialog .ui-dialog-titlebar-collapse:hover,';
        style += '.ui-dialog .ui-dialog-titlebar-collapse:focus { padding: 0; }';
        style += '</style>';
        return $(style).appendTo("body");
      }
    },
    _collapse_restore: function() {
      return $(this).dialogExtend("restore");
    }
  });

}).call(this);

(function() {
  var $;

  $ = jQuery;

  $.extend(true, $.ui.dialogExtend.prototype, {
    modes: {
      "maximize": {
        option: "maximizable",
        state: "maximized"
      }
    },
    options: {
      "maximizable": false,
      "icons": {
        "maximize": "ui-icon-extlink"
      },
      "beforeMaximize": null,
      "maximize": null
    },
    maximize: function() {
      var newHeight, newWidth;

      newHeight = $(window).height() - 11;
      newWidth = $(window).width() - 11;
      this._trigger("beforeMaximize");
      if (this._state !== "normal") {
        this._restore();
      }
      this._saveSnapshot();
      if ($(this.element[0]).dialog("option", "draggable")) {
        $(this.element[0]).dialog("widget").draggable("option", "handle", null).find(".ui-dialog-draggable-handle").css("cursor", "text").end();
      }
      $(this.element[0]).dialog("widget").css("position", "fixed").find(".ui-dialog-content").show().dialog("widget").find(".ui-dialog-buttonpane").show().end().find(".ui-dialog-content").dialog("option", {
        "resizable": false,
        "draggable": false,
        "height": newHeight,
        "width": newWidth,
        "position": {
          my: "left top",
          at: "left top"
        }
      });
      this._setState("maximized");
      this._toggleButtons();
      return this._trigger("maximize");
    },
    _restore_maximized: function() {
      var original;

      original = this._loadSnapshot();
      $(this.element[0]).dialog("widget").css("position", original.position.mode).find(".ui-dialog-titlebar").css("white-space", original.titlebar.wrap).end().find(".ui-dialog-content").dialog("option", {
        "resizable": original.config.resizable,
        "draggable": original.config.draggable,
        "height": original.size.height,
        "width": original.size.width,
        "maxHeight": original.size.maxHeight,
        "position": {
          my: "left top",
          at: "left+" + original.position.left + " top+" + original.position.top
        }
      });
      if ($(this.element[0]).dialog("option", "draggable")) {
        return $(this.element[0]).dialog("widget").draggable("option", "handle", $(this.element[0]).dialog("widget").find(".ui-dialog-draggable-handle").length ? $(this.element[0]).dialog("widget").find(".ui-dialog-draggable-handle") : ".ui-dialog-titlebar").find(".ui-dialog-draggable-handle").css("cursor", "move");
      }
    },
    _initStyles_maximize: function() {
      var style;

      if (!$(".dialog-extend-maximize-css").length) {
        style = '';
        style += '<style class="dialog-extend-maximize-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-maximize { width: 19px; height: 18px; }';
        style += '.ui-dialog .ui-dialog-titlebar-maximize span { display: block; margin: 1px; }';
        style += '.ui-dialog .ui-dialog-titlebar-maximize:hover,';
        style += '.ui-dialog .ui-dialog-titlebar-maximize:focus { padding: 0; }';
        style += '</style>';
        return $(style).appendTo("body");
      }
    }
  });

}).call(this);

(function() {
  var $;

  $ = jQuery;

  $.extend(true, $.ui.dialogExtend.prototype, {
    modes: {
      "minimize": {
        option: "minimizable",
        state: "minimized"
      }
    },
    options: {
      "minimizable": false,
      "minimizeLocation": "left",
      "icons": {
        "minimize": "ui-icon-minus"
      },
      "beforeMinimize": null,
      "minimize": null
    },
    minimize: function() {
      var fixedContainer, newHeight, newWidth, overlay;

      newHeight = $(this.element[0]).dialog("widget").find(".ui-dialog-titlebar").height() + 15;
      newWidth = 200;
      if ($("#dialog-extend-fixed-container").length) {
        fixedContainer = $("#dialog-extend-fixed-container");
      } else {
        fixedContainer = $('<div id="dialog-extend-fixed-container"></div>').appendTo("body");
      }
      fixedContainer.css({
        "position": "fixed",
        "bottom": 1,
        "left": 1,
        "right": 1,
        "z-index": 9999
      });
      overlay = $('<div/>').css({
        "float": this.options.minimizeLocation,
        "margin": 1
      });
      fixedContainer.append(overlay);
      $(this.element[0]).data("dialog-extend-minimize-overlay", overlay);
      this._trigger("beforeMinimize");
      this._saveSnapshot();
      if ($(this.element[0]).dialog("option", "draggable")) {
        $(this.element[0]).dialog("widget").draggable("option", "handle", null).find(".ui-dialog-draggable-handle").css("cursor", "text").end();
      }
      $(this.element[0]).dialog("option", {
        "resizable": false,
        "draggable": false,
        "height": newHeight,
        "width": newWidth
      }).on('dialogclose', this._minimize_removeOverlay).dialog("widget").css("position", "static").appendTo(overlay).find(".ui-dialog-content").dialog("widget").find(".ui-dialog-titlebar").each(function() {
        var buttonPane, titleText, titlebar;

        titlebar = $(this);
        buttonPane = titlebar.find(".ui-dialog-titlebar-buttonpane");
        titleText = titlebar.find(".ui-dialog-title");
        return titleText.css({
          'overflow': 'hidden',
          'width': titlebar.width() - buttonPane.width() + 10
        });
      }).end().find(".ui-dialog-content").hide().dialog("widget").find(".ui-dialog-buttonpane:visible").hide().end().find(".ui-dialog-titlebar").css("white-space", "nowrap").end().find(".ui-dialog-content");
      this._setState("minimized");
      this._toggleButtons();
      return this._trigger("minimize");
    },
    _restore_minimized: function() {
      var original;

      original = this._loadSnapshot();
      $(this.element[0]).dialog("widget").appendTo("body").css({
        "float": "none",
        "margin": 0,
        "position": original.position.mode
      }).find(".ui-dialog-content").dialog("widget").find(".ui-dialog-title").css("width", "auto").end().find(".ui-dialog-content").show().dialog("widget").find(".ui-dialog-buttonpane:hidden").show().end().find(".ui-dialog-titlebar").css("white-space", original.titlebar.wrap).end().find(".ui-dialog-content").dialog("option", {
        "resizable": original.config.resizable,
        "draggable": original.config.draggable,
        "height": original.size.height,
        "width": original.size.width,
        "maxHeight": original.size.maxHeight,
        "position": {
          my: "left top",
          at: "left+" + original.position.left + " top+" + original.position.top
        }
      }).off('dialogclose', this._minimize_removeOverlay);
      if ($(this.element[0]).dialog("option", "draggable")) {
        $(this.element[0]).dialog("widget").draggable("option", "handle", $(this.element[0]).dialog("widget").find(".ui-dialog-draggable-handle").length ? $(this.element[0]).dialog("widget").find(".ui-dialog-draggable-handle") : ".ui-dialog-titlebar").find(".ui-dialog-draggable-handle").css("cursor", "move");
      }
      $(this.element[0]).data("dialog-extend-minimize-overlay").remove();
      return $(this.element[0]).removeData("dialog-extend-overlay");
    },
    _initStyles_minimize: function() {
      var style;

      if (!$(".dialog-extend-minimize-css").length) {
        style = '';
        style += '<style class="dialog-extend-minimize-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-minimize { width: 19px; height: 18px; }';
        style += '.ui-dialog .ui-dialog-titlebar-minimize span { display: block; margin: 1px; }';
        style += '.ui-dialog .ui-dialog-titlebar-minimize:hover,';
        style += '.ui-dialog .ui-dialog-titlebar-minimize:focus { padding: 0; }';
        style += '</style>';
        return $(style).appendTo("body");
      }
    },
    _verifyOptions_minimize: function() {
      var _ref;

      if (!this.options.minimizeLocation || ((_ref = this.options.minimizeLocation) !== 'left' && _ref !== 'right')) {
        $.error("jQuery.dialogExtend Error : Invalid <minimizeLocation> value '" + this.options.minimizeLocation + "'");
        return this.options.minimizeLocation = "left";
      }
    },
    _minimize_removeOverlay: function() {
      $(this).dialogExtend("restore");
      $(this).dialog("widget").appendTo($('body'));
      $(this).data("dialog-extend-minimize-overlay").remove();
      return $(this).removeData("dialog-extend-overlay");
    }
  });

}).call(this);

(function() {
  var $;

  $ = jQuery;

  $.extend(true, $.ui.dialogExtend.prototype, {
    modules: {
      tabable: true
    },
    options: {
      "tabable": false
    },
    _verifyOptions_tabable: function() {
      if (this.options.titlebar === 'none') {
        return $.error("jQuery.dialogExtend Error : Not supported tabble <titlebar> value '" + this.options.titlebar + "'");
      }
    },
    _initModule_tabable: function() {
      var data, header, titlebar, widget,
        _this = this;

      if (this.options.tabable) {
        this._tabs = [];
        widget = $(this.element[0]).dialog('widget');
        titlebar = widget.find('.ui-dialog-titlebar');
        titlebar.addClass('ui-dialog-titlebar-tabable');
        header = widget.find('.ui-dialog-title').contents().remove();
        widget.find('.ui-dialog-title').remove();
        data = widget.find('.ui-dialog-content').contents().remove();
        titlebar.droppable({
          accept: ".ui-dialog-title-tab",
          drop: function(event, ui) {
            var parent, tab;

            parent = ui.draggable.parent().parent();
            if (parent[0] === widget[0]) {

            } else {
              tab = parent.find('.ui-dialog-content').dialogExtend('gettab', ui.draggable.data('ui-dialog-extend-tab'));
              return _this.addtab(tab.header, tab.data);
            }
          }
        });
        return this.addtab(header[0], data);
      }
    },
    addtab: function(header, data, active) {
      var datac, tab, title, titlebar, widget;

      if (active == null) {
        active = true;
      }
      widget = $(this.element[0]).dialog('widget');
      titlebar = widget.find('.ui-dialog-titlebar');
      title = $('<span/>').addClass('ui-dialog-title ui-corner-top ui-dialog-title-tab ui-state-default').append(header);
      title.draggable({
        opacity: 0.7,
        helper: "clone"
      });
      title.click(function() {
        widget.find('.ui-dialog-content').children().hide();
        $(title.data("ui-dialog-extend-tab").data).parent().show();
        titlebar.children().removeClass('ui-state-active ui-dialog-title-tab-active');
        return title.addClass('ui-state-active ui-dialog-title-tab-active');
      });
      this._hoverable(title);
      tab = {
        header: header,
        data: data
      };
      this._tabs.push(tab);
      title.data("ui-dialog-extend-tab", tab);
      titlebar.append(title);
      datac = $('<div/>').data("ui-dialog-extend-tab", tab).append(data);
      widget.find('.ui-dialog-content').append(datac);
      if (active === true) {
        widget.find('.ui-dialog-content').children().hide();
        datac.show();
        titlebar.children().removeClass('ui-state-active ui-dialog-title-tab-active');
        return title.addClass('ui-state-active ui-dialog-title-tab-active');
      } else {
        return datac.hide();
      }
    },
    gettab: function(tabdata) {
      var i, tab, _i, _len, _ref;

      _ref = this._tabs;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        tab = _ref[i];
        if (tab.header === tabdata.header) {
          this._tabs.splice(i, 1);
          $(tab.header).parent().remove();
          if (this._tabs.length === 0) {
            $(this.element[0]).dialog('close');
            $(this.element[0]).dialog('destroy');
          }
          return {
            header: tab.header,
            data: tab.data.remove()
          };
        }
      }
    },
    _initStyles_tabable: function() {
      var style;

      if (!$(".dialog-extend-tabable-css").length) {
        style = '';
        style += '<style class="dialog-extend-tabable-css" type="text/css">';
        style += '.ui-dialog .ui-dialog-titlebar-tabable { padding: 0; }';
        style += '.ui-dialog .ui-dialog-title-tab { padding: .4em 1em; width: auto; border-bottom-width: 0; }';
        style += '.ui-dialog .ui-dialog-title-tab-active { padding-bottom: .6em; margin-bottom: -1px; }';
        style += '</style>';
        return $(style).appendTo("body");
      }
    }
  });

}).call(this);
