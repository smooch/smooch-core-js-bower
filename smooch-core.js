(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SmoochCore = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.AppUsersApi=void 0;var _assign=require("babel-runtime/core-js/object/assign"),_assign2=_interopRequireDefault(_assign),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("babel-runtime/helpers/inherits"),_inherits3=_interopRequireDefault(_inherits2),_base=require("./base"),_appUsersStripe=require("./appUsersStripe"),_http=require("../utils/http"),AppUsersApi=exports.AppUsersApi=function(e){function t(){(0,_classCallCheck3["default"])(this,t);for(var r=arguments.length,s=Array(r),n=0;r>n;n++)s[n]=arguments[n];var i=(0,_possibleConstructorReturn3["default"])(this,e.call.apply(e,[this].concat(s)));return i.stripe=new(Function.prototype.bind.apply(_appUsersStripe.AppUsersStripeApi,[null].concat(s))),i}return(0,_inherits3["default"])(t,e),t.prototype.init=function(e){var t=this.getFullURL("init");return this.validateAuthHeaders().then(function(r){return(0,_http.http)("POST",t,e,r)})},t.prototype.create=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(!e||!e.trim())return _promise2["default"].reject(new Error("Must provide an userId."));var r=(0,_assign2["default"])({userId:e},t);if(t.signedUpAt&&!(t.signedUpAt instanceof Date))return _promise2["default"].reject(new Error("signedUpAt must be a date."));var s=this.getFullURL("appusers");return this.validateAuthHeaders(["jwt"]).then(function(e){return(0,_http.http)("POST",s,r,e)})},t.prototype.get=function(e){var t=this.getFullURL("appusers",e);return this.validateAuthHeaders().then(function(e){return(0,_http.http)("GET",t,{},e)})},t.prototype.update=function(e,t){var r=this.getFullURL("appusers",e);return this.validateAuthHeaders().then(function(e){return(0,_http.http)("PUT",r,t,e)})},t.prototype.trackEvent=function(e,t){var r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],s=this.getFullURL("appusers",e,"events");return this.validateAuthHeaders().then(function(e){return(0,_http.http)("POST",s,{name:t,appUser:r},e)})},t.prototype.updatePushToken=function(e,t,r){var s=this.getFullURL("appusers",e,"pushToken");return this.validateAuthHeaders().then(function(e){return(0,_http.http)("POST",s,{deviceId:t,token:r},e)})},t}(_base.BaseApi);

},{"../utils/http":8,"./appUsersStripe":2,"./base":3,"babel-runtime/core-js/object/assign":10,"babel-runtime/core-js/promise":14,"babel-runtime/helpers/classCallCheck":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":18}],2:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.AppUsersStripeApi=void 0;var _assign=require("babel-runtime/core-js/object/assign"),_assign2=_interopRequireDefault(_assign),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("babel-runtime/helpers/inherits"),_inherits3=_interopRequireDefault(_inherits2),_base=require("./base"),_http=require("../utils/http"),AppUsersStripeApi=exports.AppUsersStripeApi=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,e.apply(this,arguments))}return(0,_inherits3["default"])(t,e),t.prototype.updateCustomer=function(e,t){if(!t)return _promise2["default"].reject(new Error("Must provide a Stripe token."));var r=this.getFullURL("appUsers",e,"stripe","customer");return this.validateAuthHeaders(["jwt"]).then(function(e){return(0,_http.http)("POST",r,{token:t},e)})},t.prototype.createTransaction=function(e,t,r){if(!t)return _promise2["default"].reject(new Error("Must provide an action id."));var s=this.getFullURL("appUsers",e,"stripe","transaction"),i={actionId:t};return r&&(0,_assign2["default"])(i,{token:r}),this.validateAuthHeaders().then(function(e){return(0,_http.http)("POST",s,i,e)})},t}(_base.BaseApi);

},{"../utils/http":8,"./base":3,"babel-runtime/core-js/object/assign":10,"babel-runtime/core-js/promise":14,"babel-runtime/helpers/classCallCheck":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":18}],3:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.BaseApi=void 0;var _promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_http=require("../utils/http"),BaseApi=exports.BaseApi=function(){function e(t,r){(0,_classCallCheck3["default"])(this,e),this.serviceUrl=t,this.authHeaders=r,this.allowedAuth=["jwt","appToken"]}return e.prototype.getFullURL=function(){for(var e=arguments.length,t=Array(e),r=0;e>r;r++)t[r]=arguments[r];var a=t.map(function(e){return encodeURIComponent(e)});return _http.urljoin.apply(void 0,[this.serviceUrl].concat(a))},e.prototype.validateAuthHeaders=function(){var e=arguments.length<=0||void 0===arguments[0]?this.allowedAuth:arguments[0];if(!e||0===e.length)return _promise2["default"].reject(new Error("Must at least provide one authentication method."));if(!this.authHeaders)return _promise2["default"].reject(new Error("Must provide headers."));var t=e.indexOf("jwt")>=0,r=e.indexOf("appToken")>=0,a=!!this.authHeaders.Authorization,s=!!this.authHeaders["app-token"];return!t&&a?_promise2["default"].reject(new Error("Must not use JWT for authentication.")):!r&&s?_promise2["default"].reject(new Error("Must not use an app token for authentication.")):_promise2["default"].resolve(this.authHeaders)},e}();

},{"../utils/http":8,"babel-runtime/core-js/promise":14,"babel-runtime/helpers/classCallCheck":16}],4:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.ConversationsApi=void 0;var _classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("babel-runtime/helpers/inherits"),_inherits3=_interopRequireDefault(_inherits2),_base=require("./base"),_http=require("../utils/http"),ConversationsApi=exports.ConversationsApi=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,e.apply(this,arguments))}return(0,_inherits3["default"])(t,e),t.prototype.get=function(e){var t=this.getFullURL("appUsers",e,"conversation");return this.validateAuthHeaders().then(function(e){return(0,_http.http)("GET",t,{},e)})},t.prototype.sendMessage=function(e,t){var r=this.getFullURL("appUsers",e,"conversation","messages");return this.validateAuthHeaders().then(function(e){return(0,_http.http)("POST",r,t,e)})},t.prototype.resetUnreadCount=function(e){var t=this.getFullURL("appUsers",e,"conversation","read");return this.validateAuthHeaders().then(function(e){return(0,_http.http)("POST",t,{},e)})},t}(_base.BaseApi);

},{"../utils/http":8,"./base":3,"babel-runtime/helpers/classCallCheck":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":18}],5:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.StripeApi=void 0;var _classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("babel-runtime/helpers/inherits"),_inherits3=_interopRequireDefault(_inherits2),_base=require("./base"),_http=require("../utils/http"),StripeApi=exports.StripeApi=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,e.apply(this,arguments))}return(0,_inherits3["default"])(t,e),t.prototype.getAccount=function(){var e=this.getFullURL("stripe","account");return this.validateAuthHeaders().then(function(t){return(0,_http.http)("GET",e,{},t)})},t}(_base.BaseApi);

},{"../utils/http":8,"./base":3,"babel-runtime/helpers/classCallCheck":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":18}],6:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.Smooch=exports.SERVICE_URL=void 0;var _classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_auth=require("./utils/auth"),_appUsers=require("./api/appUsers"),_conversations=require("./api/conversations"),_stripe=require("./api/stripe"),_package=require("../package.json"),_package2=_interopRequireDefault(_package),SERVICE_URL=exports.SERVICE_URL="https://api.smooch.io/v1",Smooch=exports.Smooch=function e(){var s=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=arguments.length<=1||void 0===arguments[1]?SERVICE_URL:arguments[1];if((0,_classCallCheck3["default"])(this,e),this.VERSION=_package2["default"].version,this.serviceUrl=r,s.keyId||s.secret)throw new Error("Key Id or Secret should not be used on the browser side. You must generate a JWT beforehand.");this.authHeaders=(0,_auth.getAuthenticationHeaders)(s),this.appUsers=new _appUsers.AppUsersApi(this.serviceUrl,this.authHeaders),this.conversations=new _conversations.ConversationsApi(this.serviceUrl,this.authHeaders),this.stripe=new _stripe.StripeApi(this.serviceUrl,this.authHeaders),this.utils={}};
},{"../package.json":94,"./api/appUsers":1,"./api/conversations":4,"./api/stripe":5,"./utils/auth":7,"babel-runtime/helpers/classCallCheck":16}],7:[function(require,module,exports){
"use strict";function getAuthenticationHeaders(t){if(!t)throw new Error("Must provide authentication information.");if(t.jwt)return{Authorization:"Bearer "+t.jwt};if(t.appToken)return{"app-token":t.appToken};throw new Error("Must provide a JWT or a app token")}exports.__esModule=!0,exports.getAuthenticationHeaders=getAuthenticationHeaders;

},{}],8:[function(require,module,exports){
(function (process){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function stringifyGETParams(e,t){var r="";for(var n in(0,_keys2["default"])(t))null!==t[n]&&(r+="&"+encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return r&&(e+=(~e.indexOf("?")?"&":"?")+r.substring(1)),e}function handleStatus(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}function handleBody(e){if(202===e.status||204===e.status)return _promise2["default"].resolve();var t=e.headers.get("Content-Type")||"",r=t.indexOf("application/json")>-1;return r?e.json():_promise2["default"].resolve()}function http(e,t,r){var n=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];e=e.toUpperCase();var s={method:e,headers:(0,_assign2["default"])({Accept:"application/json","Content-Type":"application/json"},n)};return r&&(r=(0,_assign2["default"])({},r),"GET"===e?t=stringifyGETParams(t,r):("POST"===e||"PUT"===e)&&(s.body=(0,_stringify2["default"])(r))),fetch(t,s).then(handleStatus).then(handleBody)}function urljoin(){for(var e=arguments.length,t=Array(e),r=0;e>r;r++)t[r]=arguments[r];return t.map(function(e){return e.replace(/\/$/,"")}).join("/")}exports.__esModule=!0,exports.stringifyGETParams=stringifyGETParams,exports.handleStatus=handleStatus,exports.handleBody=handleBody,exports.http=http,exports.urljoin=urljoin;var _stringify=require("babel-runtime/core-js/json/stringify"),_stringify2=_interopRequireDefault(_stringify),_assign=require("babel-runtime/core-js/object/assign"),_assign2=_interopRequireDefault(_assign),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_keys=require("babel-runtime/core-js/object/keys"),_keys2=_interopRequireDefault(_keys);"undefined"!=typeof process&&require("isomorphic-fetch");

}).call(this,require('_process'))
},{"_process":92,"babel-runtime/core-js/json/stringify":9,"babel-runtime/core-js/object/assign":10,"babel-runtime/core-js/object/keys":12,"babel-runtime/core-js/promise":14,"isomorphic-fetch":91}],9:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/json/stringify"),__esModule:!0};

},{"core-js/library/fn/json/stringify":20}],10:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/object/assign"),__esModule:!0};

},{"core-js/library/fn/object/assign":21}],11:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/object/create"),__esModule:!0};

},{"core-js/library/fn/object/create":22}],12:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/object/keys"),__esModule:!0};

},{"core-js/library/fn/object/keys":23}],13:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/object/set-prototype-of"),__esModule:!0};

},{"core-js/library/fn/object/set-prototype-of":24}],14:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/promise"),__esModule:!0};

},{"core-js/library/fn/promise":25}],15:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/symbol"),__esModule:!0};

},{"core-js/library/fn/symbol":26}],16:[function(require,module,exports){
"use strict";exports.__esModule=!0,exports["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};

},{}],17:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _setPrototypeOf=require("../core-js/object/set-prototype-of"),_setPrototypeOf2=_interopRequireDefault(_setPrototypeOf),_create=require("../core-js/object/create"),_create2=_interopRequireDefault(_create),_typeof2=require("../helpers/typeof"),_typeof3=_interopRequireDefault(_typeof2);exports["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,_typeof3["default"])(t)));e.prototype=(0,_create2["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(_setPrototypeOf2["default"]?(0,_setPrototypeOf2["default"])(e,t):e.__proto__=t)};

},{"../core-js/object/create":11,"../core-js/object/set-prototype-of":13,"../helpers/typeof":19}],18:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _typeof2=require("../helpers/typeof"),_typeof3=_interopRequireDefault(_typeof2);exports["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,_typeof3["default"])(t))&&"function"!=typeof t?e:t};

},{"../helpers/typeof":19}],19:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function _typeof(e){return e&&"undefined"!=typeof _Symbol&&e.constructor===_Symbol?"symbol":typeof e}exports.__esModule=!0;var _symbol=require("../core-js/symbol"),_symbol2=_interopRequireDefault(_symbol);exports["default"]=function(e){return e&&"undefined"!=typeof _symbol2["default"]&&e.constructor===_symbol2["default"]?"symbol":"undefined"==typeof e?"undefined":_typeof(e)};

},{"../core-js/symbol":15}],20:[function(require,module,exports){
var core=require("../../modules/$.core");module.exports=function(r){return(core.JSON&&core.JSON.stringify||JSON.stringify).apply(JSON,arguments)};

},{"../../modules/$.core":32}],21:[function(require,module,exports){
require("../../modules/es6.object.assign"),module.exports=require("../../modules/$.core").Object.assign;

},{"../../modules/$.core":32,"../../modules/es6.object.assign":83}],22:[function(require,module,exports){
var $=require("../../modules/$");module.exports=function(e,r){return $.create(e,r)};

},{"../../modules/$":57}],23:[function(require,module,exports){
require("../../modules/es6.object.keys"),module.exports=require("../../modules/$.core").Object.keys;

},{"../../modules/$.core":32,"../../modules/es6.object.keys":84}],24:[function(require,module,exports){
require("../../modules/es6.object.set-prototype-of"),module.exports=require("../../modules/$.core").Object.setPrototypeOf;

},{"../../modules/$.core":32,"../../modules/es6.object.set-prototype-of":85}],25:[function(require,module,exports){
require("../modules/es6.object.to-string"),require("../modules/es6.string.iterator"),require("../modules/web.dom.iterable"),require("../modules/es6.promise"),module.exports=require("../modules/$.core").Promise;

},{"../modules/$.core":32,"../modules/es6.object.to-string":86,"../modules/es6.promise":87,"../modules/es6.string.iterator":88,"../modules/web.dom.iterable":90}],26:[function(require,module,exports){
require("../../modules/es6.symbol"),require("../../modules/es6.object.to-string"),module.exports=require("../../modules/$.core").Symbol;

},{"../../modules/$.core":32,"../../modules/es6.object.to-string":86,"../../modules/es6.symbol":89}],27:[function(require,module,exports){
module.exports=function(o){if("function"!=typeof o)throw TypeError(o+" is not a function!");return o};

},{}],28:[function(require,module,exports){
module.exports=function(){};

},{}],29:[function(require,module,exports){
var isObject=require("./$.is-object");module.exports=function(e){if(!isObject(e))throw TypeError(e+" is not an object!");return e};

},{"./$.is-object":50}],30:[function(require,module,exports){
var cof=require("./$.cof"),TAG=require("./$.wks")("toStringTag"),ARG="Arguments"==cof(function(){return arguments}());module.exports=function(e){var n,r,t;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=(n=Object(e))[TAG])?r:ARG?cof(n):"Object"==(t=cof(n))&&"function"==typeof n.callee?"Arguments":t};

},{"./$.cof":31,"./$.wks":80}],31:[function(require,module,exports){
var toString={}.toString;module.exports=function(t){return toString.call(t).slice(8,-1)};

},{}],32:[function(require,module,exports){
var core=module.exports={version:"1.2.6"};"number"==typeof __e&&(__e=core);

},{}],33:[function(require,module,exports){
var aFunction=require("./$.a-function");module.exports=function(n,r,t){if(aFunction(n),void 0===r)return n;switch(t){case 1:return function(t){return n.call(r,t)};case 2:return function(t,u){return n.call(r,t,u)};case 3:return function(t,u,e){return n.call(r,t,u,e)}}return function(){return n.apply(r,arguments)}};

},{"./$.a-function":27}],34:[function(require,module,exports){
module.exports=function(o){if(void 0==o)throw TypeError("Can't call method on  "+o);return o};

},{}],35:[function(require,module,exports){
module.exports=!require("./$.fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a});

},{"./$.fails":39}],36:[function(require,module,exports){
var isObject=require("./$.is-object"),document=require("./$.global").document,is=isObject(document)&&isObject(document.createElement);module.exports=function(e){return is?document.createElement(e):{}};

},{"./$.global":42,"./$.is-object":50}],37:[function(require,module,exports){
var $=require("./$");module.exports=function(e){var r=$.getKeys(e),t=$.getSymbols;if(t)for(var u,l=t(e),n=$.isEnum,o=0;l.length>o;)n.call(e,u=l[o++])&&r.push(u);return r};

},{"./$":57}],38:[function(require,module,exports){
var global=require("./$.global"),core=require("./$.core"),ctx=require("./$.ctx"),PROTOTYPE="prototype",$export=function(o,r,e){var t,n,p,x=o&$export.F,c=o&$export.G,$=o&$export.S,l=o&$export.P,i=o&$export.B,P=o&$export.W,u=c?core:core[r]||(core[r]={}),O=c?global:$?global[r]:(global[r]||{})[PROTOTYPE];c&&(e=r);for(t in e)n=!x&&O&&t in O,n&&t in u||(p=n?O[t]:e[t],u[t]=c&&"function"!=typeof O[t]?e[t]:i&&n?ctx(p,global):P&&O[t]==p?function(o){var r=function(r){return this instanceof o?new o(r):o(r)};return r[PROTOTYPE]=o[PROTOTYPE],r}(p):l&&"function"==typeof p?ctx(Function.call,p):p,l&&((u[PROTOTYPE]||(u[PROTOTYPE]={}))[t]=p))};$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,module.exports=$export;

},{"./$.core":32,"./$.ctx":33,"./$.global":42}],39:[function(require,module,exports){
module.exports=function(r){try{return!!r()}catch(t){return!0}};

},{}],40:[function(require,module,exports){
var ctx=require("./$.ctx"),call=require("./$.iter-call"),isArrayIter=require("./$.is-array-iter"),anObject=require("./$.an-object"),toLength=require("./$.to-length"),getIterFn=require("./core.get-iterator-method");module.exports=function(e,r,t,i){var o,a,n,l=getIterFn(e),c=ctx(t,i,r?2:1),u=0;if("function"!=typeof l)throw TypeError(e+" is not iterable!");if(isArrayIter(l))for(o=toLength(e.length);o>u;u++)r?c(anObject(a=e[u])[0],a[1]):c(e[u]);else for(n=l.call(e);!(a=n.next()).done;)call(n,c,a.value,r)};

},{"./$.an-object":29,"./$.ctx":33,"./$.is-array-iter":48,"./$.iter-call":51,"./$.to-length":77,"./core.get-iterator-method":81}],41:[function(require,module,exports){
var toIObject=require("./$.to-iobject"),getNames=require("./$").getNames,toString={}.toString,windowNames="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],getWindowNames=function(e){try{return getNames(e)}catch(t){return windowNames.slice()}};module.exports.get=function(e){return windowNames&&"[object Window]"==toString.call(e)?getWindowNames(e):getNames(toIObject(e))};

},{"./$":57,"./$.to-iobject":76}],42:[function(require,module,exports){
var global=module.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=global);

},{}],43:[function(require,module,exports){
var hasOwnProperty={}.hasOwnProperty;module.exports=function(r,e){return hasOwnProperty.call(r,e)};

},{}],44:[function(require,module,exports){
var $=require("./$"),createDesc=require("./$.property-desc");module.exports=require("./$.descriptors")?function(e,r,t){return $.setDesc(e,r,createDesc(1,t))}:function(e,r,t){return e[r]=t,e};

},{"./$":57,"./$.descriptors":35,"./$.property-desc":63}],45:[function(require,module,exports){
module.exports=require("./$.global").document&&document.documentElement;

},{"./$.global":42}],46:[function(require,module,exports){
module.exports=function(e,r,l){var a=void 0===l;switch(r.length){case 0:return a?e():e.call(l);case 1:return a?e(r[0]):e.call(l,r[0]);case 2:return a?e(r[0],r[1]):e.call(l,r[0],r[1]);case 3:return a?e(r[0],r[1],r[2]):e.call(l,r[0],r[1],r[2]);case 4:return a?e(r[0],r[1],r[2],r[3]):e.call(l,r[0],r[1],r[2],r[3])}return e.apply(l,r)};

},{}],47:[function(require,module,exports){
var cof=require("./$.cof");module.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==cof(e)?e.split(""):Object(e)};

},{"./$.cof":31}],48:[function(require,module,exports){
var Iterators=require("./$.iterators"),ITERATOR=require("./$.wks")("iterator"),ArrayProto=Array.prototype;module.exports=function(r){return void 0!==r&&(Iterators.Array===r||ArrayProto[ITERATOR]===r)};

},{"./$.iterators":56,"./$.wks":80}],49:[function(require,module,exports){
var cof=require("./$.cof");module.exports=Array.isArray||function(r){return"Array"==cof(r)};

},{"./$.cof":31}],50:[function(require,module,exports){
module.exports=function(o){return"object"==typeof o?null!==o:"function"==typeof o};

},{}],51:[function(require,module,exports){
var anObject=require("./$.an-object");module.exports=function(r,t,e,a){try{return a?t(anObject(e)[0],e[1]):t(e)}catch(c){var n=r["return"];throw void 0!==n&&anObject(n.call(r)),c}};

},{"./$.an-object":29}],52:[function(require,module,exports){
"use strict";var $=require("./$"),descriptor=require("./$.property-desc"),setToStringTag=require("./$.set-to-string-tag"),IteratorPrototype={};require("./$.hide")(IteratorPrototype,require("./$.wks")("iterator"),function(){return this}),module.exports=function(r,t,e){r.prototype=$.create(IteratorPrototype,{next:descriptor(1,e)}),setToStringTag(r,t+" Iterator")};

},{"./$":57,"./$.hide":44,"./$.property-desc":63,"./$.set-to-string-tag":69,"./$.wks":80}],53:[function(require,module,exports){
"use strict";var LIBRARY=require("./$.library"),$export=require("./$.export"),redefine=require("./$.redefine"),hide=require("./$.hide"),has=require("./$.has"),Iterators=require("./$.iterators"),$iterCreate=require("./$.iter-create"),setToStringTag=require("./$.set-to-string-tag"),getProto=require("./$").getProto,ITERATOR=require("./$.wks")("iterator"),BUGGY=!([].keys&&"next"in[].keys()),FF_ITERATOR="@@iterator",KEYS="keys",VALUES="values",returnThis=function(){return this};module.exports=function(e,r,t,i,n,s,u){$iterCreate(t,r,i);var o,a,T=function(e){if(!BUGGY&&e in E)return E[e];switch(e){case KEYS:return function(){return new t(this,e)};case VALUES:return function(){return new t(this,e)}}return function(){return new t(this,e)}},R=r+" Iterator",h=n==VALUES,A=!1,E=e.prototype,$=E[ITERATOR]||E[FF_ITERATOR]||n&&E[n],f=$||T(n);if($){var I=getProto(f.call(new e));setToStringTag(I,R,!0),!LIBRARY&&has(E,FF_ITERATOR)&&hide(I,ITERATOR,returnThis),h&&$.name!==VALUES&&(A=!0,f=function(){return $.call(this)})}if(LIBRARY&&!u||!BUGGY&&!A&&E[ITERATOR]||hide(E,ITERATOR,f),Iterators[r]=f,Iterators[R]=returnThis,n)if(o={values:h?f:T(VALUES),keys:s?f:T(KEYS),entries:h?T("entries"):f},u)for(a in o)a in E||redefine(E,a,o[a]);else $export($export.P+$export.F*(BUGGY||A),r,o);return o};

},{"./$":57,"./$.export":38,"./$.has":43,"./$.hide":44,"./$.iter-create":52,"./$.iterators":56,"./$.library":59,"./$.redefine":65,"./$.set-to-string-tag":69,"./$.wks":80}],54:[function(require,module,exports){
var ITERATOR=require("./$.wks")("iterator"),SAFE_CLOSING=!1;try{var riter=[7][ITERATOR]();riter["return"]=function(){SAFE_CLOSING=!0},Array.from(riter,function(){throw 2})}catch(e){}module.exports=function(r,t){if(!t&&!SAFE_CLOSING)return!1;var n=!1;try{var e=[7],i=e[ITERATOR]();i.next=function(){n=!0},e[ITERATOR]=function(){return i},r(e)}catch(u){}return n};

},{"./$.wks":80}],55:[function(require,module,exports){
module.exports=function(e,n){return{value:n,done:!!e}};

},{}],56:[function(require,module,exports){
module.exports={};

},{}],57:[function(require,module,exports){
var $Object=Object;module.exports={create:$Object.create,getProto:$Object.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:$Object.getOwnPropertyDescriptor,setDesc:$Object.defineProperty,setDescs:$Object.defineProperties,getKeys:$Object.keys,getNames:$Object.getOwnPropertyNames,getSymbols:$Object.getOwnPropertySymbols,each:[].forEach};

},{}],58:[function(require,module,exports){
var $=require("./$"),toIObject=require("./$.to-iobject");module.exports=function(e,t){for(var r,o=toIObject(e),i=$.getKeys(o),u=i.length,c=0;u>c;)if(o[r=i[c++]]===t)return r};

},{"./$":57,"./$.to-iobject":76}],59:[function(require,module,exports){
module.exports=!0;

},{}],60:[function(require,module,exports){
var global=require("./$.global"),macrotask=require("./$.task").set,Observer=global.MutationObserver||global.WebKitMutationObserver,process=global.process,Promise=global.Promise,isNode="process"==require("./$.cof")(process),head,last,notify,flush=function(){var e,o,s;for(isNode&&(e=process.domain)&&(process.domain=null,e.exit());head;)o=head.domain,s=head.fn,o&&o.enter(),s(),o&&o.exit(),head=head.next;last=void 0,e&&e.enter()};if(isNode)notify=function(){process.nextTick(flush)};else if(Observer){var toggle=1,node=document.createTextNode("");new Observer(flush).observe(node,{characterData:!0}),notify=function(){node.data=toggle=-toggle}}else notify=Promise&&Promise.resolve?function(){Promise.resolve().then(flush)}:function(){macrotask.call(global,flush)};module.exports=function(e){var o={fn:e,next:void 0,domain:isNode&&process.domain};last&&(last.next=o),head||(head=o,notify()),last=o};

},{"./$.cof":31,"./$.global":42,"./$.task":74}],61:[function(require,module,exports){
var $=require("./$"),toObject=require("./$.to-object"),IObject=require("./$.iobject");module.exports=require("./$.fails")(function(){var e=Object.assign,t={},r={},o=Symbol(),c="abcdefghijklmnopqrst";return t[o]=7,c.split("").forEach(function(e){r[e]=e}),7!=e({},t)[o]||Object.keys(e({},r)).join("")!=c})?function(e,t){for(var r=toObject(e),o=arguments,c=o.length,n=1,i=$.getKeys,s=$.getSymbols,a=$.isEnum;c>n;)for(var b,u=IObject(o[n++]),j=s?i(u).concat(s(u)):i(u),l=j.length,f=0;l>f;)a.call(u,b=j[f++])&&(r[b]=u[b]);return r}:Object.assign;

},{"./$":57,"./$.fails":39,"./$.iobject":47,"./$.to-object":78}],62:[function(require,module,exports){
var $export=require("./$.export"),core=require("./$.core"),fails=require("./$.fails");module.exports=function(e,r){var o=(core.Object||{})[e]||Object[e],t={};t[e]=r(o),$export($export.S+$export.F*fails(function(){o(1)}),"Object",t)};

},{"./$.core":32,"./$.export":38,"./$.fails":39}],63:[function(require,module,exports){
module.exports=function(e,r){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:r}};

},{}],64:[function(require,module,exports){
var redefine=require("./$.redefine");module.exports=function(e,r){for(var n in r)redefine(e,n,r[n]);return e};

},{"./$.redefine":65}],65:[function(require,module,exports){
module.exports=require("./$.hide");

},{"./$.hide":44}],66:[function(require,module,exports){
module.exports=Object.is||function(e,t){return e===t?0!==e||1/e===1/t:e!=e&&t!=t};

},{}],67:[function(require,module,exports){
var getDesc=require("./$").getDesc,isObject=require("./$.is-object"),anObject=require("./$.an-object"),check=function(e,t){if(anObject(e),!isObject(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};module.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,c){try{c=require("./$.ctx")(Function.call,getDesc(Object.prototype,"__proto__").set,2),c(e,[]),t=!(e instanceof Array)}catch(r){t=!0}return function(e,r){return check(e,r),t?e.__proto__=r:c(e,r),e}}({},!1):void 0),check:check};

},{"./$":57,"./$.an-object":29,"./$.ctx":33,"./$.is-object":50}],68:[function(require,module,exports){
"use strict";var core=require("./$.core"),$=require("./$"),DESCRIPTORS=require("./$.descriptors"),SPECIES=require("./$.wks")("species");module.exports=function(e){var r=core[e];DESCRIPTORS&&r&&!r[SPECIES]&&$.setDesc(r,SPECIES,{configurable:!0,get:function(){return this}})};

},{"./$":57,"./$.core":32,"./$.descriptors":35,"./$.wks":80}],69:[function(require,module,exports){
var def=require("./$").setDesc,has=require("./$.has"),TAG=require("./$.wks")("toStringTag");module.exports=function(e,r,a){e&&!has(e=a?e:e.prototype,TAG)&&def(e,TAG,{configurable:!0,value:r})};

},{"./$":57,"./$.has":43,"./$.wks":80}],70:[function(require,module,exports){
var global=require("./$.global"),SHARED="__core-js_shared__",store=global[SHARED]||(global[SHARED]={});module.exports=function(o){return store[o]||(store[o]={})};

},{"./$.global":42}],71:[function(require,module,exports){
var anObject=require("./$.an-object"),aFunction=require("./$.a-function"),SPECIES=require("./$.wks")("species");module.exports=function(e,n){var r,t=anObject(e).constructor;return void 0===t||void 0==(r=anObject(t)[SPECIES])?n:aFunction(r)};

},{"./$.a-function":27,"./$.an-object":29,"./$.wks":80}],72:[function(require,module,exports){
module.exports=function(e,r,o){if(!(e instanceof r))throw TypeError(o+": use the 'new' operator!");return e};

},{}],73:[function(require,module,exports){
var toInteger=require("./$.to-integer"),defined=require("./$.defined");module.exports=function(e){return function(r,t){var n,i,d=String(defined(r)),o=toInteger(t),u=d.length;return 0>o||o>=u?e?"":void 0:(n=d.charCodeAt(o),55296>n||n>56319||o+1===u||(i=d.charCodeAt(o+1))<56320||i>57343?e?d.charAt(o):n:e?d.slice(o,o+2):(n-55296<<10)+(i-56320)+65536)}};

},{"./$.defined":34,"./$.to-integer":75}],74:[function(require,module,exports){
var ctx=require("./$.ctx"),invoke=require("./$.invoke"),html=require("./$.html"),cel=require("./$.dom-create"),global=require("./$.global"),process=global.process,setTask=global.setImmediate,clearTask=global.clearImmediate,MessageChannel=global.MessageChannel,counter=0,queue={},ONREADYSTATECHANGE="onreadystatechange",defer,channel,port,run=function(){var e=+this;if(queue.hasOwnProperty(e)){var n=queue[e];delete queue[e],n()}},listner=function(e){run.call(e.data)};setTask&&clearTask||(setTask=function(e){for(var n=[],t=1;arguments.length>t;)n.push(arguments[t++]);return queue[++counter]=function(){invoke("function"==typeof e?e:Function(e),n)},defer(counter),counter},clearTask=function(e){delete queue[e]},"process"==require("./$.cof")(process)?defer=function(e){process.nextTick(ctx(run,e,1))}:MessageChannel?(channel=new MessageChannel,port=channel.port2,channel.port1.onmessage=listner,defer=ctx(port.postMessage,port,1)):global.addEventListener&&"function"==typeof postMessage&&!global.importScripts?(defer=function(e){global.postMessage(e+"","*")},global.addEventListener("message",listner,!1)):defer=ONREADYSTATECHANGE in cel("script")?function(e){html.appendChild(cel("script"))[ONREADYSTATECHANGE]=function(){html.removeChild(this),run.call(e)}}:function(e){setTimeout(ctx(run,e,1),0)}),module.exports={set:setTask,clear:clearTask};

},{"./$.cof":31,"./$.ctx":33,"./$.dom-create":36,"./$.global":42,"./$.html":45,"./$.invoke":46}],75:[function(require,module,exports){
var ceil=Math.ceil,floor=Math.floor;module.exports=function(o){return isNaN(o=+o)?0:(o>0?floor:ceil)(o)};

},{}],76:[function(require,module,exports){
var IObject=require("./$.iobject"),defined=require("./$.defined");module.exports=function(e){return IObject(defined(e))};

},{"./$.defined":34,"./$.iobject":47}],77:[function(require,module,exports){
var toInteger=require("./$.to-integer"),min=Math.min;module.exports=function(e){return e>0?min(toInteger(e),9007199254740991):0};

},{"./$.to-integer":75}],78:[function(require,module,exports){
var defined=require("./$.defined");module.exports=function(e){return Object(defined(e))};

},{"./$.defined":34}],79:[function(require,module,exports){
var id=0,px=Math.random();module.exports=function(o){return"Symbol(".concat(void 0===o?"":o,")_",(++id+px).toString(36))};

},{}],80:[function(require,module,exports){
var store=require("./$.shared")("wks"),uid=require("./$.uid"),Symbol=require("./$.global").Symbol;module.exports=function(r){return store[r]||(store[r]=Symbol&&Symbol[r]||(Symbol||uid)("Symbol."+r))};

},{"./$.global":42,"./$.shared":70,"./$.uid":79}],81:[function(require,module,exports){
var classof=require("./$.classof"),ITERATOR=require("./$.wks")("iterator"),Iterators=require("./$.iterators");module.exports=require("./$.core").getIteratorMethod=function(r){return void 0!=r?r[ITERATOR]||r["@@iterator"]||Iterators[classof(r)]:void 0};

},{"./$.classof":30,"./$.core":32,"./$.iterators":56,"./$.wks":80}],82:[function(require,module,exports){
"use strict";var addToUnscopables=require("./$.add-to-unscopables"),step=require("./$.iter-step"),Iterators=require("./$.iterators"),toIObject=require("./$.to-iobject");module.exports=require("./$.iter-define")(Array,"Array",function(e,t){this._t=toIObject(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,s=this._i++;return!e||s>=e.length?(this._t=void 0,step(1)):"keys"==t?step(0,s):"values"==t?step(0,e[s]):step(0,[s,e[s]])},"values"),Iterators.Arguments=Iterators.Array,addToUnscopables("keys"),addToUnscopables("values"),addToUnscopables("entries");

},{"./$.add-to-unscopables":28,"./$.iter-define":53,"./$.iter-step":55,"./$.iterators":56,"./$.to-iobject":76}],83:[function(require,module,exports){
var $export=require("./$.export");$export($export.S+$export.F,"Object",{assign:require("./$.object-assign")});

},{"./$.export":38,"./$.object-assign":61}],84:[function(require,module,exports){
var toObject=require("./$.to-object");require("./$.object-sap")("keys",function(e){return function(t){return e(toObject(t))}});

},{"./$.object-sap":62,"./$.to-object":78}],85:[function(require,module,exports){
var $export=require("./$.export");$export($export.S,"Object",{setPrototypeOf:require("./$.set-proto").set});

},{"./$.export":38,"./$.set-proto":67}],86:[function(require,module,exports){

},{}],87:[function(require,module,exports){
"use strict";var $=require("./$"),LIBRARY=require("./$.library"),global=require("./$.global"),ctx=require("./$.ctx"),classof=require("./$.classof"),$export=require("./$.export"),isObject=require("./$.is-object"),anObject=require("./$.an-object"),aFunction=require("./$.a-function"),strictNew=require("./$.strict-new"),forOf=require("./$.for-of"),setProto=require("./$.set-proto").set,same=require("./$.same-value"),SPECIES=require("./$.wks")("species"),speciesConstructor=require("./$.species-constructor"),asap=require("./$.microtask"),PROMISE="Promise",process=global.process,isNode="process"==classof(process),P=global[PROMISE],Wrapper,testResolve=function(e){var r=new P(function(){});return e&&(r.constructor=Object),P.resolve(r)===r},USE_NATIVE=function(){function e(r){var t=new P(r);return setProto(t,e.prototype),t}var r=!1;try{if(r=P&&P.resolve&&testResolve(),setProto(e,P),e.prototype=$.create(P.prototype,{constructor:{value:e}}),e.resolve(5).then(function(){})instanceof e||(r=!1),r&&require("./$.descriptors")){var t=!1;P.resolve($.setDesc({},"then",{get:function(){t=!0}})),r=t}}catch(o){r=!1}return r}(),sameConstructor=function(e,r){return LIBRARY&&e===P&&r===Wrapper?!0:same(e,r)},getConstructor=function(e){var r=anObject(e)[SPECIES];return void 0!=r?r:e},isThenable=function(e){var r;return isObject(e)&&"function"==typeof(r=e.then)?r:!1},PromiseCapability=function(e){var r,t;this.promise=new e(function(e,o){if(void 0!==r||void 0!==t)throw TypeError("Bad Promise constructor");r=e,t=o}),this.resolve=aFunction(r),this.reject=aFunction(t)},perform=function(e){try{e()}catch(r){return{error:r}}},notify=function(e,r){if(!e.n){e.n=!0;var t=e.c;asap(function(){for(var o=e.v,n=1==e.s,i=0,s=function(r){var t,i,s=n?r.ok:r.fail,c=r.resolve,a=r.reject;try{s?(n||(e.h=!0),t=s===!0?o:s(o),t===r.promise?a(TypeError("Promise-chain cycle")):(i=isThenable(t))?i.call(t,c,a):c(t)):a(o)}catch(u){a(u)}};t.length>i;)s(t[i++]);t.length=0,e.n=!1,r&&setTimeout(function(){var r,t,n=e.p;isUnhandled(n)&&(isNode?process.emit("unhandledRejection",o,n):(r=global.onunhandledrejection)?r({promise:n,reason:o}):(t=global.console)&&t.error&&t.error("Unhandled promise rejection",o)),e.a=void 0},1)})}},isUnhandled=function(e){var r,t=e._d,o=t.a||t.c,n=0;if(t.h)return!1;for(;o.length>n;)if(r=o[n++],r.fail||!isUnhandled(r.promise))return!1;return!0},$reject=function(e){var r=this;r.d||(r.d=!0,r=r.r||r,r.v=e,r.s=2,r.a=r.c.slice(),notify(r,!0))},$resolve=function(e){var r,t=this;if(!t.d){t.d=!0,t=t.r||t;try{if(t.p===e)throw TypeError("Promise can't be resolved itself");(r=isThenable(e))?asap(function(){var o={r:t,d:!1};try{r.call(e,ctx($resolve,o,1),ctx($reject,o,1))}catch(n){$reject.call(o,n)}}):(t.v=e,t.s=1,notify(t,!1))}catch(o){$reject.call({r:t,d:!1},o)}}};USE_NATIVE||(P=function(e){aFunction(e);var r=this._d={p:strictNew(this,P,PROMISE),c:[],a:void 0,s:0,d:!1,v:void 0,h:!1,n:!1};try{e(ctx($resolve,r,1),ctx($reject,r,1))}catch(t){$reject.call(r,t)}},require("./$.redefine-all")(P.prototype,{then:function(e,r){var t=new PromiseCapability(speciesConstructor(this,P)),o=t.promise,n=this._d;return t.ok="function"==typeof e?e:!0,t.fail="function"==typeof r&&r,n.c.push(t),n.a&&n.a.push(t),n.s&&notify(n,!1),o},"catch":function(e){return this.then(void 0,e)}})),$export($export.G+$export.W+$export.F*!USE_NATIVE,{Promise:P}),require("./$.set-to-string-tag")(P,PROMISE),require("./$.set-species")(PROMISE),Wrapper=require("./$.core")[PROMISE],$export($export.S+$export.F*!USE_NATIVE,PROMISE,{reject:function(e){var r=new PromiseCapability(this),t=r.reject;return t(e),r.promise}}),$export($export.S+$export.F*(!USE_NATIVE||testResolve(!0)),PROMISE,{resolve:function(e){if(e instanceof P&&sameConstructor(e.constructor,this))return e;var r=new PromiseCapability(this),t=r.resolve;return t(e),r.promise}}),$export($export.S+$export.F*!(USE_NATIVE&&require("./$.iter-detect")(function(e){P.all(e)["catch"](function(){})})),PROMISE,{all:function(e){var r=getConstructor(this),t=new PromiseCapability(r),o=t.resolve,n=t.reject,i=[],s=perform(function(){forOf(e,!1,i.push,i);var t=i.length,s=Array(t);t?$.each.call(i,function(e,i){var c=!1;r.resolve(e).then(function(e){c||(c=!0,s[i]=e,--t||o(s))},n)}):o(s)});return s&&n(s.error),t.promise},race:function(e){var r=getConstructor(this),t=new PromiseCapability(r),o=t.reject,n=perform(function(){forOf(e,!1,function(e){r.resolve(e).then(t.resolve,o)})});return n&&o(n.error),t.promise}});

},{"./$":57,"./$.a-function":27,"./$.an-object":29,"./$.classof":30,"./$.core":32,"./$.ctx":33,"./$.descriptors":35,"./$.export":38,"./$.for-of":40,"./$.global":42,"./$.is-object":50,"./$.iter-detect":54,"./$.library":59,"./$.microtask":60,"./$.redefine-all":64,"./$.same-value":66,"./$.set-proto":67,"./$.set-species":68,"./$.set-to-string-tag":69,"./$.species-constructor":71,"./$.strict-new":72,"./$.wks":80}],88:[function(require,module,exports){
"use strict";var $at=require("./$.string-at")(!0);require("./$.iter-define")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,i=this._t,e=this._i;return e>=i.length?{value:void 0,done:!0}:(t=$at(i,e),this._i+=t.length,{value:t,done:!1})});

},{"./$.iter-define":53,"./$.string-at":73}],89:[function(require,module,exports){
"use strict";var $=require("./$"),global=require("./$.global"),has=require("./$.has"),DESCRIPTORS=require("./$.descriptors"),$export=require("./$.export"),redefine=require("./$.redefine"),$fails=require("./$.fails"),shared=require("./$.shared"),setToStringTag=require("./$.set-to-string-tag"),uid=require("./$.uid"),wks=require("./$.wks"),keyOf=require("./$.keyof"),$names=require("./$.get-names"),enumKeys=require("./$.enum-keys"),isArray=require("./$.is-array"),anObject=require("./$.an-object"),toIObject=require("./$.to-iobject"),createDesc=require("./$.property-desc"),getDesc=$.getDesc,setDesc=$.setDesc,_create=$.create,getNames=$names.get,$Symbol=global.Symbol,$JSON=global.JSON,_stringify=$JSON&&$JSON.stringify,setter=!1,HIDDEN=wks("_hidden"),isEnum=$.isEnum,SymbolRegistry=shared("symbol-registry"),AllSymbols=shared("symbols"),useNative="function"==typeof $Symbol,ObjectProto=Object.prototype,setSymbolDesc=DESCRIPTORS&&$fails(function(){return 7!=_create(setDesc({},"a",{get:function(){return setDesc(this,"a",{value:7}).a}})).a})?function(e,t,r){var s=getDesc(ObjectProto,t);s&&delete ObjectProto[t],setDesc(e,t,r),s&&e!==ObjectProto&&setDesc(ObjectProto,t,s)}:setDesc,wrap=function(e){var t=AllSymbols[e]=_create($Symbol.prototype);return t._k=e,DESCRIPTORS&&setter&&setSymbolDesc(ObjectProto,e,{configurable:!0,set:function(t){has(this,HIDDEN)&&has(this[HIDDEN],e)&&(this[HIDDEN][e]=!1),setSymbolDesc(this,e,createDesc(1,t))}}),t},isSymbol=function(e){return"symbol"==typeof e},$defineProperty=function(e,t,r){return r&&has(AllSymbols,t)?(r.enumerable?(has(e,HIDDEN)&&e[HIDDEN][t]&&(e[HIDDEN][t]=!1),r=_create(r,{enumerable:createDesc(0,!1)})):(has(e,HIDDEN)||setDesc(e,HIDDEN,createDesc(1,{})),e[HIDDEN][t]=!0),setSymbolDesc(e,t,r)):setDesc(e,t,r)},$defineProperties=function(e,t){anObject(e);for(var r,s=enumKeys(t=toIObject(t)),o=0,i=s.length;i>o;)$defineProperty(e,r=s[o++],t[r]);return e},$create=function(e,t){return void 0===t?_create(e):$defineProperties(_create(e),t)},$propertyIsEnumerable=function(e){var t=isEnum.call(this,e);return t||!has(this,e)||!has(AllSymbols,e)||has(this,HIDDEN)&&this[HIDDEN][e]?t:!0},$getOwnPropertyDescriptor=function(e,t){var r=getDesc(e=toIObject(e),t);return!r||!has(AllSymbols,t)||has(e,HIDDEN)&&e[HIDDEN][t]||(r.enumerable=!0),r},$getOwnPropertyNames=function(e){for(var t,r=getNames(toIObject(e)),s=[],o=0;r.length>o;)has(AllSymbols,t=r[o++])||t==HIDDEN||s.push(t);return s},$getOwnPropertySymbols=function(e){for(var t,r=getNames(toIObject(e)),s=[],o=0;r.length>o;)has(AllSymbols,t=r[o++])&&s.push(AllSymbols[t]);return s},$stringify=function(e){if(void 0!==e&&!isSymbol(e)){for(var t,r,s=[e],o=1,i=arguments;i.length>o;)s.push(i[o++]);return t=s[1],"function"==typeof t&&(r=t),(r||!isArray(t))&&(t=function(e,t){return r&&(t=r.call(this,e,t)),isSymbol(t)?void 0:t}),s[1]=t,_stringify.apply($JSON,s)}},buggyJSON=$fails(function(){var e=$Symbol();return"[null]"!=_stringify([e])||"{}"!=_stringify({a:e})||"{}"!=_stringify(Object(e))});useNative||($Symbol=function(){if(isSymbol(this))throw TypeError("Symbol is not a constructor");return wrap(uid(arguments.length>0?arguments[0]:void 0))},redefine($Symbol.prototype,"toString",function(){return this._k}),isSymbol=function(e){return e instanceof $Symbol},$.create=$create,$.isEnum=$propertyIsEnumerable,$.getDesc=$getOwnPropertyDescriptor,$.setDesc=$defineProperty,$.setDescs=$defineProperties,$.getNames=$names.get=$getOwnPropertyNames,$.getSymbols=$getOwnPropertySymbols,DESCRIPTORS&&!require("./$.library")&&redefine(ObjectProto,"propertyIsEnumerable",$propertyIsEnumerable,!0));var symbolStatics={"for":function(e){return has(SymbolRegistry,e+="")?SymbolRegistry[e]:SymbolRegistry[e]=$Symbol(e)},keyFor:function(e){return keyOf(SymbolRegistry,e)},useSetter:function(){setter=!0},useSimple:function(){setter=!1}};$.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(e){var t=wks(e);symbolStatics[e]=useNative?t:wrap(t)}),setter=!0,$export($export.G+$export.W,{Symbol:$Symbol}),$export($export.S,"Symbol",symbolStatics),$export($export.S+$export.F*!useNative,"Object",{create:$create,defineProperty:$defineProperty,defineProperties:$defineProperties,getOwnPropertyDescriptor:$getOwnPropertyDescriptor,getOwnPropertyNames:$getOwnPropertyNames,getOwnPropertySymbols:$getOwnPropertySymbols}),$JSON&&$export($export.S+$export.F*(!useNative||buggyJSON),"JSON",{stringify:$stringify}),setToStringTag($Symbol,"Symbol"),setToStringTag(Math,"Math",!0),setToStringTag(global.JSON,"JSON",!0);

},{"./$":57,"./$.an-object":29,"./$.descriptors":35,"./$.enum-keys":37,"./$.export":38,"./$.fails":39,"./$.get-names":41,"./$.global":42,"./$.has":43,"./$.is-array":49,"./$.keyof":58,"./$.library":59,"./$.property-desc":63,"./$.redefine":65,"./$.set-to-string-tag":69,"./$.shared":70,"./$.to-iobject":76,"./$.uid":79,"./$.wks":80}],90:[function(require,module,exports){
require("./es6.array.iterator");var Iterators=require("./$.iterators");Iterators.NodeList=Iterators.HTMLCollection=Iterators.Array;

},{"./$.iterators":56,"./es6.array.iterator":82}],91:[function(require,module,exports){
require("whatwg-fetch"),module.exports=self.fetch.bind(self);

},{"whatwg-fetch":93}],92:[function(require,module,exports){
function cleanUpNextTick(){draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue()}function drainQueue(){if(!draining){var e=setTimeout(cleanUpNextTick);draining=!0;for(var n=queue.length;n;){for(currentQueue=queue,queue=[];++queueIndex<n;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,n=queue.length}currentQueue=null,draining=!1,clearTimeout(e)}}function Item(e,n){this.fun=e,this.array=n}function noop(){}var process=module.exports={},queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];queue.push(new Item(e,n)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

},{}],93:[function(require,module,exports){
!function(){"use strict";function t(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function e(t){return"string"!=typeof t&&(t=String(t)),t}function r(t){this.map={},t instanceof r?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function o(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function n(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function s(t){var e=new FileReader;return e.readAsArrayBuffer(t),n(e)}function i(t){var e=new FileReader;return e.readAsText(t),n(e)}function a(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(p.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(p.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(t){if(!p.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")}else this._bodyText=""},p.blob?(this.blob=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(s)},this.text=function(){var t=o(this);if(t)return t;if(this._bodyBlob)return i(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var t=o(this);return t?t:Promise.resolve(this._bodyText)},p.formData&&(this.formData=function(){return this.text().then(f)}),this.json=function(){return this.text().then(JSON.parse)},this}function u(t){var e=t.toUpperCase();return c.indexOf(e)>-1?e:t}function h(t,e){e=e||{};var o=e.body;if(h.prototype.isPrototypeOf(t)){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new r(t.headers)),this.method=t.method,this.mode=t.mode,o||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=t;if(this.credentials=e.credentials||this.credentials||"omit",(e.headers||!this.headers)&&(this.headers=new r(e.headers)),this.method=u(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function f(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function d(t){var e=new r,o=t.getAllResponseHeaders().trim().split("\n");return o.forEach(function(t){var r=t.trim().split(":"),o=r.shift().trim(),n=r.join(":").trim();e.append(o,n)}),e}function l(t,e){e||(e={}),this._initBody(t),this.type="default",this.status=e.status,this.ok=this.status>=200&&this.status<300,this.statusText=e.statusText,this.headers=e.headers instanceof r?e.headers:new r(e.headers),this.url=e.url||""}if(!self.fetch){r.prototype.append=function(r,o){r=t(r),o=e(o);var n=this.map[r];n||(n=[],this.map[r]=n),n.push(o)},r.prototype["delete"]=function(e){delete this.map[t(e)]},r.prototype.get=function(e){var r=this.map[t(e)];return r?r[0]:null},r.prototype.getAll=function(e){return this.map[t(e)]||[]},r.prototype.has=function(e){return this.map.hasOwnProperty(t(e))},r.prototype.set=function(r,o){this.map[t(r)]=[e(o)]},r.prototype.forEach=function(t,e){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(o){t.call(e,o,r,this)},this)},this)};var p={blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self},c=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];h.prototype.clone=function(){return new h(this)},a.call(h.prototype),a.call(l.prototype),l.prototype.clone=function(){return new l(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new r(this.headers),url:this.url})},l.error=function(){var t=new l(null,{status:0,statusText:""});return t.type="error",t};var y=[301,302,303,307,308];l.redirect=function(t,e){if(-1===y.indexOf(e))throw new RangeError("Invalid status code");return new l(null,{status:e,headers:{location:t}})},self.Headers=r,self.Request=h,self.Response=l,self.fetch=function(t,e){return new Promise(function(r,o){function n(){return"responseURL"in i?i.responseURL:/^X-Request-URL:/m.test(i.getAllResponseHeaders())?i.getResponseHeader("X-Request-URL"):void 0}var s;s=h.prototype.isPrototypeOf(t)&&!e?t:new h(t,e);var i=new XMLHttpRequest;i.onload=function(){var t=1223===i.status?204:i.status;if(100>t||t>599)return void o(new TypeError("Network request failed"));var e={status:t,statusText:i.statusText,headers:d(i),url:n()},s="response"in i?i.response:i.responseText;r(new l(s,e))},i.onerror=function(){o(new TypeError("Network request failed"))},i.open(s.method,s.url,!0),"include"===s.credentials&&(i.withCredentials=!0),"responseType"in i&&p.blob&&(i.responseType="blob"),s.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof s._bodyInit?null:s._bodyInit)})},self.fetch.polyfill=!0}}();

},{}],94:[function(require,module,exports){
module.exports={
  "name": "smooch-core",
  "version": "1.0.1",
  "description": "Javascript wrapper for Smooch API",
  "homepage": "https://smooch.io",
  "main": "lib/wrappers/node.js",
  "browser": "lib/wrappers/browser.js",
  "scripts": {
    "test": "mocha --compilers js:babel-core/register --require ./test-setup.js ./tests/**/*.spec.js",
    "test-ci": "MOCHA_FILE=$CIRCLE_TEST_REPORTS/test-results.xml mocha --compilers js:babel-core/register -R mocha-junit-reporter --require ./test-setup.js ./tests/**/*.spec.js",
    "build": "mkdir -p lib && rm -rf lib/* && babel -d lib/ src/ && npm run browserify:dist",
    "browserify:dev": "mkdir -p amd && browserify -g uglifyify -e lib/smooch.js -s SmoochCore -o amd/smooch-core.js",
    "browserify:dist": "npm run browserify:dev && uglifyjs amd/smooch-core.js -c -o amd/smooch-core.min.js --screw-ie8",
    "release": "release"
  },
  "author": "Marc-Antoine Lemieux",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git@github.com:smooch/smooch-core-js.git"
  },
  "devDependencies": {
    "babel": "^6.1.18",
    "babel-cli": "^6.1.18",
    "babel-core": "^6.1.19",
    "babel-plugin-transform-runtime": "^6.1.18",
    "babel-preset-es2015": "^6.1.18",
    "babel-preset-es2015-loose": "^7.0.0",
    "babel-preset-stage-2": "^6.1.18",
    "browserify": "^12.0.1",
    "chai": "^3.4.1",
    "mocha": "^2.3.3",
    "mocha-junit-reporter": "^1.9.0",
    "release-script": "^0.5.4",
    "should": "^7.1.1",
    "sinon": "^1.17.2",
    "sinon-chai": "^2.8.0",
    "uglifyify": "^3.0.1",
    "uglifyjs": "^2.4.10"
  },
  "dependencies": {
    "babel-runtime": "^6.1.18",
    "isomorphic-fetch": "^2.2.0",
    "jsonwebtoken": "^5.4.1"
  },
  "release-script": {
    "bowerRepo": "git@github.com:smooch/smooch-core-js-bower.git"
  }
}

},{}]},{},[6])(6)
});