/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 18 14:05
*/
KISSY.add("tabs","component/container,tabs/bar,tabs/body,tabs/tab,tabs/panel,util".split(","),function(g,b,i,h){function d(e){this.removeItemByTab(e.target)}function a(e){this.setSelectedTab(e.newVal)}function j(e){var a={};a.content=e.title;a.selected=e.selected;a.closable=e.closable;return a}var c=b("component/container"),g=b("tabs/bar"),i=b("tabs/body");b("tabs/tab");var l=b("tabs/panel"),k=b("util"),f={top:0,left:0,bottom:1,right:0},b=c.extend({initializer:function(){var e=this.get("items");if(e){var a=
this.get("children"),c=this.get("barOrientation"),b,d=this.get("prefixCls"),g={prefixCls:d,xclass:"tabs-bar",changeType:this.get("changeType"),children:[]},d={prefixCls:d,xclass:"tabs-body",lazyRender:this.get("lazyRender"),children:[]},h=g.children,l=d.children;k.each(e,function(e){b=b||e.selected;h.push(j(e));l.push({content:e.content,selected:e.selected})});if(!b&&h.length){h[0].selected=true;l[0].selected=true}a[f[c]]=g;a[1-f[c]]=d}},beforeCreateDom:function(e){e.elCls.push(this.getBaseCssClass(this.get("barOrientation")))},
decorateDom:function(){this.get("bar").set("changeType",this.get("changeType"))},bindUI:function(){this.on("afterSelectedTabChange",a);this.on("afterTabClose",d)},addItem:function(e,a){var c=this.get("bar"),b,d,f=c.get("children"),g=this.get("body");if(typeof a==="undefined")a=f.length;b=j(e);d={content:e.content};c.addChild(b,a);b=f[a];g.addChild(d,a);if(e.selected){c.set("selectedTab",b);g.set("selectedPanelIndex",a)}return this},removeItemAt:function(a,b){var c=this.get("bar"),d=c.get("children"),
f=c.getChildAt(a),j=this.get("body");f.get("selected")&&(d.length===1?c.set("selectedTab",null):a===0?c.set("selectedTab",c.getChildAt(a+1)):c.set("selectedTab",c.getChildAt(a-1)));c.removeChild(c.getChildAt(a),b);j.removeChild(j.getChildAt(a),b);return this},removeItemByTab:function(a,c){return this.removeItemAt(k.indexOf(a,this.get("bar").get("children")),c)},removeItemByPanel:function(a,c){return this.removeItemAt(k.indexOf(a,this.get("body").get("children")),c)},getSelectedTab:function(){var a=
this.get("bar"),c=null;k.each(a.get("children"),function(a){if(a.get("selected")){c=a;return false}});return c},getSelectedPanel:function(){var a=this.get("body"),c=null;k.each(a.get("children"),function(a){if(a.get("selected")){c=a;return false}});return c},getTabs:function(){return this.get("bar").get("children")},getPanels:function(){return this.get("body").get("children")},getTabAt:function(a){return this.get("bar").get("children")[a]},getPanelAt:function(a){return this.get("body").get("children")[a]},
setSelectedTab:function(a){var c=this.get("bar"),b=this.get("body");c.set("selectedTab",a);b.set("selectedPanelIndex",k.indexOf(a,c.get("children")));return this},setSelectedPanel:function(a){var c=this.get("bar"),b=this.get("body"),a=k.indexOf(a,b.get("children"));b.set("selectedPanelIndex",a);c.set("selectedTab",this.getTabAt(a));return this},_onSetBarOrientation:function(a){this.$el.removeClass(this.getBaseCssClass("top bottom left right")).addClass(this.getBaseCssClass(a))}},{ATTRS:{handleGestureEvents:{value:false},
allowTextSelection:{value:true},focusable:{value:false},items:{},changeType:{},lazyRender:{value:false},bar:{getter:function(){return this.get("children")[f[this.get("barOrientation")]]}},body:{getter:function(){return this.get("children")[1-f[this.get("barOrientation")]]}},barOrientation:{render:1,sync:0,value:"top",parse:function(a){return(a=a[0].className.match(/(top|bottom|left|right)\b/))&&a[1]||void 0}}},xclass:"tabs"});b.Orientation={TOP:"top",BOTTOM:"bottom",LEFT:"left",RIGHT:"right"};b.ChangeType=
g.ChangeType;b.Bar=g;b.Body=i;b.Panel=l;h.exports=b});
KISSY.add("tabs/bar",["toolbar","util"],function(g,b,i,h){var g=b("toolbar"),d=b("util"),b=g.extend({beforeCreateDom:function(a){a.elAttrs.role="tablist"},bindUI:function(){var a=this;a.on("afterSelectedChange",function(b){b.newVal&&b.target.isTabsTab&&a.set("selectedTab",b.target)})},syncUI:function(){var a=this,b=a.get("children");d.each(b,function(c){if(c.get("selected"))return a.setInternal("selectedTab",c),!1})},handleKeyDownInternal:function(a){var b=this.get("selectedTab"),a=this.getNextItemByKeyDown(a,
b);if("boolean"===typeof a)return a;a.set("selected",!0);return!0},_onSetSelectedTab:function(a,b){var c;a&&(b&&(c=b.prevVal)&&c.set("selected",!1),a.set("selected",!0))},_onSetHighlightedItem:function(a,b){this.callSuper(a,b);"mouse"===this.get("changeType")&&this._onSetSelectedTab.apply(this,arguments)}},{ATTRS:{selectedTab:{},changeType:{value:"click"},defaultChildCfg:{valueFn:function(){return{xclass:"tabs-tab"}}}},xclass:"tabs-bar"});b.ChangeType={CLICK:"click",MOUSE:"mouse"};h.exports=b});
KISSY.add("tabs/body",["component/container","util"],function(g,b,i,h){function d(a,b,d){if(a.get("lazyRender")){var f=a.get("children")[d];if(!f.get("selected"))return f}return j.superclass[b].call(a,d)}var g=b("component/container"),a=b("util"),j=g.extend({bindUI:function(){var a=this;a.on("afterSelectedPanelIndexChange",function(b){var d=a.get("children"),f=b.newVal,e;d[f]&&((e=d[b.prevVal])&&e.set("selected",!1),a.selectPanelByIndex(f))})},syncUI:function(){var b=this,d=b.get("children");a.each(d,
function(a,d){if(a.get("selected"))return b.set("selectedPanelIndex",d),!1})},createChild:function(a){return d(this,"createChild",a)},renderChild:function(a){return d(this,"renderChild",a)},selectPanelByIndex:function(a){this.get("children")[a].set("selected",!0);this.get("lazyRender")&&this.renderChild(a)}},{ATTRS:{allowTextSelection:{value:!0},focusable:{value:!1},handleGestureEvents:{value:!1},selectedPanelIndex:{},lazyRender:{},defaultChildCfg:{valueFn:function(){return{xclass:"tabs-panel"}}}},
xclass:"tabs-body"});h.exports=j});
KISSY.add("tabs/tab",["button","./tab-xtpl","component/extension/content-box"],function(g,b,i,h){function d(){this.fire("afterTabClose")}g=b("button");i=b("./tab-xtpl");b=b("component/extension/content-box");h.exports=g.extend([b],{initializer:function(){this.publish("beforeTabClose",{defaultFn:d,defaultTargetOnly:!0})},isTabsTab:!0,beforeCreateDom:function(a){var b=a.elAttrs;b.role="tab";a.selected&&(b["aria-selected"]=!0,a.elCls.push(this.getBaseCssClasses("selected")));a.closable&&a.elCls.push(this.getBaseCssClasses("closable"))},
handleClickInternal:function(a){this.get("closable")&&a.target===this.get("closeBtn")[0]?this.fire("beforeTabClose"):(this.callSuper(a),this.set("selected",!0))},_onSetSelected:function(a){var b=this.$el,c=this.getBaseCssClasses("selected");b[a?"addClass":"removeClass"](c).attr("aria-selected",!!a)}},{ATTRS:{allowTextSelection:{value:!1},focusable:{value:!1},handleGestureEvents:{value:!1},contentTpl:{value:i},closable:{value:!1,render:1,sync:0,parse:function(){return!!this.get("closeBtn")}},closeBtn:{selector:function(){return"."+
this.getBaseCssClass("close")}},selected:{render:1,sync:0,parse:function(a){return a.hasClass(this.getBaseCssClass("selected"))}}},xclass:"tabs-tab"})});
KISSY.add("tabs/tab-xtpl",[],function(g,b,i,h){h.exports=function(b,a,g){var c=this,h=c.root.utils.callFn,i=c.root.nativeCommands["if"];a.write('<div class="',0);var f={escape:1},e=[];e.push("content");f.params=e;if((f=h(c,b,f,a,["getBaseCssClasses"],0,1))&&f.isBuffer)a=f,f=g;a.write(f,!0);a.write('">',0);f=b.resolve(["content"],0);a.write(f,!1);a.write("</div>\r\n",0);var f={escape:1},e=[],m=b.resolve(["closable"],0);e.push(m);f.params=e;f.fn=function(a,b){b.write('\r\n<span class="',0);var d={escape:1},
e=[];e.push("close");d.params=e;if((d=h(c,a,d,b,["getBaseCssClasses"],0,3))&&d.isBuffer)b=d,d=g;b.write(d,!0);b.write('">close</span>\r\n',0);return b};return a=i.call(c,b,f,a,2)};h.exports.TPL_NAME=h.name});
KISSY.add("tabs/panel",["component/container"],function(g,b,i,h){g=b("component/container");h.exports=g.extend({isTabsPanel:1,beforeCreateDom:function(b){b.elAttrs.role="tabpanel";b.selected?b.elCls.push(this.getBaseCssClasses("selected")):b.elAttrs["aria-hidden"]=!1},_onSetSelected:function(b){var a=this.$el,g=this.getBaseCssClasses("selected");a[b?"addClass":"removeClass"](g).attr("aria-hidden",!b)}},{ATTRS:{allowTextSelection:{value:!0},focusable:{value:!1},handleGestureEvents:{value:!1},selected:{render:1,
sync:0,parse:function(b){return b.hasClass(this.getBaseCssClass("selected"))}}},xclass:"tabs-panel"})});
