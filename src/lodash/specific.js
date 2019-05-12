import map from 'lodash/map'
import flatten from 'lodash/flatten'
import sortBy from 'lodash/sortBy'

const result = sortBy(flatten(map([1, 2, 3], x => [x, x * 2])), x => x)
console.log(result)
