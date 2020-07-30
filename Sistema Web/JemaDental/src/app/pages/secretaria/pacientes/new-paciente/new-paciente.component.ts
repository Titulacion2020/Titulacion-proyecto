import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { PacienteInterface } from './../../../../models/paciente-model';
import { EditPacienteComponent } from './../edit-paciente/edit-paciente.component';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SeguroService } from 'src/app/services/seguro/seguro.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-paciente',
  templateUrl: './new-paciente.component.html',
  styleUrls: ['./new-paciente.component.css']
})
export class NewPacienteComponent implements OnInit {

  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  // tslint:disable-next-line: max-line-length
  imageUrl: any = 'https://firebasestorage.googleapis.com/v0/b/jema-dental.appspot.com/o/imageOdontProfile%2Fuserphoto.png?alt=media&token=79e54081-7486-41ec-b380-e3ff34def585';

  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;

  pacienteForm = new FormGroup({
    id: new FormControl(null),
    seguro: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    hClinica: new FormControl(''),
    cedula: new FormControl('', [Validators.required, Validators.minLength(9)]),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    foto: new FormControl(''),
    rol: new FormGroup({
      paciente: new FormControl(true)
    })
  });

  email = '';

  constructor(
    private toastr: ToastrService,
    public segService: SeguroService,
    public pacientService: PacienteService,
    public odontoService: OdontologoService,
    public userService: AuthService,
    private dialogRef: MatDialogRef<EditPacienteComponent>,
    private db: AngularFirestore
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {

  }

  validateEmail() {
    this.email = this.pacienteForm.get('email').value;
    this.email = this.email.toLowerCase();
    const existeEmailOdont = this.odontoService.arrayOdontologos.find(data => data.email === this.email);
    const existeEmailPacient = this.pacientService.arrayPacientes.find(paciente => paciente.email === this.email);
    const existeEmailSeguro = this.segService.arraySeguros.find(seguro => seguro.email === this.email);
    const existeEmailUser = this.userService.arrayUsuarios.find(user => user.email === this.email);

    if (existeEmailOdont || existeEmailUser || existeEmailPacient || existeEmailSeguro) {
      this.pacienteForm.get('email').setErrors({ repeatEmailOdonto: true });
      this.toastr.warning('El email ya se encuentra registrado, vuelva a intentar', 'MENSAJE');
    }
  }

  validateCedula() {
    const cedula = this.pacienteForm.get('cedula').value;
    const existeCedOdont = this.odontoService.arrayOdontologos.find(data => data.cedula === cedula);
    const existeCedPacient = this.pacientService.arrayPacientes.find(paciente => paciente.cedula === cedula);
    const existeCedUser = this.userService.arrayUsuarios.find(usuario => usuario.cedula === cedula);

    if (existeCedOdont || existeCedPacient || existeCedUser) {
      this.pacienteForm.get('cedula').setErrors({ repeatOdonto: true });
      this.toastr.warning('El número de identidad ya se encuentra registado, vuelva a intentar', 'MENSAJE');
    }
  }

  validarHC() {
    const historiaC = this.pacienteForm.get('hClinica').value;
    const existehistoriaC = this.pacientService.arrayPacientes.find(pacientFilterbyHC => pacientFilterbyHC.hClinica === historiaC);

    if (existehistoriaC &&  (existehistoriaC.hClinica !== '')) {
      this.pacienteForm.get('hClinica').setErrors({ repeathClinica: true });
      this.toastr.warning('El número de historia clínic ya existe', 'MENSAJE');
    }
  }

  savePaciente(data: PacienteInterface) {
    data.id = this.db.createId();
    data.foto = this.imageUrl;
    data.rol.paciente = true;
    data.token = '';
    data.email = data.email.toLowerCase();

    this.pacientService.addPaciente(data);
    this.toastr.success('Registro guardado exitosamente', 'MENSAJE');
    this.close();

  }

  close(): void {
    this.dialogRef.close();
  }

  check(event: KeyboardEvent) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/;
    if ((preg.test(event.key) !== true) && event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {
      event.preventDefault();
    }
  }

  getErrorMessageE() {
    return this.pacienteForm.get('email').hasError('pattern') ? 'Correo electrónico invalido' :
      this.pacienteForm.get('email').hasError('required') ? 'Campo Requerido' :
        this.pacienteForm.get('email').hasError('repeatEmailOdonto') ? 'El email ya se encuentra registrado' :
              '';
  }

  getErrorMessageN() {
    return this.pacienteForm.get('nombre').hasError('required') ? 'Campo obligatorio' : '';
  }
  getErrorMessageT() {
    return this.pacienteForm.get('telefono').hasError('required') ? 'Campo obligatorio' : '';
  }
  getErrorMessageC() {
    return this.pacienteForm.get('cedula').hasError('required') ? 'Campo obligatorio' :
      this.pacienteForm.get('cedula').hasError('minlength') ? 'La identidad debe tener 10 digitos' :
        this.pacienteForm.get('cedula').hasError('repeatOdonto') ? 'Número de identificación ya registrado' :
            '';
  }
  getErrorMessageHC() {
    return this.pacienteForm.get('hClinica').hasError('repeathClinica') ? 'La Historia Clinica ya existe' : '';
  }

}
