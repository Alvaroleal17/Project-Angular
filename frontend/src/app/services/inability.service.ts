import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { makeSickLeave } from '../models/makeSickLeave';

@Injectable({
  providedIn: 'root'
})
export class InabilityService {
  url = "http://localhost:3000/sickLeave/";
  url2 = "http://localhost:3000/registerSickLeave/";

  constructor(private http: HttpClient) { }

  documents: makeSickLeave [] = []

  sickLeaveData: makeSickLeave = {
    identificationType: "ID card",
    identificationNumber: "",
    name: "",
    lastname: "",
    emailAddress: "",
    sickLeave: "",
    daysLeave: "",
    typeSickLeave: "",
  }

  getSickLeave(): Observable<any>{
    return this.http.get(this.url)
  }

  saveSickLeave(SickLeave: makeSickLeave){
    return this.http.post<any>(this.url2, SickLeave)
  }

}
