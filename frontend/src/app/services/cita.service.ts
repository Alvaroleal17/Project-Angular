import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearCitas } from '../models/crearCita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  url = "http://localhost:3000/citas/";
  url2 = "http://localhost:3000/borrarcita/";
  url3 = "http://localhost:3000/registrarcita/";

  constructor(private http: HttpClient) { }

  getCitas(): Observable<any>{
    return this.http.get(this.url)
  }

  borrarcita(id: string): Observable<any>{
    return this.http.delete(this.url2 + id)
  }

  guardarcita(cita: CrearCitas): Observable<any>{
    return this.http.post(this.url3, cita)
  }
}
