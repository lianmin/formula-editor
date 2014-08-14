/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 18 14:03
*/
KISSY.add("menu","menu/control,menu/menuitem,menu/check-menuitem,menu/radio-menuitem,menu/submenu,menu/popupmenu".split(","),function(e,c,h,g){e=c("menu/control");e.Item=c("menu/menuitem");e.CheckItem=c("menu/check-menuitem");e.RadioItem=c("menu/radio-menuitem");e.SubMenu=c("menu/submenu");e.PopupMenu=c("menu/popupmenu");g.exports=e});
KISSY.add("menu/control",["util","component/container","component/extension/delegate-children","node"],function(e,c,h,g){function b(a){a.target.isMenu&&(a=a.newVal,this.el.setAttribute("aria-activedescendant",a&&a.el.id||""))}var a=c("util"),e=c("component/container"),h=c("component/extension/delegate-children"),j=c("node").Event.KeyCode;g.exports=e.extend([h],{isMenu:1,beforeCreateDom:function(a){a.elAttrs.role="menu"},bindUI:function(){this.on("afterHighlightedItemChange",b,this)},_onSetHighlightedItem:function(a,
d){var b;a&&d&&(b=d.prevVal)&&b.set("highlighted",!1,{data:{byPassSetHighlightedItem:1}})},_onSetVisible:function(a,d){this.callSuper(a,d);var b;!a&&(b=this.get("highlightedItem"))&&b.set("highlighted",!1)},getRootMenu:function(){return this},handleMouseEnterInternal:function(a){this.callSuper(a);a=this.getRootMenu();a!==this&&a._popupAutoHideTimer&&(clearTimeout(a._popupAutoHideTimer),a._popupAutoHideTimer=null)},handleBlurInternal:function(a){this.callSuper(a);var d;(d=this.get("highlightedItem"))&&
d.set("highlighted",!1)},_getNextEnabledHighlighted:function(a,d){var b=this.get("children"),i=b.length,c=a;do{var j=b[c];if(!j.get("disabled")&&!1!==j.get("visible"))return b[c];c=(c+d+i)%i}while(c!==a)},handleKeyDownInternal:function(b){var d=this.get("highlightedItem");if(d&&d.handleKeyDownInternal(b))return!0;var c=this.get("children"),i=c.length;if(0!==i){var k;switch(b.keyCode){case j.ESC:(d=this.get("highlightedItem"))&&d.set("highlighted",!1);break;case j.HOME:k=this._getNextEnabledHighlighted(0,
1);break;case j.END:k=this._getNextEnabledHighlighted(i-1,-1);break;case j.UP:d?(b=a.indexOf(d,c),i=(b-1+i)%i):i-=1;k=this._getNextEnabledHighlighted(i,-1);break;case j.DOWN:d?(b=a.indexOf(d,c),i=(b+1+i)%i):i=0,k=this._getNextEnabledHighlighted(i,1)}if(k)return k.set("highlighted",!0,{data:{fromKeyboard:1}}),!0}},containsElement:function(a){var b=this.$el;if(!this.get("visible")||!b)return!1;if(b&&(b[0]===a||b.contains(a)))return!0;for(var b=this.get("children"),c=0,i=b.length;c<i;c++){var j=b[c];
if(j.containsElement&&j.containsElement(a))return!0}return!1}},{ATTRS:{handleGestureEvents:{value:!0},focusable:{value:!0},allowTextSelection:{value:!1},highlightedItem:{value:null},defaultChildCfg:{valueFn:function(){return{xclass:"menuitem"}}}},xclass:"menu"})});
KISSY.add("menu/menuitem",["component/control","node"],function(e,c,h,g){var e=c("component/control"),b=c("node");g.exports=e.extend({isMenuItem:1,beforeCreateDom:function(a){a.elAttrs.role="menuitem"},handleClickInternal:function(a){this.callSuper(a);a.preventDefault();this.fire("click");return!0},_onSetHighlighted:function(a,c){var f=this.get("parent");this.callSuper(a,c);if(!c||!c.byPassSetHighlightedItem)this.get("rendered")?f.set("highlightedItem",a?this:null):a&&f.set("highlightedItem",this);
if(a){var d=this.$el;(f=d.parent(function(a){return"visible"!==b(a).css("overflow")},f.get("el").parent()))&&d.scrollIntoView(f,{alignWithTop:!0,allowHorizontalScroll:!0,onlyScrollIfNeeded:!0})}},containsElement:function(a){var b=this.$el;return b&&(b[0]===a||b.contains(a))}},{ATTRS:{handleGestureEvents:{value:!1},focusable:{value:!1},allowTextSelection:{value:!1}},xclass:"menuitem"})});
KISSY.add("menu/check-menuitem",["./menuitem","component/extension/content-box","./check-menuitem-xtpl"],function(e,c,h,g){e=c("./menuitem");h=c("component/extension/content-box");c=c("./check-menuitem-xtpl");g.exports=e.extend([h],{beforeCreateDom:function(b){b.checked&&b.elCls.push(this.getBaseCssClasses("checked"))},_onSetChecked:function(b){var a=this.getBaseCssClasses("checked");this.$el[b?"addClass":"removeClass"](a)},handleClickInternal:function(b){this.set("checked",!this.get("checked"));
this.callSuper(b);return!0}},{ATTRS:{contentTpl:{value:c},checked:{render:1,sync:0}},xclass:"check-menuitem"})});
KISSY.add("menu/check-menuitem-xtpl",[],function(e,c,h,g){g.exports=function(b,a,c){var f=this.root.utils.callFn;a.write('<div class="',0);var d={escape:1},e=[];e.push("checkbox");d.params=e;if((d=f(this,b,d,a,["getBaseCssClasses"],0,1))&&d.isBuffer)a=d,d=c;a.write(d,!0);a.write('">\r\n</div>\r\n<div class="',0);d={escape:1};e=[];e.push("content");d.params=e;if((f=f(this,b,d,a,["getBaseCssClasses"],0,3))&&f.isBuffer)a=f,f=c;a.write(f,!0);a.write('">',0);b=b.resolve(["content"],0);a.write(b,!1);a.write("</div>",
0);return a};g.exports.TPL_NAME=g.name});
KISSY.add("menu/radio-menuitem",["./menuitem","component/extension/content-box","./radio-menuitem-xtpl"],function(e,c,h,g){e=c("./menuitem");h=c("component/extension/content-box");c=c("./radio-menuitem-xtpl");g.exports=e.extend([h],{beforeCreateDom:function(b){b.elAttrs.role="menuitemradio";b.selected&&b.elCls.push(this.getBaseCssClasses("selected"))},_onSetSelected:function(b){var a=this.getBaseCssClasses("selected");this.$el[b?"addClass":"removeClass"](a)},handleClickInternal:function(b){var a=
this.get("parent").getRootMenu(),c=a.__selectedItem;c&&c!==this&&c.set("selected",!1);a.__selectedItem=this;this.set("selected",!0);this.callSuper(b);return!0},destructor:function(){var b=this.get("parent");if((b=b&&b.getRootMenu())&&b.__selectedItem===this)b.__selectedItem=null}},{ATTRS:{contentTpl:{value:c},selected:{sync:0,render:1}},xclass:"radio-menuitem"})});
KISSY.add("menu/radio-menuitem-xtpl",[],function(e,c,h,g){g.exports=function(b,a,c){var f=this.root.utils.callFn;a.write('<div class="',0);var d={escape:1},e=[];e.push("radio");d.params=e;if((d=f(this,b,d,a,["getBaseCssClasses"],0,1))&&d.isBuffer)a=d,d=c;a.write(d,!0);a.write('">\r\n</div>\r\n<div class="',0);d={escape:1};e=[];e.push("content");d.params=e;if((f=f(this,b,d,a,["getBaseCssClasses"],0,3))&&f.isBuffer)a=f,f=c;a.write(f,!0);a.write('">',0);b=b.resolve(["content"],0);a.write(b,!1);a.write("</div>",
0);return a};g.exports.TPL_NAME=g.name});
KISSY.add("menu/submenu",["util","./submenu-xtpl","./menuitem","component/extension/content-box","node"],function(e,c,h,g){function b(a){var b=a.target;b!==this&&b.isMenuItem&&a.newVal&&(this.clearHidePopupMenuTimers(),this.get("highlighted")||(this.set("highlighted",!0),b.set("highlighted",!1),b.set("highlighted",!0)))}function a(){var a=this.get("menu"),b={node:this.$el,points:["tr","tl"],overflow:{adjustX:1,adjustY:1}};f.mix(a.get("align"),b,!1);a.show();this.el.setAttribute("aria-haspopup",a.get("el").attr("id"))}
function j(){this.get("menu").hide()}var f=c("util"),e=c("./submenu-xtpl"),h=c("./menuitem"),d=c("component/extension/content-box"),l=c("node").Event.KeyCode;g.exports=h.extend([d],{isSubMenu:1,decorateDom:function(a){var b=this.get("prefixCls"),a=a.one("."+b+"popupmenu"),c=a[0].ownerDocument.body;c.insertBefore(a[0],c.firstChild);this.setInternal("menu",new (this.getComponentConstructorByNode(b,a))({srcNode:a,prefixCls:b}))},bindUI:function(){this.on("afterHighlightedChange",b,this)},clearShowPopupMenuTimers:function(){var a;
if(a=this._showTimer)a.cancel(),this._showTimer=null},clearHidePopupMenuTimers:function(){var a;if(a=this._dismissTimer)a.cancel(),this._dismissTimer=null},clearSubMenuTimers:function(){this.clearHidePopupMenuTimers();this.clearShowPopupMenuTimers()},handleMouseLeaveInternal:function(){this.set("highlighted",!1,{data:{fromMouse:1}});this.clearSubMenuTimers();this.get("menu").get("visible")&&(this._dismissTimer=f.later(j,1E3*this.get("menuDelay"),!1,this))},handleMouseEnterInternal:function(){this.set("highlighted",
!0,{data:{fromMouse:1}});this.clearSubMenuTimers();this.get("menu").get("visible")||(this._showTimer=f.later(a,1E3*this.get("menuDelay"),!1,this))},_onSetHighlighted:function(b,c){this.callSuper(b,c);c&&!c.fromMouse&&(b&&!c.fromKeyboard?a.call(this):b||j.call(this))},handleClickInternal:function(b){a.call(this);this.callSuper(b)},handleKeyDownInternal:function(b){var c=this.get("menu"),d,e=c.get("visible"),f=b.keyCode;if(e){if(!c.handleKeyDownInternal(b))if(f===l.LEFT)this.set("highlighted",!1),this.set("highlighted",
!0,{data:{fromKeyboard:1}});else return}else if(f===l.RIGHT)a.call(this),b=c.get("children"),(d=b[0])&&d.set("highlighted",!0,{data:{fromKeyboard:1}});else{if(f===l.ENTER)return this.handleClickInternal(b);return}return!0},containsElement:function(a){return this.get("menu").containsElement(a)},destructor:function(){var a=this.get("menu");this.clearSubMenuTimers();a.destroy()}},{ATTRS:{contentTpl:{value:e},menuDelay:{value:0.15},menu:{getter:function(a){a=a||{};a.isControl||(a.xclass=a.xclass||"popupmenu",
a=this.createComponent(a),this.setInternal("menu",a));return a},setter:function(a){a.isControl&&a.setInternal("parent",this)}}},xclass:"submenu"})});
KISSY.add("menu/submenu-xtpl",[],function(e,c,h,g){g.exports=function(b,a,c){var e=this.root.utils.callFn;a.write('<div class="',0);var d={escape:1},g=[];g.push("content");d.params=g;if((e=e(this,b,d,a,["getBaseCssClasses"],0,1))&&e.isBuffer)a=e,e=c;a.write(e,!0);a.write('">',0);c=b.resolve(["content"],0);a.write(c,!1);a.write('</div>\r\n<span class="',0);b=b.resolve(["prefixCls"],0);a.write(b,!0);a.write('submenu-arrow">\u25ba</span>',0);return a};g.exports.TPL_NAME=g.name});
KISSY.add("menu/popupmenu",["component/extension/align","component/extension/shim","./control","component/extension/content-box"],function(e,c,h,g){var e=c("component/extension/align"),h=c("component/extension/shim"),b=c("./control"),c=c("component/extension/content-box");g.exports=b.extend([c,h,e],{getRootMenu:function(){var a=this,b;do b=a,a=a.get("parent");while(a&&(a.isMenuItem||a.isMenu));return b},handleMouseLeaveInternal:function(a){this.callSuper(a);if(this.get("autoHideOnMouseLeave")){var b=
this.getRootMenu();b!==this&&(clearTimeout(b._popupAutoHideTimer),b._popupAutoHideTimer=setTimeout(function(){var a;(a=b.get("highlightedItem"))&&a.set("highlighted",!1)},1E3*this.get("parent").get("menuDelay")))}},isPopupMenu:1,handleBlurInternal:function(a){this.callSuper(a);this.hide()}},{ATTRS:{handleGestureEvents:{value:!0},focusable:{value:!1},allowTextSelection:{value:!1},autoHideOnMouseLeave:{},visible:{value:!1}},xclass:"popupmenu"})});
