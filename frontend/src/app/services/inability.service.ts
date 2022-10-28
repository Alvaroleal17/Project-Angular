import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearIncapacidad } from '../models/crearIncapacidad';

@Injectable({
  providedIn: 'root'
})
export class InabilityService {
  url = "http://localhost:3000/incapacidad/";
  url2 = "http://localhost:3000/registrarincapacidad/";

  constructor(private http: HttpClient) { }

  documents: CrearIncapacidad [] = []

  datosIncap: CrearIncapacidad = {
    documento: "Cedula de Ciudadania",
    numberDoc: "",
    nombres: "",
    apellidos: "",
    correo: "",
    incapacidad: "",
    dias: "",
    tipo: "",
  }

  getCitas(): Observable<any>{
    return this.http.get(this.url)
  }

  guardarIncapacidad(incapacidad: CrearIncapacidad){
    return this.http.post<any>(this.url2, incapacidad)
  }

}
