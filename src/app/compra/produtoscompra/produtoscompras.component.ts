import { ControlValueAccessor, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS, NG_VALUE_ACCESSOR, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { OnInit, OnDestroy, forwardRef, Component } from '@angular/core';
import { ProdutoCompra } from '../produtocompra.model';
import { Subscription } from 'rxjs';
import { ProdutoService } from 'src/app/produto/produto.service';
import { Produto } from 'src/app/produto/produto.model';

@Component({
    selector: 'app-produtos-compras-array',
    templateUrl: './produtoscompras.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ProdutosCompraArrayComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ProdutosCompraArrayComponent),
            multi: true,
        },
    ],
})
export class ProdutosCompraArrayComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {
    entityFormArray: FormArray = this.fb.array(
        [this.buildFormControl()],
    );

    contratoFormGroup: FormGroup = this.fb.group({
        contratos: this.entityFormArray,
    });

    produtosDisponiveis$ = this.produtoService.getAll();

    produtosDisponiveis: Produto[] = [];

    private entityFormArraySub: Subscription[] = [];

    constructor(private fb: FormBuilder, private produtoService: ProdutoService) { }

    buildFormControl(): AbstractControl {
        return this.fb.control(new ProdutoCompra());
    }

    writeValue(obj: any): void {
        if (!obj || !(obj instanceof Array)) {
            while (this.entityFormArray.length > 1) {
                this.popControl();
            }
            if (this.entityFormArray.length < 1) {
                this.pushControl();
            }
            return;
        }

        // sincronizar tamanho do array
        if (obj.length < this.entityFormArray.length) {
            while (obj.length < this.entityFormArray.length) {
                this.popControl();
            }
        } else if (obj.length > this.entityFormArray.length) {
            while (obj.length > this.entityFormArray.length) {
                this.pushControl();
            }
        }

        this.entityFormArray.patchValue(obj);
    }

    registerOnChange(fn: (_: any) => void): void {
        this._onValueChange = fn;
    }

    registerOnTouched(fn: (_: any) => void): void {
        this._onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.entityFormArray.disable();
        } else {
            this.entityFormArray.enable();
        }
    }

    validate(control: AbstractControl): ValidationErrors {
        if (this.entityFormArray.invalid) {
            const errors = {
                array: this.entityFormArray.errors,
                controls: <ValidationErrors[]>[],
            };
            for (let index = 0; index < this.entityFormArray.length; index++) {
                const controlw = this.entityFormArray.at(index);
                errors.controls.push(controlw.errors);
            }
            return errors;
        }
        return null;
    }

    registerOnValidatorChange?(fn: () => void): void {
        this._onValidatorChange = fn;
    }

    ngOnInit(): void {
        this.entityFormArraySub.push(
            this.entityFormArray.valueChanges.subscribe(value =>
                this._onValueChange(value),
            ),

            this.entityFormArray.statusChanges.subscribe(() =>
                this._onValidatorChange(),
            ),
        );

        this.produtosDisponiveis$.subscribe(dado => this.produtosDisponiveis = dado);
    }
    ngOnDestroy(): void {
        for (const sub of this.entityFormArraySub) {
            sub.unsubscribe();
        }
    }

    pushControl() {
        this.entityFormArray.push(this.buildFormControl());
    }

    popControl() {
        if (this.entityFormArray.length > 0) {
            this.entityFormArray.removeAt(this.entityFormArray.length - 1);
        }
    }

    removeControl(index: number): void {
        return null;
    }

    removePopControl(): void {
        return null;
    }

    _onValueChange(_: any): void { }
    _onValidatorChange(): void { }
    _onTouch(_: any): void { }
}
