import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/services/gestion.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
 
  form;


  constructor(public servicio: GestionService, private ruta: Router, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      nombre: ['',[ Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    });
  }


  ngOnInit(): void {
    this.listadoUsuarios();

    
  }


 
  listadoUsuarios() {
    this.servicio.obtenerUsuarios().subscribe({
      next: (res) => {
        this.servicio.documents = res;
      },
      error: (err) => console.log(err),
    });
  }

  agregarUsuario(form: any) {
    this.servicio.registroUsuario(form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.ruta.navigate(['/user']);
        this.listadoUsuarios();
        form.reset();
      },
      error: (err) => console.log(err),
    });
  }

 
}
