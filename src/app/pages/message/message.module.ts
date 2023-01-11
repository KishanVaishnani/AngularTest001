import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { LayoutComponent } from './message-layout/messge-layout.component';
import { MessageListComponent } from './message-list/message-list.component';


@NgModule({
  declarations: [
    LayoutComponent,
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule
  ]
})
export class MessageModule { }
