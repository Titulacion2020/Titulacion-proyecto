import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TratamientoService } from 'src/app/services/tratamiento/tratamiento.service';
import { SeguroService } from 'src/app/services/seguro/seguro.service';
import { MatDialogRef } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { PagoService } from './../../../../services/pago/pago.service';

@Component({
  selector: 'app-visualizar-pago',
  templateUrl: './visualizar-pago.component.html',
  styleUrls: ['./visualizar-pago.component.css']
})
export class VisualizarPagoComponent implements OnInit {

  pagoForm = new FormGroup({
    id: new FormControl(null),
    fechaPago: new FormControl(''),
    cedulaPaciente: new FormControl(''),
    seguro: new FormControl(''),
    tratamiento: new FormControl(''),
    nombrePaciente: new FormControl(''),
    ultimoValorCancelado: new FormControl(''),
    valorPago: new FormControl(''),
    valorPendiente: new FormControl(''),
  });

  precioTratamiento: number;

  constructor(
    private toastr: ToastrService,
    public tratamientoService: TratamientoService,
    public pactService: PacienteService,
    public pacienteService: PacienteService,
    public espeService: EspecialidadService,
    private pagoMService: PagoService,
    public seguroService: SeguroService,
    private dialogRef: MatDialogRef<VisualizarPagoComponent>,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.setValues();
  }

  setValues() {
    this.pagoForm.get('fechaPago').setValue(this.pagoMService.pagoSelected.fechaPago);
    this.pagoForm.get('cedulaPaciente').setValue(this.pagoMService.pagoSelected.cedulaPaciente);
    this.pagoForm.get('nombrePaciente').setValue(this.pagoMService.pagoSelected.nombrePaciente);
    this.pagoForm.get('seguro').setValue(this.pagoMService.pagoSelected.seguro);
    this.pagoForm.get('valorPago').setValue(this.pagoMService.pagoSelected.valorPago);
    this.pagoForm.get('ultimoValorCancelado').setValue(this.pagoMService.pagoSelected.ultimoValorCancelado);
    this.pagoForm.get('valorPendiente').setValue(this.pagoMService.pagoSelected.valorPendiente);
    this.pagoForm.get('tratamiento').setValue(this.pagoMService.pagoSelected.tratamiento);
  }
  
  close() {
    this.dialogRef.close();
  }

}
