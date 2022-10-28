import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { GestionService } from './services/gestion.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GestionGuard implements CanActivate {
  constructor(
    public servicio: GestionService,
    private ruta: Router,
    private Location: Location
  ) {}

  canActivate(): boolean {
    if (this.servicio.usuarioLogeado()) {
      let role = '/' + localStorage.getItem('role');
      if (role == this.Location.path() || this.Location.path() == '/login') {
        return true;
      } else {
        localStorage.removeItem('token');
        this.ruta.navigate(['/login']);
        return false;
      }
    }
    this.ruta.navigate(['/login']);
    return false;
  }
}
