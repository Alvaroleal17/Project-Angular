import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { makeAppointment } from 'src/app/models/makeAppointment';
import { appointmentService } from './../../services/cita.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  Doctors = [];
  listaCitas: makeAppointment [] = [];
  msg = false;

  constructor(private _citaService: appointmentService, public taskService: TaskService, private ruta: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.appointments();
    this.taskService.obtenerDoctors().subscribe({
      next: (res) => {
        this.Doctors = res;
      },
      error: (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.ruta.navigate(['/login']);
          }
        }
      }
    });
  }

  appointments() {
    this._citaService.getAppointment().subscribe(
      (data) => {
        console.log(data);
        this.listaCitas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  remove(appointment: any) {
    if (appointment._id) {
      this._citaService.deleteAppointment(appointment._id).subscribe({
        next: (res) => {
          this.msg = true;
          this.appointments();
          setTimeout(() => { this.msg = false }, 1500);
        },
        error: (err) => {
          this.toastr.error('Error completing appointment');
          console.error(err);
        }
      });
    }
  }
}
