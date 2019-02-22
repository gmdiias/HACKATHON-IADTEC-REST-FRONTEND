import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { ClienteEditComponent } from './cliente-edit/cliente-edit.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

@NgModule({
  declarations: [
    ClienteListComponent,
    ClienteEditComponent
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
    ClienteListComponent,
    ClienteEditComponent
  ],
})
export class ClienteModule { }
