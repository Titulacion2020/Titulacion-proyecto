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
import { TratamientoMInterface } from 'src/app/models/tratamiento.model';
import { PagosInterface } from 'src/app/models/pago-model';
import { PagoService } from './../../../../services/pago/pago.service';

@Component({
  selector: 'app-editar-pago',
  templateUrl: './editar-pago.component.html',
  styleUrls: ['./editar-pago.component.css']
})
export class EditarPagoComponent implements OnInit {

  valorPatern = /^\d+(?:[.,]\d+)?$/;
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  dateSelected: Date;
  minDate: Date = new Date();
  tratamientosArray = [];
  tratamientosArraySelect = [];
  seguroArraySelect =[];
  tratamientoSelected: TratamientoMInterface= {};
  seguroSelected: any;
  pagoList: any[] = [];
  editable: boolean = true;


  pagoForm = new FormGroup({
    id: new FormControl(null),
    fechaPago: new FormControl('', Validators.required),
    cedulaPaciente: new FormControl('', Validators.required),
    seguro: new FormControl(''),
    tratamiento:  new FormControl('', Validators.required),
    nombrePaciente:  new FormControl(''),
    valorPagar: new FormControl('', [Validators.required, Validators.pattern(this.valorPatern)]),
    ultimoValorCancelado: new FormControl(''),
    valorPago: new FormControl(''),
    valorPendiente: new FormControl(''),
    
  });

  precioTratamiento: number;
  filteredOptions: Observable<string[]>;

  constructor(
    private toastr: ToastrService,
    public tratamientoService: TratamientoService,    
    public pactService: PacienteService,
    public pacienteService: PacienteService,
    public espeService: EspecialidadService,
    private pagoMService: PagoService,
    public seguroService: SeguroService,
    private dialogRef: MatDialogRef<EditarPagoComponent>,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.setValues();  
  }

  setValues() {
    const parts = this.pagoMService.pagoSelected.fechaPago.split('/');
    const newdate = new Date(parts[2], (parts[1] - 1),parts[0]);
    this.pagoForm.get('fechaPago').setValue(newdate);   
    this.pagoForm.get('cedulaPaciente').setValue(this.pagoMService.pagoSelected.cedulaPaciente);    
    this.pagoForm.get('nombrePaciente').setValue(this.pagoMService.pagoSelected.nombrePaciente);
    this.pagoForm.get('tratamiento').setValue(this.pagoMService.pagoSelected.tratamiento);
    this.pagoForm.get('seguro').setValue(this.pagoMService.pagoSelected.seguro);
    this.pagoForm.get('id').setValue(this.pagoMService.pagoSelected.id);      
    this.pagoForm.get('valorPago').setValue(this.pagoMService.pagoSelected.valorPago); 
    this.pagoForm.get('valorPagar').setValue(this.pagoMService.pagoSelected.valorPagar); 
    this.pagoForm.get('ultimoValorCancelado').setValue(this.pagoMService.pagoSelected.ultimoValorCancelado); 
    this.pagoForm.get('valorPendiente').setValue(this.pagoMService.pagoSelected.valorPendiente); 
    this.PagoCubreSeguro();
  }

  PagoCubreSeguro(){
    const segurocubre = this.pagoMService.pagoSelected.seguro;
    if (segurocubre === "No aplica" || segurocubre === "sin seguro") {
      this.editable = true;
    }else{
      this.editable = false;
    }
  }

  selectFecha(date: any) {
    this.dateSelected = date;
  }

  savePago(data: any) {
      const valorpagarbase = this.pagoMService.pagoSelected.valorPagar;
      
      let newdata: PagosInterface;
      const fecha = Date.parse(data.fechaPago);
      data.fechaPago = fecha;
      const valorPagar = Number.parseFloat(data.valorPagar);
      const valorPendiente =  Number.parseFloat(data.valorPendiente);
      data.valorPagar  = valorPagar;
      data.valorPendiente = data.valorPendiente + valorpagarbase - valorPagar;
 
      newdata = data;
      
      if((valorPendiente+this.pagoMService.pagoSelected.valorPago)==0){
        this.toastr.warning('No hay valores pendientes para este tratamiento', 'MENSAJE');
      }else if(valorPagar > (valorPendiente + this.pagoMService.pagoSelected.valorPago)){
        this.toastr.warning('El valor a pagar supera el valor pendiente', 'MENSAJE');
      }else if (newdata) {  
        this.pagoMService.updatePago(newdata);
        this.toastr.success('Registro actualizado exitosamente', 'MENSAJE');
        this.close();
      }    
  }

  errorMessageValor() {
    return this.pagoForm.get('valorPagar').hasError('pattern') ? 'Valor Incorrecto' :
           this.pagoForm.get('valorPagar').hasError('required') ? 'Campo Obligatorio' :
            '';
  }

  errorMessageDate() {
    return this.pagoForm.get('fechaPago').hasError('required') ? 'Fecha Incorrecta' :
           '';
  }
  check(event: KeyboardEvent) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/; 
     if ((preg.test(event.key) !== true) && event.keyCode > 31 && !this.allowedChars.has(event.keyCode)){
       event.preventDefault();
     }
   }

  close() {
    this.dialogRef.close();
  }

}
