/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 18 13:52
*/
KISSY.add("attribute",["util","logger-manager","event/custom"],function(t,p,H,D){function u(d){return d===g.noop?function(){}:g.bind(d)}function n(d,a){return"string"===typeof a?d[a]:a}function o(d){return d.__attrVals||(d.__attrVals={})}function q(d,a,b,c,e,f,h,i){h=h||b;return d.fire(a+g.ucfirst(b)+"Change",g.mix({attrName:h,subAttrName:f,prevVal:c,newVal:e},i))}function k(d,a,b){var c=d[a];!b&&!c&&(d[a]=c={});return c||{}}function v(d,a){for(var b=0,c=a.length;void 0!==d&&b<c;b++)d=d[a[b]];return d}
function w(d){var a;-1!==d.indexOf(".")&&(a=d.split("."),d=a.shift());return{path:a,name:d}}function x(d,a,b){var c=b;if(a){var d=c=void 0===d?{}:g.clone(d),e=a.length-1;if(0<=e){for(var f=0;f<e;f++)d=d[a[f]];void 0!==d&&(d[a[f]]=b)}}return c}function y(d,a,b,c,e){var f,h,i;f=w(a);var E=a,a=f.name;f=f.path;i=d.get(a);var l=a,m=k(d,"__defaultBeforeFns");m[l]||(m[l]=1,l="before"+g.ucfirst(l)+"Change",d.publish(l,{defaultFn:z,defaultTargetOnly:!0}));f&&(h=v(i,f));if(c.force||!(!f&&i===b||f&&h===b)){b=
x(i,f,b);b=g.mix({attrName:a,subAttrName:E,prevVal:i,newVal:b,_opts:c,_attrs:e,target:d},c.data);if(c.silent){if(j===z.call(d,b))return j}else if(j===d.fire("before"+g.ucfirst(a)+"Change",b))return j;return d}}function z(d){var a=d.newVal,b=d.prevVal,c=d.attrName,e=d.subAttrName,f=d._attrs,d=d._opts,a=this.setInternal(c,a);if(a===j)return a;d.silent||(a=o(this)[c],q(this,"after",c,b,a,e,null,d.data),f?f.push({prevVal:b,newVal:a,attrName:c,subAttrName:e}):q(this,"","*",[b],[a],[e],[c],d.data))}function r(d){var a=
this.constructor;for(this.userConfig=d;a;){var b=a.ATTRS;if(b){var c=void 0;for(c in b)this.addAttr(c,b[c],!1)}a=a.superclass?a.superclass.constructor:null}if(d)for(var e in d)this.setInternal(e,d[e])}function A(d,a){var b=a.__hooks__;if(b)for(var c in b)c in d&&(d[c]=b[c](d[c]));g.each(d,function(b,c){if("function"===typeof b){var g=0;if(b.__owner__){var i=b.__owner__;delete b.__owner__;delete b.__name__;var g=b.__wrapped__=1,j=u(b);j.__owner__=i;j.__name__=c;i.prototype[c]=j}else b.__wrapped__&&
(g=1);g&&(d[c]=b=u(b));b.__owner__=a;b.__name__=c}})}function F(d){A(d,this);g.mix(this.prototype,d)}function s(d,a){var b=d.getAttrs(),c=k(b,a,1),e=c.valueFn;if(e&&(e=n(d,e)))e=e.call(d),void 0!==e&&(c.value=e),delete c.valueFn,b[a]=c;return c.value}function B(d,a,b,c){var e,f;e=w(a);a=e.name;if(e=e.path)f=d.get(a),b=x(f,e,b);if((e=k(d.getAttrs(),a).validator)&&(e=n(d,e)))if(d=e.call(d,b,a,c),void 0!==d&&!0!==d)return d}var g=p("util"),G=p("logger-manager"),t=p("event/custom"),C={},j=!1;r.extend=
function a(b,c){var e,c=g.merge(c),b=g.merge(b),f=c.__hooks__;if(e=this.__hooks__)f=c.__hooks__=c.__hooks__||{},g.mix(f,e,!1);e=b.hasOwnProperty("constructor")?b.constructor:function(){this.callSuper.apply(this,arguments)};b.constructor=e;e.__hooks__=f;A(b,e);var h=c.inheritedStatics;if(f=this.inheritedStatics)h=c.inheritedStatics=c.inheritedStatics||{},g.mix(h,f,!1);g.extend(e,this,b,c);h&&g.mix(e,h);e.extend=c.extend||a;e.addMembers=F;return e};g.augment(r,t.Target,{INVALID:C,callSuper:function(){var a,
b,c=arguments;"function"===typeof this&&this.__name__?(a=this,b=c[0],c=Array.prototype.slice.call(c,1)):(a=arguments.callee.caller,a.__wrapped__&&(a=a.caller),b=this);var e=a.__name__;if(e)return a=a.__owner__.superclass[e],!a?void 0:a.apply(b,c||[])},getAttrs:function(){return this.__attrs||(this.__attrs={})},getAttrVals:function(){var a={},b,c=this.getAttrs();for(b in c)a[b]=this.get(b);return a},addAttr:function(a,b,c){var e=this.getAttrs(),f,b=g.merge(b);b.value&&"object"===typeof b.value&&(b.value=
g.clone(b.value),G.log("please use valueFn instead of value for "+a+" attribute","warn"));(f=e[a])?g.mix(f,b,c):e[a]=b;return this},addAttrs:function(a,b){var c=this;g.each(a,function(a,b){c.addAttr(b,a)});b&&c.set(b);return c},hasAttr:function(a){return this.getAttrs().hasOwnProperty(a)},removeAttr:function(a){var b=o(this),c=this.getAttrs();this.hasAttr(a)&&(delete c[a],delete b[a]);return this},set:function(a,b,c){var e;if("string"!==typeof a){var c=b||{},b=Object(a),f=[],h=[];for(a in b)void 0!==
(e=B(this,a,b[a],b))&&h.push(e);if(h.length)return c.error&&c.error(h),j;for(a in b)y(this,a,b[a],c,f);var i=[],k=[],l=[],m=[];g.each(f,function(a){k.push(a.prevVal);l.push(a.newVal);i.push(a.attrName);m.push(a.subAttrName)});i.length&&q(this,"","*",k,l,m,i,c.data);return this}c=c||{};e=B(this,a,b);return void 0!==e?(c.error&&c.error(e),j):y(this,a,b,c)},setInternal:function(a,b){var c,e=k(this.getAttrs(),a).setter;if(e&&(e=n(this,e)))c=e.call(this,b,a);if(c===C)return j;void 0!==c&&(b=c);o(this)[a]=
b},get:function(a){var b,c=o(this),e,f;-1!==a.indexOf(".")&&(b=a.split("."),a=b.shift());e=k(this.getAttrs(),a,1).getter;f=a in c?c[a]:s(this,a);if(e&&(e=n(this,e)))f=e.call(this,f,a);!(a in c)&&void 0!==f&&(c[a]=f);b&&(f=v(f,b));return f},reset:function(a,b){if("string"===typeof a)return this.hasAttr(a)?this.set(a,s(this,a),b):this;var b=a,c=this.getAttrs(),e={};for(a in c)e[a]=s(this,a);this.set(e,b);return this}});D.exports=r});
