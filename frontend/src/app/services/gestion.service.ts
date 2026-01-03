import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersModel } from '../models/users';
import { Router } from '@angular/router'
import { doctorsModel } from '../models/doctors';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  constructor(private http: HttpClient, private ruta: Router) { }

  private URL_API = 'http://localhost:3000';


  doctorsData: doctorsModel= {
    name: "",
    lastname: "",
    identificationNumber: "",
    emailAddress: "",
    password: "",
    speciality: "",
    role: "doctor",
  }

  documents: usersModel[] = [];

  usersData: usersModel = {
    name: "",
    lastname: "",
    identificationNumber: "",
    emailAddress: "",
    password: "",
    role: "",
  }


  getUser(){
    let call  = this.http.get<usersModel[]>(this.URL_API + '/users')
    return call;
  }

  signUpUsers(personalData: usersModel){
    let call = this.http.post<any>(this.URL_API + '/signUp', personalData);
    return call
  }


  loginUsers(personalData: usersModel){
    let call = this.http.post<any>(this.URL_API + '/login', personalData);
    return call
  }

  getUsersRole(correo: string) {
    let call = this.http.get<any>(this.URL_API + '/role/' + correo);
    return call;
    }

  userSignedIn(){
    return !!localStorage.getItem("token")
  }

  getToken(){
    return localStorage.getItem('token');
  }

  signOut(){
    localStorage.removeItem('token');
    this.ruta.navigate(['/']);
  }
}
