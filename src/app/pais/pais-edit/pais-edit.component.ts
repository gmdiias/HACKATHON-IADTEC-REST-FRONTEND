import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pais } from '../pais.model';
import { PaisService } from '../pais.service';

@Component({
  selector: 'app-pais-edit',
  templateUrl: './pais-edit.component.html',
  styleUrls: ['./pais-edit.component.css']
})
export class PaisEditComponent implements OnInit {
  entity: Pais;
  entityForm: FormGroup;
  isNew = true;

  constructor(private router: Router, fb: FormBuilder, private paisService: PaisService,
    private snackBar: MatSnackBar, protected activatedRoute: ActivatedRoute) {
    this.entityForm = fb.group(new Pais());
  }

  private paramSub: Subscription;
  ngOnInit() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(
        p => this.paisService.findById(Number(p.id)),
      ))
      .subscribe((e: Pais) => {
        this.updateEntity(e);
      });
  }

  updateEntity(newEntity?: Pais): void {
    this.isNew = this.checkIsNew(newEntity.id);
    this.entity = newEntity || new Pais();
    this.entityForm.patchValue(this.entity);
  }

  private checkIsNew(id: number): boolean {
    if (id <= 0) {
      return true;
    }
    return false;
  }

  onVoltarClick() {
    this.router.navigate(['pais/list']);
  }

  onSubmit() {
    this.entityForm.disable();

    this.paisService.saveOrCreate(this.isNew, this.entityForm.value).then(_ => {
      this.openSnackBar('Pais salvo com sucesso!', 'Ok');
      this.router.navigate(['pais/list']);
    }).catch(_ => {
      this.openSnackBar('Ocorreu um erro ao salvar o Produto!', 'Erro');
      this.entityForm.enable();
    });
  }

  openSnackBar(mensagem: string, acao: string) {
    this.snackBar.open(mensagem, acao, {
      duration: 5000,
    });
  }
}
