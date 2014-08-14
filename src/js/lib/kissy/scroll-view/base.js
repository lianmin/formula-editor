/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 18 14:04
*/
KISSY.add("scroll-view/base","anim/timer,component/container,component/extension/content-box,node,feature,util".split(","),function(o,e,p,s){function t(){var a=this.el,c=a.scrollTop,b=a.scrollLeft;c&&this.set("scrollTop",c+this.get("scrollTop"));b&&this.set("scrollLeft",b+this.get("scrollLeft"));a.scrollTop=a.scrollLeft=0}function u(a,c){a.scrollView.set(c.prop,c.val)}var v=e("anim/timer"),o=e("component/container"),p=e("component/extension/content-box"),m=e("node"),i=m.Event.KeyCode,j=e("feature"),
q=j.getCssVendorInfo("transform"),k=Math.floor,n,r=j.isTransform3dSupported(),j=!!q,w=e("util"),e={initializer:function(){this.scrollAnims=[]},bindUI:function(){this.$el.on("mousewheel",this.handleMouseWheel,this).on("scroll",t,this)},syncUI:function(){this.sync()},sync:function(){var a=this.el,c=this.contentEl,b=Math.max(c.offsetHeight,c.scrollHeight),c=Math.max(c.offsetWidth,c.scrollWidth);this.set("dimension",{scrollHeight:b,scrollWidth:c,clientWidth:a.clientWidth,clientHeight:a.clientHeight})},
_onSetDimension:function(a,c){var b=this.$contentEl,d=a.scrollHeight,f=a.scrollWidth,g=a.clientHeight,h,l=a.clientWidth;h=c&&c.prevVal||{};if(!(h.scrollHeight===d&&h.scrollWidth===f&&g===h.clientHeight&&l===h.clientWidth)){this.scrollHeight=d;this.scrollWidth=f;this.clientHeight=g;this.clientWidth=l;h=this.allowScroll={};if(d>g)h.top=1;if(f>l)h.left=1;this.minScroll={left:0,top:0};var e,i;this.maxScroll={left:e=f-l,top:i=d-g};delete this.scrollStep;g=this.get("snap");d=this.get("scrollLeft");f=this.get("scrollTop");
if(g){var j=b.offset(),b=this.pages=typeof g==="string"?b.all(g):b.children(),g=this.get("pageIndex"),k=this.pagesOffset=[];b.each(function(a,c){var b=a.offset(),d=b.left-j.left,b=b.top-j.top;d<=e&&b<=i&&(k[c]={left:d,top:b,index:c})});if(g){this.scrollToPage(g);return}}this.scrollToWithBounds({left:d,top:f});this.fire("reflow",a)}},handleKeyDownInternal:function(a){var c=m(a.target),b=c.nodeName();if(!(b==="input"||b==="textarea"||b==="select"||c.hasAttr("contenteditable"))){var a=a.keyCode,c=this.getScrollStep(),
d,b=this.allowScroll.left;if(this.allowScroll.top){var f=c.top,g=this.clientHeight,h=this.get("scrollTop");if(a===i.DOWN){this.scrollToWithBounds({top:h+f});d=true}else if(a===i.UP){this.scrollToWithBounds({top:h-f});d=true}else if(a===i.PAGE_DOWN){this.scrollToWithBounds({top:h+g});d=true}else if(a===i.PAGE_UP){this.scrollToWithBounds({top:h-g});d=true}}if(b){c=c.left;b=this.get("scrollLeft");if(a===i.RIGHT){this.scrollToWithBounds({left:b+c});d=true}else if(a===i.LEFT){this.scrollToWithBounds({left:b-
c});d=true}}return d}},getScrollStep:function(){if(this.scrollStep)return this.scrollStep;var a=m(this.get("el")[0].ownerDocument),c=this.clientHeight,b=this.clientWidth;return this.scrollStep={top:Math.max(c*c*0.7/a.height(),20),left:Math.max(b*b*0.7/a.width(),20)}},handleMouseWheel:function(a){if(!this.get("disabled")){var c,b,d=this.getScrollStep(),f,g=this.maxScroll,h=this.minScroll;if((f=a.deltaY)&&this.allowScroll.top){var e=this.get("scrollTop");c=g.top;b=h.top;if(!(e<=b&&f>0||e>=c&&f<0)){this.scrollToWithBounds({top:e-
a.deltaY*d.top});a.preventDefault()}}if((f=a.deltaX)&&this.allowScroll.left){e=this.get("scrollLeft");c=g.left;b=h.left;if(!(e<=b&&f>0||e>=c&&f<0)){this.scrollToWithBounds({left:e-a.deltaX*d.left});a.preventDefault()}}}},stopAnimation:function(){if(this.scrollAnims.length){w.each(this.scrollAnims,function(a){a.stop()});this.scrollAnims=[]}this.scrollToWithBounds({left:this.get("scrollLeft"),top:this.get("scrollTop")})},_uiSetPageIndex:function(a){this.scrollToPage(a)},getPageIndexFromXY:function(a,
c,b){var d=this.pagesOffset.concat([]),f=c?"left":"top";d.sort(function(a,b){return a[f]-b[f]});if(b>0)for(c=0;c<d.length;c++){b=d[c];if(b[f]>=a)return b.index}else for(c=d.length-1;c>=0;c--){b=d[c];if(b[f]<=a)return b.index}},scrollToPage:function(a,c){var b;if((b=this.pagesOffset)&&b[a]){this.set("pageIndex",a);this.scrollTo(b[a],c)}},scrollToWithBounds:function(a,c){var b=this.maxScroll,d=this.minScroll;if(a.left)a.left=Math.min(Math.max(a.left,d.left),b.left);if(a.top)a.top=Math.min(Math.max(a.top,
d.top),b.top);this.scrollTo(a,c)},scrollTo:function(a,c){var b=a.left,d=a.top;if(c){var f={},e={};if(b!==void 0){e.scrollLeft=b;f.scrollLeft=this.get("scrollLeft")}if(d!==void 0){e.scrollTop=d;f.scrollTop=this.get("scrollTop")}c.frame=u;c.node=f;c.to=e;this.scrollAnims.push(b=new v(c));b.scrollView=this;b.run()}else{b!==void 0&&this.set("scrollLeft",b);d!==void 0&&this.set("scrollTop",d)}},_onSetScrollLeft:function(a){this.contentEl.style.left=-a+"px"},_onSetScrollTop:function(a){this.contentEl.style.top=
-a+"px"}};if(j){n=q.propertyName;e._onSetScrollLeft=function(a){this.contentEl.style[n]="translateX("+k(0-a)+"px) translateY("+k(0-this.get("scrollTop"))+"px)"+(r?" translateZ(0)":"")};e._onSetScrollTop=function(a){this.contentEl.style[n]="translateX("+k(0-this.get("scrollLeft"))+"px) translateY("+k(0-a)+"px)"+(r?" translateZ(0)":"")}}s.exports=o.extend([p],e,{ATTRS:{focusable:{value:true},allowTextSelection:{value:true},handleGestureEvents:{value:false},scrollLeft:{render:1,value:0},scrollTop:{render:1,
value:0},dimension:{},snap:{value:false},pageIndex:{value:0}},xclass:"scroll-view"})});
