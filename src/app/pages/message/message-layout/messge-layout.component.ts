import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MessageData } from 'src/app/shared/models/message';
import { MessageAddComponent } from '../message-add/message-add.component';
import * as fromRoot from 'src/app/store';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message-layout',
  templateUrl: './messge-layout.component.html',
  styleUrls: ['./messge-layout.component.scss'],
})
export class LayoutComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  

  constructor(
    public dialog: MatDialog,
    private store: Store<MessageData>,
    private _snackBar: MatSnackBar
  ) {
    this.store
      .select(fromRoot.messagesSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('data::::', data);
        if (data.isLoadingSuccess && data.MessageData) {
          this.dialog.closeAll();
          this.succesMessage();
        }
      });
  }

  onMessage(): void {
    const dialogRef = this.dialog.open(MessageAddComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  succesMessage() {
    this._snackBar.open('Item add successfully', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
