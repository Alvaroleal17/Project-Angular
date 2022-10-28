import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrearIncapacidad } from 'src/app/models/crearIncapacidad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { InabilityService } from 'src/app/services/inability.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs
  
@Component({
  selector: 'app-incapacidad',
  templateUrl: './incapacidad.component.html',
  styleUrls: ['./incapacidad.component.css']
})
export class IncapacidadComponent implements OnInit {

  crearIncapacidad: FormGroup;

  constructor(public servicioIncap: InabilityService, private ruta: Router, private formBuilder: FormBuilder,     private toastr: ToastrService,
    ) {
    this.crearIncapacidad = this.formBuilder.group({
      documento: ['', Validators.required],
      numberDoc: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      incapacidad: ['', Validators.required],
      dias: ["", [Validators.required, Validators.minLength(1)]],
      tipo: ['', Validators.required],


    });
   }

   generatePdf(){

    const documentDefinition: any = {
       content: [
        {
          text: 'COMPRABANTE DE INCAPACIDADES',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          table: {
            widths: [488],
            body: [
              [
                {text:'DATOS DEL PACIENTE',alignment: 'center',fontSize: 16,margin: [5, 5, 5, 5], bold: true,
                color: '#120CDB',}
              
              ]
            ]
          }
        },
        {
          table: {
           margin: [0, 0, 0, 50],
           widths: [150, 150, 170 ],
           body:  [
              [
                {text: 'Nombres', bold: true,},
                {text: 'Apellidos', bold: true},
                {text: 'Número de documento', bold: true},
              ],
              [
                this.servicioIncap.datosIncap.nombres,
                this.servicioIncap.datosIncap.apellidos,
                this.servicioIncap.datosIncap.numberDoc,
              ],
              
            ]
          },
        },
        {
          table: {
            widths: [488],
            body: [
              [
                {text:'DATOS DE LA INCAPACIDAD',alignment: 'center',fontSize: 16,margin: [5, 5, 5, 5], bold: true,
                color: '#120CDB',}
              
              ]
            ]
          }
        },
        {
          table: {
           margin: [0, 0, 0, 50],
           widths: [150, 150, 170 ],
           body:  [
              [
                {text: 'Fecha de inicio', bold: true},
                {text: 'Días solicitados', bold: true},
                {text: 'Tipo de incapacidad', bold: true},
              ],
              [
                this.servicioIncap.datosIncap.incapacidad,
                this.servicioIncap.datosIncap.dias,
                this.servicioIncap.datosIncap.tipo,
              ],
              
            ]
          },
        },
        {
          table: {
            widths: [488],
            body: [
              [
                {text:'FIRMA:',fontSize: 10,margin: [5, 5, 5, 5], bold: true,}
              ]
            ]
          }
        },
       ]
       
   }
   const pdf = pdfMake.createPdf(documentDefinition);
   pdf.open();
  }

  ngOnInit(): void {}

  listadoIncapacidades() {
    this.servicioIncap.getCitas().subscribe({
      next: (res) => {
        this.servicioIncap.documents = res;
      },
      error: (err) => console.log(err),
    });
  }

  agregarIncapacidad() {
    const incapacidad: CrearIncapacidad = {
      documento: this.crearIncapacidad.get('documento')?.value,
      numberDoc: this.crearIncapacidad.get('numberDoc')?.value,
      nombres: this.crearIncapacidad.get('nombres')?.value,
      apellidos: this.crearIncapacidad.get('apellidos')?.value,
      correo: this.crearIncapacidad.get('correo')?.value,
      incapacidad: this.crearIncapacidad.get('incapacidad')?.value,
      dias: this.crearIncapacidad.get('dias')?.value,
      tipo: this.crearIncapacidad.get('tipo')?.value,
    }
    this.servicioIncap.guardarIncapacidad(incapacidad).subscribe(
      (data) => {
        this.toastr.success(
          'la incapacidad fue registrada con exito!',
          'La Incapacidad fue enviada!',
          
          {
            timeOut: 3000,
            positionClass: 'toast-top-center',
          }
        );
        this.ruta.navigate(['/user']);
      },
      (error) => {
        console.log(error);
        this.crearIncapacidad.reset();
      }
    );
  }



}
