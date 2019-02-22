import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';
import { Estado } from 'src/app/estado/estado.model';
import { EstadoService } from 'src/app/estado/estado.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MOMENT_DATE_FORMATS } from 'src/app/components/date-adapter/moment-date-format';

const _INVALIDCPF = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

function digitoVerificador(numbers: string): number {
  const numberArray = numbers.split('').map(digit => parseInt(digit, 10));
  const modulus = numbers.length + 1;
  const multiplied = numberArray.map(
    (value, index) => value * (modulus - index),
  );
  const mod = multiplied.reduce((buffer, value) => buffer + value) % 11;
  return mod < 2 ? 0 : 11 - mod;
}

export function cpfValidator(c: AbstractControl): ValidationErrors | null {

  const cpf = c.value.replace(/\D/g, '');

  if (!cpf) {
    return { cpf: 'CPF Inválido' };
  }
  if (cpf.length !== 11) {
    return { cpf: 'CPF Inválido' };
  }
  if (_INVALIDCPF.indexOf(cpf) >= 0) {
    return { cpf: 'CPF Inválido' };
  }
  let numbers: string = cpf.substr(0, 9)
  numbers = numbers + digitoVerificador(numbers)
  numbers = numbers + digitoVerificador(numbers)
  if (numbers.substr(-2) === cpf.substr(-2)) {
    return null;
  }
  return { cpf: 'CPF Inválido' };
}

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
  ]
})
export class ClienteEditComponent implements OnInit {
  entity: Cliente;
  entityForm: FormGroup;
  isNew = true;
  maxDate = new Date();
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
        e.dataNascimento = new Date(e.dataNascimento);
        this.updateEntity(e);
      });

    const cpf = this.entityForm.get("cpf");

    cpf.setValidators(cpfValidator);
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
