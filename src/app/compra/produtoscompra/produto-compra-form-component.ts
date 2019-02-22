import { Component, forwardRef, OnDestroy, OnInit, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  RequiredValidator,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ProdutoCompra } from '../produtocompra.model';
import { ProdutoService } from 'src/app/produto/produto.service';
import { Produto } from 'src/app/produto/produto.model';

@Component({
  selector: 'app-produtos-compras-form',
  templateUrl: './produto-compra-form-component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProdutoCompraFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProdutoCompraFormComponent),
      multi: true,
    },
  ],
})
export class ProdutoCompraFormComponent
  implements ControlValueAccessor, Validator, OnInit, OnDestroy {
  @Input()
  produtosDisponiveis: Produto[];

  _onTouched: (_: any) => void;

  contratoForm: FormGroup = this.fb.group(new ProdutoCompra());

  fornecedores: Observable<Produto[]>;

  private _contratoFormSubs: Subscription;
  private _onChangeForm: (_: any) => void;
  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
  ) {}

  ngOnInit() {
    this._contratoFormSubs = this.contratoForm.valueChanges.subscribe(
      value => this._onChangeForm && this._onChangeForm(value));
  }

  ngOnDestroy() {
    this._contratoFormSubs.unsubscribe();
  }

  writeValue(obj: any): void {
    if (obj === null || obj === undefined) {
      this.contratoForm.patchValue(new Produto());
      return;
    }
    this.contratoForm.patchValue(obj);
  }

  registerOnChange(fn: any): void {
    this._onChangeForm = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.contratoForm.disable() : this.contratoForm.enable()
  }

  validate(control: AbstractControl): ValidationErrors | null {
  //   if (this.contratoForm.invalid) {
  //     return { associacaoFornecedor: 'Associação inválida' }
  //   }
  //   const fornecedor = this.contratoForm.controls.cnpjFornecedor.value
  //   if (!fornecedor) {
  //     return { fornecedorInvalido: 'Fornecedor inválido' }
  //   }
    return null;
  }
}
