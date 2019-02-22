import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule } from '@angular/material';
import { ProdutoEditComponent } from './produto-edit/produto-edit.component';
import { ProdutoListComponent } from './produto-list/produto-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProdutoListComponent,
    ProdutoEditComponent,
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
    ProdutoListComponent,
    ProdutoEditComponent,
  ],
})
export class ProdutoModule { }
