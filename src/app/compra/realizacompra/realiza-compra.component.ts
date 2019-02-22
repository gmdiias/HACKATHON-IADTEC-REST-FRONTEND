import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Compra } from '../compra.model';
import { CompraService } from '../compra.service';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Cliente } from 'src/app/cliente/cliente.model';

@Component({
  selector: 'app-realiza-compra',
  templateUrl: './realiza-compra.component.html',
  styleUrls: ['./realiza-compra.component.css']
})
export class RealizaCompraComponent implements OnInit {
  entity: Compra;
  entityForm: FormGroup;

  cliente: Cliente;

  constructor(private router: Router, fb: FormBuilder, private compraService: CompraService,
    private clienteService: ClienteService, private snackBar: MatSnackBar, protected activatedRoute: ActivatedRoute) {
    this.entityForm = fb.group(new Compra());
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
        this.updateClienteCompra(e);
      });
  }

  updateClienteCompra(cliente: Cliente) {
    this.cliente = cliente;
    this.entityForm.patchValue({'cliente': cliente});
  }

  updateEntity(newEntity?: Compra): void {
    this.entity = newEntity || new Compra();
    this.entityForm.patchValue(this.entity);
  }

  onVoltarClick() {
    this.router.navigate(['compra/list']);
  }

  onSubmit() {
    this.entityForm.disable();
    this.compraService.create(this.entityForm.value).then(_ => {
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
}
