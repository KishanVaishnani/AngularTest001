import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageServiceService } from 'src/app/shared/services/message-service.service';
import * as actions from '../actions/app.actions';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);

  constructor(private messageService: MessageServiceService) {}

  messageAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.addMessage),
      switchMap((action) => {
        console.log('EFFECT CALL: ' + action);
        return this.messageService.createItem(action).then((data) => {
          console.log('EFFECT MAP: ID' + action, data);
          return actions.addMessageSuccess(data);
        });
      })
    )
  );

  messageGet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getMessages),
      switchMap((action) => {
        console.log('EFFECT CALL: ' + action);
        return this.messageService.getItem().pipe(
          map((data) => {
            console.log('EFFECT MAP: ID' + action, data);
            return actions.getMessageSuccess(data);
          })
        );
      })
    )
  );
}