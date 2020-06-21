import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SeguroService } from 'src/app/services/seguro/seguro.service';
import { MatDialogRef } from '@angular/material';
import { SeguroInteface } from 'src/app/models/seguro-model';
import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';

@Component({
  selector: 'app-edit-seguro',
  templateUrl: './edit-seguro.component.html',
  styleUrls: ['./edit-seguro.component.css']
})
export class EditSeguroComponent implements OnInit {
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  seguroForm = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    email:new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    direccion:new FormControl('', Validators.required),
    especialidades:new FormControl('', Validators.required),
    telefono:new FormControl('', [Validators.required, Validators.minLength(7)]),    
    sitioweb:new FormControl('')    
  });
  specialtiesSelected:  string[];
  especialidadesOriginales: string[];
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
 
  constructor(
    private toastr: ToastrService,
    public espeService: EspecialidadService,
    public seguroService: SeguroService,
    public odonService: OdontologoService,
    public pacientService: PacienteService,
    private dialogRef: MatDialogRef<EditSeguroComponent>
  ) {
    dialogRef.disableClose = true;
  }

  closechek: boolean = false;

  ngOnInit() {

    this.seguroForm.get('id').setValue(this.seguroService.seguroSelected.id);
    this.seguroForm.get('nombre').setValue(this.seguroService.seguroSelected.nombre);
    this.seguroForm.get('direccion').setValue(this.seguroService.seguroSelected.direccion);
    this.seguroForm.get('especialidades').setValue(this.seguroService.seguroSelected.especialidades);
    this.seguroForm.get('telefono').setValue(this.seguroService.seguroSelected.telefono);
    this.seguroForm.get('email').setValue(this.seguroService.seguroSelected.email);
    this.seguroForm.get('sitioweb').setValue(this.seguroService.seguroSelected.sitioweb);

  }

  validateEmail(){
    const email = this.seguroForm.get('email').value;
    const emailOld = this.seguroService.seguroSelected.email;
    const existeEmailOdont = this.odonService.arrayOdontologos.find(data=>data.email===email);
    const existeEmailPacient =  this.pacientService.arrayPacientes.find(paciente => paciente.email === email);
    const existeEmailSeguro =  this.seguroService.arraySeguros.find(seguro => seguro.email === email);

    if(emailOld!==email && existeEmailOdont){
      this.seguroForm.get('email').setErrors({repeatEmailOdonto:true})
      this.toastr.warning('El email escrito ya se encuentra registrado', 'MENSAJE');
    }else if(emailOld!==email && existeEmailPacient){
      this.seguroForm.get('email').setErrors({repeatEmailPaciente:true})
      this.toastr.warning('El email escrito ya se encuentra registrado', 'MENSAJE');
    }else if(emailOld!==email && existeEmailSeguro){
      this.seguroForm.get('email').setErrors({repeatEmailSeguro:true})
      this.toastr.warning('El email escrito ya se encuentra registrado', 'MENSAJE');
    }   
  }

  onSaveSeguro(data: SeguroInteface) {
    data.nombre = data.nombre.toLowerCase();
    this.validateEmail();
    this.validarseguro();
    this.seguroService.updateSeguro(data);
    this.toastr.success('Registro actualizado exitosamente', 'MENSAJE');
    this.close();   
  }

  validarseguro(){
    const nombre = this.seguroForm.get('nombre').value;
    const nombreseguro = this.seguroService.seguroSelected.nombre;
    const seguroexist = this.seguroService.arraySeguros.find(espeFilterbynombre => espeFilterbynombre.nombre === nombre);
    if (nombreseguro!==nombre && seguroexist) {
      this.seguroForm.get('nombre').setErrors({ repeatseguro: true });
      this.toastr.warning('El seguro ya encuentra registrado, vuelva a intentar', 'MENSAJE');
    }
  }



  especialidad(val: any) {
    this.specialtiesSelected = val;
  }

  check(event: KeyboardEvent) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/; 
     if ((preg.test(event.key) !== true) && event.keyCode > 31 && !this.allowedChars.has(event.keyCode)){
       event.preventDefault();
     }
   }


  close(): void{
    this.dialogRef.close();
  }

  msgValidateNombre() {
    return this.seguroForm.get('nombre').hasError('required') ? 'Campo obligatorio' : 
    this.seguroForm.get('nombre').hasError('repeatseguro') ? 'El seguro ya se encuentra registrado' : '';
  }


  msgValidateEspecialidad() {
    return  this.seguroForm.get('especialidades').hasError('required') ? 'Seleccione una especialidad' : '';
  }

  msgValidateTelefono() {
    return  this.seguroForm.get('telefono').hasError('required') ? 'Campo obligatorio' : 
    this.seguroForm.get('telefono').hasError('minlength') ? 'El teléfono debe tener de 7 a 10 dígitos':
    '';
  }
  
  msgValidateDireccion() {
    return  this.seguroForm.get('direccion').hasError('required') ? 'Campo obligatorio' : '';
  }

  msgValidateEmail() {
    return this.seguroForm.get('email').hasError('pattern') ? 'Correo electrónico invalido' :
    this.seguroForm.get('email').hasError('required') ? 'Campo Requerido' :
    this.seguroForm.get('email').hasError('repeatEmailOdonto') ? 'El email ya se encuentra registrado' :
    this.seguroForm.get('email').hasError('repeatEmailPaciente') ? 'El email ya se encuentra registrado' :
    this.seguroForm.get('email').hasError('repeatEmailSeguro') ? 'El email ya se encuentra registrado' :
     '';
  }

}
