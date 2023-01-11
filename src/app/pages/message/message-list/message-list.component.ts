import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MessageServiceService } from 'src/app/shared/services/message-service.service';
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {
  dataSource :any=[];
  displayedColumns: string[] = ['id', 'name', 'message'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoading: boolean = false;

  constructor(
    private messageService: MessageServiceService,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadMessageList();
  }
 
  loadMessageList() {
    this.messageService.getItem().subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.dataSource = res;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        
      },
    });
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
