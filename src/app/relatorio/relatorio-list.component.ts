import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ClienteService } from '../cliente/cliente.service';

@Component({
  selector: 'app-relatorio-list',
  templateUrl: './relatorio-list.component.html',
  styleUrls: ['./relatorio-list.component.css']
})
export class RelatorioListComponent implements OnInit {
  displayedColumns: string[] = ['cliente', 'estado', 'pais'];
  dataSource = new MatTableDataSource();

  constructor(private clienteService: ClienteService, private router: Router, private snackBar: MatSnackBar) { }

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

  onVoltarClick() {
    this.router.navigate(['/']);
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }

}
