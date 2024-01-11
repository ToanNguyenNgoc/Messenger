// CounterModel.js
import {types} from 'mobx-state-tree';

const CounterModel = types
  .model('Counter', {
    count: types.number,
  })
  .actions(self => ({
    increment() {
      self.count += 1;
    },
    decrement() {
      self.count -= 1;
    },
  }));

export default CounterModel;
