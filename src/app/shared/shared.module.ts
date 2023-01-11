import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
} from '@angular/material';

const MaterialModules = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: [...MaterialModules, CommonModule],
  exports: MaterialModules,
})
export class SharedModule {}
