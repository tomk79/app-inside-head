(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,n(o.key),o)}}function n(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!=e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:n+""}var r=new WeakMap;const o=function(){return e=function e(t){var n,o,i,a,u,c;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c=void 0,function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(a=this,u=r),u.set(a,c),o=this,i=t,(n=r).set(function(e,t,n){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:n;throw new TypeError("Private element is not present on this object")}(n,o),i)},(n=[{key:"ask",value:function(e){$.ajax({url:"./index_files/apis/query.php",type:"post",dataType:"json",data:{"main-theme":e.mainTheme,CSRF_TOKEN:$("meta[name=csrf-token]").attr("content")},async:!0})}}])&&t(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,n}();function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,u(r.key),r)}}function u(e){var t=function(e,t){if("object"!=i(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=i(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==i(t)?t:t+""}var c={presenter:new o({}),reviewers:[new o({}),new o({}),new o({})]},f=new WeakMap,s=new(function(){return e=function e(t){var n,r,o,i,a,u;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),u=void 0,function(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}(i=this,a=f),a.set(i,u),r=this,o=t,(n=f).set(function(e,t,n){if("function"==typeof e?e===t:e.has(t))return arguments.length<3?t:n;throw new TypeError("Private element is not present on this object")}(n,r),o)},(t=[{key:"startDiscussion",value:function(e){c.presenter.ask({mainTheme:e.inputMainTheme})}}])&&a(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e;var e,t}());$("#cont-btn-sendtest").on("click",(function(){var e=$('textarea[name="main-theme"]').val();window.getCsrfToken((function(t){s.startDiscussion({mainTheme:e})}))}))})();
//# sourceMappingURL=script.js.map