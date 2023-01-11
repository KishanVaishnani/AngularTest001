import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { MessageServiceService } from 'src/app/shared/services/message-service.service';
import * as actions from '../actions/app.actions';
import { map, exhaustMap, catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);

  constructor(private messageService: MessageServiceService) {}

  // messageAdd$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(actions.getMessages),
  //     exhaustMap((action) => {
  //       console.log('EFFECT CALL: ' + action);
  //       debugger
  //       const observable$ = from(this.messageService.createItem(action));
  //       return observable$.pipe(
  //         map((data) => {
  //           debugger
  //           console.log('EFFECT MAP: ID' + action, data);
  //           return actions.messageSuccess(data);
  //         })
  //       );
  //     })
  //   )
  // );

  messageGet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getMessages),
      switchMap((action) => {
        console.log('EFFECT CALL: ' + action);
        return this.messageService.getItem().pipe(
          map((data) => {
            console.log('EFFECT MAP: ID' + action, data);
            return actions.messageSuccess(data);
          })
        );
      })
    )
  );
}