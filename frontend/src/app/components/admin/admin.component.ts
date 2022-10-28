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

  lista:string[]=["Odontologia","Pediatria","Cardiologia", "Cirugia General", "Dermatologia", "Cirugia Plastica"];
 
  form;

  constructor(public servicio: GestionService, private ruta: Router, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      nombre: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      documento: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
      especialidad: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      role: ['', [Validators.required]],

    });
   }

  ngOnInit(): void {

  }


  listadoDoctores() {
    this.servicio.obtenerUsuarios().subscribe({
      next: (res) => {
        this.servicio.documents = res;
      },
      error: (err) => console.log(err),
    });
  }

  agregarDoctor(form: any) {
    this.servicio.registroUsuario(form.value).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      this.ruta.navigate(['/doctor']);
      this.listadoDoctores();
      form.reset(); 
    },
    error: (err) => console.log(err)
    });
    }
}
