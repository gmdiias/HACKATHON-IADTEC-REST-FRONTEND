import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Produto } from '../produto.model';
import { ProdutoService } from '../produto.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {
  entity: Produto;
  entityForm: FormGroup;
  isNew = true;

  constructor(private router: Router, fb: FormBuilder, private produtoService: ProdutoService,
    private snackBar: MatSnackBar, protected activatedRoute: ActivatedRoute) {
    this.entityForm = fb.group(new Produto());
  }

  private paramSub: Subscription;
  ngOnInit() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
    this.paramSub = this.activatedRoute.params
      .pipe(switchMap(
        p => this.produtoService.findById(Number(p.id)),
      ))
      .subscribe((e: Produto) => {
        this.updateEntity(e);
      });
  }

  updateEntity(newEntity?: Produto): void {
    this.isNew = this.checkIsNew(newEntity.id);
    this.entity = newEntity || new Produto();
    this.entityForm.patchValue(this.entity);
  }

  private checkIsNew(id: number): boolean {
    if (id <= 0) {
      return true;
    }
    return false;
  }

  onVoltarClick() {
    this.router.navigate(['produto/list']);
  }

  onSubmit() {
    this.entityForm.disable();

    this.produtoService.saveOrCreate(this.isNew, this.entityForm.value).then(_ => {
      this.openSnackBar('Produto salvo com sucesso!', 'Ok');
      this.router.navigate(['produto/list']);
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
