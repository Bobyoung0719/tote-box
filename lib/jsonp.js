(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jsonp"] = factory();
	else
		root["ToteBox"] = root["ToteBox"] || {}, root["ToteBox"]["jsonp"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return jsonp; });
/*
 * url: string
 * settings: object
 *   jsonpCallback: string
 *   timeout: number
 *   done: function
 *   fail: function
 */
function jsonp(url, settings) {
  var script = document.createElement('script');
  var obj = void 0,
      props = void 0,
      jsonpCallback = void 0,
      response = void 0,
      i = void 0,
      timer = void 0;

  script.type = 'text/javascript';

  jsonpCallback = settings.jsonpCallback;

  if (jsonpCallback.indexOf('.') !== -1) {
    props = jsonpCallback.split('.');
    window[props[0]] = obj = {};

    for (i = 1; i < props.length; i++) {
      if (i < props.length - 1) {
        obj = obj[props[i]] = {};
      } else {
        obj[props[i]] = function () {
          response = arguments[0];
        };
      }
    }
  } else {
    window[jsonpCallback] = function () {
      response = arguments[0];
    };
  }

  if (settings.timeout) {
    timer = setTimeout(function () {
      delete settings.done;
      if (typeof settings.fail === 'function') {
        settings.fail();
      }
    }, settings.timeout);
  }

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        clearTimeout(timer);

        if (typeof settings.done === 'function') {
          settings.done(response);
        }
      }
    };
  } else {
    script.onload = function () {
      clearTimeout(timer);

      if (typeof settings.done === 'function') {
        settings.done(response);
      }
    };
  }

  script.src = url;
  (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
}

/***/ })

/******/ });
});