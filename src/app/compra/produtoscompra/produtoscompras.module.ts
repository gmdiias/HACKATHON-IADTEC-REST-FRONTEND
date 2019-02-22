import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule, MatTableModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { ProdutosCompraArrayComponent } from './produtoscompras.component';
import { ProdutoCompraFormComponent } from './produto-compra-form-component';

@NgModule({
  declarations: [
    ProdutosCompraArrayComponent,
    ProdutoCompraFormComponent
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
    MatOptionModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    ProdutosCompraArrayComponent,
    ProdutoCompraFormComponent
  ],
})
export class ProdutosComprasModule { }
