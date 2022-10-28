import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { GestionService } from './gestion.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  
  constructor(private servicio: GestionService) { }

  intercept(req: any, next: any) {
    let tokenizeReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.servicio.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }

}
