import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL_API =  'http://localhost:3000';
  constructor(public http: HttpClient) { }

  obtenerUsers(){
    let peticion  = this.http.get<any>(this.URL_API + '/users')
    return peticion;
  }

  obtenerDoctors(){
    let peticion  = this.http.get<any>(this.URL_API + '/doctors')
    return peticion;
  }

  obtenerDoctor(){
    let peticion  = this.http.get<any>(this.URL_API + '/doctors/ + id')
    return peticion;
  }


}

