import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { EstadoListComponent } from './estado-list/estado-list.component';
import { EstadoEditComponent } from './estado-edit/estado-edit.component';

@NgModule({
  declarations: [
    EstadoListComponent,
    EstadoEditComponent,
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
    EstadoListComponent,
    EstadoEditComponent,
  ],
})
export class EstadoModule { }
