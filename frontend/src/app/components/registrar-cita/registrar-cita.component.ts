import { Component, OnInit } from '@angular/core';
import { CrearCitas } from 'src/app/models/crearCita';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CitaService } from './../../services/cita.service';

@Component({
  selector: 'app-registrar-cita',
  templateUrl: './registrar-cita.component.html',
  styleUrls: ['./registrar-cita.component.css'],
})
export class RegistrarCitaComponent implements OnInit {
  crearCita: FormGroup;
  msg = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _citaService: CitaService
  ) {
    this.crearCita = this.fb.group({
      nombres: ['', Validators.required], //aqui podemos colocar validaciones personalizadas
      apellidos: ['', Validators.required],
      iden: ['', Validators.required],
      cc: ['', Validators.required],
      nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      departamento: ['', Validators.required],
      especialidad: ['', Validators.required],
      fecha: ['', Validators.required],
      time: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }

  agregarCita() {
    const CITA: CrearCitas = {
      nombres: this.crearCita.get('nombres')?.value,
      apellidos: this.crearCita.get('apellidos')?.value,
      iden: this.crearCita.get('iden')?.value,
      cc: this.crearCita.get('cc')?.value,
      nacimiento: this.crearCita.get('nacimiento')?.value,
      telefono: this.crearCita.get('telefono')?.value,
      email: this.crearCita.get('email')?.value,
      departamento: this.crearCita.get('departamento')?.value,
      especialidad: this.crearCita.get('especialidad')?.value,
      fecha: this.crearCita.get('fecha')?.value,
      time: this.crearCita.get('time')?.value,
      descripcion: this.crearCita.get('descripcion')?.value,
    };
    this._citaService.guardarcita(CITA).subscribe({
      next: (data) => {
        this.router.navigate(['/user']);
      },
      error: (error) => {
        console.log(error);
        this.crearCita.reset();
      }
   });

  }

  mensaje(){
    this.msg = true;
    setTimeout( ()=>{this.msg = false}, 2000) 
  }
}
