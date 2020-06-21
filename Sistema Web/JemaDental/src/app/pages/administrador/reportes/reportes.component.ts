import { CitaService } from './../../../services/cita/cita.service';
import { ReportService } from './../../../services/report/report.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PagoService } from 'src/app/services/pago/pago.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import { TratamientoService } from 'src/app/services/tratamiento/tratamiento.service';
import { startWith, map } from 'rxjs/operators';
import { PacienteInterface } from 'src/app/models/paciente-model';
import { PacienteService } from 'src/app/services/paciente/paciente.service';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  tipoReporte: string[] = ['Pagos Generales','Pagos por paciente', 'Pacientes atendidos', 'Citas por odontólogo'];
  displayedColumns: string[];
  dataSource = new MatTableDataSource();
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  pacient: PacienteInterface = {};
  tipoRep: string;
  cedulaSelected:any;
  imgurl : any;
  reportForm = new FormGroup({
    tipoReporte : new FormControl('', Validators.required),
    fechaInicio : new FormControl('', Validators.required),
    fechaFin : new FormControl('', Validators.required)
  });
  newArrayP = {
    cedulaPaciente : '',
    nombrePaciente: '',
    seguro: '',
    fechaCita: '',
    odontologo: '',
    especialidad: ''
  };

  arrayPacientes = [];

  newArrayO = {
    cedulaOdontologo : '',
    nombreOdontologo: '',
    especialidad: '',
    fechaCitaO: '',
    namepaciente: ''
  };

  arrayOdontologos = [];

  fechaIni: number;
  fechaFin: number;

  existRegistros: boolean;
  selectRegistros: boolean;
  subscription: Subscription;

 

  filteredOptions: Observable<string[]>;
  pagosArray = [];
  pagosSelected = [];

  constructor(
    public router: Router,
    public authService: AuthService,
    public toastr: ToastrService,
    public pagoService: PagoService,
    public reportService: ReportService,
    private citasService: CitaService,
    public tratamientoService: TratamientoService, 
    public pacienteService: PacienteService,
  ) { }

  ngOnInit() {
    
  }

  cambiarTipoReporte(event : any){
    this.existRegistros = false;
    this.selectRegistros  = true;
   
    this.tipoRep = event; 
    if(this.tipoRep === 'Pagos por paciente'){
      this.listarAllPagos();
      this.reportForm.addControl("cedulaPaciente",new FormControl('', Validators.required));
      this.reportForm.addControl("nombrePaciente",new FormControl('', Validators.required));      
      this.filteredOptions = this.reportForm.get('cedulaPaciente').valueChanges
      .pipe(startWith(''),map(value =>  value ? this._filter(value) : this.pagosArray.slice())); 
    }
  }

  check(event: KeyboardEvent) {
    if (event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {
      event.preventDefault();
    }
  }

  displayFn(subject) {
    return subject ? subject.cedula : undefined;
  }
  
  private _filter(value: string): string[] {
    const filterValue = value;  
    this.setpacientvalue(value);
    return this.pagosArray.filter(option => option.cedula.indexOf(filterValue) === 0);
 }

 setpacientvalue(value: any) {
  this.reportForm.get('nombrePaciente').setValue(value.nombre);  
  this.cedulaSelected = value.cedula;
}

  listarAllPagos(){
    let PagosArray = [];
    let datainfo = [];
    let pagosHere = [];
    this.pagoService.getAllPagos().subscribe(list=>{
      PagosArray = list.map(item => {        
        return {          
          cipaciente: item.cedulaPaciente,
          namepaciente: item.nombrePaciente
        };
      });

      datainfo = PagosArray;
      datainfo.forEach(function (data) {
        const cipaciente= data.cipaciente;
        const namepaciente= data.namepaciente;
        if(pagosHere.filter(info => info.cedula === cipaciente).length==0){
          pagosHere.push({
            cedula: cipaciente,
            nombre: namepaciente
           });
        }
       });
       this.pagosArray = pagosHere; 
    });  
  }

  generarReport() {

    this.fechaIni = Date.parse(this.reportForm.get('fechaInicio').value);
    this.fechaFin = Date.parse(this.reportForm.get('fechaFin').value);
    this.tipoRep = this.reportForm.get('tipoReporte').value;

    if (this.fechaIni > this.fechaFin) {
      this.toastr.warning('La fecha inicial no puede ser mayor a la fecha final', 'MENSAJE');
    } else {
      
      this.displayedColumns = [];
      this.dataSource = new MatTableDataSource();      

      if (this.tipoRep === 'Pagos Generales') {
        this.reportPagos();
      }
      if (this.tipoRep === 'Pagos por paciente') {
        this.reportPagosPacientes();
      }
      if (this.tipoRep === 'Pacientes atendidos') {
        this.reportPacientes();
      }
      if (this.tipoRep === 'Citas por odontólogo') {
        this.reportOdontologos();
      }
    }

  }

  reportPagos() {
    this.displayedColumns =  ['numero', 'fechaPago', 'cedulaPaciente', 'nombrePaciente', 'asuntoPago', 'valorPagar'];
    this.pagoService.getPagosToReport(this.fechaIni, this.fechaFin).subscribe(res => {
      if (Object.keys(res).length === 0 ) {
        this.existRegistros = false;
        this.selectRegistros  = false;
      } else {
        this.existRegistros = true;
        this.dataSource.data = res;
        for (let i = 0; i < res.length; i++) {
          const element = this.dataSource.data[i];
          delete this.dataSource.data[i]['id'];
          this.dataSource.data[i]['fechaPago'] = this.pagoService.formatDate(new Date(element['fechaPago']));
        }

        let data = [];

        for(let i = 0; i < this.dataSource.data.length; i++){
          var nombre= `${this.dataSource.data[i]['nombrePaciente']}`
          var pago= this.dataSource.data[i]['valorPagar']
          data.push({y:Number.parseInt(pago),name:nombre});
        }        
      }
    });    
  }


  reportPagosPacientes(){
    
    this.displayedColumns =  ['numero', 'fechaPago', 'tratamiento','valorPagar','valorPendiente'];
    this.pagoService.getPagosPacienteToReport(this.fechaIni, this.fechaFin,this.cedulaSelected).subscribe(res => {
      if (Object.keys(res).length === 0 ) {
        this.existRegistros = false;
        this.selectRegistros  = false;
      } else {
        this.existRegistros = true;
        this.dataSource.data = Object.assign([],res);
        for (let i = 0; i < res.length; i++) {
          const element = this.dataSource.data[i];
          delete this.dataSource.data[i]['id'];
          this.dataSource.data[i]['fechaPago'] = this.pagoService.formatDate(new Date(element['fechaPago']));
        }
        let data = [];
        for(let i = 0; i < this.dataSource.data.length; i++){
          var nombre= `${this.dataSource.data[i]['fecha']}`
          var Valorpendiente= this.dataSource.data[i]['valorPendiente']
          data.push({y:Number.parseInt(Valorpendiente),label:nombre});
        }
      }
    }); 
    
  }

  reportPacientes() {
    this.arrayPacientes = [];
    this.newArrayP = {
     cedulaPaciente : '',
     nombrePaciente: '',
     seguro: '',
     fechaCita: '',
     odontologo: '',
     especialidad: ''
    };

   this.displayedColumns =  ['numero','fechaCita', 'cedulaPaciente', 'nombrePaciente', 'seguro', 'odontologo','especialidad', 'numeroCitas'];
   this.citasService.getCitasbyDate(this.fechaIni, this.fechaFin).subscribe(res => {
    if (Object.keys(res).length === 0 ) {
      this.existRegistros = false;
      this.selectRegistros  = false;
    } else {
      this.existRegistros = true;
      const pacientes = {};
      const unicosReg = res.filter(e => {
          return pacientes[e.cipaciente] ? false : (pacientes[e.cipaciente] = true);
      });

      for (let i = 0; i < Object.keys(unicosReg).length; i++) {
        this.newArrayP = {
          cedulaPaciente : unicosReg[i].cipaciente,
          nombrePaciente : unicosReg[i].namepaciente,
          seguro: unicosReg[i].seguro,
          fechaCita: unicosReg[i].fecha, 
          odontologo: unicosReg[i].nameodontologo,
          especialidad: unicosReg[i].especialidad
        };
        this.arrayPacientes.push(this.newArrayP);
      }

      this.dataSource.data = this.arrayPacientes;

      this.arrayPacientes.forEach(element => {
        this.subscription = this.citasService.getCitasByCedulaP(element.cedulaPaciente, this.fechaIni, this.fechaFin).subscribe(resp => {
          const tam = Object.keys(this.dataSource.data).length;
          for (let i = 0; i < tam; i++) {
            if (this.dataSource.data[i]['cedulaPaciente'] === element.cedulaPaciente) {
                  this.dataSource.data[i]['numeroCitas'] = Object.keys(resp).length;
            }
           }

		  let data = [];
		  for(let i = 0; i < this.dataSource.data.length; i++){
      const element = this.dataSource.data[i];
      this.dataSource.data[i]['fechaCita'] = this.reportService.formatDate(new Date(element['fechaCita']));
			var nombre= `${this.dataSource.data[i]['nombrePaciente']}`
			var citas= this.dataSource.data[i]['numeroCitas']
			data.push({y:Number.parseInt(citas),label:nombre});
		  }
		   		   
        });
      });

    }
   });
  }

  reportOdontologos() {
    this.arrayOdontologos = [];
    this.newArrayO = {
     cedulaOdontologo : '',
     nombreOdontologo: '',
     especialidad: '',
     fechaCitaO: '',
     namepaciente: ''
    };
   this.displayedColumns =  ['numero', 'fechaCitaO', 'cedulaOdontologo', 'nombreOdontologo', 'namepaciente', 'especialidad','numeroCitas'];
   this.citasService.getCitasbyDate(this.fechaIni, this.fechaFin).subscribe(res => {
    if (Object.keys(res).length === 0 ) {
      this.existRegistros = false;
      this.selectRegistros  = false;
    } else {
      this.existRegistros = true;
      const odontologos = {};
      const unicosReg = res.filter(e => {
          return odontologos[e.odontologo] ? false : (odontologos[e.odontologo] = true);
      });

      for (let i = 0; i < Object.keys(unicosReg).length; i++) {
        this.newArrayO = {
          cedulaOdontologo : unicosReg[i].odontologo,
          nombreOdontologo : unicosReg[i].nameodontologo,
          especialidad: unicosReg[i].especialidad,
          fechaCitaO: unicosReg[i].fecha,
          namepaciente: unicosReg[i].namepaciente
        };
        this.arrayOdontologos.push(this.newArrayO);
      }

      this.dataSource.data = this.arrayOdontologos;

      this.arrayOdontologos.forEach(element => {
        this.subscription = this.citasService.getCitasByCedulaO(element.cedulaOdontologo, this.fechaIni, this.fechaFin)
        .subscribe(resp => {
          const tam = Object.keys(this.dataSource.data).length;
          for (let i = 0; i < tam; i++) {
            if (this.dataSource.data[i]['cedulaOdontologo'] === element.cedulaOdontologo) {
                  this.dataSource.data[i]['numeroCitas'] = Object.keys(resp).length;
            }

          }
		  
		  //REVISAR
		   let data = [];

		  for(let i = 0; i < this.dataSource.data.length; i++){
      const element = this.dataSource.data[i];
      this.dataSource.data[i]['fechaCitaO'] = this.reportService.formatDate(new Date(element['fechaCitaO']));
			var nombre= `${this.dataSource.data[i]['nombreOdontologo']}`
			var citas= this.dataSource.data[i]['numeroCitas']
			data.push({y:Number.parseInt(citas),label:nombre});
		  }         
        });
      });    

    }
   });
   
  }

  exportTablePagosPaciente() {

    let pacient = this.pacient;

    let cedula =this.reportForm.get('cedulaPaciente').value;
    
    pacient = this.pacienteService.arrayPacientes.filter(datos =>datos.cedula ===cedula.cedula )[0];

    const datos = this.dataSource.data;

    for(let i = 0; i < this.dataSource.data.length; i++){
      delete datos[i]['id'];
      delete datos[i]['cipaciente'];
      delete datos[i]['nameodontologo'];
      delete datos[i]['namepaciente'];
      delete datos[i]['observacion'];
      delete datos[i]['odontologo'];
      delete datos[i]['precio'];
      delete datos[i]['seguro']; 
      if(datos[i]['especialidad']!== undefined ){
        delete datos[i]['especialidad'];
      }
      if(datos[i]['sseguro']!== undefined ){
        delete datos[i]['sseguro'];
      }
    }  

    let headers = ['No', 'Fecha', 'Tratamiento', 'Valor Cancelado','Valor Pendiente']
    let body = [];

    for(let i = 0; i < this.dataSource.data.length; i++){
      var num = `${i+1}`;
      var cedul= `${this.dataSource.data[i]['fechaPago']}`;
      var trata= `${this.dataSource.data[i]['tratamiento']}`
      var valcan = "$"+`${this.dataSource.data[i]['valorPagar']}`;
      var valpen = "$"+`${this.dataSource.data[i]['valorPendiente']}`;
  
      let data = new Array(num,cedul,trata,valcan,valpen);
      body.push(data);
    }
	
	let date = new Date();
    date.setSeconds(0);
    date.setMinutes(0);
    date.setHours(0);
    
    let fecha  = this.pagoService.formatDate(date);
    let pacientes = {cedula:pacient.cedula,telefono:pacient.telefono, email:pacient.email, nombre:pacient.nombre};

    this.reportService.exportToPdfPacientes(headers,body, 'pagosPacienteReport','Reporte de Pagos por Pacientes',pacientes,fecha);
  }  

  exportTablePagos() {
      
  let headers = ['No', 'Fecha Pago', 'CI. Paciente', 'Nombre Paciente','Asunto','Valor Pago']
  let body = [];
  
  for(let i = 0; i < this.dataSource.data.length; i++){
    var num = `${i+1}`;
    var fech = `${this.dataSource.data[i]['fechaPago']}`;
    var cedul= `${this.dataSource.data[i]['cedulaPaciente']}`;
    var nombre= `${this.dataSource.data[i]['nombrePaciente']}`
    var trata = `${this.dataSource.data[i]['tratamiento']}`;
    var valor = `${this.dataSource.data[i]['valorPago']}`;

    let data = new Array(num,fech,cedul,nombre,trata,"$"+valor);
    body.push(data);
  }
    this.reportService.exportToPdf(headers,body, 'pagosReport','Reporte de Pagos Generales');
  }

  exportTablePacientes() {

    let headers = ['No', 'CI. Paciente', 'Nombre del Paciente','Tipo de Seguro','Numero de Citas']
    let body = [];
     
     for(let i = 0; i < this.dataSource.data.length; i++){
       var num = `${i+1}`;
       var cedul= `${this.dataSource.data[i]['cedulaPaciente']}`;
       var nombre= `${this.dataSource.data[i]['nombrePaciente']}`
       var seguro = `${this.dataSource.data[i]['seguro']}`;
       var citas = `${this.dataSource.data[i]['numeroCitas']}`;
   
       let data = new Array(num,cedul,nombre,seguro,citas);
       body.push(data);
     }
    this.reportService.exportToPdf(headers,body,'pacientesReport', 'Reporte de Pacientes atendidos');
  }

  exportTableOdontologos() {

    let headers = ['No', 'CI. Odontólogo', 'Nombre del Odontólogo','Especialidad','N° Citas Atendidas']
    let body = [];
     
     for(let i = 0; i < this.dataSource.data.length; i++){
       var num = `${i+1}`;
       var cedul= `${this.dataSource.data[i]['cedulaOdontologo']}`;
       var nombre= `${this.dataSource.data[i]['nombreOdontologo']}`
       var seguro = `${this.dataSource.data[i]['especialidad']}`;
       var citas = `${this.dataSource.data[i]['numeroCitas']}`;
   
       let data = new Array(num,cedul,nombre,seguro,citas);
       body.push(data);
     }

    this.reportService.exportToPdf(headers,body, 'odontologosReport', 'Reporte de Citas por Odontologos');    
  }

  getErrorMsgTipo() {
    return this.reportForm.get('tipoReporte').hasError('required') ? 'Seleccione el tipo de reporte' :
     '';
  }
  getErrorMsgFechaIni() {
    return this.reportForm.get('fechaInicio').hasError('required') ? 'Fecha erronea' :
     '';
  }
  getErrorMsgFechaFin() {
    return this.reportForm.get('fechaFin').hasError('required') ? 'Fecha erronea' :
     '';
  }

}
