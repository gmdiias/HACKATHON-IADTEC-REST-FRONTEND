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

  totalElements: number;
  pageSize: number;
  page = {pageSize: 3, pageNumber: 1};
  constructor(private paisService: PaisService, private router: Router, private snackBar: MatSnackBar) {
    this.totalElements = 0;
    this.pageSize = this.page.pageSize;
  }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.paisService.search(this.page).subscribe(page => {
      console.log(page);
      this.totalElements = page.totalElements;
      this.pageSize = page.pageable.pageSize;
      this.dataSource = page.content;
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
