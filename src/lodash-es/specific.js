import map from 'lodash-es/map'
import flatten from 'lodash-es/flatten'
import sortBy from 'lodash-es/sortBy'

const result = sortBy(flatten(map([1, 2, 3], x => [x, x * 2])), x => x)
console.log(result)
