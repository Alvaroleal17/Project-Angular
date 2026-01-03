import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/services/gestion.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  form: FormGroup;

  constructor(
    public servicio: GestionService, 
    private ruta: Router, 
    private formBuilder: FormBuilder
  ) {
    // Initialize the Reactive Form
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      role: ['user'],
      identificationNumber: ['0'] 
    });
  }

  ngOnInit(): void {
    this.listadoUsuarios();
  }
  
  listadoUsuarios() {
    this.servicio.getUser().subscribe({
      next: (res) => {
        this.servicio.documents = res;
      },
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  agregarUsuario() {
    if (this.form.valid) {
      const rawData = this.form.value;
      const userToSave = {
        name: rawData.name,
        lastname: rawData.lastname,
        emailAddress: rawData.emailAddress,
        password: rawData.password,
        role: rawData.role,
        identificationNumber: rawData.identificationNumber
      };

      this.servicio.signUpUsers(userToSave).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          this.ruta.navigate(['/user']);
          this.form.reset();
        },
        error: (err) => console.error('Registration error:', err),
      });
    }
  }
}