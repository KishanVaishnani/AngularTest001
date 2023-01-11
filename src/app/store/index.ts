import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as AppReducer from './reducers/app.reducers';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from 'src/environments/environment';

export interface State {
  messages: AppReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  messages: AppReducer.reducer,
};

const reducerKeys = ['messagesstate'];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}


// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}
export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug, localStorageSyncReducer] : [localStorageSyncReducer];

export const getMessagesState = createFeatureSelector<AppReducer.State>('messagesstate');

export const messagesSelector = createSelector(
  getMessagesState,
  AppReducer.messageAddState
);