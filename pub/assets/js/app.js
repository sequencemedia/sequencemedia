!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=2)}([function(e,n){e.exports=jQuery},function(e,n,t){(function(r){n.formatArgs=function(n){if(n[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+n[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return;const t="color: "+this.color;n.splice(1,0,t,"color: inherit");let r=0,o=0;n[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(r++,"%c"===e&&(o=r))})),n.splice(o,0,t)},n.save=function(e){try{e?n.storage.setItem("debug",e):n.storage.removeItem("debug")}catch(e){}},n.load=function(){let e;try{e=n.storage.getItem("debug")}catch(e){}!e&&void 0!==r&&"env"in r&&(e=r.env.DEBUG);return e},n.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0;if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},n.storage=function(){try{return localStorage}catch(e){}}(),n.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],n.log=console.debug||console.log||(()=>{}),e.exports=t(5)(n);const{formatters:o}=e.exports;o.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}}).call(this,t(4))},function(e,n,t){"use strict";t.r(n),function(e){var n=t(1),r=t.n(n),o=t(0),s=t.n(o),i=r()("@sequencemedia/sequencemedia");i("`sequencemedia` is awake");function c(n){i("✔");var t,r,o=e.ga;if(o){n.preventDefault();var c=(r=n.currentTarget,s()(r).attr("href"));o("send","event","Click",(t=void 0===(t=e.location)?{}:t).href,c,{hitCallback:function(){return function(n){var t=e.location;(void 0===t?{}:t).href=n}(c)}})}}s()((function(){return s()("section a").on("click",c)}))}.call(this,t(3))},function(e,n){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,n){var t,r,o=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function c(e){if(t===setTimeout)return setTimeout(e,0);if((t===s||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:s}catch(e){t=s}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var u,a=[],f=!1,l=-1;function C(){f&&u&&(f=!1,u.length?a=u.concat(a):l=-1,a.length&&d())}function d(){if(!f){var e=c(C);f=!0;for(var n=a.length;n;){for(u=a,a=[];++l<n;)u&&u[l].run();l=-1,n=a.length}u=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(n){try{return r.call(null,e)}catch(n){return r.call(this,e)}}}(e)}}function p(e,n){this.fun=e,this.array=n}function h(){}o.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];a.push(new p(e,n)),1!==a.length||f||c(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,n,t){e.exports=function(e){function n(e){let t;function s(...e){if(!s.enabled)return;const r=s,o=Number(new Date),i=o-(t||o);r.diff=i,r.prev=t,r.curr=o,t=o,e[0]=n.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O");let c=0;e[0]=e[0].replace(/%([a-zA-Z%])/g,((t,o)=>{if("%%"===t)return t;c++;const s=n.formatters[o];if("function"==typeof s){const n=e[c];t=s.call(r,n),e.splice(c,1),c--}return t})),n.formatArgs.call(r,e);(r.log||n.log).apply(r,e)}return s.namespace=e,s.enabled=n.enabled(e),s.useColors=n.useColors(),s.color=n.selectColor(e),s.destroy=r,s.extend=o,"function"==typeof n.init&&n.init(s),n.instances.push(s),s}function r(){const e=n.instances.indexOf(this);return-1!==e&&(n.instances.splice(e,1),!0)}function o(e,t){const r=n(this.namespace+(void 0===t?":":t)+e);return r.log=this.log,r}function s(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return n.debug=n,n.default=n,n.coerce=function(e){if(e instanceof Error)return e.stack||e.message;return e},n.disable=function(){const e=[...n.names.map(s),...n.skips.map(s).map((e=>"-"+e))].join(",");return n.enable(""),e},n.enable=function(e){let t;n.save(e),n.names=[],n.skips=[];const r=("string"==typeof e?e:"").split(/[\s,]+/),o=r.length;for(t=0;t<o;t++)r[t]&&("-"===(e=r[t].replace(/\*/g,".*?"))[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")));for(t=0;t<n.instances.length;t++){const e=n.instances[t];e.enabled=n.enabled(e.namespace)}},n.enabled=function(e){if("*"===e[e.length-1])return!0;let t,r;for(t=0,r=n.skips.length;t<r;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;t<r;t++)if(n.names[t].test(e))return!0;return!1},n.humanize=t(6),Object.keys(e).forEach((t=>{n[t]=e[t]})),n.instances=[],n.names=[],n.skips=[],n.formatters={},n.selectColor=function(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return n.colors[Math.abs(t)%n.colors.length]},n.enable(n.load()),n}},function(e,n){var t=1e3,r=60*t,o=60*r,s=24*o,i=7*s,c=365.25*s;function u(e,n,t,r){var o=n>=1.5*t;return Math.round(e/t)+" "+r+(o?"s":"")}e.exports=function(e,n){n=n||{};var a=typeof e;if("string"===a&&e.length>0)return function(e){if((e=String(e)).length>100)return;var n=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);if(!n)return;var u=parseFloat(n[1]);switch((n[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return u*c;case"weeks":case"week":case"w":return u*i;case"days":case"day":case"d":return u*s;case"hours":case"hour":case"hrs":case"hr":case"h":return u*o;case"minutes":case"minute":case"mins":case"min":case"m":return u*r;case"seconds":case"second":case"secs":case"sec":case"s":return u*t;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return u;default:return}}(e);if("number"===a&&isFinite(e))return n.long?function(e){var n=Math.abs(e);if(n>=s)return u(e,n,s,"day");if(n>=o)return u(e,n,o,"hour");if(n>=r)return u(e,n,r,"minute");if(n>=t)return u(e,n,t,"second");return e+" ms"}(e):function(e){var n=Math.abs(e);if(n>=s)return Math.round(e/s)+"d";if(n>=o)return Math.round(e/o)+"h";if(n>=r)return Math.round(e/r)+"m";if(n>=t)return Math.round(e/t)+"s";return e+"ms"}(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}}]);
//# sourceMappingURL=app.js.map