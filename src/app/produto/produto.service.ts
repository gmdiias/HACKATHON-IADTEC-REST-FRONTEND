import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from './produto.model';

@Injectable()
export class ProdutoService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/produto/');
  }

  findById(id: number): Observable<Produto> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new Produto());
    }
    return this.http.get<Produto>('http://localhost:8080/api/produto/' + `${id}`);
  }

  deleteById(id: number): Promise<Produto> {
    return this.http
    .delete('http://localhost:8080/api/produto/' + `${id}`)
    .toPromise()
    .then(e => <Produto>e);
  }

  create(newEntity: Produto): Promise<Produto> {
    const copy = Object.assign(newEntity);
    delete copy.id;
    delete copy.version;

    return this.http
      .post('http://localhost:8080/api/produto/', copy)
      .toPromise()
      .then(value => <Produto>value);
  }

  save(entity: Produto): Promise<Produto> {
    return this.http
      .put('http://localhost:8080/api/produto/', entity)
      .toPromise()
      .then(value => <Produto>value);
  }

  saveOrCreate(isNew: boolean, entity: Produto): Promise<Produto> {
    if (isNew) {
      return this.create(entity);
    }
    return this.save(entity);
  }
}
