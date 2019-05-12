import _ from 'lodash-es'

const result =
  _.chain([1, 2, 3])
    .map(x => [x, x * 2])
    .flatten()
    .sort()
    .value()
console.log(result)
