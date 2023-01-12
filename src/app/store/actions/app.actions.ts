import { createAction, props } from '@ngrx/store';
import { MessageData } from 'src/app/shared/models/message';


export const getMessages = createAction(
  '[MessageModule] get messages',
  props<MessageData>()
);

export const getMessageSuccess = createAction(
  '[MessageModule] get messages  succesfully',
  props<any>()
)

export const getMessageFailure = createAction(
  '[MessageModule] get message failed',
  props<any>()
)

export const addMessage = createAction(
  '[MessageModule] add new message to db',
  props<MessageData>()
);

export const addMessageSuccess = createAction(
  '[MessageModule] new message added succesfully',
  props<any>()
)

export const addMessageFailure = createAction(
  '[MessageModule] new message failed to create',
  props<any>()
)