import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { MessageData } from 'src/app/shared/models/message';
import { MessageServiceService } from 'src/app/shared/services/message-service.service';
import { addMessage } from 'src/app/store/actions/app.actions';
import * as fromRoot from 'src/app/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss'],
})
export class MessageAddComponent {
  isFormSubmitting = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('ref_message') ref_message: any;
  @ViewChild('ref_name') ref_name: any;

  constructor(
    public dialogRef: MatDialogRef<MessageAddComponent>,
    @Inject(MAT_DIALOG_DATA) public messageData: MessageData,
    private messageService: MessageServiceService,
    private _snackBar: MatSnackBar,
    private store: Store<MessageData>
  ) {
    this.store
      .select(fromRoot.messagesSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('data::::', data);
        // if (data.isLoadingSuccess && data.MessageData) {
        //   this.isFormSubmitting = false;
        //   this.succesMessage();

        //   setTimeout(() => {
        //     this.dialogRef.close();
        //   }, 500);
        // }
      });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    let newId: any = Guid.create();

    this.messageData.id = newId['value'];
    if (this.ref_message.valid && this.ref_name.valid) {
      this.isFormSubmitting = true;
      //this.store.dispatch(addMessage(this.messageData));

      this.messageService.createItem(this.messageData).then(() => {
        this.isFormSubmitting = false;
        this.succesMessage();

        setTimeout(() => {
          this.dialogRef.close();
        }, 500);
      });
    }
  }

  succesMessage() {
    this._snackBar.open('Item add successfully', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
