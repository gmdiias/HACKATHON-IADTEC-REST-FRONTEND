import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppNavbarComponent } from './navbar/navbar.component';
import { ClienteModule } from './cliente/cliente.module';
import { ClienteService } from './cliente/cliente.service';
import { ProdutoModule } from './produto/produto.module';
import { ProdutoService } from './produto/produto.service';
import { CompraModule } from './compra/compra.module';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ProdutoModule,
    ClienteModule,
    CompraModule
  ],
  providers: [ProdutoService, ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
