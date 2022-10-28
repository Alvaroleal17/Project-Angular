import { ToastrService } from 'ngx-toastr';
import { CitaService } from './../../services/cita.service';
import { Component, OnInit } from '@angular/core';
import { CrearCitas } from 'src/app/models/crearCita';

@Component({
  selector: 'app-listacitas',
  templateUrl: './listacitas.component.html',
  styleUrls: ['./listacitas.component.css'],
})
export class ListacitasComponent implements OnInit {
  listaCitas: CrearCitas[] = [];
  msg = false;

  constructor(
    private _citaService: CitaService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.citas();
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

  borrarcita(id: any) {
    this._citaService.borrarcita(id).subscribe(
      (data) => {
        this.msg = true;
        setTimeout( ()=>{this.msg = false}, 1000) 
        this.citas();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
