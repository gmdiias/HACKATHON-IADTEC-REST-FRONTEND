import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Estado } from './estado.model';

@Injectable()
export class EstadoService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/estado/');
  }

  findById(id: number): Observable<Estado> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new Estado());
    }
    return this.http.get<Estado>('http://localhost:8080/api/estado/' + `${id}`);
  }

  deleteById(id: number): Promise<Estado> {
    return this.http
    .delete('http://localhost:8080/api/estado/' + `${id}`)
    .toPromise()
    .then(e => <Estado>e);
  }

  create(newEntity: Estado): Promise<Estado> {
    const copy = Object.assign(newEntity);
    delete copy.id;
    delete copy.version;

    return this.http
      .post('http://localhost:8080/api/estado/', copy)
      .toPromise()
      .then(value => <Estado>value);
  }

  save(entity: Estado): Promise<Estado> {
    return this.http
      .put('http://localhost:8080/api/estado/', entity)
      .toPromise()
      .then(value => <Estado>value);
  }

  saveOrCreate(isNew: boolean, entity: Estado): Promise<Estado> {
    if (isNew) {
      return this.create(entity);
    }
    return this.save(entity);
  }
}
