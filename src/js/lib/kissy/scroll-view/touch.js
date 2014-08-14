/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 18 14:05
*/
KISSY.add("scroll-view/touch",["util","./base","anim/timer","event/gesture/basic","event/gesture/pan"],function(x,n,Q,F){function y(a,d,b){if(!z(a,b)){var c=a.startScroll[b]-("left"===b?d.deltaX:d.deltaY),d=a.minScroll,g=a.maxScroll;a._bounce||(c=Math.min(Math.max(c,d[b]),g[b]));c<d[b]?(c=d[b]-c,c*=A,c=d[b]-c):c>g[b]&&(c-=g[b],c*=A,c=g[b]+c);a.set("scroll"+t.ucfirst(b),c)}}function z(a,d){return!a.allowScroll[d]&&a["_"+("left"===d?"lockX":"lockY")]?1:0}function B(a,d,b,c){if(z(a,b))c();else{var g=
"scroll"+t.ucfirst(b),h=a.get(g),i=a.minScroll,k=a.maxScroll,j;h<i[b]?j=i[b]:h>k[b]&&(j=k[b]);void 0!==j?(h={},h[b]=j,a.scrollTo(h,{duration:a.get("bounceDuration"),easing:a.get("bounceEasing"),queue:!1,complete:c})):a.pagesOffset?c():(j="left"===b?-d.velocityX:-d.velocityY,j=Math.min(Math.max(j,-C),C),c={node:{},to:{},duration:9999,queue:!1,complete:c,frame:G(a,j,h,g,k[b],i[b])},c.node[b]=h,c.to[b]=null,a.scrollAnims.push((new H(c)).run()))}}function G(a,d,b,c,g,h){var i=d*u,k=1,j=0;return function(d,
s){var e=t.now(),f;if(k){f=e-d.startTime;var l=Math.exp(f*I);f=parseInt(b+i*(1-l)/(0-D),10);f>h&&f<g?s.lastValue===f?s.pos=1:(s.lastValue=f,a.set(c,f)):(k=0,i*=l,b=f<=h?h:g,j=e)}else f=e-j,e=f/u,e*=Math.exp(0-J*e),f=parseInt(i*e,10),0===f&&(s.pos=1),a.set(c,b+f)}}function K(a){this.isScrolling&&this.pagesOffset||v.call(this,a)||(this.startScroll={},this.dragInitDirection=null,this.isScrolling=1,this.startScroll.left=this.get("scrollLeft"),this.startScroll.top=this.get("scrollTop"))}function v(a){if("touch"!==
a.gestureType)return!0;var d=this._lockX,b=this._lockY;if(d||b){var c=a.direction;if(d&&"left"===c&&!this.allowScroll[c])return this.isScrolling=0,this._preventDefaultX&&a.preventDefault(),!0;if(b&&"top"===c&&!this.allowScroll[c])return this.isScrolling=0,this._preventDefaultY&&a.preventDefault(),!0}a.preventDefault()}function L(a){v.call(this,a)||(y(this,a,"left"),y(this,a,"top"),this.fire("touchMove"))}function M(a){v.call(this,a)||this.fire("touchEnd",{pageX:a.pageX,deltaX:a.deltaX,deltaY:a.deltaY,
pageY:a.pageY,velocityX:a.velocityX,velocityY:a.velocityY})}function N(a){function d(){c++;if(2===c){var d=function(){b.isScrolling=0;b.fire("scrollTouchEnd",{pageX:a.pageX,pageY:a.pageY,deltaX:-g,deltaY:-h,fromPageIndex:f,pageIndex:b.get("pageIndex")})};if(b.pagesOffset){var i=b._snapDurationCfg,e=b._snapEasingCfg,f=b.get("pageIndex"),l=b.get("scrollLeft"),p=b.get("scrollTop"),i={duration:i,easing:e,complete:d},n=b.pagesOffset,o=n.length;b.isScrolling=0;if(k||j)if(k&&j){var e=[],m,q;for(m=0;m<o;m++){var r=
n[m];r&&(0<g&&r.left>l?e.push(r):0>g&&r.left<l&&e.push(r))}n=e.length;if(0<h){l=Number.MAX_VALUE;for(m=0;m<n;m++)o=e[m],o.top>p&&l<o.top-p&&(l=o.top-p,q=e.index)}else{l=Number.MAX_VALUE;for(m=0;m<n;m++)o=e[m],o.top<p&&l<p-o.top&&(l=p-o.top,q=e.index)}void 0!==q?q!==f?b.scrollToPage(q,i):(b.scrollToPage(q),d()):d()}else k||j?(d=b.getPageIndexFromXY(k?l:p,k,k?g:h),b.scrollToPage(d,i)):(b.scrollToPage(f),d())}else d()}}var b=this,c=0,g=-a.deltaX,h=-a.deltaY,i=b._snapThresholdCfg,k=b.allowScroll.left&&
Math.abs(g)>i,j=b.allowScroll.top&&Math.abs(h)>i;B(b,a,"left",d);B(b,a,"top",d)}function O(a){this.isScrolling&&"touch"===a.gestureType&&a.preventDefault();if((!this.isScrolling||!this.pagesOffset)&&this.isScrolling)this.stopAnimation(),this.fire("scrollTouchEnd",{pageX:a.pageX,pageY:a.pageY})}function E(a){var d=a.get("disabled")?"detach":"on";a.$el[d](w.PAN_START,K,a)[d](P.START,O,a)[d](w.PAN,L,a)[d](w.PAN_END,M,a)}var t=n("util"),x=n("./base"),H=n("anim/timer"),A=0.5,C=6,P=n("event/gesture/basic"),
w=n("event/gesture/pan"),u=20,D=Math.log(0.95),I=D/u,J=0.3;F.exports=x.extend({initializer:function(){this._preventDefaultY=this.get("preventDefaultY");this._preventDefaultX=this.get("preventDefaultX");this._lockX=this.get("lockX");this._lockY=this.get("lockY");this._bounce=this.get("bounce");this._snapThresholdCfg=this.get("snapThreshold");this._snapDurationCfg=this.get("snapDuration");this._snapEasingCfg=this.get("snapEasing");this.publish("touchEnd",{defaultFn:N,defaultTargetOnly:!0})},bindUI:function(){E(this)},
_onSetDisabled:function(a){this.callSuper(a);E(this)},destructor:function(){this.stopAnimation()},stopAnimation:function(){this.callSuper();this.isScrolling=0}},{ATTRS:{lockX:{value:!0},preventDefaultX:{value:!0},lockY:{value:!1},preventDefaultY:{value:!1},snapDuration:{value:0.3},snapEasing:{value:"easeOut"},snapThreshold:{value:5},bounce:{value:!0},bounceDuration:{value:0.4},bounceEasing:{value:"easeOut"}}})});
