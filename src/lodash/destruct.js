import { map, flatten, sortBy } from 'lodash'

const result = sortBy(flatten(map([1, 2, 3], x => [x, x * 2])), x => x)
console.log(result)
