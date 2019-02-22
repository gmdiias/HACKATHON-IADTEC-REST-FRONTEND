import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cliente } from './cliente.model';

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
}
