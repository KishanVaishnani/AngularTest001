import { createReducer, on, Action } from '@ngrx/store';
import { demo_action1 } from '../actions/app.actions';
import { initialAppState, IApp } from '../app.interface';


export const reducer = createReducer(
  initialAppState as IApp,
  on(demo_action1, (state) => ({
    ...state,
  })),
);

export function AppReducer(state: IApp, action: Action): IApp {
  return reducer(state as IApp, action as Action);
}