import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PaisListComponent } from './pais-list/pais-list.component';
import { PaisEditComponent } from './pais-edit/pais-edit.component';

@NgModule({
  declarations: [
    PaisListComponent,
    PaisEditComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  exports: [
    PaisListComponent,
    PaisEditComponent
  ],
})
export class PaisModule { }
