import { createReducer, on, Action } from '@ngrx/store';
import { MessageData } from 'src/app/shared/models/message';
import * as actions from  '../actions/app.actions';
import * as storage from '../state/app.store';

export interface State {
  messageData?: MessageData;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  messageData: storage.getItem('messageData').messageData,
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const messageReducer = createReducer(
  initialState,
  on(actions.getMessages, (state, messages) => ({...state, messageData: messages, isLoading: true})),
  on(actions.messageSuccess, (state, result) =>
  {
    return {
      ...state, messageData: result, isLoading: false, isLoadingSuccess: true
    }
  }),
  on(actions.addMessage, (state, messages) => ({ messageData:messages, isLoading: true})),
  on(actions.messageFailure, (state, result) => ({...state, messageData: state.messageData, isLoading: false, isLoadingSuccess: true}))
);

export function reducer(state: State | undefined, action: Action): any {
  return messageReducer(state, action);
}

export const messageAddState = (state: State) => {
  return {
    MessageData: state?.["messages"]?.messageData,
    isLoading: state?.["messages"]?.isLoading,
    isLoadingSuccess: state?.["messages"]?.isLoadingSuccess
  }
};