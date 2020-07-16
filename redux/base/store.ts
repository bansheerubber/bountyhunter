import {
  createStore,
  combineReducers,
  Reducer,
  Store,
} from 'redux';

import {
  State
} from './state';

export interface DispatchArgs {
  type: DispatchType;
  args: any[];
}

export type DispatchType = Function;

export class MainStore {
  private static store: Store;

  static combineReducers(reducers: {
    [index: string]: Reducer<State<any>, DispatchArgs>
  }) {
    return combineReducers(reducers);
  }

  static dispatch(args: DispatchArgs): DispatchArgs {
    return this.store.dispatch(args);
  }
}

export function dispatch(args: DispatchArgs): DispatchArgs {
  return MainStore.dispatch(args);
}
