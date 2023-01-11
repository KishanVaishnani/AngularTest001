import { createAction, props } from '@ngrx/store';

export const demo_action1 = createAction(
  '[Module] log user Action',
  props<{ usernamae: string; }>()
);