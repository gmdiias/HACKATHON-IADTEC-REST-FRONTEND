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
import { PaisModule } from './pais/pais.module';
import { PaisService } from './pais/pais.service';
import { EstadoModule } from './estado/estado.module';
import { EstadoService } from './estado/estado.service';
import { RelatorioModule } from './relatorio/relatorio.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatIconModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PaisModule,
    ClienteModule,
    MatIconModule,
    EstadoModule,
    RelatorioModule,
    DashboardModule
  ],
  providers: [PaisService, ClienteService, EstadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
