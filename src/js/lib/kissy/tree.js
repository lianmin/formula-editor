/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 18 14:05
*/
KISSY.add("tree",["tree/control","tree/node","tree/check-node","tree/check-tree"],function(f,b,j,g){var f=b("tree/control"),j=b("tree/node"),l=b("tree/check-node"),b=b("tree/check-tree");f.Node=j;f.CheckNode=l;f.CheckTree=b;g.exports=f});
KISSY.add("tree/control",["./node","./tree-manager"],function(f,b,j,g){f=b("./node");b=b("./tree-manager");g.exports=f.extend([b],{handleKeyDownInternal:function(b){var c=this.get("selectedItem");return c===this?this.callSuper(b):c&&c.handleKeyDownInternal(b)},_onSetFocused:function(b){this.callSuper(b);b&&!this.get("selectedItem")&&this.select()}},{ATTRS:{defaultChildCfg:{valueFn:function(){return{xclass:"tree-node"}}}},xclass:"tree"})});
KISSY.add("tree/node","component/container,util,node,node,./node-xtpl,component/extension/content-box".split(","),function(f,b,j,g){function l(d){if(d.target===this){var a=d.component,c=this.get("depth"),d=d.index,b=this.get("tree");if(b){e(b,a,c+1);o(this,d)}}}function c(d){if(d.target===this){e(this.get("tree"),d.component);o(this,d.index)}}function i(d){d.target===this&&this.el.setAttribute("aria-setsize",this.get("children").length)}function h(d){var a=d.get("parent"),a=(a=a&&a.get("children"))&&
a[a.length-1];return!a||a===d}function k(d){var a=d.get("isLeaf");return!(a===false||a===void 0&&d.get("children").length)}function p(d){var a=d.get("children");return!d.get("expanded")||!a.length?d:p(a[a.length-1])}function a(d){d.refreshCss(h(d),k(d))}function e(d,a,c){c!==void 0&&a.set("depth",c);m.each(a.get("children"),function(a){typeof c==="number"?e(d,a,c+1):e(d,a)})}function o(d,c){a(d);for(var c=Math.max(0,c-1),b=d.get("children"),e,i=b.length;c<i;c++){e=b[c];a(e);e.el.setAttribute("aria-posinset",
c+1)}}var f=b("component/container"),m=b("util"),q=b("node"),n=b("node").Event.KeyCode,j=b("./node-xtpl"),b=b("component/extension/content-box");g.exports=f.extend([b],{beforeCreateDom:function(d){m.mix(d.elAttrs,{role:"tree-node","aria-labelledby":"ks-content"+d.id,"aria-expanded":d.expanded?"true":"false","aria-selected":d.selected?"true":"false","aria-level":d.depth,title:d.tooltip})},bindUI:function(){this.on("afterAddChild",l);this.on("afterRemoveChild",c);this.on("afterAddChild afterRemoveChild",
i)},syncUI:function(){a(this);i.call(this,{target:this})},handleKeyDownInternal:function(d){var a=true,c=this.get("tree"),b=this.get("expanded"),e,i=this.get("isLeaf"),h=this.get("children");switch(d.keyCode){case n.ENTER:return this.handleClickInternal(d);case n.HOME:e=c;break;case n.END:e=p(c);break;case n.UP:e=d=(d=this.prev())?p(d):this.get("parent");break;case n.DOWN:d=this.get("children");if(this.get("expanded")&&d.length)e=d[0];else{d=this.next();for(c=this;!d&&(c=c.get("parent"));)d=c.next();
e=d}break;case n.LEFT:b&&(h.length||i===false)?this.set("expanded",false):e=this.get("parent");break;case n.RIGHT:if(h.length||i===false)b?e=h[0]:this.set("expanded",true);break;default:a=false}e&&e.select();return a},next:function(){var d=this.get("parent"),a;if(!d)return null;d=d.get("children");a=m.indexOf(this,d);return a===d.length-1?null:d[a+1]},prev:function(){var d=this.get("parent"),a;if(!d)return null;d=d.get("children");a=m.indexOf(this,d);return a===0?null:d[a-1]},select:function(){this.set("selected",
true)},handleClickInternal:function(d){d.stopPropagation();var a=q(d.target),c=this.get("expanded");this.get("tree").focus();this.callSuper(d);if(a.equals(this.get("expandIconEl")))this.set("expanded",!c);else{this.select();this.fire("click")}return true},createChildren:function(){this.renderChildren.apply(this,arguments);if(this===this.get("tree")){var d=this.get("tree");if(d){e(d,this,0);o(this,0)}}},refreshCss:function(d,a){var c=this.get("iconEl"),b,e,i=this.get("expandIconEl"),h=this.getChildrenContainerEl();
if(a){b="file-icon";e="expand-icon-{t}"}else if(this.get("expanded")){b="expanded-folder-icon";e="expand-icon-{t}minus"}else{b="collapsed-folder-icon";e="expand-icon-{t}plus"}c[0].className=this.getBaseCssClasses(b);i[0].className=this.getBaseCssClasses(["expand-icon",m.substitute(e,{t:d?"l":"t"})]);h[0].className=this.getBaseCssClasses(d?"lchildren":"children")},_onSetDepth:function(d){this.el.setAttribute("aria-level",d)},getChildrenContainerEl:function(){return this.get("childrenEl")},_onSetExpanded:function(d){this.getChildrenContainerEl()[d?
"show":"hide"]();this.el.setAttribute("aria-expanded",d);a(this);this.fire(d?"expand":"collapse")},_onSetSelected:function(d,a){this.get("rowEl")[d?"addClass":"removeClass"](this.getBaseCssClasses("selected"));this.el.setAttribute("aria-selected",d);var c=this.get("tree");if(!a||!a.byPassSetTreeSelectedItem)c.set("selectedItem",d?this:null)},expandAll:function(){this.set("expanded",true);m.each(this.get("children"),function(a){a.expandAll()})},collapseAll:function(){this.set("expanded",false);m.each(this.get("children"),
function(a){a.collapseAll()})}},{ATTRS:{allowTextSelection:{value:true},focusable:{value:false},handleGestureEvents:{value:false},contentTpl:{value:j},isLeaf:{render:1,sync:0,parse:function(a){if(a.hasClass(this.getBaseCssClass("leaf")))return true;if(a.hasClass(this.getBaseCssClass("folder")))return false}},rowEl:{selector:function(){return"."+this.getBaseCssClass("row")}},childrenEl:{selector:function(){return"."+this.getBaseCssClass("children")}},expandIconEl:{selector:function(){return"."+this.getBaseCssClass("expand-icon")}},
iconEl:{selector:function(){return"."+this.getBaseCssClass("icon")}},selected:{render:1,sync:0},expanded:{sync:0,value:false,render:1,parse:function(){return this.get("childrenEl").css("display")!=="none"}},tooltip:{render:1,sync:0},tree:{getter:function(){for(var a=this;a&&!a.isTree;)a=a.get("parent");return a}},depth:{render:1,sync:0},defaultChildCfg:{valueFn:function(){return{xclass:"tree-node"}}}},xclass:"tree-node"})});
KISSY.add("tree/node-xtpl",[],function(f,b,j,g){g.exports=function(b,c,i){var h=this,k=h.root.utils.callFn,f=h.root.nativeCommands["if"];c.write('<div class="',0);var a={escape:1},e=[];e.push("row");a.params=e;if((a=k(h,b,a,c,["getBaseCssClasses"],0,1))&&a.isBuffer)c=a,a=i;c.write(a,!0);c.write("\r\n     ",0);var a={escape:1},e=[],g=b.resolve(["selected"],0);e.push(g);a.params=e;a.fn=function(a,c){c.write("\r\n        ",0);var b={escape:1},d=[];d.push("selected");b.params=d;if((b=k(h,a,b,c,["getBaseCssClasses"],
0,3))&&b.isBuffer)c=b,b=i;c.write(b,!0);c.write("\r\n     ",0);return c};c=f.call(h,b,a,c,2);c.write('\r\n     ">\r\n    <div class="',0);a={escape:1};e=[];e.push("expand-icon");a.params=e;if((a=k(h,b,a,c,["getBaseCssClasses"],0,6))&&a.isBuffer)c=a,a=i;c.write(a,!0);c.write('">\r\n    </div>\r\n    ',0);a={escape:1};e=[];g=b.resolve(["checkable"],0);e.push(g);a.params=e;a.fn=function(a,c){c.write('\r\n    <div class="',0);var b={escape:1},d=[],e="checked",e="checked"+a.resolve(["checkState"],0);d.push(e);
b.params=d;if((b=k(h,a,b,c,["getBaseCssClasses"],0,9))&&b.isBuffer)c=b,b=i;c.write(b,!0);c.write(" ",0);b={escape:1};d=[];d.push("checked");b.params=d;if((b=k(h,a,b,c,["getBaseCssClasses"],0,9))&&b.isBuffer)c=b,b=i;c.write(b,!0);c.write('"></div>\r\n    ',0);return c};c=f.call(h,b,a,c,8);c.write('\r\n    <div class="',0);a={escape:1};e=[];e.push("icon");a.params=e;if((a=k(h,b,a,c,["getBaseCssClasses"],0,11))&&a.isBuffer)c=a,a=i;c.write(a,!0);c.write('">\r\n\r\n    </div>\r\n    <div class="',0);a=
{escape:1};e=[];e.push("content");a.params=e;if((a=k(h,b,a,c,["getBaseCssClasses"],0,14))&&a.isBuffer)c=a,a=i;c.write(a,!0);c.write('">',0);a=b.resolve(["content"],0);c.write(a,!1);c.write('</div>\r\n</div>\r\n<div class="',0);a={escape:1};e=[];e.push("children");a.params=e;if((a=k(h,b,a,c,["getBaseCssClasses"],0,16))&&a.isBuffer)c=a,a=i;c.write(a,!0);c.write('"\r\n',0);a={escape:1};e=[];g=b.resolve(["expanded"],0);e.push(!g);a.params=e;a.fn=function(a,b){b.write('\r\nstyle="display:none"\r\n',0);
return b};c=f.call(h,b,a,c,17);c.write("\r\n>\r\n</div>",0);return c};g.exports.TPL_NAME=g.name});
KISSY.add("tree/tree-manager",["component/extension/delegate-children","event/gesture/tap","util"],function(f,b,j,g){function l(){}var f=b("component/extension/delegate-children"),c=b("event/gesture/tap"),b=b("util");l.ATTRS={allowTextSelection:{value:!0},focusable:{value:!0},handleGestureEvents:{value:!0},showRootNode:{value:!0,render:1},selectedItem:{}};b.augment(l,f,{isTree:1,__bindUI:function(){var b=this.get("prefixCls")+"tree-node";this.$el.delegate(c.TAP,"."+b,this.handleChildrenEvents,this)},
_onSetSelectedItem:function(b,c){b&&c.prevVal&&c.prevVal.set("selected",!1,{data:{byPassSetTreeSelectedItem:1}})},_onSetShowRootNode:function(b){this.get("rowEl")[b?"show":"hide"]()}});g.exports=l});
KISSY.add("tree/check-node",["./node","util","node"],function(f,b,j,g){var f=b("./node"),l=b("util"),c=b("node"),b=f.extend({handleClickInternal:function(b){var h=this.get("expanded"),f=this.get("expandIconEl"),g=this.get("tree"),a=c(b.target);g.focus();this.callSuper(b);if(a.equals(f))this.set("expanded",!h);else return b=this.get("checkState"),this.set("checkState",1===b?0:1),!0},_onSetCheckState:function(b){var c=this.get("parent"),f,g,a,e;f=this.getBaseCssClasses("checked").split(/\s+/).join(b+
" ")+b;this.get("checkIconEl").removeClass(this.getBaseCssClasses("checked0 checked1 checked2")).addClass(f);(1===b||0===b)&&l.each(this.get("children"),function(a){a.set("checkState",b)});if(c){f=0;e=c.get("children");for(g=0;g<e.length;g++){a=e[g];a=a.get("checkState");if(2===a){c.set("checkState",2);return}1===a&&f++}0===f?c.set("checkState",0):f===e.length?c.set("checkState",1):c.set("checkState",2)}}},{ATTRS:{checkIconEl:{selector:function(){return"."+this.getBaseCssClass("checked")}},checkable:{value:!0,
render:1,sync:0},checkState:{value:0,sync:0,render:1,parse:function(){var b=this.get("checkIconEl");if(b)for(var c="checked0 checked1 checked2".split(/\s+/),f=0;f<c.length;f++)if(b.hasClass(this.getBaseCssClass(c[f])))return f}},defaultChildCfg:{valueFn:function(){return{xclass:"check-tree-node"}}}},xclass:"check-tree-node"});b.CheckState={PARTIAL_CHECK:2,CHECK:1,EMPTY:0};g.exports=b});
KISSY.add("tree/check-tree",["./check-node","./tree-manager"],function(f,b,j,g){f=b("./check-node");b=b("./tree-manager");g.exports=f.extend([b],{handleKeyDownInternal:function(b){var c=this.get("selectedItem");return c===this?this.callSuper(b):c&&c.handleKeyDownInternal(b)},_onSetFocused:function(b,c){this.callSuper(b,c);b&&!this.get("selectedItem")&&this.select()}},{ATTRS:{defaultChildCfg:{valueFn:function(){return{xclass:"check-tree-node"}}}},xclass:"check-tree"})});
