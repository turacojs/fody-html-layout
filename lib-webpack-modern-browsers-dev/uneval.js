/* global PRODUCTION */
export default function uneval(obj) {
  var objects = arguments.length <= 1 || arguments[1] === undefined ? new Set() : arguments[1];

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

  switch (typeof obj) {
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
    return `[${ obj.map(o => uneval(o, objects)).join(',') }]`;
  }

  if (obj instanceof Date) {
    return `new Date(${ obj.getTime() })`;
  }

  if (obj instanceof Set) {
    return `new Set(${ uneval(Array.from(obj)) })`;
  }

  if (obj instanceof Map) {
    return `new Map(${ uneval(Array.from(obj)) })`;
  }

  return `{${ Object.keys(obj).map(key => `${ JSON.stringify(key) }:${ uneval(obj[key]) }`).join(',') }}`;
}
//# sourceMappingURL=uneval.js.map