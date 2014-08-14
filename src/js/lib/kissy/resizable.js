/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 18 14:04
*/
KISSY.add("resizable",["base","dd","util","node"],function(h,e,f,s){function t(a){var b=a.dds,l=a.get("node"),n=a.get("handlers"),m,e=a.get("dragConfig"),g=a.get("prefixCls")+u;for(d=0;d<n.length;d++){var c=n[d],i=o('<div class="'+g+" "+g+"-"+c+'"></div>').prependTo(l,void 0),i=b[c]=new v(p.mix({node:i,cursor:null,groups:!1},e));(function(b,c){c.on("drag",function(c){var l=c.target,g=a._width,e=a._height,n=a.get("minWidth"),i=a.get("maxWidth"),j=a.get("minHeight"),h=a.get("maxHeight"),f={},c=k[b](n,
i,j,h,a._top,a._left,g,e,c.deltaY,c.deltaX,m);for(d=0;d<q.length;d++)c[d]&&(f[q[d]]=c[d]);a.fire("beforeResize",{handler:b,dd:l,region:f})});c.on("dragstart",function(){m=a.get("preserveRatio");a._width=l.width();a._top=parseInt(l.css("top"),10);a._left=parseInt(l.css("left"),10);a._height=l.height();a.fire("resizeStart",{handler:b,dd:c})});c.on("dragend",function(){a.fire("resizeEnd",{handler:b,dd:c})})})(c,i)}}var h=e("base"),f=e("dd"),p=e("util"),o=e("node"),d,v=f.Draggable,u="resizable-handler",
f=["l","r"],r=["t","b"],q=["width","height","top","left"],k={t:function(a,b,d,e,m,f,g,c,i,h,j){a=Math.min(Math.max(d,c-i),e);b=0;j&&(b=a/c*g);return[b,a,m+c-a,0]},b:function(a,b,d,e,m,f,g,c,i,h,j){a=Math.min(Math.max(d,c+i),e);b=0;j&&(b=a/c*g);return[b,a,0,0]},r:function(a,b,d,e,f,h,g,c,i,k,j){a=Math.min(Math.max(a,g+k),b);b=0;j&&(b=a/g*c);return[a,b,0,0]},l:function(a,b,d,e,f,h,g,c,i,k,j){a=Math.min(Math.max(a,g-k),b);b=0;j&&(b=a/g*c);return[a,b,0,h+g-a]}};for(d=0;d<f.length;d++)for(e=0;e<r.length;e++)(function(a,
b){k[a+b]=k[b+a]=function(){var e=k[a].apply(this,arguments),h=k[b].apply(this,arguments),f=[];for(d=0;d<e.length;d++)f[d]=e[d]||h[d];return f}})(f[d],r[e]);h=h.extend({initializer:function(){this.dds={};this.publish("beforeResize",{defaultFn:this._onBeforeResize,defaultTargetOnly:!0})},_onBeforeResize:function(a){this.get("node").css(a.region);this.fire("resize",{handler:a.hc,dd:a.dd,region:a.region})},_onSetNode:function(){t(this)},_onSetDisabled:function(a){p.each(this.dds,function(b){b.set("disabled",
a)})},destructor:function(){var a,b=this.dds;for(a in b)b[a].destroy(),b[a].get("node").remove(),delete b[a]}},{name:"Resizable",ATTRS:{node:{setter:function(a){return o(a)}},dragConfig:{},prefixCls:{value:"ks-"},disabled:{},minWidth:{value:0},minHeight:{value:0},maxWidth:{value:Number.MAX_VALUE},maxHeight:{value:Number.MAX_VALUE},preserveRatio:{value:!1},handlers:{value:[]}}});h.Handler={B:"b",T:"t",L:"l",R:"r",BL:"bl",TL:"tl",BR:"br",TR:"tr"};s.exports=h});
