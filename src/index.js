const Boss = require('likeaboss')
const ChainedMapExtendable = require('./ChainedMapExtendable')

Boss.module(module)
  .dir(__dirname)
  .main(ChainedMapExtendable)
  .dynamics('', [
    'Chainable',
    'ChainedSet',
    'ChainedMap',
    'ChainedMapExtendable',
  ])
  .end()
