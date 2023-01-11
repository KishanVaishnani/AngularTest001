import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { LayoutComponent } from './message-layout/messge-layout.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { MessageAddComponent } from './message-add/message-add.component';
import { MessageServiceService } from 'src/app/shared/services/message-service.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutComponent,
    MessageListComponent,
    MessageAddComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MessageRoutingModule,
    MaterialModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers:[
    MessageServiceService
  ],
  exports:[MaterialModule]
})
export class MessageModule { }
