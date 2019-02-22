import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule, MatTableModule } from '@angular/material';
import { RealizaCompraComponent } from './realizacompra/realiza-compra.component';
import { CompraService } from './compra.service';
import { ProdutosCompraArrayComponent } from './produtoscompra/produtoscompras.component';
import { ProdutosComprasModule } from './produtoscompra/produtoscompras.module';
import { ClienteCompraListComponent } from './cliente-list/cliente-list.component';
import { CompraListComponent } from './compra-list/compra-list.component';
import { ConsultaDebitosComponent } from './consultadebitos/consulta-debitos.component';

@NgModule({
  declarations: [
    RealizaCompraComponent,
    ClienteCompraListComponent,
    CompraListComponent,
    ConsultaDebitosComponent
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
    ReactiveFormsModule,
    ProdutosComprasModule
  ],
  exports: [
    RealizaCompraComponent,
    ClienteCompraListComponent,
    CompraListComponent,
    ConsultaDebitosComponent
  ],
  providers: [
    CompraService
  ]
})
export class CompraModule { }
