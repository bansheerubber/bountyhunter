import {
  DispatchArgs,
  DispatchType,
} from './store';

export abstract class State<T extends State<T>> {
  protected functions: Map<DispatchType, (state: T, ...args: any[]) => void> = new Map();

  public callback(type: DispatchType, callback: (state: T, ...args: any[]) => void): T {
    this.functions.set(type, callback);
    return this as any as T;
  }

  public reducer(state: State<T>, args: DispatchArgs): State<T> {
    const callback = this.functions.get(args.type)
    if(callback) {
      callback.apply(null, [state as T, ...args.args]);
    }
    return state;
  }
}

