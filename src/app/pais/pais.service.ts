import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pais } from './pais.model';

@Injectable()
export class PaisService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:8080/api/pais/');
  }

  search(page): Observable<any> {
    const pageSize = ''+ page.pageSize;
    const params = new HttpParams()
    .set('page_size', pageSize)
    .set('page_page', '1');

    return this.http.get('http://localhost:8080/api/pais/search', {
      params
    });
  }

  findById(id: number): Observable<Pais> {
    if (!Number.isInteger(id) || id < 0) {
      return of(new Pais());
    }
    return this.http.get<Pais>('http://localhost:8080/api/pais/' + `${id}`);
  }

  deleteById(id: number): Promise<Pais> {
    return this.http
    .delete('http://localhost:8080/api/pais/' + `${id}`)
    .toPromise()
    .then(e => <Pais>e);
  }

  create(newEntity: Pais): Promise<Pais> {
    const copy = Object.assign(newEntity);
    delete copy.id;
    delete copy.version;

    return this.http
      .post('http://localhost:8080/api/pais/', copy)
      .toPromise()
      .then(value => <Pais>value);
  }

  save(entity: Pais): Promise<Pais> {
    return this.http
      .put('http://localhost:8080/api/pais/', entity)
      .toPromise()
      .then(value => <Pais>value);
  }

  saveOrCreate(isNew: boolean, entity: Pais): Promise<Pais> {
    if (isNew) {
      return this.create(entity);
    }
    return this.save(entity);
  }

  autocomplete(search: string) {
    return this.http.get<Pais[]>(
      'http://localhost:8080/api/pais/autocomplete/' + search,
    );
  }
}
