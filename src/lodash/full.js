import _ from 'lodash'
const result = _.sortBy(_.flatten(_.map([1, 2, 3], x => [x, x * 2])), x => x)

console.log(result)
