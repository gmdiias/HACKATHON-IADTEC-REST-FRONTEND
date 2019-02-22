import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente/cliente.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteCompraListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'turma', 'options'];
  dataSource = new MatTableDataSource();

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.clienteService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  applyFilter(filterValue: string) {
    this.refreshList(filterValue.trim().toLowerCase());
  }

  onSelectCliente(id: number) {
    this.router.navigate(['compra/realizacompra/', id]);
  }

  onSelectClienteResumo(id: number) {
    this.router.navigate(['compra/consultadebitos/', id]);
  }

  onVoltarClick() {
    this.router.navigate(['/']);
  }

}
