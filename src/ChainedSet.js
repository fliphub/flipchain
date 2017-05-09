const Chainable = require('./Chainable')

/**
 * @type {Set}
 */
class ChainedSet extends Chainable {

  /**
   * @param {ChainedSet | Chainable | any} parent
   */
  constructor(parent) {
    super(parent)
    this.store = new Set()
  }

  /**
   * @param {any} value
   * @return {ChainedSet}
   */
  add(value) {
    this.store.add(value)
    return this
  }

  /**
   * @description inserts the value at the beginning of the Set
   * @param {any} value
   * @return {ChainedSet}
   */
  prepend(value) {
    this.store = new Set([value, ...this.store])
    return this
  }

  /**
   * @return {Array<any>}
   */
  values() {
    return [...this.store]
  }

  /**
   * @param {Array | Set} arr
   * @return {ChainedSet}
   */
  merge(arr) {
    this.store = new Set([...this.store, ...arr])
    return this
  }

  /**
   * @override
   * @return {ChainedSet}
   */
  clear() {
    this.store.clear()
    return this
  }

  /**
   * @override
   * @param {any} value
   * @return {ChainedSet}
   */
  delete(value) {
    this.store.delete(value)
    return this
  }

  /**
   * @override
   * @param {any} value
   * @return {boolean}
   */
  has(value) {
    return this.store.has(value)
  }
}

module.exports = ChainedSet
