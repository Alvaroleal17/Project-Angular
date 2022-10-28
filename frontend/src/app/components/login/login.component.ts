import { Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/services/gestion.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  constructor(public servicio: GestionService, private ruta: Router, private route:ActivatedRoute) { }


  ngOnInit(): void {
  }



  error = false;


  obtenerRole(){
    this.servicio.obtenerRoleUser(this.servicio.datosUser.correo).subscribe({
      next: (res) => {
        //guardar en un localstorage en un res.role
        localStorage.setItem('role', res.role);
        if(res.role == "user"){
          this.ruta.navigate(['user']);
        }
        if(res.role == "doctor"){
          this.ruta.navigate(['doctor']);
        }
        if(res.role == "admin"){
          this.ruta.navigate(['admin']);
        }

      },
      error: (err) => console.log(err),
    });
  }

  validarLogin(){
    this.servicio.loginUsuario(this.servicio.datosUser).subscribe({
      next: (res) =>{
          localStorage.setItem('token', res.token);
          this.obtenerRole();
      },
      error: (err) =>{
        if(err.status == 401){
          this.error = true
        }
        console.log(err)
      } 
    })
  }



}
