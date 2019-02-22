import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Estado } from '../estado.model';
import { EstadoService } from '../estado.service';
import { Pais } from 'src/app/pais/pais.model';
import { PaisService } from 'src/app/pais/pais.service';

@Component({
  selector: 'app-estado-edit',
  templateUrl: './estado-edit.component.html',
  styleUrls: ['./estado-edit.component.css']
})
export class EstadoEditComponent implements OnInit {
  entity: Estado;
  entityForm: FormGroup;
  isNew = true;

  constructor(private router: Router, fb: FormBuilder, private estadoService: EstadoService,
    private snackBar: MatSnackBar, protected activatedRoute: ActivatedRoute, private paisService: PaisService) {
    this.entityForm = fb.group(new Estado());
  }

  paises: Observable<Pais[]> = of([]);

  private paramSub: Subscription;
  ngOnInit() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(
        p => this.estadoService.findById(Number(p.id)),
      ))
      .subscribe((e: Estado) => {
        this.updateEntity(e);
      });
  }

  updateEntity(newEntity?: Estado): void {
    this.isNew = this.checkIsNew(newEntity.id);
    this.entity = newEntity || new Estado();
    this.entityForm.patchValue(this.entity);
  }

  private checkIsNew(id: number): boolean {
    if (id <= 0) {
      return true;
    }
    return false;
  }

  onVoltarClick() {
    this.router.navigate(['estado/list']);
  }

  onSubmit() {
    this.entityForm.disable();

    this.estadoService.saveOrCreate(this.isNew, this.entityForm.value).then(_ => {
      this.openSnackBar('Estado salvo com sucesso!', 'Ok');
      this.router.navigate(['estado/list']);
    }).catch(_ => {
      this.openSnackBar('Ocorreu um erro ao salvar o Estado!', 'Erro');
      this.entityForm.enable();
    });
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }


  onChange(valor: any) {
    this.paises = this._filter(valor);
  }

  private _filter(value: string): Observable<Pais[]> {
    if (value && value.length < 18) {
      return this.paisService.autocomplete(value);
    }
    return this.paises;
  }

  formatFornecedorName(fornecedor: Pais): string {
    return fornecedor.nome;
  }

}
