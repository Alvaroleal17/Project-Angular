import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { makeSickLeave } from 'src/app/models/makeSickLeave';
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
  makeSickLeave: FormGroup;

  constructor(
    public servicioIncap: InabilityService, 
    private ruta: Router, 
    private formBuilder: FormBuilder, 
    private toastr: ToastrService
  ) {
    this.makeSickLeave = this.formBuilder.group({
      identificationType: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      sickLeave: ['', Validators.required],
      daysLeave: ["", [Validators.required, Validators.min(1)]], // Fixed: daysLeave to match HTML
      typeSickLeave: ['', Validators.required],
    });
  }

  generatePdf() {
    const formValues = this.makeSickLeave.value;

    const documentDefinition: any = {
      content: [
        { text: 'PROOF OF SICK LEAVE', bold: true, fontSize: 20, alignment: 'center', margin: [0, 0, 0, 20] },
        {
          table: {
            widths: [488],
            body: [[{ text: 'PATIENT DATA', alignment: 'center', fontSize: 16, margin: [5, 5, 5, 5], bold: true, color: '#120CDB' }]]
          }
        },
        {
          table: {
            margin: [0, 0, 0, 50],
            widths: [150, 150, 170],
            body: [
              [{ text: 'Name', bold: true }, { text: 'Last name', bold: true }, { text: 'Identification number', bold: true }],
              [formValues.name, formValues.lastname, formValues.identificationNumber]
            ]
          }
        },
        {
          table: {
            widths: [488],
            body: [[{ text: 'SICK LEAVE DATA', alignment: 'center', fontSize: 16, margin: [5, 5, 5, 5], bold: true, color: '#120CDB' }]]
          }
        },
        {
          table: {
            margin: [0, 0, 0, 50],
            widths: [150, 150, 170],
            body: [
              [{ text: 'Start Date', bold: true }, { text: 'Days Requested', bold: true }, { text: 'Type of Sick Leave ', bold: true }],
              [formValues.sickLeave, formValues.daysLeave, formValues.typeSickLeave] // Values from form
            ]
          }
        },
        {
          table: {
            widths: [488],
            body: [[{ text: 'Signature:', fontSize: 10, margin: [5, 5, 5, 5], bold: true }]]
          }
        },
      ]
    };
    pdfMake.createPdf(documentDefinition).open();
  }

  ngOnInit(): void {}

  addSickLeave() {
    if (this.makeSickLeave.invalid) {
      this.toastr.error('Please fill all required fields');
      return;
    }

    const incapacidad: makeSickLeave = {
      identificationType: this.makeSickLeave.get('identificationType')?.value,
      identificationNumber: this.makeSickLeave.get('identificationNumber')?.value,
      name: this.makeSickLeave.get('name')?.value,
      lastname: this.makeSickLeave.get('lastname')?.value,
      emailAddress: this.makeSickLeave.get('emailAddress')?.value,
      sickLeave: this.makeSickLeave.get('sickLeave')?.value,
      daysLeave: this.makeSickLeave.get('daysLeave')?.value,
      typeSickLeave: this.makeSickLeave.get('typeSickLeave')?.value,
    };

    this.servicioIncap.saveSickLeave(incapacidad).subscribe({
      next: (data) => {
        this.toastr.success('The sick leave was successfully registered!', 'Success');
        this.generatePdf();
        this.makeSickLeave.reset();
        this.ruta.navigate(['/user']);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Error saving sick leave');
      }
    });
  }
}