import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteEditComponent } from './cliente/cliente-edit/cliente-edit.component';
import { PaisListComponent } from './pais/pais-list/pais-list.component';
import { PaisEditComponent } from './pais/pais-edit/pais-edit.component';

const routes: Routes = [
  { path: 'pais/list', component: PaisListComponent },
  { path: 'pais/edit', redirectTo: 'pais/edit/new', pathMatch: 'full' },
  { path: 'pais/edit/:id', component: PaisEditComponent },
  { path: 'cliente/list', component: ClienteListComponent },
  { path: 'cliente/edit', redirectTo: 'cliente/edit/new', pathMatch: 'full' },
  { path: 'cliente/edit/:id', component: ClienteEditComponent },
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
