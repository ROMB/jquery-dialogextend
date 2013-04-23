1.0.2 / 2013-04-24
===

- make plugin be compatible with jquery 1.9.1 and jquery-ui 1.10.2

1.0.1 / 2012-08-04 / hin
===

- make plugin be compatible with jquery 1.7.2 and jquery-ui 1.8.22
- new : add option to hide 'close' button and control its icon
- new : add function 'getState' to retrieve current status of extended dialog
- fix bug : disable resize when dialog is collapsed
- fix bug : make minimized dialog on-top of overlay
- fix bug : use {position:absolute} instead of {position:fixed} on IE6
- fix bug : buttons will not disappear anymore
- fix bug : avoid title overlapping buttons when dialog minimized
- fix bug : no more exception when invoke restore method at normal state
- fix bug : open dialog => min => max => restore => resize => dialog disappear
 - ===> restore from min (w/o trigger event) before go to max
 - ===> dialog will not disappear anymore
- fix bug : open dialog => max => restore => wrong position (always at upper-left-hand corner)
 - ===> restore position after restore dialog size
 - ===> dialog appear in correct position now



1.0 / 2010-01-05 / hin
===

- fix bug of button-pane in 'minimized' state
- fix bug of title-bar word-wrap in 'minimized' state
- apply <titlebar=none|transparent> as init option for enhancing title-bar feature
- apply <dblclick=collapse> as init option for enhancing double-click feature



0.9.2 / 2010-12-16 / hin
===

- fix bug of not firing <load.dialogExtend> event
- apply <events> as init option for defining event-callback

0.9.1 / 2010-11-16 / hin
===

- fix bug of zero-config



0.9 / 2010-11-04 / hin
===

- creation of plugin


