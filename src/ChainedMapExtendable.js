const arrToObj = require('arr-to-obj')
const ChainedMap = require('./ChainedMap')
const Chainable = require('./Chainable')

const firstToUpper = str => str.charAt(0).toUpperCase() + str.slice(1)
const addPrefix = (string, prefix) => prefix + firstToUpper(string)
function removePrefix(string, prefix) {
  if (string.indexOf(prefix) === 0) string = string.slice(prefix.length)
  return string.charAt(0).toLowerCase() + string.slice(1)
}

// @TODO: extendBool which would add `no` firstChar.toUpperCase() + rest()
//
// maybe was doing this to bind the prefix variable?
// this.extendWith(methods.map((method) => (0, addPrefix)(method, prefix)), !val, prefix)

class ChainedMapExtendable extends ChainedMap {
  constructor(parent) {
    super(parent)

    if (parent && parent.has && parent.has('debug')) {
      this.debug(parent.get('debug'))
    }
    else {
      this.debug(false)
    }
  }

  // remove...
  fromAnd(obj) {
    let p = this.merge(obj).parent
    while (p.parent) {
      p = p.parent
    }
    return p
  }

  /**
   * @param {boolean} [should=true]
   * @return {Chainable}
   */
  debug(should = true) {
    return this.set('debug', should)
  }

  /**
   * @see ChainedMapExtendable.parent
   * @param  {Array<Object>} decorations
   * @return {ChainedMapExtendable}
   */
  decorateParent(decorations) {
    if (!this.decorated) this.decorated = new ChainedMap(this.parent)
    decorations.forEach(decoration => {
      const method = decoration.method
      const returnee = decoration.return || this.parent
      const key = decoration.key || method
      this.parent[method] = data => {
        this.set(key, data)
        return returnee
      }
    })
    return this
  }

  /**
   * @param  {Array<string>} methods
   * @param  {string}  name
   * @param  {Boolean} [thisArg=null]
   * @return {ChainedMap}
   */
  extendAlias(methods, name, thisArg = null) {
    methods.forEach(method => (this[method] = this[name].bind(thisArg || this)))
    return this
  }

  /**
   * @param {string} name
   * @param {Object} Chain
   * @return {ChainedMapExtendable}
   */
  addChain(name, Chain) {
    // making name available as a property on chainable
    if (typeof name !== 'string') Chain = name
    const chained = new Chain(this)
    name = chained.name || name
    this[name] = chained
    this.chains.push(name)
    return this
  }

  /**
   * @see ChainedMapExtendable.extendPrefixed
   * @param {Array<string>} methods
   * @param {any} val
   * @param {string} [prefix='no']
   * @return {ChainedMapExtendable}
   */
  extendBool(methods, val, prefix = 'no') {
    this.extendPrefixed(methods, !val, prefix)
    return this
  }

  /**
   * @param {Array<string>} methods
   * @param {any} val
   * @param {string} [prefix='no']
   * @param {string} [inverseValue='todo']
   * @return {ChainedMapExtendable}
   */
  extendPrefixed(methods, val, prefix = 'no', inverseValue = 'todo') {
    this.extendWith(methods, val)
    this.extendWith(
      methods.map(method => addPrefix(method, prefix)),
      !val,
      prefix
    )
    return this
  }

  /**
   * @desc add methods for keys with default values,
   *       and inverse functions to set the value to the opposite
   * @param {Array<string>} methods
   * @param {any} val
   * @param {string} [prefix]
   * @return {ChainedMapExtendable}
   */
  extendWith(methods, val, prefix) {
    const objMethods = arrToObj(methods, val)
    const keys = Object.keys(objMethods)
    this.shorthands = [...this.shorthands, ...keys]
    keys.forEach(method => {
      // value = objMethods[method]
      this[method] = value => {
        if (value === undefined || value === null) value = val
        if (prefix) return this.set(removePrefix(method, prefix), value)
        return this.set(method, value)
      }
    })
    return this
  }

  /**
   * @see ChainedMapExtendable.extendWith
   * @param {Array<string>} methods
   * @return {ChainedMapExtendable}
   */
  extendFalse(methods) {
    this.extendWith(methods, false)
    return this
  }

  /**
   * @see ChainedMapExtendable.extendWith
   * @param {Array<string>} methods
   * @return {ChainedMapExtendable}
   */
  extendTrue(methods) {
    this.extendWith(methods, true)
    return this
  }

  /**
   * @description
   *  extend with string types of izz
   *  if it is that type, good, otherwise, nope.
   *
   * @TODO finish this
   * @see izz
   *
   * @param  {Array<string>} methods
   * @param  {any}  type
   * @param  {string | any} [msg=null]
   * @return {ChainedMap}
   */
  extendType(methods, type, msg = null) {
    const is = require('izz')
    methods.forEach(method => {
      this.shorthands.push(method)
      this[method] = value => {
        if (!is[type](value)) {
          if (msg) console.log(msg)
          return this
        }

        this.set(method, value)
        return this
      }
    })
    return this
  }

  /**
   * @description when called, increments the value
   * @param  {Array<string>} methods
   * @return {ChainedMap}
   */
  extendIncrement(methods) {
    // every time it is called, just increment
    // add to this.shorthands
    methods.forEach(method => {
      this.shorthands.push(method)
      this[method] = () => {
        let value = (this.get(method) | 0) + 1
        this.set(method, value)
        return this
      }
    })
    return this
  }

  /**
   * @description uses an object, loops through keys, adds method
   * @see ChainedMapExtendable.shorthands
   *
   * @param  {Object} methods
   * @return {ChainedMap}
   */
  extendDefault(methods) {
    this.shorthands = [...this.shorthands, ...methods]

    Object.keys(methods).forEach(method => {
      this[method] = (value = methods[method]) => this.set(method, value)
    })

    return this
  }
}

/**
 * @desc function callable ChainedMapExtendable
 * @param {Chainable | Object | null | *} [obj=null] parent when chainable, or `.from`
 * @param {Object | null | *} [from={}] `.from` when `obj` is `chainable`
 * @return {ChainedMapExtendable}
 */
function Chainables(obj = null, from = {}) {
  if (
    obj &&
    (obj instanceof Chainable ||
      obj instanceof Chainables ||
      obj.store !== undefined)
  ) {
    const chain = new ChainedMapExtendable(obj)
    if (from !== null) chain.from(from)
    return chain
  }
  return new ChainedMapExtendable().from(obj)
}

module.exports = ChainedMapExtendable
