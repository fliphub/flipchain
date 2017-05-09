const test = require('ava')
const ChainedMap = require('../dist/ChainedMapExtendable')

class EasyFluent extends ChainedMap {
  constructor(parent) {
    super(parent)

    // extend a list of strings for easy chainable methods
    this.extend(['eh'])

    // same as .extend,
    // but when called with no arguments,
    // default is used (`true` in this case)
    // third param is optionally a prefix for inversified
    // for example, `no` => `noCanada()` for inverse value
    this.extendPrefixed(['canada'], true, 'no')
  }

  // if more advanced data changes are needed
  // or if the syntax is preferred for use with typescript or flowtype
  // .set, .get, .has are available
  igloo(igloo) {
    this.set('igloo', igloo)
    return this
  }

  toConfig() {
    return this.entries()
  }
}

test('entries', t => {
  const config = new EasyFluent()
    .igloo('fire')
    .noCanada()
    .eh('moose')
    .toConfig()
  t.deepEqual(config, {igloo: 'fire', canada: false, eh: 'moose', debug: false})
})

test('easy', t => {
  const config = new EasyFluent()
    .igloo('fire')
    .noCanada()
    .eh('moose')
    .toConfig()

  // this is == config
  const hydrated = new EasyFluent().from(config).toConfig()

  t.deepEqual(hydrated, config)

  // canada is now true
  const merged = new EasyFluent().merge(config).merge({canada: true}).toConfig()

  t.true(merged.canada)
})
