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
  selector: 'app-new-pago',
  templateUrl: './new-pago.component.html',
  styleUrls: ['./new-pago.component.css']
})
export class NewPagoComponent implements OnInit {

  valorPatern = /^\d+(?:[.,]\d+)?$/;
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  dateSelected: Date;
  myDate = Date.now();
  fechaActual = this.pagoMService.formatDate(new Date(this.myDate));
  tratamientosArray = [];
  tratamientosArraySelect = [];
  seguroArraySelect =[];
  tratamientoSelected: TratamientoMInterface= {};
  seguroSelected: any;
  editable: boolean = true;
  guardarpagoseguro: boolean = true;
  totalPendiente: number;
  
  pagoForm = new FormGroup({
    id: new FormControl(null),
    fechaPago: new FormControl('', Validators.required),
    cedulaPaciente: new FormControl('', Validators.required),
    seguro: new FormControl('', Validators.required),
    tratamiento:  new FormControl('', Validators.required),
    nombrePaciente:  new FormControl(''),
    valorPagar: new FormControl('', [Validators.required, Validators.pattern(this.valorPatern)]),
    ultimoValorCancelado: new FormControl(''),
    valorPago: new FormControl(''),
    valorPendiente: new FormControl(''),
    
  });

  filteredOptions: Observable<string[]>;

  constructor(
    private toastr: ToastrService,
    public tratamientoService: TratamientoService,    
    public pactService: PacienteService,
    public pacienteService: PacienteService,
    public espeService: EspecialidadService,
    private pagoMService: PagoService,
    public seguroService: SeguroService,
    private dialogRef: MatDialogRef<NewPagoComponent>,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.pagoForm.get('fechaPago').setValue(this.fechaActual);
    this.procesarTratamientos();
    this.filteredOptions = this.pagoForm.get('cedulaPaciente').valueChanges
    .pipe(
      startWith(''),
      map(value =>  value ? this._filter(value) : this.tratamientosArray.slice())
    );    
  }

  procesarTratamientos(){
    let TratamientosArray = [];
    let tratamientosHere = [];
    let datainfo = [];

    this.tratamientoService.TratamientoMCollection.valueChanges().subscribe(list => { 
      TratamientosArray = list.map(item => {        
        return {
          id: item.id,
          fecha: item.fecha,          
          cipaciente: item.cipaciente,
          namepaciente: item.namepaciente,
          seguro: item.seguro,
          sseguro: item.sseguro,
          especialidad: item.especialidad,
          odontologo: item.odontologo,          
          tratamiento: item.tratamiento,
          precio: item.precio,
          observacion: item.observacion,
          pagos: item.pagos
        };
      });
      datainfo = TratamientosArray;

      datainfo.forEach(function (data) {
        const cipaciente = data.cipaciente;
        const namepaciente = data.namepaciente;
        let datostratamiento : TratamientoMInterface[];
        datostratamiento = datainfo.filter(dato => dato.cipaciente === cipaciente);
        if(tratamientosHere.filter(info => info.cedula === cipaciente).length==0){
          tratamientosHere.push({
            cedula: cipaciente,
            nombre: namepaciente,
            tratamientos: datostratamiento
           });
        }
       });
       this.tratamientosArray = tratamientosHere; 
    });
    
    
    }

  tratamiento(val: TratamientoMInterface = {}) {
    if(val !== undefined && val!=null){
      this.tratamientoSelected = val;
      this.pagoForm.get('valorPago').setValue(val.precio);
      this.obtenerPagos(val);
    }
  }

  seguro(val:any){
    this.tratamientosArraySelect = [];
    if(val !== undefined && val!= null){      
      this.seguroSelected = val.seguro;
      this.tratamientosArraySelect = this.verificarPagos(val.tratamientos);  
      this.pagoForm.get('ultimoValorCancelado').setValue(null);
      this.pagoForm.get('valorPendiente').setValue(null);
      this.pagoForm.get('valorPago').setValue(null);
      this.pagoForm.get('valorPagar').setValue(null);      
    }     
    
  }

  verificarPagos(tratamientos:any){
    let tatamientoValidos = [];
    const seguro = this.seguroSelected;
    const pagoservice = this.pagoMService;
    tratamientos.forEach(function (data) {
      pagoservice.getAllPagosByParams(seguro,data.tratamiento,data.cipaciente).subscribe(pago => {
          if(pago!=null &&  pago.length>0){          
             const totalPagado = pago.reduce((acc, pago) => acc + pago.valorPagar, 0);
             const totalAPagar =  data.precio - totalPagado;
             if(totalAPagar>0){
              tatamientoValidos.push(data);
            }
          }else{
            tatamientoValidos.push(data);
          }
      });
    });
    
    return tatamientoValidos;
  }

  obtenerPagos(val: TratamientoMInterface = {}){
    this.pagoForm.get('valorPago').setValue(val.precio);
    this.pagoMService.getAllPagosByParams(this.seguroSelected,this.tratamientoSelected.tratamiento,
      this.tratamientoSelected.cipaciente).subscribe(pago => {
        const segurocubre = this.seguroSelected;
        if(segurocubre === "No aplica" || segurocubre === "sin seguro" ){
          this.guardarpagoseguro=true;
          if(pago!=null &&  pago.length>0){          
            this.pagoForm.get('ultimoValorCancelado').setValue(pago[0].valorPagar);
            const totalPagado = pago.reduce((acc, pago) => acc + pago.valorPagar, 0);
            this.totalPendiente =  Number.parseFloat(val.precio) - totalPagado;
            this.pagoForm.get('valorPendiente').setValue(this.totalPendiente);
            this.editable = true;
          }else{
            this.editable = true;
            this.pagoForm.get('ultimoValorCancelado').setValue(0);
            this.pagoForm.get('valorPendiente').setValue(val.precio);    
          }
    
        }else{
        this.guardarpagoseguro=false;
        this.editable = false;
        this.pagoForm.get('ultimoValorCancelado').setValue(0);
        this.pagoForm.get('valorPagar').setValue(val.precio);
        this.pagoForm.get('valorPendiente').setValue(0);
        }


    });
  }

  displayFn(subject) {
    return subject ? subject.cedula : undefined;
  }

  selectFecha(date: any) {
    this.dateSelected = date;
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    this.setpacientvalue(value);
    return this.tratamientosArray.filter(option => option.cedula.indexOf(filterValue) === 0);
  }

  setpacientvalue(value: any) {
    this.pagoForm.get('nombrePaciente').setValue(value.nombre);    
    this.seguroArraySelect = this.generateSeguroCombo(value.tratamientos);
    this.nulearvalores();
  }

  nulearvalores(){
    this.pagoForm.get('ultimoValorCancelado').setValue(null);
    this.pagoForm.get('valorPendiente').setValue(null);
    this.pagoForm.get('valorPago').setValue(null);
    this.pagoForm.get('seguro').setValue(null);
    this.pagoForm.get('valorPagar').setValue(null);  
    this.pagoForm.get('tratamiento').setValue(null);
  }

  generateSeguroCombo(datainfo :any[]) : string[]{ 
    let seguros = [];
    this.tratamientosArraySelect = [];
    this.nulearvalores();
    if(datainfo!== undefined){
      datainfo.forEach(function (data) {
        if (data.sseguro === true) {
          if(seguros.length===0){
            seguros.push({seguro: 'No aplica', cedula:data.cipaciente, tratamientos:[data]});
          }else if(!seguros.find( dato=>dato.seguro === 'No aplica')){
            seguros.push({seguro: data.seguro, cedula:data.cipaciente, tratamientos:[data]});
          }else{
            const seguro= seguros.find( dato=>dato.seguro === 'No aplica');
            seguro.tratamientos.push(data);
          }
        }else{
          if(seguros.length===0){
            seguros.push({seguro: data.seguro, cedula:data.cipaciente, tratamientos:[data]});
          }else if(!seguros.find( dato=>dato.seguro === data.seguro)){
            seguros.push({seguro: data.seguro, cedula:data.cipaciente, tratamientos:[data]});
          }else{
            const seguro= seguros.find( dato=>dato.seguro === data.seguro);
            seguro.tratamientos.push(data);
          }
        }
      });
    } 

    return seguros;
  }
 
  savePago(data: any) {
    const segurocubre = this.seguroSelected;
      let newdata: PagosInterface;
      data.fechaPago = this.myDate;
      data.cedulaPaciente = data.cedulaPaciente.cedula;
      data.seguro =  data.seguro.seguro;
      data.tratamiento =  data.tratamiento.tratamiento;
      const valorPagar = Number.parseFloat(data.valorPagar);
      const valorPendiente =  Number.parseFloat(data.valorPendiente);
      data.valorPagar  = valorPagar; 

      if (this.guardarpagoseguro === true) {
        data.valorPendiente = data.valorPendiente - valorPagar;
      }

      newdata = data;
      
     
      if(this.guardarpagoseguro === false && valorPendiente==0){
        this.pagoMService.addPago(newdata);
        this.toastr.success('Registro guardado exitosamente', 'MENSAJE');
        this.close();
      }else if(valorPagar>valorPendiente){
        this.toastr.warning('El valor a pagar supera el valor pendiente', 'MENSAJE');
      }else{
        this.pagoMService.addPago(newdata);
        this.toastr.success('Registro guardado exitosamente', 'MENSAJE');
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

  errorMessageT() {
    return this.pagoForm.get('tratamiento').hasError('required') ? 'Seleccione el tratamiento' :
           '';
  }

  errorMessageS() {
    return this.pagoForm.get('seguro').hasError('required') ? 'Seleccione el seguro' :
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
