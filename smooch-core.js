(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SmoochCore = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.AppUsersApi=void 0;var _assign=require("babel-runtime/core-js/object/assign"),_assign2=_interopRequireDefault(_assign),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("babel-runtime/helpers/inherits"),_inherits3=_interopRequireDefault(_inherits2),_base=require("./base"),_appUsersStripe=require("./appUsersStripe"),AppUsersApi=exports.AppUsersApi=function(e){function t(){(0,_classCallCheck3["default"])(this,t);for(var r=arguments.length,s=Array(r),i=0;r>i;i++)s[i]=arguments[i];var u=(0,_possibleConstructorReturn3["default"])(this,e.call.apply(e,[this].concat(s)));return u.stripe=new(Function.prototype.bind.apply(_appUsersStripe.AppUsersStripeApi,[null].concat(s))),u}return(0,_inherits3["default"])(t,e),t.prototype.init=function(e){var t=this.getFullURL("init");return this.request("POST",t,e)},t.prototype.create=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(!e||!e.trim())return _promise2["default"].reject(new Error("Must provide a userId."));var r=(0,_assign2["default"])({userId:e},t);if(t.signedUpAt&&!(t.signedUpAt instanceof Date))return _promise2["default"].reject(new Error("signedUpAt must be a date."));var s=this.getFullURL("appusers");return this.request("POST",s,r,{allowedAuth:["jwt"]})},t.prototype.get=function(e){var t=this.getFullURL("appusers",e);return this.request("GET",t)},t.prototype.update=function(e,t){var r=this.getFullURL("appusers",e);return this.request("PUT",r,t)},t.prototype.trackEvent=function(e,t){var r=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],s=this.getFullURL("appusers",e,"events");return this.request("POST",s,{name:t,appUser:r})},t.prototype.updatePushToken=function(e,t,r){var s=this.getFullURL("appusers",e,"pushToken");return this.request("POST",s,{deviceId:t,token:r})},t.prototype.updateDevice=function(e,t,r){var s=this.getFullURL("appusers",e,"devices",t);return this.request("PUT",s,r)},t}(_base.BaseApi);

},{"./appUsersStripe":2,"./base":3,"babel-runtime/core-js/object/assign":10,"babel-runtime/core-js/promise":14,"babel-runtime/helpers/classCallCheck":17,"babel-runtime/helpers/inherits":19,"babel-runtime/helpers/possibleConstructorReturn":20}],2:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.AppUsersStripeApi=void 0;var _assign=require("babel-runtime/core-js/object/assign"),_assign2=_interopRequireDefault(_assign),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("babel-runtime/helpers/inherits"),_inherits3=_interopRequireDefault(_inherits2),_base=require("./base"),AppUsersStripeApi=exports.AppUsersStripeApi=function(e){function r(){return(0,_classCallCheck3["default"])(this,r),(0,_possibleConstructorReturn3["default"])(this,e.apply(this,arguments))}return(0,_inherits3["default"])(r,e),r.prototype.updateCustomer=function(e,r){if(!r)return _promise2["default"].reject(new Error("Must provide a Stripe token."));var t=this.getFullURL("appUsers",e,"stripe","customer");return this.request("POST",t,{token:r},{allowedAuth:["jwt"]})},r.prototype.createTransaction=function(e,r,t){if(!r)return _promise2["default"].reject(new Error("Must provide an action id."));var s=this.getFullURL("appUsers",e,"stripe","transaction"),i={actionId:r};return t&&(0,_assign2["default"])(i,{token:t}),this.request("POST",s,i)},r}(_base.BaseApi);

},{"./base":3,"babel-runtime/core-js/object/assign":10,"babel-runtime/core-js/promise":14,"babel-runtime/helpers/classCallCheck":17,"babel-runtime/helpers/inherits":19,"babel-runtime/helpers/possibleConstructorReturn":20}],3:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.BaseApi=void 0;var _extends2=require("babel-runtime/helpers/extends"),_extends3=_interopRequireDefault(_extends2),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_http=require("../utils/http"),BaseApi=exports.BaseApi=function(){function e(t,r,a){(0,_classCallCheck3["default"])(this,e),this.serviceUrl=t,this.authHeaders=r,this.headers=a,this.allowedAuth=["jwt","appToken"]}return e.prototype.getFullURL=function(){for(var e=arguments.length,t=Array(e),r=0;e>r;r++)t[r]=arguments[r];var a=t.map(function(e){return encodeURIComponent(e)});return _http.urljoin.apply(void 0,[this.serviceUrl].concat(a))},e.prototype.validateAuthHeaders=function(){var e=arguments.length<=0||void 0===arguments[0]?this.allowedAuth:arguments[0];if(!e||0===e.length)return _promise2["default"].reject(new Error("Must at least provide one authentication method."));if(!this.authHeaders)return _promise2["default"].reject(new Error("Must provide headers."));var t=e.indexOf("jwt")>=0,r=e.indexOf("appToken")>=0,a=!!this.authHeaders.Authorization,i=!!this.authHeaders["app-token"];return!t&&a?_promise2["default"].reject(new Error("Must not use JWT for authentication.")):!r&&i?_promise2["default"].reject(new Error("Must not use an app token for authentication.")):_promise2["default"].resolve()},e.prototype.request=function(e,t,r){var a=this,i=arguments.length<=3||void 0===arguments[3]?{}:arguments[3],s=i.allowedAuth,o=void 0===s?this.allowedAuth:s;return this.validateAuthHeaders(o).then(function(){return(0,_http.http)(e,t,r,a.getHeaders())})},e.prototype.getHeaders=function(){return(0,_extends3["default"])({},this.headers,this.authHeaders)},e}();
},{"../utils/http":8,"babel-runtime/core-js/promise":14,"babel-runtime/helpers/classCallCheck":17,"babel-runtime/helpers/extends":18}],4:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.ConversationsApi=void 0;var _keys=require("babel-runtime/core-js/object/keys"),_keys2=_interopRequireDefault(_keys),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("babel-runtime/helpers/inherits"),_inherits3=_interopRequireDefault(_inherits2),_base=require("./base"),ConversationsApi=exports.ConversationsApi=function(e){function r(){return(0,_classCallCheck3["default"])(this,r),(0,_possibleConstructorReturn3["default"])(this,e.apply(this,arguments))}return(0,_inherits3["default"])(r,e),r.prototype.get=function(e){var r=this.getFullURL("appUsers",e,"conversation");return this.request("GET",r)},r.prototype.postPostback=function(e,r){if(!r)return _promise2["default"].reject(new Error("Must provide an action id."));var t=this.getFullURL("appUsers",e,"conversation","postback"),s={actionId:r};return this.request("POST",t,s)},r.prototype.sendMessage=function(e,r){var t=this.getFullURL("appUsers",e,"conversation","messages");return this.request("POST",t,r)},r.prototype.uploadImage=function(e,r){var t=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],s=this.getFullURL("appUsers",e,"conversation","images"),i=new FormData;return i.append("source",r),(0,_keys2["default"])(t).forEach(function(e){i.append(e,t[e])}),this.request("POST",s,i)},r.prototype.resetUnreadCount=function(e){var r=this.getFullURL("appUsers",e,"conversation","read");return this.request("POST",r)},r}(_base.BaseApi);

},{"./base":3,"babel-runtime/core-js/object/keys":12,"babel-runtime/core-js/promise":14,"babel-runtime/helpers/classCallCheck":17,"babel-runtime/helpers/inherits":19,"babel-runtime/helpers/possibleConstructorReturn":20}],5:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.StripeApi=void 0;var _classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_possibleConstructorReturn2=require("babel-runtime/helpers/possibleConstructorReturn"),_possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2),_inherits2=require("babel-runtime/helpers/inherits"),_inherits3=_interopRequireDefault(_inherits2),_base=require("./base"),_http=require("../utils/http"),StripeApi=exports.StripeApi=function(e){function t(){return(0,_classCallCheck3["default"])(this,t),(0,_possibleConstructorReturn3["default"])(this,e.apply(this,arguments))}return(0,_inherits3["default"])(t,e),t.prototype.getAccount=function(){var e=this.getFullURL("stripe","account");return this.request("GET",e)},t}(_base.BaseApi);

},{"../utils/http":8,"./base":3,"babel-runtime/helpers/classCallCheck":17,"babel-runtime/helpers/inherits":19,"babel-runtime/helpers/possibleConstructorReturn":20}],6:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0,exports.Smooch=exports.SERVICE_URL=void 0;var _classCallCheck2=require("babel-runtime/helpers/classCallCheck"),_classCallCheck3=_interopRequireDefault(_classCallCheck2),_auth=require("./utils/auth"),_appUsers=require("./api/appUsers"),_conversations=require("./api/conversations"),_stripe=require("./api/stripe"),_package=require("../package.json"),_package2=_interopRequireDefault(_package),SERVICE_URL=exports.SERVICE_URL="https://api.smooch.io/v1",Smooch=exports.Smooch=function e(){var s=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];(0,_classCallCheck3["default"])(this,e);var t=r.serviceUrl,i=void 0===t?SERVICE_URL:t,a=r.headers,h=void 0===a?{}:a;if(this.VERSION=_package2["default"].version,this.serviceUrl=i,s.keyId||s.secret)throw new Error("Key Id or Secret should not be used on the browser side. You must generate a JWT beforehand.");this.headers=h,this.authHeaders=(0,_auth.getAuthenticationHeaders)(s),this.appUsers=new _appUsers.AppUsersApi(this.serviceUrl,this.authHeaders,this.headers),this.conversations=new _conversations.ConversationsApi(this.serviceUrl,this.authHeaders,this.headers),this.stripe=new _stripe.StripeApi(this.serviceUrl,this.authHeaders,this.headers),this.utils={}};
},{"../package.json":117,"./api/appUsers":1,"./api/conversations":4,"./api/stripe":5,"./utils/auth":7,"babel-runtime/helpers/classCallCheck":17}],7:[function(require,module,exports){
"use strict";function getAuthenticationHeaders(t){if(!t)throw new Error("Must provide authentication information.");if(t.jwt)return{Authorization:"Bearer "+t.jwt};if(t.appToken)return{"app-token":t.appToken};throw new Error("Must provide a JWT or a app token")}exports.__esModule=!0,exports.getAuthenticationHeaders=getAuthenticationHeaders;

},{}],8:[function(require,module,exports){
(function (process){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}function stringifyGETParams(e,t){var r="";for(var n in(0,_keys2["default"])(t))null!==t[n]&&(r+="&"+encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return r&&(e+=(~e.indexOf("?")?"&":"?")+r.substring(1)),e}function handleStatus(e){if(e.status>=200&&e.status<300)return e;var t=new Error(e.statusText);throw t.response=e,t}function handleBody(e){if(202===e.status||204===e.status)return _promise2["default"].resolve();var t=e.headers.get("Content-Type")||"",r=t.indexOf("application/json")>-1;return r?e.json():_promise2["default"].resolve()}function http(e,t,r){var n=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];e=e.toUpperCase();var s={method:e,headers:(0,_assign2["default"])({Accept:"application/json","Content-Type":"application/json"},n)};return r&&(r instanceof FormData?(s.body=r,delete s.headers["Content-Type"]):(r=(0,_assign2["default"])({},r),"GET"===e?t=stringifyGETParams(t,r):"POST"!==e&&"PUT"!==e||(s.body=(0,_stringify2["default"])(r)))),fetch(t,s).then(handleStatus).then(handleBody)}function urljoin(){for(var e=arguments.length,t=Array(e),r=0;e>r;r++)t[r]=arguments[r];return t.map(function(e){return e.replace(/\/$/,"")}).join("/")}exports.__esModule=!0;var _stringify=require("babel-runtime/core-js/json/stringify"),_stringify2=_interopRequireDefault(_stringify),_assign=require("babel-runtime/core-js/object/assign"),_assign2=_interopRequireDefault(_assign),_promise=require("babel-runtime/core-js/promise"),_promise2=_interopRequireDefault(_promise),_keys=require("babel-runtime/core-js/object/keys"),_keys2=_interopRequireDefault(_keys);exports.stringifyGETParams=stringifyGETParams,exports.handleStatus=handleStatus,exports.handleBody=handleBody,exports.http=http,exports.urljoin=urljoin,"undefined"!=typeof process&&require("isomorphic-fetch");

}).call(this,require('_process'))
},{"_process":115,"babel-runtime/core-js/json/stringify":9,"babel-runtime/core-js/object/assign":10,"babel-runtime/core-js/object/keys":12,"babel-runtime/core-js/promise":14,"isomorphic-fetch":114}],9:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/json/stringify"),__esModule:!0};

},{"core-js/library/fn/json/stringify":22}],10:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/object/assign"),__esModule:!0};
},{"core-js/library/fn/object/assign":23}],11:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/object/create"),__esModule:!0};

},{"core-js/library/fn/object/create":24}],12:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/object/keys"),__esModule:!0};

},{"core-js/library/fn/object/keys":25}],13:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/object/set-prototype-of"),__esModule:!0};

},{"core-js/library/fn/object/set-prototype-of":26}],14:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/promise"),__esModule:!0};
},{"core-js/library/fn/promise":27}],15:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/symbol"),__esModule:!0};

},{"core-js/library/fn/symbol":28}],16:[function(require,module,exports){
module.exports={"default":require("core-js/library/fn/symbol/iterator"),__esModule:!0};

},{"core-js/library/fn/symbol/iterator":29}],17:[function(require,module,exports){
"use strict";exports.__esModule=!0,exports["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};
},{}],18:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _assign=require("../core-js/object/assign"),_assign2=_interopRequireDefault(_assign);exports["default"]=_assign2["default"]||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e};

},{"../core-js/object/assign":10}],19:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _setPrototypeOf=require("../core-js/object/set-prototype-of"),_setPrototypeOf2=_interopRequireDefault(_setPrototypeOf),_create=require("../core-js/object/create"),_create2=_interopRequireDefault(_create),_typeof2=require("../helpers/typeof"),_typeof3=_interopRequireDefault(_typeof2);exports["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,_typeof3["default"])(t)));e.prototype=(0,_create2["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(_setPrototypeOf2["default"]?(0,_setPrototypeOf2["default"])(e,t):e.__proto__=t)};

},{"../core-js/object/create":11,"../core-js/object/set-prototype-of":13,"../helpers/typeof":21}],20:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _typeof2=require("../helpers/typeof"),_typeof3=_interopRequireDefault(_typeof2);exports["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,_typeof3["default"])(t))&&"function"!=typeof t?e:t};

},{"../helpers/typeof":21}],21:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}exports.__esModule=!0;var _iterator=require("../core-js/symbol/iterator"),_iterator2=_interopRequireDefault(_iterator),_symbol=require("../core-js/symbol"),_symbol2=_interopRequireDefault(_symbol),_typeof="function"==typeof _symbol2["default"]&&"symbol"==typeof _iterator2["default"]?function(e){return typeof e}:function(e){return e&&"function"==typeof _symbol2["default"]&&e.constructor===_symbol2["default"]?"symbol":typeof e};exports["default"]="function"==typeof _symbol2["default"]&&"symbol"===_typeof(_iterator2["default"])?function(e){return"undefined"==typeof e?"undefined":_typeof(e)}:function(e){return e&&"function"==typeof _symbol2["default"]&&e.constructor===_symbol2["default"]?"symbol":"undefined"==typeof e?"undefined":_typeof(e)};

},{"../core-js/symbol":15,"../core-js/symbol/iterator":16}],22:[function(require,module,exports){
var core=require("../../modules/_core"),$JSON=core.JSON||(core.JSON={stringify:JSON.stringify});module.exports=function(r){return $JSON.stringify.apply($JSON,arguments)};

},{"../../modules/_core":37}],23:[function(require,module,exports){
require("../../modules/es6.object.assign"),module.exports=require("../../modules/_core").Object.assign;

},{"../../modules/_core":37,"../../modules/es6.object.assign":103}],24:[function(require,module,exports){
require("../../modules/es6.object.create");var $Object=require("../../modules/_core").Object;module.exports=function(e,r){return $Object.create(e,r)};

},{"../../modules/_core":37,"../../modules/es6.object.create":104}],25:[function(require,module,exports){
require("../../modules/es6.object.keys"),module.exports=require("../../modules/_core").Object.keys;

},{"../../modules/_core":37,"../../modules/es6.object.keys":105}],26:[function(require,module,exports){
require("../../modules/es6.object.set-prototype-of"),module.exports=require("../../modules/_core").Object.setPrototypeOf;

},{"../../modules/_core":37,"../../modules/es6.object.set-prototype-of":106}],27:[function(require,module,exports){
require("../modules/es6.object.to-string"),require("../modules/es6.string.iterator"),require("../modules/web.dom.iterable"),require("../modules/es6.promise"),module.exports=require("../modules/_core").Promise;
},{"../modules/_core":37,"../modules/es6.object.to-string":107,"../modules/es6.promise":108,"../modules/es6.string.iterator":109,"../modules/web.dom.iterable":113}],28:[function(require,module,exports){
require("../../modules/es6.symbol"),require("../../modules/es6.object.to-string"),require("../../modules/es7.symbol.async-iterator"),require("../../modules/es7.symbol.observable"),module.exports=require("../../modules/_core").Symbol;
},{"../../modules/_core":37,"../../modules/es6.object.to-string":107,"../../modules/es6.symbol":110,"../../modules/es7.symbol.async-iterator":111,"../../modules/es7.symbol.observable":112}],29:[function(require,module,exports){
require("../../modules/es6.string.iterator"),require("../../modules/web.dom.iterable"),module.exports=require("../../modules/_wks-ext").f("iterator");

},{"../../modules/_wks-ext":99,"../../modules/es6.string.iterator":109,"../../modules/web.dom.iterable":113}],30:[function(require,module,exports){
module.exports=function(o){if("function"!=typeof o)throw TypeError(o+" is not a function!");return o};

},{}],31:[function(require,module,exports){
module.exports=function(){};

},{}],32:[function(require,module,exports){
module.exports=function(o,n,r,i){if(!(o instanceof n)||void 0!==i&&i in o)throw TypeError(r+": incorrect invocation!");return o};

},{}],33:[function(require,module,exports){
var isObject=require("./_is-object");module.exports=function(e){if(!isObject(e))throw TypeError(e+" is not an object!");return e};

},{"./_is-object":56}],34:[function(require,module,exports){
var toIObject=require("./_to-iobject"),toLength=require("./_to-length"),toIndex=require("./_to-index");module.exports=function(e){return function(t,r,n){var o,i=toIObject(t),u=toLength(i.length),f=toIndex(n,u);if(e&&r!=r){for(;u>f;)if(o=i[f++],o!=o)return!0}else for(;u>f;f++)if((e||f in i)&&i[f]===r)return e||f||0;return!e&&-1}};
},{"./_to-index":91,"./_to-iobject":93,"./_to-length":94}],35:[function(require,module,exports){
var cof=require("./_cof"),TAG=require("./_wks")("toStringTag"),ARG="Arguments"==cof(function(){return arguments}()),tryGet=function(t,e){try{return t[e]}catch(r){}};module.exports=function(t){var e,r,n;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(r=tryGet(e=Object(t),TAG))?r:ARG?cof(e):"Object"==(n=cof(e))&&"function"==typeof e.callee?"Arguments":n};

},{"./_cof":36,"./_wks":100}],36:[function(require,module,exports){
var toString={}.toString;module.exports=function(t){return toString.call(t).slice(8,-1)};

},{}],37:[function(require,module,exports){
var core=module.exports={version:"2.4.0"};"number"==typeof __e&&(__e=core);

},{}],38:[function(require,module,exports){
var aFunction=require("./_a-function");module.exports=function(n,r,t){if(aFunction(n),void 0===r)return n;switch(t){case 1:return function(t){return n.call(r,t)};case 2:return function(t,u){return n.call(r,t,u)};case 3:return function(t,u,e){return n.call(r,t,u,e)}}return function(){return n.apply(r,arguments)}};

},{"./_a-function":30}],39:[function(require,module,exports){
module.exports=function(o){if(void 0==o)throw TypeError("Can't call method on  "+o);return o};
},{}],40:[function(require,module,exports){
module.exports=!require("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a});

},{"./_fails":45}],41:[function(require,module,exports){
var isObject=require("./_is-object"),document=require("./_global").document,is=isObject(document)&&isObject(document.createElement);module.exports=function(e){return is?document.createElement(e):{}};

},{"./_global":47,"./_is-object":56}],42:[function(require,module,exports){
module.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");

},{}],43:[function(require,module,exports){
var getKeys=require("./_object-keys"),gOPS=require("./_object-gops"),pIE=require("./_object-pie");module.exports=function(e){var r=getKeys(e),t=gOPS.f;if(t)for(var o,u=t(e),g=pIE.f,i=0;u.length>i;)g.call(e,o=u[i++])&&r.push(o);return r};

},{"./_object-gops":74,"./_object-keys":77,"./_object-pie":78}],44:[function(require,module,exports){
var global=require("./_global"),core=require("./_core"),ctx=require("./_ctx"),hide=require("./_hide"),PROTOTYPE="prototype",$export=function(e,r,t){var o,n,p,i=e&$export.F,x=e&$export.G,c=e&$export.S,l=e&$export.P,u=e&$export.B,a=e&$export.W,$=x?core:core[r]||(core[r]={}),P=$[PROTOTYPE],f=x?global:c?global[r]:(global[r]||{})[PROTOTYPE];x&&(t=r);for(o in t)n=!i&&f&&void 0!==f[o],n&&o in $||(p=n?f[o]:t[o],$[o]=x&&"function"!=typeof f[o]?t[o]:u&&n?ctx(p,global):a&&f[o]==p?function(e){var r=function(r,t,o){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(r);case 2:return new e(r,t)}return new e(r,t,o)}return e.apply(this,arguments)};return r[PROTOTYPE]=e[PROTOTYPE],r}(p):l&&"function"==typeof p?ctx(Function.call,p):p,l&&(($.virtual||($.virtual={}))[o]=p,e&$export.R&&P&&!P[o]&&hide(P,o,p)))};$export.F=1,$export.G=2,$export.S=4,$export.P=8,$export.B=16,$export.W=32,$export.U=64,$export.R=128,module.exports=$export;

},{"./_core":37,"./_ctx":38,"./_global":47,"./_hide":49}],45:[function(require,module,exports){
module.exports=function(r){try{return!!r()}catch(t){return!0}};

},{}],46:[function(require,module,exports){
var ctx=require("./_ctx"),call=require("./_iter-call"),isArrayIter=require("./_is-array-iter"),anObject=require("./_an-object"),toLength=require("./_to-length"),getIterFn=require("./core.get-iterator-method"),BREAK={},RETURN={},exports=module.exports=function(e,r,t,o,i){var n,a,R,c,l=i?function(){return e}:getIterFn(e),u=ctx(t,o,r?2:1),E=0;if("function"!=typeof l)throw TypeError(e+" is not iterable!");if(isArrayIter(l)){for(n=toLength(e.length);n>E;E++)if(c=r?u(anObject(a=e[E])[0],a[1]):u(e[E]),c===BREAK||c===RETURN)return c}else for(R=l.call(e);!(a=R.next()).done;)if(c=call(R,u,a.value,r),c===BREAK||c===RETURN)return c};exports.BREAK=BREAK,exports.RETURN=RETURN;

},{"./_an-object":33,"./_ctx":38,"./_is-array-iter":54,"./_iter-call":57,"./_to-length":94,"./core.get-iterator-method":101}],47:[function(require,module,exports){
var global=module.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=global);

},{}],48:[function(require,module,exports){
var hasOwnProperty={}.hasOwnProperty;module.exports=function(r,e){return hasOwnProperty.call(r,e)};

},{}],49:[function(require,module,exports){
var dP=require("./_object-dp"),createDesc=require("./_property-desc");module.exports=require("./_descriptors")?function(e,r,t){return dP.f(e,r,createDesc(1,t))}:function(e,r,t){return e[r]=t,e};

},{"./_descriptors":40,"./_object-dp":69,"./_property-desc":80}],50:[function(require,module,exports){
module.exports=require("./_global").document&&document.documentElement;

},{"./_global":47}],51:[function(require,module,exports){
module.exports=!require("./_descriptors")&&!require("./_fails")(function(){return 7!=Object.defineProperty(require("./_dom-create")("div"),"a",{get:function(){return 7}}).a});

},{"./_descriptors":40,"./_dom-create":41,"./_fails":45}],52:[function(require,module,exports){
module.exports=function(e,r,l){var a=void 0===l;switch(r.length){case 0:return a?e():e.call(l);case 1:return a?e(r[0]):e.call(l,r[0]);case 2:return a?e(r[0],r[1]):e.call(l,r[0],r[1]);case 3:return a?e(r[0],r[1],r[2]):e.call(l,r[0],r[1],r[2]);case 4:return a?e(r[0],r[1],r[2],r[3]):e.call(l,r[0],r[1],r[2],r[3])}return e.apply(l,r)};

},{}],53:[function(require,module,exports){
var cof=require("./_cof");module.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==cof(e)?e.split(""):Object(e)};

},{"./_cof":36}],54:[function(require,module,exports){
var Iterators=require("./_iterators"),ITERATOR=require("./_wks")("iterator"),ArrayProto=Array.prototype;module.exports=function(r){return void 0!==r&&(Iterators.Array===r||ArrayProto[ITERATOR]===r)};

},{"./_iterators":62,"./_wks":100}],55:[function(require,module,exports){
var cof=require("./_cof");module.exports=Array.isArray||function(r){return"Array"==cof(r)};

},{"./_cof":36}],56:[function(require,module,exports){
module.exports=function(o){return"object"==typeof o?null!==o:"function"==typeof o};

},{}],57:[function(require,module,exports){
var anObject=require("./_an-object");module.exports=function(r,t,e,a){try{return a?t(anObject(e)[0],e[1]):t(e)}catch(c){var n=r["return"];throw void 0!==n&&anObject(n.call(r)),c}};

},{"./_an-object":33}],58:[function(require,module,exports){
"use strict";var create=require("./_object-create"),descriptor=require("./_property-desc"),setToStringTag=require("./_set-to-string-tag"),IteratorPrototype={};require("./_hide")(IteratorPrototype,require("./_wks")("iterator"),function(){return this}),module.exports=function(r,t,e){r.prototype=create(IteratorPrototype,{next:descriptor(1,e)}),setToStringTag(r,t+" Iterator")};

},{"./_hide":49,"./_object-create":68,"./_property-desc":80,"./_set-to-string-tag":85,"./_wks":100}],59:[function(require,module,exports){
"use strict";var LIBRARY=require("./_library"),$export=require("./_export"),redefine=require("./_redefine"),hide=require("./_hide"),has=require("./_has"),Iterators=require("./_iterators"),$iterCreate=require("./_iter-create"),setToStringTag=require("./_set-to-string-tag"),getPrototypeOf=require("./_object-gpo"),ITERATOR=require("./_wks")("iterator"),BUGGY=!([].keys&&"next"in[].keys()),FF_ITERATOR="@@iterator",KEYS="keys",VALUES="values",returnThis=function(){return this};module.exports=function(e,r,t,i,n,o,s){$iterCreate(t,r,i);var u,a,T,R=function(e){if(!BUGGY&&e in h)return h[e];switch(e){case KEYS:return function(){return new t(this,e)};case VALUES:return function(){return new t(this,e)}}return function(){return new t(this,e)}},A=r+" Iterator",c=n==VALUES,f=!1,h=e.prototype,E=h[ITERATOR]||h[FF_ITERATOR]||n&&h[n],I=E||R(n),p=n?c?R("entries"):I:void 0,_="Array"==r?h.entries||E:E;if(_&&(T=getPrototypeOf(_.call(new e)),T!==Object.prototype&&(setToStringTag(T,A,!0),LIBRARY||has(T,ITERATOR)||hide(T,ITERATOR,returnThis))),c&&E&&E.name!==VALUES&&(f=!0,I=function(){return E.call(this)}),LIBRARY&&!s||!BUGGY&&!f&&h[ITERATOR]||hide(h,ITERATOR,I),Iterators[r]=I,Iterators[A]=returnThis,n)if(u={values:c?I:R(VALUES),keys:o?I:R(KEYS),entries:p},s)for(a in u)a in h||redefine(h,a,u[a]);else $export($export.P+$export.F*(BUGGY||f),r,u);return u};

},{"./_export":44,"./_has":48,"./_hide":49,"./_iter-create":58,"./_iterators":62,"./_library":64,"./_object-gpo":75,"./_redefine":82,"./_set-to-string-tag":85,"./_wks":100}],60:[function(require,module,exports){
var ITERATOR=require("./_wks")("iterator"),SAFE_CLOSING=!1;try{var riter=[7][ITERATOR]();riter["return"]=function(){SAFE_CLOSING=!0},Array.from(riter,function(){throw 2})}catch(e){}module.exports=function(r,t){if(!t&&!SAFE_CLOSING)return!1;var n=!1;try{var e=[7],u=e[ITERATOR]();u.next=function(){return{done:n=!0}},e[ITERATOR]=function(){return u},r(e)}catch(i){}return n};

},{"./_wks":100}],61:[function(require,module,exports){
module.exports=function(e,n){return{value:n,done:!!e}};

},{}],62:[function(require,module,exports){
module.exports={};

},{}],63:[function(require,module,exports){
var getKeys=require("./_object-keys"),toIObject=require("./_to-iobject");module.exports=function(e,t){for(var r,o=toIObject(e),c=getKeys(o),i=c.length,u=0;i>u;)if(o[r=c[u++]]===t)return r};

},{"./_object-keys":77,"./_to-iobject":93}],64:[function(require,module,exports){
module.exports=!0;

},{}],65:[function(require,module,exports){
var META=require("./_uid")("meta"),isObject=require("./_is-object"),has=require("./_has"),setDesc=require("./_object-dp").f,id=0,isExtensible=Object.isExtensible||function(){return!0},FREEZE=!require("./_fails")(function(){return isExtensible(Object.preventExtensions({}))}),setMeta=function(e){setDesc(e,META,{value:{i:"O"+ ++id,w:{}}})},fastKey=function(e,t){if(!isObject(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!has(e,META)){if(!isExtensible(e))return"F";if(!t)return"E";setMeta(e)}return e[META].i},getWeak=function(e,t){if(!has(e,META)){if(!isExtensible(e))return!0;if(!t)return!1;setMeta(e)}return e[META].w},onFreeze=function(e){return FREEZE&&meta.NEED&&isExtensible(e)&&!has(e,META)&&setMeta(e),e},meta=module.exports={KEY:META,NEED:!1,fastKey:fastKey,getWeak:getWeak,onFreeze:onFreeze};

},{"./_fails":45,"./_has":48,"./_is-object":56,"./_object-dp":69,"./_uid":97}],66:[function(require,module,exports){
var global=require("./_global"),macrotask=require("./_task").set,Observer=global.MutationObserver||global.WebKitMutationObserver,process=global.process,Promise=global.Promise,isNode="process"==require("./_cof")(process);module.exports=function(){var e,r,o,s=function(){var s,t;for(isNode&&(s=process.domain)&&s.exit();e;){t=e.fn,e=e.next;try{t()}catch(a){throw e?o():r=void 0,a}}r=void 0,s&&s.enter()};if(isNode)o=function(){process.nextTick(s)};else if(Observer){var t=!0,a=document.createTextNode("");new Observer(s).observe(a,{characterData:!0}),o=function(){a.data=t=!t}}else if(Promise&&Promise.resolve){var i=Promise.resolve();o=function(){i.then(s)}}else o=function(){macrotask.call(global,s)};return function(s){var t={fn:s,next:void 0};r&&(r.next=t),e||(e=t,o()),r=t}};

},{"./_cof":36,"./_global":47,"./_task":90}],67:[function(require,module,exports){
"use strict";var getKeys=require("./_object-keys"),gOPS=require("./_object-gops"),pIE=require("./_object-pie"),toObject=require("./_to-object"),IObject=require("./_iobject"),$assign=Object.assign;module.exports=!$assign||require("./_fails")(function(){var e={},t={},r=Symbol(),s="abcdefghijklmnopqrst";return e[r]=7,s.split("").forEach(function(e){t[e]=e}),7!=$assign({},e)[r]||Object.keys($assign({},t)).join("")!=s})?function(e,t){for(var r=toObject(e),s=arguments.length,i=1,o=gOPS.f,c=pIE.f;s>i;)for(var n,a=IObject(arguments[i++]),g=o?getKeys(a).concat(o(a)):getKeys(a),b=g.length,j=0;b>j;)c.call(a,n=g[j++])&&(r[n]=a[n]);return r}:$assign;
},{"./_fails":45,"./_iobject":53,"./_object-gops":74,"./_object-keys":77,"./_object-pie":78,"./_to-object":95}],68:[function(require,module,exports){
var anObject=require("./_an-object"),dPs=require("./_object-dps"),enumBugKeys=require("./_enum-bug-keys"),IE_PROTO=require("./_shared-key")("IE_PROTO"),Empty=function(){},PROTOTYPE="prototype",createDict=function(){var e,t=require("./_dom-create")("iframe"),r=enumBugKeys.length,c=">";for(t.style.display="none",require("./_html").appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write("<script>document.F=Object</script"+c),e.close(),createDict=e.F;r--;)delete createDict[PROTOTYPE][enumBugKeys[r]];return createDict()};module.exports=Object.create||function(e,t){var r;return null!==e?(Empty[PROTOTYPE]=anObject(e),r=new Empty,Empty[PROTOTYPE]=null,r[IE_PROTO]=e):r=createDict(),void 0===t?r:dPs(r,t)};

},{"./_an-object":33,"./_dom-create":41,"./_enum-bug-keys":42,"./_html":50,"./_object-dps":70,"./_shared-key":86}],69:[function(require,module,exports){
var anObject=require("./_an-object"),IE8_DOM_DEFINE=require("./_ie8-dom-define"),toPrimitive=require("./_to-primitive"),dP=Object.defineProperty;exports.f=require("./_descriptors")?Object.defineProperty:function(e,r,t){if(anObject(e),r=toPrimitive(r,!0),anObject(t),IE8_DOM_DEFINE)try{return dP(e,r,t)}catch(i){}if("get"in t||"set"in t)throw TypeError("Accessors not supported!");return"value"in t&&(e[r]=t.value),e};

},{"./_an-object":33,"./_descriptors":40,"./_ie8-dom-define":51,"./_to-primitive":96}],70:[function(require,module,exports){
var dP=require("./_object-dp"),anObject=require("./_an-object"),getKeys=require("./_object-keys");module.exports=require("./_descriptors")?Object.defineProperties:function(e,r){anObject(e);for(var t,o=getKeys(r),c=o.length,i=0;c>i;)dP.f(e,t=o[i++],r[t]);return e};
},{"./_an-object":33,"./_descriptors":40,"./_object-dp":69,"./_object-keys":77}],71:[function(require,module,exports){
var pIE=require("./_object-pie"),createDesc=require("./_property-desc"),toIObject=require("./_to-iobject"),toPrimitive=require("./_to-primitive"),has=require("./_has"),IE8_DOM_DEFINE=require("./_ie8-dom-define"),gOPD=Object.getOwnPropertyDescriptor;exports.f=require("./_descriptors")?gOPD:function(e,r){if(e=toIObject(e),r=toPrimitive(r,!0),IE8_DOM_DEFINE)try{return gOPD(e,r)}catch(t){}return has(e,r)?createDesc(!pIE.f.call(e,r),e[r]):void 0};

},{"./_descriptors":40,"./_has":48,"./_ie8-dom-define":51,"./_object-pie":78,"./_property-desc":80,"./_to-iobject":93,"./_to-primitive":96}],72:[function(require,module,exports){
var toIObject=require("./_to-iobject"),gOPN=require("./_object-gopn").f,toString={}.toString,windowNames="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],getWindowNames=function(e){try{return gOPN(e)}catch(t){return windowNames.slice()}};module.exports.f=function(e){return windowNames&&"[object Window]"==toString.call(e)?getWindowNames(e):gOPN(toIObject(e))};

},{"./_object-gopn":73,"./_to-iobject":93}],73:[function(require,module,exports){
var $keys=require("./_object-keys-internal"),hiddenKeys=require("./_enum-bug-keys").concat("length","prototype");exports.f=Object.getOwnPropertyNames||function(e){return $keys(e,hiddenKeys)};

},{"./_enum-bug-keys":42,"./_object-keys-internal":76}],74:[function(require,module,exports){
exports.f=Object.getOwnPropertySymbols;

},{}],75:[function(require,module,exports){
var has=require("./_has"),toObject=require("./_to-object"),IE_PROTO=require("./_shared-key")("IE_PROTO"),ObjectProto=Object.prototype;module.exports=Object.getPrototypeOf||function(t){return t=toObject(t),has(t,IE_PROTO)?t[IE_PROTO]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?ObjectProto:null};

},{"./_has":48,"./_shared-key":86,"./_to-object":95}],76:[function(require,module,exports){
var has=require("./_has"),toIObject=require("./_to-iobject"),arrayIndexOf=require("./_array-includes")(!1),IE_PROTO=require("./_shared-key")("IE_PROTO");module.exports=function(r,e){var a,t=toIObject(r),u=0,O=[];for(a in t)a!=IE_PROTO&&has(t,a)&&O.push(a);for(;e.length>u;)has(t,a=e[u++])&&(~arrayIndexOf(O,a)||O.push(a));return O};

},{"./_array-includes":34,"./_has":48,"./_shared-key":86,"./_to-iobject":93}],77:[function(require,module,exports){
var $keys=require("./_object-keys-internal"),enumBugKeys=require("./_enum-bug-keys");module.exports=Object.keys||function(e){return $keys(e,enumBugKeys)};

},{"./_enum-bug-keys":42,"./_object-keys-internal":76}],78:[function(require,module,exports){
exports.f={}.propertyIsEnumerable;

},{}],79:[function(require,module,exports){
var $export=require("./_export"),core=require("./_core"),fails=require("./_fails");module.exports=function(e,r){var o=(core.Object||{})[e]||Object[e],t={};t[e]=r(o),$export($export.S+$export.F*fails(function(){o(1)}),"Object",t)};

},{"./_core":37,"./_export":44,"./_fails":45}],80:[function(require,module,exports){
module.exports=function(e,r){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:r}};

},{}],81:[function(require,module,exports){
var hide=require("./_hide");module.exports=function(e,r,i){for(var d in r)i&&e[d]?e[d]=r[d]:hide(e,d,r[d]);return e};

},{"./_hide":49}],82:[function(require,module,exports){
module.exports=require("./_hide");

},{"./_hide":49}],83:[function(require,module,exports){
var isObject=require("./_is-object"),anObject=require("./_an-object"),check=function(t,e){if(anObject(t),!isObject(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};module.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,c){try{c=require("./_ctx")(Function.call,require("./_object-gopd").f(Object.prototype,"__proto__").set,2),c(t,[]),e=!(t instanceof Array)}catch(r){e=!0}return function(t,r){return check(t,r),e?t.__proto__=r:c(t,r),t}}({},!1):void 0),check:check};

},{"./_an-object":33,"./_ctx":38,"./_is-object":56,"./_object-gopd":71}],84:[function(require,module,exports){
"use strict";var global=require("./_global"),core=require("./_core"),dP=require("./_object-dp"),DESCRIPTORS=require("./_descriptors"),SPECIES=require("./_wks")("species");module.exports=function(e){var r="function"==typeof core[e]?core[e]:global[e];DESCRIPTORS&&r&&!r[SPECIES]&&dP.f(r,SPECIES,{configurable:!0,get:function(){return this}})};

},{"./_core":37,"./_descriptors":40,"./_global":47,"./_object-dp":69,"./_wks":100}],85:[function(require,module,exports){
var def=require("./_object-dp").f,has=require("./_has"),TAG=require("./_wks")("toStringTag");module.exports=function(e,r,o){e&&!has(e=o?e:e.prototype,TAG)&&def(e,TAG,{configurable:!0,value:r})};

},{"./_has":48,"./_object-dp":69,"./_wks":100}],86:[function(require,module,exports){
var shared=require("./_shared")("keys"),uid=require("./_uid");module.exports=function(e){return shared[e]||(shared[e]=uid(e))};

},{"./_shared":87,"./_uid":97}],87:[function(require,module,exports){
var global=require("./_global"),SHARED="__core-js_shared__",store=global[SHARED]||(global[SHARED]={});module.exports=function(o){return store[o]||(store[o]={})};

},{"./_global":47}],88:[function(require,module,exports){
var anObject=require("./_an-object"),aFunction=require("./_a-function"),SPECIES=require("./_wks")("species");module.exports=function(e,n){var r,t=anObject(e).constructor;return void 0===t||void 0==(r=anObject(t)[SPECIES])?n:aFunction(r)};

},{"./_a-function":30,"./_an-object":33,"./_wks":100}],89:[function(require,module,exports){
var toInteger=require("./_to-integer"),defined=require("./_defined");module.exports=function(e){return function(r,t){var n,i,d=String(defined(r)),o=toInteger(t),u=d.length;return 0>o||o>=u?e?"":void 0:(n=d.charCodeAt(o),55296>n||n>56319||o+1===u||(i=d.charCodeAt(o+1))<56320||i>57343?e?d.charAt(o):n:e?d.slice(o,o+2):(n-55296<<10)+(i-56320)+65536)}};

},{"./_defined":39,"./_to-integer":92}],90:[function(require,module,exports){
var ctx=require("./_ctx"),invoke=require("./_invoke"),html=require("./_html"),cel=require("./_dom-create"),global=require("./_global"),process=global.process,setTask=global.setImmediate,clearTask=global.clearImmediate,MessageChannel=global.MessageChannel,counter=0,queue={},ONREADYSTATECHANGE="onreadystatechange",defer,channel,port,run=function(){var e=+this;if(queue.hasOwnProperty(e)){var n=queue[e];delete queue[e],n()}},listener=function(e){run.call(e.data)};setTask&&clearTask||(setTask=function(e){for(var n=[],t=1;arguments.length>t;)n.push(arguments[t++]);return queue[++counter]=function(){invoke("function"==typeof e?e:Function(e),n)},defer(counter),counter},clearTask=function(e){delete queue[e]},"process"==require("./_cof")(process)?defer=function(e){process.nextTick(ctx(run,e,1))}:MessageChannel?(channel=new MessageChannel,port=channel.port2,channel.port1.onmessage=listener,defer=ctx(port.postMessage,port,1)):global.addEventListener&&"function"==typeof postMessage&&!global.importScripts?(defer=function(e){global.postMessage(e+"","*")},global.addEventListener("message",listener,!1)):defer=ONREADYSTATECHANGE in cel("script")?function(e){html.appendChild(cel("script"))[ONREADYSTATECHANGE]=function(){html.removeChild(this),run.call(e)}}:function(e){setTimeout(ctx(run,e,1),0)}),module.exports={set:setTask,clear:clearTask};

},{"./_cof":36,"./_ctx":38,"./_dom-create":41,"./_global":47,"./_html":50,"./_invoke":52}],91:[function(require,module,exports){
var toInteger=require("./_to-integer"),max=Math.max,min=Math.min;module.exports=function(e,t){return e=toInteger(e),0>e?max(e+t,0):min(e,t)};
},{"./_to-integer":92}],92:[function(require,module,exports){
var ceil=Math.ceil,floor=Math.floor;module.exports=function(o){return isNaN(o=+o)?0:(o>0?floor:ceil)(o)};

},{}],93:[function(require,module,exports){
var IObject=require("./_iobject"),defined=require("./_defined");module.exports=function(e){return IObject(defined(e))};

},{"./_defined":39,"./_iobject":53}],94:[function(require,module,exports){
var toInteger=require("./_to-integer"),min=Math.min;module.exports=function(e){return e>0?min(toInteger(e),9007199254740991):0};

},{"./_to-integer":92}],95:[function(require,module,exports){
var defined=require("./_defined");module.exports=function(e){return Object(defined(e))};
},{"./_defined":39}],96:[function(require,module,exports){
var isObject=require("./_is-object");module.exports=function(t,e){if(!isObject(t))return t;var r,i;if(e&&"function"==typeof(r=t.toString)&&!isObject(i=r.call(t)))return i;if("function"==typeof(r=t.valueOf)&&!isObject(i=r.call(t)))return i;if(!e&&"function"==typeof(r=t.toString)&&!isObject(i=r.call(t)))return i;throw TypeError("Can't convert object to primitive value")};

},{"./_is-object":56}],97:[function(require,module,exports){
var id=0,px=Math.random();module.exports=function(o){return"Symbol(".concat(void 0===o?"":o,")_",(++id+px).toString(36))};

},{}],98:[function(require,module,exports){
var global=require("./_global"),core=require("./_core"),LIBRARY=require("./_library"),wksExt=require("./_wks-ext"),defineProperty=require("./_object-dp").f;module.exports=function(e){var r=core.Symbol||(core.Symbol=LIBRARY?{}:global.Symbol||{});"_"==e.charAt(0)||e in r||defineProperty(r,e,{value:wksExt.f(e)})};
},{"./_core":37,"./_global":47,"./_library":64,"./_object-dp":69,"./_wks-ext":99}],99:[function(require,module,exports){
exports.f=require("./_wks");

},{"./_wks":100}],100:[function(require,module,exports){
var store=require("./_shared")("wks"),uid=require("./_uid"),Symbol=require("./_global").Symbol,USE_SYMBOL="function"==typeof Symbol,$exports=module.exports=function(o){return store[o]||(store[o]=USE_SYMBOL&&Symbol[o]||(USE_SYMBOL?Symbol:uid)("Symbol."+o))};$exports.store=store;

},{"./_global":47,"./_shared":87,"./_uid":97}],101:[function(require,module,exports){
var classof=require("./_classof"),ITERATOR=require("./_wks")("iterator"),Iterators=require("./_iterators");module.exports=require("./_core").getIteratorMethod=function(r){return void 0!=r?r[ITERATOR]||r["@@iterator"]||Iterators[classof(r)]:void 0};

},{"./_classof":35,"./_core":37,"./_iterators":62,"./_wks":100}],102:[function(require,module,exports){
"use strict";var addToUnscopables=require("./_add-to-unscopables"),step=require("./_iter-step"),Iterators=require("./_iterators"),toIObject=require("./_to-iobject");module.exports=require("./_iter-define")(Array,"Array",function(e,t){this._t=toIObject(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,s=this._i++;return!e||s>=e.length?(this._t=void 0,step(1)):"keys"==t?step(0,s):"values"==t?step(0,e[s]):step(0,[s,e[s]])},"values"),Iterators.Arguments=Iterators.Array,addToUnscopables("keys"),addToUnscopables("values"),addToUnscopables("entries");

},{"./_add-to-unscopables":31,"./_iter-define":59,"./_iter-step":61,"./_iterators":62,"./_to-iobject":93}],103:[function(require,module,exports){
var $export=require("./_export");$export($export.S+$export.F,"Object",{assign:require("./_object-assign")});

},{"./_export":44,"./_object-assign":67}],104:[function(require,module,exports){
var $export=require("./_export");$export($export.S,"Object",{create:require("./_object-create")});

},{"./_export":44,"./_object-create":68}],105:[function(require,module,exports){
var toObject=require("./_to-object"),$keys=require("./_object-keys");require("./_object-sap")("keys",function(){return function(e){return $keys(toObject(e))}});

},{"./_object-keys":77,"./_object-sap":79,"./_to-object":95}],106:[function(require,module,exports){
var $export=require("./_export");$export($export.S,"Object",{setPrototypeOf:require("./_set-proto").set});

},{"./_export":44,"./_set-proto":83}],107:[function(require,module,exports){

},{}],108:[function(require,module,exports){
"use strict";var LIBRARY=require("./_library"),global=require("./_global"),ctx=require("./_ctx"),classof=require("./_classof"),$export=require("./_export"),isObject=require("./_is-object"),anObject=require("./_an-object"),aFunction=require("./_a-function"),anInstance=require("./_an-instance"),forOf=require("./_for-of"),setProto=require("./_set-proto").set,speciesConstructor=require("./_species-constructor"),task=require("./_task").set,microtask=require("./_microtask")(),PROMISE="Promise",TypeError=global.TypeError,process=global.process,$Promise=global[PROMISE],process=global.process,isNode="process"==classof(process),empty=function(){},Internal,GenericPromiseCapability,Wrapper,USE_NATIVE=!!function(){try{var e=$Promise.resolve(1),r=(e.constructor={})[require("./_wks")("species")]=function(e){e(empty,empty)};return(isNode||"function"==typeof PromiseRejectionEvent)&&e.then(empty)instanceof r}catch(t){}}(),sameConstructor=function(e,r){return e===r||e===$Promise&&r===Wrapper},isThenable=function(e){var r;return isObject(e)&&"function"==typeof(r=e.then)?r:!1},newPromiseCapability=function(e){return sameConstructor($Promise,e)?new PromiseCapability(e):new GenericPromiseCapability(e)},PromiseCapability=GenericPromiseCapability=function(e){var r,t;this.promise=new e(function(e,o){if(void 0!==r||void 0!==t)throw TypeError("Bad Promise constructor");r=e,t=o}),this.resolve=aFunction(r),this.reject=aFunction(t)},perform=function(e){try{e()}catch(r){return{error:r}}},notify=function(e,r){if(!e._n){e._n=!0;var t=e._c;microtask(function(){for(var o=e._v,i=1==e._s,n=0,s=function(r){var t,n,s=i?r.ok:r.fail,c=r.resolve,a=r.reject,l=r.domain;try{s?(i||(2==e._h&&onHandleUnhandled(e),e._h=1),s===!0?t=o:(l&&l.enter(),t=s(o),l&&l.exit()),t===r.promise?a(TypeError("Promise-chain cycle")):(n=isThenable(t))?n.call(t,c,a):c(t)):a(o)}catch(u){a(u)}};t.length>n;)s(t[n++]);e._c=[],e._n=!1,r&&!e._h&&onUnhandled(e)})}},onUnhandled=function(e){task.call(global,function(){var r,t,o,i=e._v;if(isUnhandled(e)&&(r=perform(function(){isNode?process.emit("unhandledRejection",i,e):(t=global.onunhandledrejection)?t({promise:e,reason:i}):(o=global.console)&&o.error&&o.error("Unhandled promise rejection",i)}),e._h=isNode||isUnhandled(e)?2:1),e._a=void 0,r)throw r.error})},isUnhandled=function(e){if(1==e._h)return!1;for(var r,t=e._a||e._c,o=0;t.length>o;)if(r=t[o++],r.fail||!isUnhandled(r.promise))return!1;return!0},onHandleUnhandled=function(e){task.call(global,function(){var r;isNode?process.emit("rejectionHandled",e):(r=global.onrejectionhandled)&&r({promise:e,reason:e._v})})},$reject=function(e){var r=this;r._d||(r._d=!0,r=r._w||r,r._v=e,r._s=2,r._a||(r._a=r._c.slice()),notify(r,!0))},$resolve=function(e){var r,t=this;if(!t._d){t._d=!0,t=t._w||t;try{if(t===e)throw TypeError("Promise can't be resolved itself");(r=isThenable(e))?microtask(function(){var o={_w:t,_d:!1};try{r.call(e,ctx($resolve,o,1),ctx($reject,o,1))}catch(i){$reject.call(o,i)}}):(t._v=e,t._s=1,notify(t,!1))}catch(o){$reject.call({_w:t,_d:!1},o)}}};USE_NATIVE||($Promise=function(e){anInstance(this,$Promise,PROMISE,"_h"),aFunction(e),Internal.call(this);try{e(ctx($resolve,this,1),ctx($reject,this,1))}catch(r){$reject.call(this,r)}},Internal=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},Internal.prototype=require("./_redefine-all")($Promise.prototype,{then:function(e,r){var t=newPromiseCapability(speciesConstructor(this,$Promise));return t.ok="function"==typeof e?e:!0,t.fail="function"==typeof r&&r,t.domain=isNode?process.domain:void 0,this._c.push(t),this._a&&this._a.push(t),this._s&&notify(this,!1),t.promise},"catch":function(e){return this.then(void 0,e)}}),PromiseCapability=function(){var e=new Internal;this.promise=e,this.resolve=ctx($resolve,e,1),this.reject=ctx($reject,e,1)}),$export($export.G+$export.W+$export.F*!USE_NATIVE,{Promise:$Promise}),require("./_set-to-string-tag")($Promise,PROMISE),require("./_set-species")(PROMISE),Wrapper=require("./_core")[PROMISE],$export($export.S+$export.F*!USE_NATIVE,PROMISE,{reject:function(e){var r=newPromiseCapability(this),t=r.reject;return t(e),r.promise}}),$export($export.S+$export.F*(LIBRARY||!USE_NATIVE),PROMISE,{resolve:function(e){if(e instanceof $Promise&&sameConstructor(e.constructor,this))return e;var r=newPromiseCapability(this),t=r.resolve;return t(e),r.promise}}),$export($export.S+$export.F*!(USE_NATIVE&&require("./_iter-detect")(function(e){$Promise.all(e)["catch"](empty)})),PROMISE,{all:function(e){var r=this,t=newPromiseCapability(r),o=t.resolve,i=t.reject,n=perform(function(){var t=[],n=0,s=1;forOf(e,!1,function(e){var c=n++,a=!1;t.push(void 0),s++,r.resolve(e).then(function(e){a||(a=!0,t[c]=e,--s||o(t))},i)}),--s||o(t)});return n&&i(n.error),t.promise},race:function(e){var r=this,t=newPromiseCapability(r),o=t.reject,i=perform(function(){forOf(e,!1,function(e){r.resolve(e).then(t.resolve,o)})});return i&&o(i.error),t.promise}});

},{"./_a-function":30,"./_an-instance":32,"./_an-object":33,"./_classof":35,"./_core":37,"./_ctx":38,"./_export":44,"./_for-of":46,"./_global":47,"./_is-object":56,"./_iter-detect":60,"./_library":64,"./_microtask":66,"./_redefine-all":81,"./_set-proto":83,"./_set-species":84,"./_set-to-string-tag":85,"./_species-constructor":88,"./_task":90,"./_wks":100}],109:[function(require,module,exports){
"use strict";var $at=require("./_string-at")(!0);require("./_iter-define")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,i=this._t,e=this._i;return e>=i.length?{value:void 0,done:!0}:(t=$at(i,e),this._i+=t.length,{value:t,done:!1})});

},{"./_iter-define":59,"./_string-at":89}],110:[function(require,module,exports){
"use strict";var global=require("./_global"),has=require("./_has"),DESCRIPTORS=require("./_descriptors"),$export=require("./_export"),redefine=require("./_redefine"),META=require("./_meta").KEY,$fails=require("./_fails"),shared=require("./_shared"),setToStringTag=require("./_set-to-string-tag"),uid=require("./_uid"),wks=require("./_wks"),wksExt=require("./_wks-ext"),wksDefine=require("./_wks-define"),keyOf=require("./_keyof"),enumKeys=require("./_enum-keys"),isArray=require("./_is-array"),anObject=require("./_an-object"),toIObject=require("./_to-iobject"),toPrimitive=require("./_to-primitive"),createDesc=require("./_property-desc"),_create=require("./_object-create"),gOPNExt=require("./_object-gopn-ext"),$GOPD=require("./_object-gopd"),$DP=require("./_object-dp"),$keys=require("./_object-keys"),gOPD=$GOPD.f,dP=$DP.f,gOPN=gOPNExt.f,$Symbol=global.Symbol,$JSON=global.JSON,_stringify=$JSON&&$JSON.stringify,PROTOTYPE="prototype",HIDDEN=wks("_hidden"),TO_PRIMITIVE=wks("toPrimitive"),isEnum={}.propertyIsEnumerable,SymbolRegistry=shared("symbol-registry"),AllSymbols=shared("symbols"),OPSymbols=shared("op-symbols"),ObjectProto=Object[PROTOTYPE],USE_NATIVE="function"==typeof $Symbol,QObject=global.QObject,setter=!QObject||!QObject[PROTOTYPE]||!QObject[PROTOTYPE].findChild,setSymbolDesc=DESCRIPTORS&&$fails(function(){return 7!=_create(dP({},"a",{get:function(){return dP(this,"a",{value:7}).a}})).a})?function(e,r,t){var o=gOPD(ObjectProto,r);o&&delete ObjectProto[r],dP(e,r,t),o&&e!==ObjectProto&&dP(ObjectProto,r,o)}:dP,wrap=function(e){var r=AllSymbols[e]=_create($Symbol[PROTOTYPE]);return r._k=e,r},isSymbol=USE_NATIVE&&"symbol"==typeof $Symbol.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof $Symbol},$defineProperty=function(e,r,t){return e===ObjectProto&&$defineProperty(OPSymbols,r,t),anObject(e),r=toPrimitive(r,!0),anObject(t),has(AllSymbols,r)?(t.enumerable?(has(e,HIDDEN)&&e[HIDDEN][r]&&(e[HIDDEN][r]=!1),t=_create(t,{enumerable:createDesc(0,!1)})):(has(e,HIDDEN)||dP(e,HIDDEN,createDesc(1,{})),e[HIDDEN][r]=!0),setSymbolDesc(e,r,t)):dP(e,r,t)},$defineProperties=function(e,r){anObject(e);for(var t,o=enumKeys(r=toIObject(r)),i=0,s=o.length;s>i;)$defineProperty(e,t=o[i++],r[t]);return e},$create=function(e,r){return void 0===r?_create(e):$defineProperties(_create(e),r)},$propertyIsEnumerable=function(e){var r=isEnum.call(this,e=toPrimitive(e,!0));return this===ObjectProto&&has(AllSymbols,e)&&!has(OPSymbols,e)?!1:r||!has(this,e)||!has(AllSymbols,e)||has(this,HIDDEN)&&this[HIDDEN][e]?r:!0},$getOwnPropertyDescriptor=function(e,r){if(e=toIObject(e),r=toPrimitive(r,!0),e!==ObjectProto||!has(AllSymbols,r)||has(OPSymbols,r)){var t=gOPD(e,r);return!t||!has(AllSymbols,r)||has(e,HIDDEN)&&e[HIDDEN][r]||(t.enumerable=!0),t}},$getOwnPropertyNames=function(e){for(var r,t=gOPN(toIObject(e)),o=[],i=0;t.length>i;)has(AllSymbols,r=t[i++])||r==HIDDEN||r==META||o.push(r);return o},$getOwnPropertySymbols=function(e){for(var r,t=e===ObjectProto,o=gOPN(t?OPSymbols:toIObject(e)),i=[],s=0;o.length>s;)has(AllSymbols,r=o[s++])&&(t?has(ObjectProto,r):!0)&&i.push(AllSymbols[r]);return i};USE_NATIVE||($Symbol=function(){if(this instanceof $Symbol)throw TypeError("Symbol is not a constructor!");var e=uid(arguments.length>0?arguments[0]:void 0),r=function(t){this===ObjectProto&&r.call(OPSymbols,t),has(this,HIDDEN)&&has(this[HIDDEN],e)&&(this[HIDDEN][e]=!1),setSymbolDesc(this,e,createDesc(1,t))};return DESCRIPTORS&&setter&&setSymbolDesc(ObjectProto,e,{configurable:!0,set:r}),wrap(e)},redefine($Symbol[PROTOTYPE],"toString",function(){return this._k}),$GOPD.f=$getOwnPropertyDescriptor,$DP.f=$defineProperty,require("./_object-gopn").f=gOPNExt.f=$getOwnPropertyNames,require("./_object-pie").f=$propertyIsEnumerable,require("./_object-gops").f=$getOwnPropertySymbols,DESCRIPTORS&&!require("./_library")&&redefine(ObjectProto,"propertyIsEnumerable",$propertyIsEnumerable,!0),wksExt.f=function(e){return wrap(wks(e))}),$export($export.G+$export.W+$export.F*!USE_NATIVE,{Symbol:$Symbol});for(var symbols="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),i=0;symbols.length>i;)wks(symbols[i++]);for(var symbols=$keys(wks.store),i=0;symbols.length>i;)wksDefine(symbols[i++]);$export($export.S+$export.F*!USE_NATIVE,"Symbol",{"for":function(e){return has(SymbolRegistry,e+="")?SymbolRegistry[e]:SymbolRegistry[e]=$Symbol(e)},keyFor:function(e){if(isSymbol(e))return keyOf(SymbolRegistry,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){setter=!0},useSimple:function(){setter=!1}}),$export($export.S+$export.F*!USE_NATIVE,"Object",{create:$create,defineProperty:$defineProperty,defineProperties:$defineProperties,getOwnPropertyDescriptor:$getOwnPropertyDescriptor,getOwnPropertyNames:$getOwnPropertyNames,getOwnPropertySymbols:$getOwnPropertySymbols}),$JSON&&$export($export.S+$export.F*(!USE_NATIVE||$fails(function(){var e=$Symbol();return"[null]"!=_stringify([e])||"{}"!=_stringify({a:e})||"{}"!=_stringify(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!isSymbol(e)){for(var r,t,o=[e],i=1;arguments.length>i;)o.push(arguments[i++]);return r=o[1],"function"==typeof r&&(t=r),!t&&isArray(r)||(r=function(e,r){return t&&(r=t.call(this,e,r)),isSymbol(r)?void 0:r}),o[1]=r,_stringify.apply($JSON,o)}}}),$Symbol[PROTOTYPE][TO_PRIMITIVE]||require("./_hide")($Symbol[PROTOTYPE],TO_PRIMITIVE,$Symbol[PROTOTYPE].valueOf),setToStringTag($Symbol,"Symbol"),setToStringTag(Math,"Math",!0),setToStringTag(global.JSON,"JSON",!0);

},{"./_an-object":33,"./_descriptors":40,"./_enum-keys":43,"./_export":44,"./_fails":45,"./_global":47,"./_has":48,"./_hide":49,"./_is-array":55,"./_keyof":63,"./_library":64,"./_meta":65,"./_object-create":68,"./_object-dp":69,"./_object-gopd":71,"./_object-gopn":73,"./_object-gopn-ext":72,"./_object-gops":74,"./_object-keys":77,"./_object-pie":78,"./_property-desc":80,"./_redefine":82,"./_set-to-string-tag":85,"./_shared":87,"./_to-iobject":93,"./_to-primitive":96,"./_uid":97,"./_wks":100,"./_wks-define":98,"./_wks-ext":99}],111:[function(require,module,exports){
require("./_wks-define")("asyncIterator");
},{"./_wks-define":98}],112:[function(require,module,exports){
require("./_wks-define")("observable");

},{"./_wks-define":98}],113:[function(require,module,exports){
require("./es6.array.iterator");for(var global=require("./_global"),hide=require("./_hide"),Iterators=require("./_iterators"),TO_STRING_TAG=require("./_wks")("toStringTag"),collections=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],i=0;5>i;i++){var NAME=collections[i],Collection=global[NAME],proto=Collection&&Collection.prototype;proto&&!proto[TO_STRING_TAG]&&hide(proto,TO_STRING_TAG,NAME),Iterators[NAME]=Iterators.Array}

},{"./_global":47,"./_hide":49,"./_iterators":62,"./_wks":100,"./es6.array.iterator":102}],114:[function(require,module,exports){
require("whatwg-fetch"),module.exports=self.fetch.bind(self);
},{"whatwg-fetch":116}],115:[function(require,module,exports){
function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=setTimeout(cleanUpNextTick);draining=!0;for(var n=queue.length;n;){for(currentQueue=queue,queue=[];++queueIndex<n;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,n=queue.length}currentQueue=null,draining=!1,clearTimeout(e)}}function Item(e,n){this.fun=e,this.array=n}function noop(){}var process=module.exports={},queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];queue.push(new Item(e,n)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};

},{}],116:[function(require,module,exports){
!function(t){"use strict";function e(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function r(t){return"string"!=typeof t&&(t=String(t)),t}function o(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return y.iterable&&(e[Symbol.iterator]=function(){return e}),e}function n(t){this.map={},t instanceof n?t.forEach(function(t,e){this.append(e,t)},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function s(t){return t.bodyUsed?Promise.reject(new TypeError("Already read")):void(t.bodyUsed=!0)}function i(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function a(t){var e=new FileReader;return e.readAsArrayBuffer(t),i(e)}function h(t){var e=new FileReader;return e.readAsText(t),i(e)}function u(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,"string"==typeof t)this._bodyText=t;else if(y.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(y.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(y.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(t){if(!y.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t))throw new Error("unsupported BodyInit type")}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):y.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},y.blob?(this.blob=function(){var t=s(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this.blob().then(a)},this.text=function(){var t=s(this);if(t)return t;if(this._bodyBlob)return h(this._bodyBlob);if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)}):this.text=function(){var t=s(this);return t?t:Promise.resolve(this._bodyText)},y.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function f(t){var e=t.toUpperCase();return b.indexOf(e)>-1?e:t}function d(t,e){e=e||{};var r=e.body;if(d.prototype.isPrototypeOf(t)){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new n(t.headers)),this.method=t.method,this.mode=t.mode,r||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=t;if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new n(e.headers)),this.method=f(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function c(t){var e=new n,r=(t.getAllResponseHeaders()||"").trim().split("\n");return r.forEach(function(t){var r=t.trim().split(":"),o=r.shift().trim(),n=r.join(":").trim();e.append(o,n)}),e}function l(t,e){e||(e={}),this.type="default",this.status=e.status,this.ok=this.status>=200&&this.status<300,this.statusText=e.statusText,this.headers=e.headers instanceof n?e.headers:new n(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var y={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};n.prototype.append=function(t,o){t=e(t),o=r(o);var n=this.map[t];n||(n=[],this.map[t]=n),n.push(o)},n.prototype["delete"]=function(t){delete this.map[e(t)]},n.prototype.get=function(t){var r=this.map[e(t)];return r?r[0]:null},n.prototype.getAll=function(t){return this.map[e(t)]||[]},n.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},n.prototype.set=function(t,o){this.map[e(t)]=[r(o)]},n.prototype.forEach=function(t,e){Object.getOwnPropertyNames(this.map).forEach(function(r){this.map[r].forEach(function(o){t.call(e,o,r,this)},this)},this)},n.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),o(t)},n.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),o(t)},n.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),o(t)},y.iterable&&(n.prototype[Symbol.iterator]=n.prototype.entries);var b=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this)},u.call(d.prototype),u.call(l.prototype),l.prototype.clone=function(){return new l(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new n(this.headers),url:this.url})},l.error=function(){var t=new l(null,{status:0,statusText:""});return t.type="error",t};var m=[301,302,303,307,308];l.redirect=function(t,e){if(-1===m.indexOf(e))throw new RangeError("Invalid status code");return new l(null,{status:e,headers:{location:t}})},t.Headers=n,t.Request=d,t.Response=l,t.fetch=function(t,e){return new Promise(function(r,o){function n(){return"responseURL"in i?i.responseURL:/^X-Request-URL:/m.test(i.getAllResponseHeaders())?i.getResponseHeader("X-Request-URL"):void 0}var s;s=d.prototype.isPrototypeOf(t)&&!e?t:new d(t,e);var i=new XMLHttpRequest;i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:c(i),url:n()},e="response"in i?i.response:i.responseText;r(new l(e,t))},i.onerror=function(){o(new TypeError("Network request failed"))},i.ontimeout=function(){o(new TypeError("Network request failed"))},i.open(s.method,s.url,!0),"include"===s.credentials&&(i.withCredentials=!0),"responseType"in i&&y.blob&&(i.responseType="blob"),s.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),i.send("undefined"==typeof s._bodyInit?null:s._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!=typeof self?self:this);
},{}],117:[function(require,module,exports){
module.exports={
  "name": "smooch-core",
  "version": "1.2.1",
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
    "release": "release",
    "lint": "eslint . --ext=js --ext=jsx"
  },
  "author": "Marc-Antoine Lemieux",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git@github.com:smooch/smooch-core-js.git"
  },
  "devDependencies": {
    "babel": "6.5.2",
    "babel-cli": "6.9.0",
    "babel-core": "6.9.0",
    "babel-eslint": "6.0.4",
    "babel-plugin-transform-runtime": "6.9.0",
    "babel-preset-es2015": "6.9.0",
    "babel-preset-es2015-loose": "7.0.0",
    "babel-preset-stage-2": "6.5.0",
    "babel-runtime": "6.9.0",
    "browserify": "12.0.1",
    "chai": "3.4.1",
    "esformatter": "0.9.2",
    "esformatter-braces": "1.2.1",
    "esformatter-dot-notation": "1.3.1",
    "esformatter-quotes": "1.0.3",
    "eslint": "2.3.0",
    "estraverse-fb": "1.3.1",
    "mocha": "2.3.3",
    "mocha-junit-reporter": "1.9.0",
    "release-script": "0.5.4",
    "should": "7.1.1",
    "sinon": "1.17.2",
    "sinon-chai": "2.8.0",
    "streamifier": "0.1.1",
    "uglifyify": "3.0.1",
    "uglifyjs": "2.4.10"
  },
  "dependencies": {
    "form-data": "0.2.0",
    "isomorphic-fetch": "2.2.0",
    "jsonwebtoken": "5.4.1"
  },
  "peerDependencies": {
    "babel-runtime": "6.9.x"
  },
  "release-script": {
    "bowerRepo": "git@github.com:smooch/smooch-core-js-bower.git"
  }
}

},{}]},{},[6])(6)
});