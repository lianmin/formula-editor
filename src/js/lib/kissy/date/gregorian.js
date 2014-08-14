/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Jul 18 13:54
*/
KISSY.add("date/gregorian",["util","./gregorian/utils","i18n!date","./gregorian/const"],function(w,s,o,y){function e(a,b){var c=g.makeArray(arguments);"object"===typeof a?(b=a,a=b.timezoneOffset):3<=c.length&&(a=b=null);this.locale=b=b||n;this.fields=[];this.time=void 0;this.timezoneOffset=a||b.timezoneOffset;this.firstDayOfWeek=b.firstDayOfWeek;this.minimalDaysInFirstWeek=b.minimalDaysInFirstWeek;this.fieldsComputed=!1;3<=arguments.length&&this.set.apply(this,c)}function x(a){var b=a.fields,c=t(b[h],
b[j]);b[m]>c&&a.set(m,c)}function t(a,b){return z(a)?J[b]:K[b]}function l(a,b,c){var d=b+6-q(b+6-a.firstDayOfWeek,7);d-b>=a.minimalDaysInFirstWeek&&(d-=7);return G((c-d)/7)+1}var g=s("util"),k=parseInt,i=s("./gregorian/utils"),n=s("i18n!date"),w=s("./gregorian/const");g.mix(e,w);g.mix(e,{Utils:i,isLeapYear:i.isLeapYear,YEAR:1,MONTH:2,DAY_OF_MONTH:3,HOUR_OF_DAY:4,MINUTES:5,SECONDS:6,MILLISECONDS:7,WEEK_OF_YEAR:8,WEEK_OF_MONTH:9,DAY_OF_YEAR:10,DAY_OF_WEEK:11,DAY_OF_WEEK_IN_MONTH:12,AM:0,PM:1});var h=
e.YEAR,j=e.MONTH,m=e.DAY_OF_MONTH,A=e.HOUR_OF_DAY,E=e.MINUTES,F=e.SECONDS,B=e.MILLISECONDS,C=e.DAY_OF_WEEK_IN_MONTH,u=e.DAY_OF_YEAR,v=e.DAY_OF_WEEK,r=e.WEEK_OF_MONTH,p=e.WEEK_OF_YEAR,K=[31,28,31,30,31,30,31,31,30,31,30,31],J=[31,29,31,30,31,30,31,31,30,31,30,31],q=i.mod,z=i.isLeapYear,G=Math.floor,H=[void 0,1,e.JANUARY,1,0,0,0,0,1,void 0,1,e.SUNDAY,1],I=[void 0,292278994,e.DECEMBER,void 0,23,59,59,999,void 0,void 0,void 0,e.SATURDAY,void 0];e.prototype={constructor:e,isLeapYear:function(){return z(this.getYear())},
getLocale:function(){return this.locale},getActualMinimum:function(a){if(void 0!==H[a])return H[a];var b=this.fields;if(a===r)return(new e(b[h],b[j],1)).get(r);throw Error("minimum value not defined!");},getActualMaximum:function(a){if(void 0!==I[a])return I[a];var b,c=this.fields;switch(a){case m:b=t(c[h],c[j]);break;case p:b=(new e(c[h],e.DECEMBER,31)).get(p);1===b&&(b=52);break;case r:b=(new e(c[h],c[j],t(c[h],c[j]))).get(r);break;case u:b=z(c[h])?366:365;break;case C:b=k((t(c[h],c[j])-1)/7)+1}if(void 0===
b)throw Error("maximum value not defined!");return b},isSet:function(a){return void 0!==this.fields[a]},computeFields:function(){var a=this.time,b=6E4*this.timezoneOffset,c=k(b/864E5),b=b%864E5,c=c+k(a/864E5),b=b+a%864E5;if(864E5<=b)b-=864E5,c++;else for(;0>b;)b+=864E5,c--;var c=c+719163,d=i.getGregorianDateFromFixedDate(c),f=d.year,a=this.fields;a[h]=f;a[j]=d.month;a[m]=d.dayOfMonth;a[v]=d.dayOfWeek;0!==b?(a[A]=k(b/36E5),b%=36E5,a[E]=k(b/6E4),b%=6E4,a[F]=k(b/1E3),a[B]=b%1E3):a[A]=a[E]=a[F]=a[B]=
0;var g=i.getFixedDate(f,e.JANUARY,1),b=c-d.dayOfMonth+1;a[u]=c-g+1;a[C]=k((d.dayOfMonth-1)/7)+1;d=l(this,g,c);0===d?(d=g-1,f=g-(z(f-1)?366:365),d=l(this,f,d)):52<=d&&(f=g+(z(f)?366:365),g=f+6-q(f+6-this.firstDayOfWeek,7),g-f>=this.minimalDaysInFirstWeek&&c>=g-7&&(d=1));a[p]=d;a[r]=l(this,b,c);this.fieldsComputed=!0},computeTime:function(){if(!this.isSet(h))throw Error("year must be set for KISSY GregorianCalendar");var a=this.fields,b=a[h],c=0;this.isSet(A)&&(c+=a[A]);c=60*c+(a[E]||0);c=60*c+(a[F]||
0);c=1E3*c+(a[B]||0);a[h]=b;a=0+this.getFixedDate();this.time=c=864E5*(a-719163)+c-6E4*this.timezoneOffset;this.computeFields()},complete:function(){void 0===this.time&&this.computeTime();this.fieldsComputed||this.computeFields()},getFixedDate:function(){var a=this.fields,b=this.firstDayOfWeek,c=a[h],d=e.JANUARY;this.isSet(j)&&(d=a[j],d>e.DECEMBER?(c+=k(d/12),d%=12):d<e.JANUARY&&(c+=G(d/12),d=q(d,12)));var f=i.getFixedDate(c,d,1),g=this.firstDayOfWeek;this.isSet(v)&&(g=a[v]);this.isSet(j)?this.isSet(m)?
f+=a[m]-1:this.isSet(r)?(c=f+6-q(f+6-b,7),c-f>=this.minimalDaysInFirstWeek&&(c-=7),g!==b&&(c=c+6-q(c+6-g,7)),f=c+7*(a[r]-1)):(a=this.isSet(C)?a[C]:1,b=7*a,0>a&&(b=t(c,d)+7*(a+1)),f=f+b-1-q(f+b-1-g,7)):this.isSet(u)?f+=a[u]-1:(c=f+6-q(f+6-b,7),c-f>=this.minimalDaysInFirstWeek&&(c-=7),g!==b&&(c=c+6-q(c+6-g,7)),f=c+7*(a[p]-1));return f},getTime:function(){void 0===this.time&&this.computeTime();return this.time},setTime:function(a){this.time=a;this.fieldsComputed=!1;this.complete()},get:function(a){this.complete();
return this.fields[a]},set:function(a,b){var c=arguments.length;if(2===c)this.fields[a]=b;else if(c<B+1)for(var d=0;d<c;d++)this.fields[h+d]=arguments[d];else throw Error("illegal arguments for KISSY GregorianCalendar set");this.time=void 0},add:function(a,b){if(b){var c=this.fields,d=this.get(a);if(a===h)this.set(h,d+b),x(this);else if(a===j){var d=d+b,e=G(d/12),d=q(d,12);e&&this.set(h,c[h]+e);this.set(j,d);x(this)}else{switch(a){case A:b*=36E5;break;case E:b*=6E4;break;case F:b*=1E3;break;case B:break;
case r:case p:case C:b*=6048E5;break;case v:case u:case m:b*=864E5;break;default:throw Error("illegal field for add");}this.setTime(this.time+b)}}},getRolledValue:function(a,b,c,d){d=d-c+1;return c+(a-c+b%d+d)%d},roll:function(a,b){if(b){var c=this.get(a),d=this.getActualMinimum(a),e=this.getActualMaximum(a),c=this.getRolledValue(c,b,d,e);this.set(a,c);switch(a){case j:x(this);break;default:this.updateFieldsBySet(a)}}},updateFieldsBySet:function(a){var b=this.fields;switch(a){case r:b[m]=void 0;break;
case u:b[j]=void 0;break;case v:b[m]=void 0;break;case p:b[u]=void 0,b[j]=void 0}},getTimezoneOffset:function(){return this.timezoneOffset},setTimezoneOffset:function(a){this.timezoneOffset!==a&&(this.fieldsComputed=void 0,this.timezoneOffset=a)},setFirstDayOfWeek:function(a){this.firstDayOfWeek!==a&&(this.firstDayOfWeek=a,this.fieldsComputed=!1)},getFirstDayOfWeek:function(){return this.firstDayOfWeek},setMinimalDaysInFirstWeek:function(a){this.minimalDaysInFirstWeek!==a&&(this.minimalDaysInFirstWeek=
a,this.fieldsComputed=!1)},getMinimalDaysInFirstWeek:function(){return this.minimalDaysInFirstWeek},getWeeksInWeekYear:function(){var a=this.getWeekYear();if(a===this.get(h))return this.getActualMaximum(p);var b=this.clone();b.setWeekDate(a,2,this.get(v));return b.getActualMaximum(p)},getWeekYear:function(){var a=this.get(h),b=this.get(p),c=this.get(j);c===e.JANUARY?52<=b&&--a:c===e.DECEMBER&&1===b&&++a;return a},setWeekDate:function(a,b,c){if(c<e.SUNDAY||c>e.SATURDAY)throw Error("invalid dayOfWeek: "+
c);var d=this.fields,f=this.clone();f.clear();f.setTimezoneOffset(0);f.set(h,a);f.set(p,1);f.set(v,this.getFirstDayOfWeek());a=c-this.getFirstDayOfWeek();0>a&&(a+=7);a+=7*(b-1);0!==a?f.add(u,a):f.complete();d[h]=f.get(h);d[j]=f.get(j);d[m]=f.get(m);this.complete()},clone:function(){void 0===this.time&&this.computeTime();var a=new e(this.timezoneOffset,this.locale);a.setTime(this.time);return a},equals:function(a){return this.getTime()===a.getTime()&&this.firstDayOfWeek===a.firstDayOfWeek&&this.timezoneOffset===
a.timezoneOffset&&this.minimalDaysInFirstWeek===a.minimalDaysInFirstWeek},clear:function(a){void 0===a?this.field=[]:this.fields[a]=void 0;this.time=void 0;this.fieldsComputed=!1}};var D=e.prototype;g.each(",Year,Month,DayOfMonth,HourOfDay,Minutes,Seconds,Milliseconds,WeekOfYear,WeekOfMonth,DayOfYear,DayOfWeek,DayOfWeekInMonth".split(","),function(a,b){if(a){D["get"+a]=function(){return this.get(b)};D["isSet"+a]=function(){return this.isSet(b)};D["set"+a]=function(a){return this.set(b,a)};D["add"+
a]=function(a){return this.add(b,a)};D["roll"+a]=function(a){return this.roll(b,a)}}});y.exports=e});
KISSY.add("date/gregorian/utils",["util","./const"],function(w,s,o){var w=s("util"),y=s("./const"),e=Math.floor,x=[0,31,59,90,120,151,181,212,243,273,304,334],t=[0,31,60,91,121,152,182,213,244,274,305,335];w.mix(o,{isLeapYear:function(e){return 0!==(e&3)?!1:0!==e%100||0===e%400},mod:function(l,g){return l-g*e(l/g)},getFixedDate:function(l,g,k){var i=l-1;return 365*i+e(i/4)-e(i/100)+e(i/400)+(k+(o.isLeapYear(l)?t[g]:x[g]))},getGregorianDateFromFixedDate:function(l){var g,k,i,n;k=l-1;g=e(k/146097);
i=o.mod(k,146097);k=e(i/36524);n=o.mod(i,36524);i=e(n/1461);n=o.mod(n,1461);n=e(n/365);g=400*g+100*k+4*i+n;4===k||4===n||++g;i=o.getFixedDate(g,y.JANUARY,1);n=(k=o.isLeapYear(g))?t:x;var h=l-i,j,m;for(m=0;m<n.length;m++)if(n[m]<=h)j=m;else break;i=l-i-n[j]+1;l=0<=l?l%7:o.mod(l,7);return{year:g,month:j,dayOfMonth:i,dayOfWeek:l,isLeap:k}}})});
KISSY.add("date/gregorian/const",[],function(w,s,o,y){y.exports={SUNDAY:0,MONDAY:1,TUESDAY:2,WEDNESDAY:3,THURSDAY:4,FRIDAY:5,SATURDAY:6,JANUARY:0,FEBRUARY:1,MARCH:2,APRIL:3,MAY:4,JUNE:5,JULY:6,AUGUST:7,SEPTEMBER:8,OCTOBER:9,NOVEMBER:10,DECEMBER:11}});
