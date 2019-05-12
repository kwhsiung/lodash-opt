import { flow, map, flatten, sortBy } from 'lodash/fp'

const result = flow(
  map(x => [x, x * 2]),
  flatten,
  sortBy(x => x)
)([1, 2, 3])

console.log(result)
