import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'valor', 'options'];
  dataSource = new MatTableDataSource();

  constructor(private produtoService: ProdutoService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.produtoService.getAll().subscribe(data => {
      this.dataSource = data;
    });
  }

  applyFilter(filterValue: string) {
    this.refreshList(filterValue.trim().toLowerCase());
  }

  onAddClick() {
    this.router.navigate(['produto/edit']);
  }

  onVoltarClick() {
    this.router.navigate(['/']);
  }

  onEditClick(id: number) {
    this.router.navigate(['produto/edit/', id]);
  }

  onDeleteClick(id: number) {
    this.produtoService.deleteById(id).then(_ => {
      this.openSnackBar('Produto deletado com sucesso!', 'Ok');
      this.refreshList();
    },
    ).catch(_ => this.openSnackBar('Ocorreu um erro ao remover o Produto!', 'Erro'));
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }

}
