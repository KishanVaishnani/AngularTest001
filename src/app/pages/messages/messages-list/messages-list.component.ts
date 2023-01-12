import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { MessageData } from 'src/app/shared/models/message';
import * as fromRoot from 'src/app/store';
import { getMessages } from 'src/app/store/actions/app.actions';
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessageListComponent {
  dataSource: any = [];
  displayedColumns: string[] = ['id', 'name', 'message', 'datetime'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading: boolean = true;
  destroy$: Subject<boolean> = new Subject<boolean>();
  messageData: MessageData;

  constructor(
    private store: Store<MessageData>
  ) {
    this.store
      .select(fromRoot.getMessagesSelector)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.IsGetLoadingSuccess && data.MessageData) {
          this.dataSource = Object.values(data.MessageData);
          this.dataSource.pop();
          this.sortByDate(this.dataSource);
          this.isLoading = false;
        }
      });
    this.loadMessageList();
  }
  sortByDate(data) {
    this.dataSource = data.sort((a, b) => {
      var DateA = new Date(a.datetime);
      var DateB = new Date(b.datetime);
      if (DateA > DateB) {
        return -1;
      } else if (DateA < DateB) {
        return 1;
      } else {
        return 0;
      }
    });
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
        case 'datatime':
          return this.compareDate(a.datatime, b.datatime, isAsc);
        default:
          return 0;
      }
    });
    this.isLoading = false;
  }
  compareDate(a: number | string, b: number | string, isAsc: boolean) {
    return (
      (new Date(a).getTime() < new Date(b).getTime() ? -1 : 1) *
      (isAsc ? 1 : -1)
    );
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
