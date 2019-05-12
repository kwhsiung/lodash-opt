import { map, flatten, sortBy } from 'lodash-es'
import fp from 'lodash/fp'

const resultWithEs = sortBy(flatten(map([1, 2, 3], x => [x, x * 2])), x => x)
console.log(resultWithEs)

const resultWithFp = fp.flow(
  fp.map(x => [x, x * 2]),
  fp.flatten,
  fp.sortBy(x => x)
)([1, 2, 3])
console.log(resultWithFp)
