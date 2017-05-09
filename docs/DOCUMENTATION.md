# [flipchain](https://github.com/fliphub/fliphub#readme) *0.4.5*

> core chaining library, heavily based on [webpack-chain](https://github.com/mozilla-rpweb/webpack-chain)


### stripped/Chainable.js


#### new Chainable() 







##### Properties

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |



##### Returns


- `Void`



#### Chainable.constructor(parent) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `any`  |  | &nbsp; |




##### Returns


- `Void`



#### Chainable.end() 








##### Returns


- `Chainable` `any`  



#### Chainable.whenHas(key) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| key | `any`  |  | &nbsp; |
| trueBrancher&#x3D;Function.prototype | `Function`  |  | *Optional* |
| falseBrancher&#x3D;Function.prototype | `Function`  |  | *Optional* |




##### Returns


- `ChainedMap`  



#### Chainable.when(condition) 

when the condition is true,
 trueBrancher is called,
 else, falseBrancher is called




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| condition | `boolean`  |  | &nbsp; |
| trueBrancher&#x3D;Function.prototype | `Function`  |  | *Optional* |
| falseBrancher&#x3D;Function.prototype | `Function`  |  | *Optional* |




##### Returns


- `ChainedMap`  



#### Chainable.*[Symbol.iterator]() 








##### Returns


- `Void`



#### Chainable.length() 








##### Returns


- `number`  



#### Chainable.clear() 








##### Returns


- `Chainable`  



#### Chainable.delete(key) 

calls .delete on this.store.map




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| key | `string` `any`  |  | &nbsp; |




##### Returns


- `Chainable`  



#### Chainable.has(value) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `any`  |  | &nbsp; |




##### Returns


- `boolean`  




### stripped/ChainedMap.js


#### constructor(parent) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `any`  |  | &nbsp; |




##### Returns


- `Void`



#### from(obj) 

checks each property of the object
calls the chains accordingly




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  |  | &nbsp; |




##### Returns


- `Chainable`  



#### extend(methods) 

shorthand methods, from strings to functions that call .set




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |




##### Returns


- `ChainedMap`  



#### clear() 

clears the map,
  goes through this properties,
  calls .clear if they are instanceof Chainable or Map






##### Returns


- `ChainedMap`  



#### entries() 

spreads the entries from ChainedMap.store (Map)






##### Returns


- `Object`  



#### values() 

spreads the entries from ChainedMap.store.values






##### Returns


- `Array.&lt;any&gt;`  



#### get(key) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| key | `any`  |  | &nbsp; |




##### Returns


- `any`  



#### set(key, value) 

sets the value using the key on store




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| key | `any`  |  | &nbsp; |
| value | `any`  |  | &nbsp; |




##### Returns


- `ChainedMap`  



#### concat(key, value) 

concats an array `value` in the store with the `key`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| key | `any`  |  | &nbsp; |
| value | `Array.&lt;any&gt;`  |  | &nbsp; |




##### Returns


- `ChainedMap`  



#### append(key, value) 

appends the string value to the current value at the `key`




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| key | `any`  |  | &nbsp; |
| value | `string` `Array`  |  | &nbsp; |




##### Returns


- `ChainedMap`  



#### override(obj) 

same as .merge, but will set instead of merge




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  |  | &nbsp; |




##### Returns


- `ChainedMap`  



#### mergeReal(obj) 

same as .merge, but only not `null` & `undefined` values




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  |  | &nbsp; |




##### Returns


- `ChainedMap`  



#### merge(obj) 

merges an object with the current store




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  |  | &nbsp; |




##### Returns


- `ChainedMap`  



#### clean(obj) 

goes through the maps,
 and the map values,
 reduces them to array
 then to an object using the reduced values




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  |  | &nbsp; |




##### Returns


- `Object`  



#### whenHas(key) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| key | `any`  |  | &nbsp; |
| trueBrancher&#x3D;Function.prototype | `Function`  |  | *Optional* |
| falseBrancher&#x3D;Function.prototype | `Function`  |  | *Optional* |




##### Returns


- `ChainedMap`  



#### when(condition) 

when the condition is true,
 trueBrancher is called,
 else, falseBrancher is called




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| condition | `boolean`  |  | &nbsp; |
| trueBrancher&#x3D;Function.prototype | `Function`  |  | *Optional* |
| falseBrancher&#x3D;Function.prototype | `Function`  |  | *Optional* |




##### Returns


- `ChainedMap`  




### stripped/ChainedMapExtendable.js


#### debug([should&#x3D;true]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| should&#x3D;true | `boolean`  |  | *Optional* |




##### Returns


- `Chainable`  



#### decorateParent(decorations) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| decorations | `Array.&lt;Object&gt;`  |  | &nbsp; |




##### Returns


- `ChainedMapExtendable`  



#### extendAlias(methods, name[, thisArg&#x3D;null]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |
| name | `string`  |  | &nbsp; |
| thisArg&#x3D;null | `Boolean`  |  | *Optional* |




##### Returns


- `ChainedMap`  



#### addChain(name, Chain) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |
| Chain | `Object`  |  | &nbsp; |




##### Returns


- `ChainedMapExtendable`  



#### extendBool(methods, val[, prefix&#x3D;&#x27;no&#x27;]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |
| val | `any`  |  | &nbsp; |
| prefix&#x3D;&#x27;no&#x27; | `string`  |  | *Optional* |




##### Returns


- `ChainedMapExtendable`  



#### extendPrefixed(methods, val[, prefix&#x3D;&#x27;no&#x27;, inverseValue&#x3D;&#x27;todo&#x27;]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |
| val | `any`  |  | &nbsp; |
| prefix&#x3D;&#x27;no&#x27; | `string`  |  | *Optional* |
| inverseValue&#x3D;&#x27;todo&#x27; | `string`  |  | *Optional* |




##### Returns


- `ChainedMapExtendable`  



#### extendWith(methods, val[, prefix]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |
| val | `any`  |  | &nbsp; |
| prefix | `string`  |  | *Optional* |




##### Returns


- `ChainedMapExtendable`  



#### extendFalse(methods) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |




##### Returns


- `ChainedMapExtendable`  



#### extendTrue(methods) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |




##### Returns


- `ChainedMapExtendable`  



#### extendType(methods, type[, msg&#x3D;null]) 

extend with string types of izz
 if it is that type, good, otherwise, nope.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |
| type | `any`  |  | &nbsp; |
| msg&#x3D;null | `string` `any`  |  | *Optional* |




##### Returns


- `ChainedMap`  



#### extendIncrement(methods) 

when called, increments the value




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  |  | &nbsp; |




##### Returns


- `ChainedMap`  



#### extendDefault(methods) 

uses an object, loops through keys, adds method




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Object`  |  | &nbsp; |




##### Returns


- `ChainedMap`  




### stripped/ChainedMapTill.js


#### use(obj) 

loop through properties, call .set, hydrating




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| obj | `Object`  |  | &nbsp; |




##### Returns


- `ChainedMapExtendable`  




### stripped/ChainedSet.js


#### new ChainedSet() 








##### Returns


- `Void`



#### ChainedSet.constructor(parent) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `any`  |  | &nbsp; |




##### Returns


- `Void`



#### ChainedSet.add(value) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `any`  |  | &nbsp; |




##### Returns


- `ChainedSet`  



#### ChainedSet.prepend(value) 

inserts the value at the beginning of the Set




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `any`  |  | &nbsp; |




##### Returns


- `ChainedSet`  



#### ChainedSet.clear() 








##### Returns


- `ChainedSet`  



#### ChainedSet.delete(value) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `any`  |  | &nbsp; |




##### Returns


- `ChainedSet`  



#### ChainedSet.values() 








##### Returns


- `Array.&lt;any&gt;`  



#### ChainedSet.has(value) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value | `any`  |  | &nbsp; |




##### Returns


- `boolean`  



#### ChainedSet.merge(arr) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| arr | `Array` `Set`  |  | &nbsp; |




##### Returns


- `ChainedSet`  




### stripped/flow.js


#### module.exports() 








##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
