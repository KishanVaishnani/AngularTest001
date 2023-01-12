import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { MessageData } from 'src/app/shared/models/message';
import { addMessage } from 'src/app/store/actions/app.actions';
import { Subject } from 'rxjs';

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
    private store: Store<MessageData>
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    let newId: any = Guid.create();

    this.messageData.id = newId['value'];
    this.messageData.datetime = new Date().toString();

    if (this.ref_message.valid && this.ref_name.valid) {
      this.isFormSubmitting = true;
      this.store.dispatch(addMessage(this.messageData));
    }
  }
}
