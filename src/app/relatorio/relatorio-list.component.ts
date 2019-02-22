import { Component, OnInit } from "@angular/core";
import {
  MatTableDataSource,
  MatSort,
  MatSnackBar,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS
} from "@angular/material";
import { Router } from "@angular/router";
import { ClienteService } from "../cliente/cliente.service";
import { Filtro } from "./filtro.model";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { MOMENT_DATE_FORMATS } from "../components/date-adapter/moment-date-format";

@Component({
  selector: "app-relatorio-list",
  templateUrl: "./relatorio-list.component.html",
  styleUrls: ["./relatorio-list.component.css"],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS }
  ]
})
export class RelatorioListComponent implements OnInit {
  displayedColumns: string[] = ["cliente", "cpf", "situacao", "estado", "pais"];
  dataSource = new MatTableDataSource();
  filtro: Filtro = new Filtro();

  situacoes = [
    { value: "ATIVO", viewValue: "Ativo" },
    { value: "INATIVO", viewValue: "Inativo" },
    { value: "REMOVIDO", viewValue: "Removido" }
  ];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList(filtro?: string) {
    if (filtro) {
      console.log(filtro);
    }
    this.clienteService.getRelatorioFilter(this.filtro).subscribe(data => {
      this.dataSource = data;
    });
  }

  download() {
    console.log('aaaaaaaaaaaaaaa');
    let url = 'http://localhost:8080/api/cliente/pdfreport';
    let params = '?';

    if (this.filtro.nome) {
      params += 'nome=' + this.filtro.nome;
    }

    if (this.filtro.situacao) {
      if (params) {
        params += '&';
      }
      params += 'situacao=' + this.filtro.situacao;
    }

    if (this.filtro.dataNascimento) {
      if (params) {
        params += '&';
      }
      params += 'data=' + this.filtro.situacao;
    }

    console.log(url + params);
    window.open(url + params, '_blank');
  }

  applyFilter(filterValue: string) {
    this.refreshList(filterValue.trim().toLowerCase());
  }

  onVoltarClick() {
    this.router.navigate(["/"]);
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000
    });
  }

  formataCpf(cpf: string) {
    if (cpf && cpf.length === 11) {
      return cpf.replace(
        /(\d{3})[.]?(\d{3})[.]?(\d{3})[-]?(\d{2})/,
        "$1.$2.$3-$4"
      );
    }

    return "CPF Inválido";
  }
}
