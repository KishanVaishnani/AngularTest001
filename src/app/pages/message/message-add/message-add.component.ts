import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Guid } from 'guid-typescript';
import { MessageData } from 'src/app/shared/models/message';
import { MessageServiceService } from 'src/app/shared/services/message-service.service';

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss'],
})
export class MessageAddComponent {
  isFormSubmitting = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  
  constructor(
    public dialogRef: MatDialogRef<MessageAddComponent>,
    @Inject(MAT_DIALOG_DATA) public messageData: MessageData,
    private messageService: MessageServiceService,
    private _snackBar: MatSnackBar
  ) {}
  
  onCancel() {
    this.dialogRef.close();
  }

  onSubmit(){
    debugger
    this.isFormSubmitting = true;
    let newId: any = Guid.create();

    this.messageData.id = newId['value'];
    this.messageService.createItem(this.messageData).then(res => {
      if (res.id != null) {
        this.isFormSubmitting = false;
        this.succesMessage();

        setTimeout(() => {
          this.dialogRef.close();
        }, 500);
      }
    });
  }

  succesMessage(){
    this._snackBar.open('Item add successfully', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }
}