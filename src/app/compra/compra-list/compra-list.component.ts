import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CompraService } from '../compra.service';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.css']
})
export class CompraListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cliente', 'data', 'valorCompra'];
  dataSource = new MatTableDataSource();

  constructor(private compraService: CompraService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.compraService.getAll().subscribe(data => {
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
