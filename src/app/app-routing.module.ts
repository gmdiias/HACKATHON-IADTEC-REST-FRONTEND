import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { ProdutoEditComponent } from './produto/produto-edit/produto-edit.component';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteEditComponent } from './cliente/cliente-edit/cliente-edit.component';
import { RealizaCompraComponent } from './compra/realizacompra/realiza-compra.component';
import { ClienteCompraListComponent } from './compra/cliente-list/cliente-list.component';
import { CompraListComponent } from './compra/compra-list/compra-list.component';
import { ConsultaDebitosComponent } from './compra/consultadebitos/consulta-debitos.component';

const routes: Routes = [
  { path: 'produto/list', component: ProdutoListComponent },
  { path: 'produto/edit', redirectTo: 'produto/edit/new', pathMatch: 'full' },
  { path: 'produto/edit/:id', component: ProdutoEditComponent },
  { path: 'cliente/list', component: ClienteListComponent },
  { path: 'cliente/edit', redirectTo: 'cliente/edit/new', pathMatch: 'full' },
  { path: 'cliente/edit/:id', component: ClienteEditComponent },
  { path: 'compra/list', component: ClienteCompraListComponent },
  { path: 'compra/listCompras', component: CompraListComponent },
  { path: 'compra/realizacompra/:id', component: RealizaCompraComponent },
  { path: 'compra/consultadebitos/:id', component: ConsultaDebitosComponent },
  { path: '', component: AppDashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
