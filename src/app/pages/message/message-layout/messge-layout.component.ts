import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageData } from 'src/app/shared/models/message';
import { MessageAddComponent } from '../message-add/message-add.component';

@Component({
  selector: 'app-message-layout',
  templateUrl: './messge-layout.component.html',
  styleUrls: ['./messge-layout.component.scss'],
})
export class LayoutComponent {
  constructor(public dialog: MatDialog) {}

  onMessage(): void {
    const dialogRef = this.dialog.open(MessageAddComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
