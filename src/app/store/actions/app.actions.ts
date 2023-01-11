import { createAction, props } from '@ngrx/store';
import { MessageData } from 'src/app/shared/models/message';


export const getMessages = createAction(
  '[MessageModule] get messages',
  props<MessageData>()
);

export const addMessage = createAction(
  '[MessageModule] new message add',
  props<MessageData>()
);

export const messageSuccess = createAction(
  '[MessageModule] new message added succesfully',
  props<any>()
)

export const messageFailure = createAction(
  '[MessageModule] new message failed to create',
  props<{message: string}>()
)