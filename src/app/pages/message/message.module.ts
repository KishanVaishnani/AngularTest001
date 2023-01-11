import { NgModule, isDevMode } from '@angular/core';
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

// ngrx related imports
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from 'src/app/store';
import { AppEffects } from 'src/app/store/effects/app.effect';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

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
    AngularFireModule.initializeApp(environment.firebase),


     // ngrx related imports
    StoreModule.forFeature("messagesstate",reducers),
    EffectsModule.forFeature([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers:[
    MessageServiceService
  ],
  exports:[MaterialModule]
})
export class MessageModule { }
