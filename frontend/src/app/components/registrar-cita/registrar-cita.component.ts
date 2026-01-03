import { Component, OnInit } from '@angular/core';
import { makeAppointment } from 'src/app/models/makeAppointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { appointmentService } from './../../services/cita.service';

@Component({
  selector: 'app-registrar-cita',
  templateUrl: './registrar-cita.component.html',
  styleUrls: ['./registrar-cita.component.css'],
})
export class RegistrarCitaComponent implements OnInit {
  createAppointment: FormGroup;
  message = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _citaService: appointmentService
  ) {
    this.createAppointment = this.fb.group({
      name: ['', Validators.required], //Here we can place custom valitdations 
      lastname: ['', Validators.required],
      identificationType: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      dateBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      location: ['', Validators.required],
      speciality: ['', Validators.required],
      dateAppointment: ['', Validators.required],
      timeAppointment: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  addAppointment() {
    const Appointment: makeAppointment = {
      name: this.createAppointment.get('name')?.value,
      lastname: this.createAppointment.get('lastname')?.value,
      identificationType: this.createAppointment.get('identificationType')?.value,
      identificationNumber: this.createAppointment.get('identificationNumber')?.value,
      dateBirth: this.createAppointment.get('dateBirth')?.value,
      phoneNumber: this.createAppointment.get('phoneNumber')?.value,
      emailAddress: this.createAppointment.get('emailAddress')?.value,
      location: this.createAppointment.get('location')?.value,
      speciality: this.createAppointment.get('speciality')?.value,
      dateAppointment: this.createAppointment.get('dateAppointment')?.value,
      timeAppointment: this.createAppointment.get('timeAppointment')?.value,
      description: this.createAppointment.get('description')?.value,
    };
    this._citaService.saveAppointment(Appointment).subscribe({
      next: (data) => {
        this.router.navigate(['/user']);
      },
      error: (error) => {
        console.log(error);
        this.createAppointment.reset();
      }
   });

  }

  getMessage(){
    this.message = true;
    setTimeout( ()=>{this.message = false}, 2000) 
  }
}
