import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SeguroService } from 'src/app/services/seguro/seguro.service';
import { MatDialogRef } from '@angular/material';
import { SeguroInteface } from 'src/app/models/seguro-model';
import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';


@Component({
  selector: 'app-new-seguro',
  templateUrl: './new-seguro.component.html',
  styleUrls: ['./new-seguro.component.css']
})
export class NewSeguroComponent implements OnInit {

  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;

  seguroForm = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', [Validators.required, Validators.minLength(7)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]),
    especialidades:new FormControl('', Validators.required),
    sitioweb: new FormControl(''),
  });


  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  specialtiesSelected: string[];

  constructor(
    public espeService: EspecialidadService,
    private toastr: ToastrService,
    public seguroService: SeguroService,
    public odonService: OdontologoService,
    public pacientService: PacienteService,
    private dialogRef: MatDialogRef<NewSeguroComponent>
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  onSaveSeguro(data: SeguroInteface) {
    data.nombre = data.nombre.toLowerCase();

    this.validateEmail();
    this.validarseguro();
    this.seguroService.addSeguro(data);
    this.toastr.success('Registro guardado exitosamente', 'MENSAJE');
    this.close();
  }

  validateEmail() {
    const email = this.seguroForm.get('email').value;
    const existeEmailOdont = this.odonService.arrayOdontologos.find(data => data.email === email);
    const existeEmailPacient = this.pacientService.arrayPacientes.find(paciente => paciente.email === email);
    const existeEmailSeguro = this.seguroService.arraySeguros.find(seguro => seguro.email === email);

    if (existeEmailOdont || existeEmailPacient || existeEmailSeguro) {
      this.seguroForm.get('email').setErrors({ repeatEmailOdonto: true });
      this.toastr.warning('El email ya se encuentra registrado, vuelva a intentar', 'MENSAJE');
    }
  }

  validarseguro(){
    const nombre = this.seguroForm.get('nombre').value;
    const seguroFiltered = this.seguroService.arraySeguros.find(espeFilterbynombre => espeFilterbynombre.nombre === nombre);
    if (seguroFiltered) {
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


  
  close(): void {
    this.dialogRef.close();
  }

  msgValidateNombre() {
    return this.seguroForm.get('nombre').hasError('required') ? 'Campo obligatorio' : 
    this.seguroForm.get('nombre').hasError('repeatseguro') ? 'El seguro ya se encuentra registrado' : '';
  }

  msgValidateEmail() {
    return this.seguroForm.get('email').hasError('pattern') ? 'Correo electrónico invalido' :
      this.seguroForm.get('email').hasError('required') ? 'Campo Requerido' :
        this.seguroForm.get('email').hasError('repeatEmailOdonto') ? 'El email ya se encuentra registrado' :
              '';
  }

  msgValidateEspecialidad() {
    return this.seguroForm.get('especialidades').hasError('required') ? 'Seleccione una especialidad' : '';
  }


  msgValidateTelefono() {
    return  this.seguroForm.get('telefono').hasError('required') ? 'Campo obligatorio' : 
    this.seguroForm.get('telefono').hasError('minlength') ? 'El teléfono debe tener de 7 a 10 dígitos':
    '';
  }

  msgValidateDireccion() {
    return this.seguroForm.get('direccion').hasError('required') ? 'Campo obligatorio' : '';
  }

}
