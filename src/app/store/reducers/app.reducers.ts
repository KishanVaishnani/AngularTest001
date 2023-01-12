import { createReducer, on, Action } from '@ngrx/store';
import { MessageData } from 'src/app/shared/models/message';
import * as actions from  '../actions/app.actions';
import * as storage from '../state/app.store';

export interface State {
  messageData?: MessageData;
  addMessageData?: MessageData;
  isGetLoading?: boolean;
  isGetLoadingSuccess?: boolean;
  isGetLoadingFailure?: boolean;
  isAddLoading?: boolean;
  isAddLoadingSuccess?: boolean;
  isAddLoadingFailure?: boolean;
}

export const initialState: State = {
  messageData: storage.getItem('messageData').messageData,
  addMessageData: null,
  isGetLoading: false,
  isGetLoadingSuccess: false,
  isGetLoadingFailure: false,
  isAddLoading: false,
  isAddLoadingSuccess: false,
  isAddLoadingFailure: false
};

const messageReducer = createReducer(
  initialState,

  // get message
  on(actions.getMessages, (state, messages) => ({...state, messageData: messages, isGetLoading: true})),
  on(actions.getMessageSuccess, (state, result) =>
  {
    return {
      ...state, messageData: result, isGetLoading: false, isGetLoadingSuccess: true
    }
  }),
  on(actions.getMessageFailure, (state, result) => ({ messageData: result, isGetLoading: false, isLoadingFailure: true})),
  
  // add message
  on(actions.addMessage, (state, messages) => ({ addMessageData:messages, isAddLoading: true})),
  on(actions.addMessageSuccess, (state, result) => ({ isAddLoading: false, isAddLoadingSuccess: true})),
  on(actions.addMessageFailure, (state, result) => ({ addMessageData: result, isAddLoadingoading: false, isAddLoadingFailure: true})),
);

export function reducer(state: State | undefined, action: Action): any {
  return messageReducer(state, action);
}

export const messageAddState = (state: State) => {
  return {
    IsAddLoading: state?.["messages"]?.isAddLoading,
    isAddLoadingSuccess: state?.["messages"]?.isAddLoadingSuccess
  }
};

export const getMessageState = (state: State) => {
  return {
    MessageData: state?.["messages"]?.messageData,
    IsGetLoading: state?.["messages"]?.isGetLoading,
    IsGetLoadingSuccess: state?.["messages"]?.isGetLoadingSuccess
  }
};
