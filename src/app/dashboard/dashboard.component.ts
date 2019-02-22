import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente/cliente.service';
import { EstadoService } from '../estado/estado.service';
import { PaisService } from '../pais/pais.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AppDashboardComponent implements OnInit {

  constructor(private clienteService: ClienteService, private estadoService: EstadoService, private paisService: PaisService) { }

  countCliente = 0;
  countEstado = 0;
  countPais = 0;

  ngOnInit() {
    this.clienteService.count().subscribe(dado => this.countCliente = dado);
    this.estadoService.count().subscribe(dado => this.countEstado = dado);
    this.paisService.count().subscribe(dado => this.countPais = dado);
  }

}
