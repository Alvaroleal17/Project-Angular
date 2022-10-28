import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router'
import { CrearCitas } from 'src/app/models/crearCita';
import { CitaService } from './../../services/cita.service';




@Component({
  selector: 'medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  Doctors = [];
  listaCitas: CrearCitas [] = [];
  msg = false;

  constructor(private _citaService: CitaService, public taskService: TaskService, private ruta: Router) { }

  ngOnInit(): void {
    this.citas();
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




  citas() {
    this._citaService.getCitas().subscribe(
      (data) => {
        console.log(data);
        this.listaCitas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  remove(row: any){
    console.log(row)
    this.msg = true;
    this.listaCitas.splice(row, 1)
    setTimeout( ()=>{this.msg = false}, 1500) 
  }
}
