import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from './cliente.model';
import { Filtro } from '../relatorio/filtro.model';

@Injectable()
export class ClienteService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/cliente/');
  }

  findById(id: number): Observable<Cliente> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new Cliente());
    }
    return this.http.get<Cliente>('http://localhost:8080/api/cliente/' + `${id}`);
  }

  deleteById(id: number): Promise<Cliente> {
    return this.http
    .delete('http://localhost:8080/api/cliente/' + `${id}`)
    .toPromise()
    .then(e => <Cliente>e);
  }

  create(newEntity: Cliente): Promise<Cliente> {
    const copy = Object.assign(newEntity);
    delete copy.id;
    delete copy.version;

    return this.http
      .post('http://localhost:8080/api/cliente/', copy)
      .toPromise()
      .then(value => <Cliente>value);
  }

  save(entity: Cliente): Promise<Cliente> {
    return this.http
      .put('http://localhost:8080/api/cliente/', entity)
      .toPromise()
      .then(value => <Cliente>value);
  }

  saveOrCreate(isNew: boolean, entity: Cliente): Promise<Cliente> {
    if (isNew) {
      return this.create(entity);
    }
    return this.save(entity);
  }

  getRelatorioFilter(filtro: Filtro): Observable<any> {
    let params = new HttpParams();
    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }
    if (filtro.dataNascimento) {
      const data = new Date(filtro.dataNascimento);
      params = params.set('data', data.toLocaleDateString());
    }
    if (filtro.situacao) {
      params = params.set('situacao', filtro.situacao);
    }
    return this.http.get('http://localhost:8080/api/cliente/filtro', {
      params,
    });
  }
}
