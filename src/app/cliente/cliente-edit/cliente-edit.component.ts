import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';
import { Estado } from 'src/app/estado/estado.model';
import { EstadoService } from 'src/app/estado/estado.service';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent implements OnInit {
  entity: Cliente;
  entityForm: FormGroup;
  isNew = true;
  estados: Observable<Estado[]> = of([]);

  constructor(private router: Router, fb: FormBuilder, private clienteService: ClienteService,
    private snackBar: MatSnackBar, protected activatedRoute: ActivatedRoute, private estadoService: EstadoService) {
    this.entityForm = fb.group(new Cliente());
  }

  private paramSub: Subscription;
  ngOnInit() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(
        p => this.clienteService.findById(Number(p.id)),
      ))
      .subscribe((e: Cliente) => {
        this.updateEntity(e);
      });
  }

  updateEntity(newEntity?: Cliente): void {
    this.isNew = this.checkIsNew(newEntity.id);
    this.entity = newEntity || new Cliente();
    this.entityForm.patchValue(this.entity);
  }

  private checkIsNew(id: number): boolean {
    if (id <= 0) {
      return true;
    }
    return false;
  }

  onVoltarClick() {
    this.router.navigate(['cliente/list']);
  }

  onSubmit() {
    this.entityForm.disable();
    this.clienteService.saveOrCreate(this.isNew, this.entityForm.value).then(_ => {
      this.openSnackBar('cliente salvo com sucesso!', 'Ok');
      this.router.navigate(['cliente/list']);
    }).catch(_ => {
      this.openSnackBar('Ocorreu um erro ao salvar o cliente!', 'Erro');
      this.entityForm.enable();
    });
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }

  onChange(valor: any) {
    this.estados = this._filter(valor);
  }

  private _filter(value: string): Observable<Estado[]> {
    if (value && value.length < 18) {
      return this.estadoService.autocomplete(value);
    }
    return this.estados;
  }

  formatFornecedorName(estado: Estado): string {
    return estado.nome;
  }
}
