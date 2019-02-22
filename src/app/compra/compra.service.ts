import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Compra } from './compra.model';
import { ResumoDebitos } from './resumodebitos';

@Injectable()
export class CompraService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/compra/');
  }

  findById(id: number): Observable<Compra> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new Compra());
    }
    return this.http.get<Compra>('http://localhost:8080/api/compra/' + `${id}`);
  }

  findResumoById(id: number): Observable<ResumoDebitos> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new ResumoDebitos());
    }
    return this.http.get<ResumoDebitos>('http://localhost:8080/api/compra/resumo/' + `${id}`);
  }

  deleteById(id: number): Promise<Compra> {
    return this.http
    .delete('http://localhost:8080/api/compra/' + `${id}`)
    .toPromise()
    .then(e => <Compra>e);
  }

  create(newEntity: Compra): Promise<Compra> {
    const copy = Object.assign(newEntity);
    delete copy.id;
    delete copy.version;

    return this.http
      .post('http://localhost:8080/api/compra/', copy)
      .toPromise()
      .then(value => <Compra>value);
  }

  save(entity: Compra): Promise<Compra> {
    return this.http
      .put('http://localhost:8080/api/compra/', entity)
      .toPromise()
      .then(value => <Compra>value);
  }

  saveOrCreate(isNew: boolean, entity: Compra): Promise<Compra> {
    if (isNew) {
      return this.create(entity);
    }
    return this.save(entity);
  }
}
