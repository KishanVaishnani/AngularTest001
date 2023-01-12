import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MessageData } from 'src/app/shared/models/message';
import { MessageServiceService } from 'src/app/shared/services/message-service.service';
import * as fromRoot from 'src/app/store';
import { getMessages } from 'src/app/store/actions/app.actions';
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessageListComponent {
  dataSource: any = [];
  displayedColumns: string[] = ['id', 'name', 'message', 'datatime'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  messageData: MessageData;

  constructor(
    private messageService: MessageServiceService,
    private store: Store<MessageData>
  ) {
    this.store
      .select(fromRoot.getMessagesSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.IsGetLoadingSuccess && data.MessageData) {
          this.dataSource = Object.values(data.MessageData);
          this.dataSource.pop();
        }
        this.isLoading = false;
      });
    this.loadMessageList();
  }

  loadMessageList() {
    this.store.dispatch(getMessages(this.messageData));
  }
  announceSortChange(sortState: Sort) {
    this.isLoading = true;
    const data = this.dataSource.slice();
    if (!sortState.active || sortState.direction === '') {
      this.isLoading = false;
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sortState.direction === 'asc';
      switch (sortState.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'message':
          return this.compare(a.message, b.message, isAsc);
        default:
          return 0;
      }
    });
    this.isLoading = false;
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
