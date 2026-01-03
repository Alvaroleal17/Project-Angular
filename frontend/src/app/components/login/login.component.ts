import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/services/gestion.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;

  constructor(public servicio: GestionService, private ruta: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  getRole(email: string) {
    this.servicio.getUsersRole(email).subscribe({
      next: (res) => {
        localStorage.setItem('role', res.role);
      
        // Navigation logic based on role
        if (res.role === "user") {
          this.ruta.navigate(['user']);
        } else if (res.role === "doctor") {
          this.ruta.navigate(['doctor']);
        } else if (res.role === "admin") {
          this.ruta.navigate(['admin']);
        }
      },
      error: (err) => console.log('Error fetching role:', err),
    });
  }

  validarLogin() {
    const emailToQuery = this.servicio.usersData.emailAddress;

    this.servicio.loginUsers(this.servicio.usersData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('emailAddress', emailToQuery);
        this.getRole(emailToQuery);
      },
      error: (err) => {
        if (err.status === 401) {
          this.error = true;
        }
        console.log('Login error:', err);
      }
    });
  }
}