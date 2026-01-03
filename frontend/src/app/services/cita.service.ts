import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { makeAppointment } from '../models/makeAppointment';

@Injectable({
  providedIn: 'root'
})
export class appointmentService {
  // REMOVED trailing slashes to match Express exactly
  url = "http://localhost:3000/appointments";
  urlDelete = "http://localhost:3000/deleteAppointment"; 
  urlRegister = "http://localhost:3000/registerAppointment";

  constructor(private http: HttpClient) { }

  getAppointment(email?: string | null){
    const URL = email ? `${this.url}?email=${email}` : this.url;
    return this.http.get<makeAppointment[]>(URL);
  }

  deleteAppointment(id: string): Observable<any>{
    return this.http.delete(`${this.urlDelete}/${id}`);
  }

  saveAppointment(cita: makeAppointment): Observable<any>{
    return this.http.post(this.urlRegister, cita);
  }
}