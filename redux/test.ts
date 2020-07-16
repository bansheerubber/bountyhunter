import {
  State
} from './base/state';
import {
  DispatchArgs,
  DispatchType
} from "./base/store";

export const testDispatch = (test: string) => ({
  type: testDispatch,
  args: [test]
})

class TestState extends State<TestState> {
  test: string = '';
}

export default (
  new TestState()
    .callback(
      testDispatch,
      (state, test: string) => {
        state.test = test
      }
    )
    .reducer
);
