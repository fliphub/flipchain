const deepmerge = require('deepmerge')
const Chainable = require('./Chainable')

class ChainedMap extends Chainable {

  /**
   * @param {ChainedMap | Chainable | any} parent
   */
  constructor(parent) {
    super(parent)
    this.shorthands = []
    this.chainableMethods = []
    this.store = new Map()

    if (!this.name) this.name = this.constructor.name
    this.className = this.constructor.name
  }

  // @TODO: depreciate these 3
  new(parent) {
    return new this(parent || this)
  }
  and() {
    if (this.parent.parent) return this.parent.parent
    return this.parent
  }
  use(obj) {
    return this.merge(obj).parent
  }

  /**
   * checks each property of the object
   * calls the chains accordingly
   *
   * @param {Object} obj
   * @return {Chainable}
   */
  from(obj) {
    Object.keys(obj).forEach(key => {
      const fn = this[key]
      const value = obj[key]

      if (this[key] && this[key] instanceof Chainable) {
        return this[key].merge(value)
      }
      else if (typeof this[key] === 'function') {
        // const fnStr = typeof fn === 'function' ? fn.toString() : ''
        // if (fnStr.includes('return this') || fnStr.includes('=> this')) {
        return this[key](value)
      }
      else {
        this.set(key, value)
      }
    })
    return this
  }

  /**
   * @description shorthand methods, from strings to functions that call .set
   * @param  {Array<string>} methods
   * @return {ChainedMap}
   */
  extend(methods) {
    this.shorthands = methods
    methods.forEach(method => {
      this[method] = value => this.set(method, value)
    })
    return this
  }

  /**
   * @description
   *   clears the map,
   *   goes through this properties,
   *   calls .clear if they are instanceof Chainable or Map
   *
   * @return {ChainedMap}
   */
  clear() {
    this.store.clear()
    Object.keys(this).forEach(key => {
      if (key === 'inspect') return
      if (this[key] instanceof Chainable) this[key].clear()
      if (this[key] instanceof Map) this[key].clear()
    })
    return this
  }

  /**
   * @description spreads the entries from ChainedMap.store (Map)
   * @return {Object}
   */
  entries() {
    const entries = [...this.store]
    if (!entries.length) {
      return null
    }
    return entries.reduce((acc, [key, value]) => {
      acc[key] = value
      return acc
    }, {})
  }

  /**
   * @description spreads the entries from ChainedMap.store.values
   * @return {Array<any>}
   */
  values() {
    return [...this.store.values()]
  }

  /**
   * @param  {any} key
   * @return {any}
   */
  get(key) {
    return this.store.get(key)
  }

  /**
   * @description sets the value using the key on store
   * @see ChainedMap.store
   * @param {any} key
   * @param {any} value
   * @return {ChainedMap}
   */
  set(key, value) {
    this.store.set(key, value)
    return this
  }

  /**
   * @description concats an array `value` in the store with the `key`
   * @see ChainedMap.store
   * @param {any} key
   * @param {Array<any>} value
   * @return {ChainedMap}
   */
  concat(key, value) {
    if (!Array.isArray(value)) value = [value]
    this.store.set(key, this.store.get(value).concat(value))
    return this
  }

  /**
   * @description appends the string value to the current value at the `key`
   * @see ChainedMap.concat
   * @param {any} key
   * @param {string | Array} value
   * @return {ChainedMap}
   */
  append(key, value) {
    let existing = this.store.get(value)

    if (Array.isArray(existing)) {
      existing.push(value)
    }
    else {
      existing += value
    }

    this.store.set(key, existing)

    return this
  }

  /**
   * @description same as .merge, but will set instead of merge
   * @see ChainedMap.merge
   * @param  {Object} obj
   * @return {ChainedMap}
   */
  override(obj) {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      if (this[key] && this[key] instanceof Chainable) {
        return this[key].override(value)
      }
      if (this.shorthands.includes(key)) {
        return this[key](value)
      }
      return this.set(key, value)
    })
    return this
  }

  /**
   * @description same as .merge, but only not `null` & `undefined` values
   * @see ChainedMap.merge
   * @param  {Object} obj
   * @return {ChainedMap}
   */
  mergeReal(obj) {
    Object.keys(obj).filter(key => obj[key]).forEach(key => {
      const value = obj[key]
      if (!value) return this

      if (this[key] && this[key] instanceof Chainable) {
        return this[key].merge(value)
      }

      if (this.shorthands.includes(key)) {
        const existing = this.get(key)
        if (existing) {
          if (existing === value) return this
          if (typeof existing === 'string') return this[key]([existing, value])
          const merged = deepmerge(existing, value)
          return this[key](merged)
        }

        return this[key](value)
      }

      // if (this[key])
      return this.set(key, value)
    })

    return this
  }

  /**
   * @description merges an object with the current store
   * @see deepmerge
   * @param {Object} obj
   * @return {ChainedMap}
   */
  merge(obj) {
    if (
      obj.toConfig !== undefined &&
      obj.toConfig !== null &&
      typeof obj.toConfig === 'function'
    ) {
      const msg = 'when merging two chains, first call .toConfig'
      const validation = new Error(msg)

      let log
      try {
        log = require('fliplog').verbose(2).data(validation).preset('error')
      }
      catch (e) {
        log = console
      }
      log.log(validation)
      throw validation
      return this
    }
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      if (this[key] && this[key] instanceof Chainable)
        return this[key].merge(value)
      if (this.shorthands.includes(key)) {
        const existing = this.get(key)
        if (existing) {
          const merged = deepmerge(existing, value)
          return this[key](merged)
        }

        return this[key](value)
      }
      // if (this[key])
      return this.set(key, value)
    })
    return this
  }

  /**
   * @description
   *  goes through the maps,
   *  and the map values,
   *  reduces them to array
   *  then to an object using the reduced values
   *
   * @param {Object} obj
   * @return {Object}
   */
  clean(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key]
      if (value === undefined) return acc
      if (Array.isArray(value) && !value.length) return acc
      if (
        Object.prototype.toString.call(value) === '[object Object]' &&
        Object.keys(value).length === 0
      ) {
        return acc
      }

      acc[key] = value

      return acc
    }, {})
  }

  /**
   * @param  {any} key
   * @param  {Function} [trueBrancher=Function.prototype]
   * @param  {Function} [falseBrancher=Function.prototype]
   * @return {ChainedMap}
   */
  whenHas(
    key,
    trueBrancher = Function.prototype,
    falseBrancher = Function.prototype
  ) {
    if (this.has(key) === true) {
      trueBrancher(this.get(key), this)
    }
    else {
      falseBrancher(false, this)
    }
    return this
  }

  /**
   * @description
   *  when the condition is true,
   *  trueBrancher is called,
   *  else, falseBrancher is called
   *
   * @param  {boolean} condition
   * @param  {Function} [trueBrancher=Function.prototype]
   * @param  {Function} [falseBrancher=Function.prototype]
   * @return {ChainedMap}
   */
  when(
    condition,
    trueBrancher = Function.prototype,
    falseBrancher = Function.prototype
  ) {
    if (condition) {
      trueBrancher(this)
    }
    else {
      falseBrancher(this)
    }

    return this
  }
}

module.exports = ChainedMap
