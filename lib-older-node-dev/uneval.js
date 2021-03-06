'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = uneval;
/* global PRODUCTION */
function uneval(obj) {
  var objects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();

  switch (obj) {
    case null:
      return 'null';
    case undefined:
      return 'undefined';
    case Infinity:
      return 'Infinity';
    case -Infinity:
      return '-Infinity';
  }

  if (Number.isNaN(obj)) {
    return 'NaN';
  }

  switch (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) {
    case 'function':
      console.log(obj);
      throw new Error('Unsupported function.');
    case 'string':
    case 'number':
    case 'boolean':
      return JSON.stringify(obj);
  }

  if (objects.has(obj)) {
    throw new Error('Circular reference detected.');
  }

  objects.add(obj);

  // specialized types
  if (obj instanceof Array) {
    return '[' + obj.map(function (o) {
      return uneval(o, objects);
    }).join(',') + ']';
  }

  if (obj instanceof Date) {
    return 'new Date(' + obj.getTime() + ')';
  }

  if (obj instanceof Set) {
    return 'new Set(' + uneval(Array.from(obj)) + ')';
  }

  if (obj instanceof Map) {
    return 'new Map(' + uneval(Array.from(obj)) + ')';
  }

  return '{' + Object.keys(obj).map(function (key) {
    return JSON.stringify(key) + ':' + uneval(obj[key]);
  }).join(',') + '}';
}
//# sourceMappingURL=uneval.js.map