import _ from 'lodash'

const obj = {
  o: {
    a: 'a'
  }
}

console.log(_.get(obj, 'o.a', 'asasasas'))