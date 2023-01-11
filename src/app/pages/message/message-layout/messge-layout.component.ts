import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageData } from 'src/app/shared/models/message';
import { MessageAddComponent } from '../message-add/message-add.component';

const ELEMENT_DATA: MessageData[] = [
  {
    id: '438211be-9658-410e-95c7-2ca439a38ba9',
    name: 'msg1',
    message: 'testing1',
  },
  {
    id: '438211be-9658-410e-95c7-2ca439a38ba9',
    name: 'msg2',
    message: 'testing2',
  },
  {
    id: '438211be-9658-410e-95c7-2ca439a38ba9',
    name: 'msg3',
    message: 'testing3',
  },
  {
    id: '438211be-9658-410e-95c7-2ca439a38ba9',
    name: 'msg4',
    message: 'testing4',
  },
  {
    id: '438211be-9658-410e-95c7-2ca439a38ba9',
    name: 'msg5',
    message: 'testing5',
  },
  {
    id: '438211be-9658-410e-95c7-2ca439a38ba9',
    name: 'msg6',
    message: 'testing6',
  },
  {
    id: '438211be-9658-410e-95c7-2ca439a38ba9',
    name: 'msg7',
    message: 'testing7',
  },
  {
    id: '438211be-9658-410e-95c7-2ca439a38ba9',
    name: 'msg8',
    message: 'testing8',
  },
];

@Component({
  selector: 'app-message-layout',
  templateUrl: './messge-layout.component.html',
  styleUrls: ['./messge-layout.component.scss'],
})
export class LayoutComponent {
  constructor(public dialog: MatDialog) {}
  displayedColumns: string[] = ['id', 'name', 'message'];
  dataSource = ELEMENT_DATA;

  onMessage(): void {
    const dialogRef = this.dialog.open(MessageAddComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
