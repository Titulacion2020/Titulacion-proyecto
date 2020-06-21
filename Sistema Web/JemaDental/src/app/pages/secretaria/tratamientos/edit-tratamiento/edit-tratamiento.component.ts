import {TratamientoService } from './../../../../services/tratamiento/tratamiento.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { TratamientoMInterface } from './../../../../models/tratamiento.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteInterface } from 'src/app/models/paciente-model';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter, MatDialogRef, MatCheckbox } from '@angular/material';
import { startWith, map } from 'rxjs/operators';
import { SeguroService } from './../../../../services/seguro/seguro.service';
import { PagosInterface } from 'src/app/models/pago-model';
import { PagoService } from 'src/app/services/pago/pago.service';

@Component({
  selector: 'app-edit-tratamiento',
  templateUrl: './edit-tratamiento.component.html',
  styleUrls: ['./edit-tratamiento.component.css']
})
export class EditTratamientoComponent implements OnInit {
  especialidadSelect:any; 
  valorPatern = /^\d+(?:[.,]\d+)?$/;
  actualizo: boolean;
  allowedChars = new Set('0123456789.'.split('').map(c => c.charCodeAt(0)));

  TratamientoMform = new FormGroup({
    id: new FormControl(null),
    seguro: new FormControl(''),
    namepaciente: new FormControl(''),
    especialidad: new FormControl('', Validators.required),
    cipaciente: new FormControl('',  Validators.required),
    odontologo: new FormControl('',  Validators.required),
    fecha: new FormControl('',  Validators.required),
    tratamiento: new FormControl('',  Validators.required),
    precio: new FormControl('', [Validators.required, Validators.pattern(this.valorPatern)]),
    sseguro: new FormControl(null),
      observacion: new FormControl('', Validators.required),
  });

  valorseguro: string;
  sseguro: boolean = false;
  filteredOptions: Observable<string[]>;
  minDate: Date = new Date();
  specialtiesSelected: string;
  pacientes: PacienteInterface[];
  pacient: PacienteInterface = {};
  odontEspecialidad: any[] = [];
  allHours = [];
  dateSelected: Date;
  dentistselected: any;
  registeredMedicalTratamientos: TratamientoMInterface[] = [];

  pacientList: any[] = [];
  dentistList: any[] = [];
  bloquearValorPagar: boolean = true;
  todosPagos: PagosInterface[];

  constructor(
    private toastr: ToastrService,
    public espeService: EspecialidadService,
    public pactService: PacienteService,
    private dateAdapter: DateAdapter<Date>,
    public seguroService: SeguroService,
    private pagoService: PagoService,
    private tratamientoMService: TratamientoService,
    public odontService: OdontologoService,
    private dialogRef: MatDialogRef<EditTratamientoComponent>,
    @Inject(LOCALE_ID) private locale: string,
  ) {
    this.dateAdapter.setLocale('es');
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.bloquearValorPago();
    this.getPacientandDentistList();
    this.actualizo = false;
    this.especialidadSelect = this.getEspecialidades();
  }

  getEspecialidades():any[]{
    let especiadidadesArray = [];
    this.odontService.arrayOdontologos.map((odont) => {

      if(especiadidadesArray.length ==0 ){
        especiadidadesArray.push(odont.especialidad);
      }else if(!especiadidadesArray.find(val=>val.trim() === odont.especialidad.trim())){
        especiadidadesArray.push(odont.especialidad);
      }
    });
    return especiadidadesArray;
  }

  filterhoursbyOdonto(dentistselected: any) {
    if (this.actualizo === false) {
      if (dentistselected) {
        const iddentist = dentistselected.cedula;
        this.dentistselected =  dentistselected;
      }
    }
  }


  getPacientandDentistList() {
    this.pactService.getAllPacientes().subscribe(restPacient => {
      this.pacientList = restPacient;
      this.odontService.getAllOdontologos().subscribe(restDentist => {
        this.dentistList = restDentist;
        this.tratamientoMService.getAllTratamientosMedicos().subscribe(restTratamiento => {
          this.registeredMedicalTratamientos = restTratamiento;
          this.setDataTratamientoM();
        });
      });
    });
  }

  setDataTratamientoM() {
    this.valorseguro = this.tratamientoMService.selectTratamientoM.seguro;
    this.TratamientoMform.get('id').setValue(this.tratamientoMService.selectTratamientoM.id);
    this.TratamientoMform.get('cipaciente').setValue(this.tratamientoMService.selectTratamientoM.cipaciente);
    this.TratamientoMform.get('namepaciente').setValue(this.tratamientoMService.selectTratamientoM.namepaciente);
    const parts = this.tratamientoMService.selectTratamientoM.fecha.split('/');
    const newdate = new Date(parts[2], (parts[1] - 1), parts[0]);
    this.TratamientoMform.get('fecha').setValue(newdate);
    this.TratamientoMform.get('seguro').setValue(this.tratamientoMService.selectTratamientoM.seguro);
    this.TratamientoMform.get('especialidad').setValue(this.tratamientoMService.selectTratamientoM.especialidad);
    const dentistSelected = this.odontEspecialidad.find(search => search.cedula === this.tratamientoMService.selectTratamientoM.odontologo);
    this.TratamientoMform.get('odontologo').setValue(dentistSelected);
    this.TratamientoMform.get('tratamiento').setValue(this.tratamientoMService.selectTratamientoM.tratamiento);
    this.TratamientoMform.get('observacion').setValue(this.tratamientoMService.selectTratamientoM.observacion);
    this.TratamientoMform.get('precio').setValue(this.tratamientoMService.selectTratamientoM.precio);
    this.mostarNOaplica();
  }

  bloquearValorPago(){
    this.pagoService.getAllPagos().subscribe(rest => {
    const cedula = this.tratamientoMService.selectTratamientoM.cipaciente;
    const tratamiento = this.tratamientoMService.selectTratamientoM.tratamiento;
    this.todosPagos = rest.filter(datosPagos=>datosPagos.cedulaPaciente === cedula &&
         datosPagos.tratamiento === tratamiento);
      if(this.todosPagos.length > 0){
          this.bloquearValorPagar = false; 
          this.toastr.warning('Este tratamiento tiene pagos registrados', 'MENSAJE');      
      } else {
          this.bloquearValorPagar = true;
      }
      }, error => {
        throw error;
      });
  }

  sinseguro(seguro:any){
    if(!this.TratamientoMform.get('sseguro').value){
      this.TratamientoMform.get('seguro').setValue(this.tratamientoMService.selectTratamientoM.seguro);
      this.sseguro = false;  
    }else{
      this.TratamientoMform.get('seguro').setValue("No aplica");
      this.sseguro = true;  
    }
  }
  mostarNOaplica(){
    if (this.tratamientoMService.selectTratamientoM.sseguro === true) {
      this.TratamientoMform.get('sseguro').setValue(this.tratamientoMService.selectTratamientoM.sseguro);
    }
  }

  selectedMedico(dentistselected: any) {
    if (dentistselected) {
        this.dentistselected =  dentistselected;
    }
  }  


  especialidad(val: any) {
    this.mostarNOaplica();
     if (this.actualizo === false) {
      this.odontEspecialidad = [];
      this.specialtiesSelected = val;
      this.odontService.arrayOdontologos.map((odont) => {
        if (odont.especialidad === val) {
          this.odontEspecialidad.push(odont);
        }
      });      
    }
    const seguro = this.TratamientoMform.get('seguro').value;  
    if(seguro !== "No aplica" && !this.TratamientoMform.get('sseguro').value){
      this.seguroService.getSegurosByNameAndEspecialidad(seguro,val).subscribe(res => {
       if (Object.keys(res).length === 0 && seguro !== "sin seguro" && seguro !== "No aplica") {
        this.toastr.warning('El seguro del paciente no cubre esta especialidad medica', 'MENSAJE');
          return  this.TratamientoMform.get('cipaciente').hasError('required');
        }
      });
    } 

  }

  selectFecha(date: any) {
    this.dateSelected = date;
  }


       
  guardarTratamientoMedico(data: TratamientoMInterface) {
    const fecha = Date.parse(data.fecha);
    data.fecha = fecha;
 
    let newdata: TratamientoMInterface;
    newdata = data;

    newdata.odontologo =  newdata.odontologo.cedula;
    newdata.nameodontologo = this.dentistselected.nombre;
    newdata.seguro = this.valorseguro;
    newdata.sseguro = this.sseguro;
    newdata.precio = Number.parseFloat(newdata.precio);
    this.seguroService.getSegurosByNameAndEspecialidad(newdata.seguro,newdata.especialidad).subscribe(res => {
    if (Object.keys(res).length === 0 && !this.TratamientoMform.get('sseguro').value && newdata.seguro !== "sin seguro") {
      this.toastr.error('El seguro del paciente no cubre esta especialidad medica', 'MENSAJE');
    }else{
      this.tratamientoMService.updateTratamientoM(newdata);
      this.actualizo = true;          
      this.toastr.success('Registro actualizado exitosamente', 'MENSAJE');
      this.close();
    }
  });

  }


  close(): void {
    this.dialogRef.close();
  }

 check(event: KeyboardEvent) {
  var preg = /^([0-9]+\.?[0-9]{0,2})$/; 
   if ((preg.test(event.key) !== true) && event.keyCode > 31 && !this.allowedChars.has(event.keyCode)){
     event.preventDefault();
   }
 }

  getErrorMessageP() {
    return  this.TratamientoMform.get('cipaciente').hasError('required') ? 'Seleccione el paciente' : '';
  }

  getErrorMessageE() {
    return  this.TratamientoMform.get('especialidad').hasError('required') ? 'Seleccione la especialidad' : '';
  }

  getErrorMessageF() {
    return  this.TratamientoMform.get('fecha').hasError('required') ? 'Fecha incorrecta' : '';
  }

  getErrorMessageO() {
    return  this.TratamientoMform.get('odontologo').hasError('required') ? 'Seleccione el odontologo' : '';
  }

  getErrorMessageOb() {
    return  this.TratamientoMform.get('observacion').hasError('required') ? 'Campo requrido' : '';
  }

  getErrorMessageT() {
    return  this.TratamientoMform.get('tratamiento').hasError('required') ? 'Campo requrido' : '';
  }
  getErrorMessageV() {
    return  this.TratamientoMform.get('precio').hasError('required') ? 'Campo requrido' : '';
  }

}
