import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then(
            (m) => m.HomeModule
          ),
        data: { name: 'Home' },
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./pages/messages/messages.module').then(
            (m) => m.MessageModule
          ),
        data: { name: 'Message' },
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
