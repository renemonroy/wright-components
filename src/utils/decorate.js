const _this = undefined;
const initSymbol = 'decorate:init';
const defineProperty = Object.defineProperty;
const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
const hasOwnProperty = Object.hasOwnProperty;
const ownKeys = Reflect.ownKeys;
const hasInstance = Symbol.hasInstance;

const invoke = (init) => {
  init.call(_this);
};

export default (compose, shared = {}) => {
  const componentKeys = ownKeys(compose);
  const decorationKeys = ownKeys(shared);
  const compKeysSize = componentKeys.length;
  const decorKeysSize = decorationKeys.length;
  const typeTag = Symbol('isA');
  const _decorate = (comp) => {
    const proto = comp.prototype || comp;
    for (let i = 0; i < compKeysSize; i += 1) {
      const prop = componentKeys[i];
      if (prop === 'init') {
        if (!hasOwnProperty.call(proto, initSymbol)) {
          defineProperty(proto, initSymbol, {
            value: [],
          });
          defineProperty(proto, prop, {
            value: function init() {
              this[initSymbol].forEach(invoke, this);
            },
          });
        }
        proto[initSymbol].push(compose[prop]);
      } else if (!hasOwnProperty.call(proto, prop)) {
        const d = getOwnPropertyDescriptor(compose, prop);
        d.enumerable = false;
        defineProperty(proto, prop, d);
      }
    }
    if (hasInstance) {
      defineProperty(proto, typeTag, {
        value: true,
      });
    }
    return comp;
  };
  for (let i = 0; i < decorKeysSize; i += 1) {
    const prop = decorationKeys[i];
    const d = getOwnPropertyDescriptor(compose, prop);
    d.enumerable = {}.propertyIsEnumerable.call(shared, prop);
    defineProperty(_decorate, prop, d);
  }
  defineProperty(_decorate, hasInstance, {
    value: i => !!i[typeTag],
  });
  return _decorate;
};
