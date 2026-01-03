import { ToastrService } from 'ngx-toastr';
import { appointmentService } from './../../services/cita.service';
import { Component, OnInit } from '@angular/core';
import { makeAppointment } from 'src/app/models/makeAppointment';

@Component({
  selector: 'app-listacitas',
  templateUrl: './listacitas.component.html',
  styleUrls: ['./listacitas.component.css'],
})
export class ListacitasComponent implements OnInit {
  listaCitas: makeAppointment[] = [];
  msg = false;

  constructor(
    private _citaService: appointmentService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.appointments();
  }

  appointments() {
    const loggedInEmail = localStorage.getItem('emailAddress');

    // console.log("Filtering for email:", loggedInEmail);

    if (loggedInEmail){
      this._citaService.getAppointment(loggedInEmail).subscribe(
      (data) => {
        console.log(data);
        this.listaCitas = data;
      },
      (error) => {
        console.log(error);
      }
    );
    }
    
  }

  deleteAppointment(id: any) {
    this._citaService.deleteAppointment(id).subscribe(
      (data) => {
        this.msg = true;
        setTimeout( ()=>{this.msg = false}, 1000) 
        this.appointments();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
