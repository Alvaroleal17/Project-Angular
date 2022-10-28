import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { MedicosComponent } from './components/medicos/medicos.component';
import { RegistrarCitaComponent } from './components/registrar-cita/registrar-cita.component';
import { ListacitasComponent } from './components/listacitas/listacitas.component';
import { IncapacidadComponent } from './components/incapacidad/incapacidad.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { GestionGuard } from './gestion.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [GestionGuard] },
  { path: 'doctor', component: MedicosComponent, canActivate: [GestionGuard] },
  { path: 'user', component: UsersComponent },
  {
    path: 'registrarcita',
    component: RegistrarCitaComponent,
    canActivate: [GestionGuard],
  },
  {
    path: 'modificarcita',
    component: RegistrarCitaComponent,
    canActivate: [GestionGuard],
  },
  {
    path: 'listacitas',
    component: ListacitasComponent,
    canActivate: [GestionGuard],
  },
  {
    path: 'incapacidades',
    component: IncapacidadComponent,
    canActivate: [GestionGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
