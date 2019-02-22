import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PaisService } from '../pais.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-pais-list',
  templateUrl: './pais-list.component.html',
  styleUrls: ['./pais-list.component.css']
})
export class PaisListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'options'];
  dataSource = new MatTableDataSource();

  constructor(private paisService: PaisService, private router: Router, private snackBar: MatSnackBar) {
    paisService.search().pipe(
      tap(console.log)
    ).subscribe(value => value);
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.paisService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  applyFilter(filterValue: string) {
    this.refreshList(filterValue.trim().toLowerCase());
  }

  onAddClick() {
    this.router.navigate(['pais/edit']);
  }

  onVoltarClick() {
    this.router.navigate(['/']);
  }

  onEditClick(id: number) {
    this.router.navigate(['pais/edit/', id]);
  }

  onDeleteClick(id: number) {
    this.paisService.deleteById(id).then(_ => {
      this.openSnackBar('Pais deletado com sucesso!', 'Ok');
      this.refreshList();
    },
    ).catch(_ => this.openSnackBar('Ocorreu um erro ao remover o Pais!', 'Erro'));
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }

}
