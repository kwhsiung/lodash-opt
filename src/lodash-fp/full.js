import _ from 'lodash/fp'

const result = _.flow(
  _.map(x => [x, x * 2]),
  _.flatten,
  _.sortBy(x => x)
)([1, 2, 3])

console.log(result)
