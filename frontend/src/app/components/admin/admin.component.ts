import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/services/gestion.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  lista:string[]=["Dentistry","Pediatrics","Cardiology", "Dermatology", "Gynecology", "Psychiatry", "Neurology", "Oncology"];
 
  form;

  constructor(public servicio: GestionService, private ruta: Router, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      name: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      identificationNumber: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      speciality: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      role: ['', [Validators.required]],

    });
   }

  ngOnInit(): void {

  }


  medicalStaffList() {
    this.servicio.getUser().subscribe({
      next: (res) => {
        this.servicio.documents = res;
      },
      error: (err) => console.log(err),
    });
  }

  addMedicalStaff(form: any) {
    this.servicio.signUpUsers(form.value).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      this.ruta.navigate(['/doctor']);
      this.medicalStaffList();
      form.reset(); 
    },
    error: (err) => console.log(err)
    });
    }
}
