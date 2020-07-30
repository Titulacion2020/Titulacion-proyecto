import { AuthService } from 'src/app/services/auth/auth.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { EspecialidadService } from './../../../../services/especialidad/especialidad.service';
import { OdontologoInterface } from './../../../../models/odontologo-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { SeguroService } from 'src/app/services/seguro/seguro.service';


@Component({
  selector: 'app-edit-odontologo',
  templateUrl: './edit-odontologo.component.html',
  styleUrls: ['./edit-odontologo.component.css']
})
export class EditOdontologoComponent implements OnInit {

  @ViewChildren('fileInput') el: ElementRef;
  // tslint:disable-next-line: max-line-length
  imageUrl: any = 'https://firebasestorage.googleapis.com/v0/b/jema-dental.appspot.com/o/imageOdontProfile%2Fuserphoto.png?alt=media&token=79e54081-7486-41ec-b380-e3ff34def585';
  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;

  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  file: any;
  email = '';
  horaJornada = '';

  Odonform = new FormGroup({
    id: new FormControl(null),
    nombre: new FormControl('', Validators.required),
    especialidad: new FormControl('', Validators.required),
    cedula: new FormControl('', [Validators.required, Validators.minLength(9)]),
    telefono: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    foto: new FormControl(null),
    jornadaLaboral: new FormControl('', Validators.required),
    lunes: new FormControl(null),
    martes: new FormControl(null),
    miércoles: new FormControl(null),
    jueves: new FormControl(null),
    viernes: new FormControl(null),
    sábado: new FormControl(null),
  });

  odont: OdontologoInterface = {
    id: null,
    horario: '',
    foto: '',
    telefono: '',
    cedula: '',
    email: '',
    nombre: '',
    especialidad: '',
    jornadaLaboral: '',
    rol: {
      odontologo: true
    }
  };

  jornada: string[] = ['Matutina', 'Vespertina', 'Tiempo Completo'];
  horaInicioJ: string;
  horaFinJ: string;
  horas: any;

  constructor(
    private toastr: ToastrService,
    public espeService: EspecialidadService,
    public odonService: OdontologoService,
    public pacientService: PacienteService,
    public seguroService: SeguroService,
    private dialogRef: MatDialogRef<EditOdontologoComponent>,
    private userService: AuthService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.fillOdontologo();
  }

  validateCedula() {
    const cedula = this.Odonform.get('cedula').value;
    const existeCedOdont = this.odonService.arrayOdontologos.find(data => data.cedula === cedula);
    const existeCedPacient = this.pacientService.arrayPacientes.find(paciente => paciente.cedula === cedula);
    const existeCedUser = this.userService.arrayUsuarios.find(user => user.cedula === cedula);
    const cedulaOld = this.odonService.odontologoSelected.cedula;

    if ((cedulaOld !== cedula && existeCedOdont) || existeCedPacient || existeCedUser) {
      this.Odonform.get('cedula').setErrors({ repeatOdonto: true });
      this.toastr.warning('El número de identidad ya se encuentra registrado, vuelva a intentar', 'MENSAJE');
    }
  }

  validateEmail() {
    this.email = this.Odonform.get('email').value;
    this.email = this.email.toLocaleLowerCase();
    const emailOld = this.odonService.odontologoSelected.email;
    const existeEmailOdont = this.odonService.arrayOdontologos.find(data => data.email === this.email);
    const existeEmailPacient = this.pacientService.arrayPacientes.find(paciente => paciente.email === this.email);
    const existeEmailSeguro = this.seguroService.arraySeguros.find(seguro => seguro.email === this.email);
    const existeEmailUser = this.userService.arrayUsuarios.find(user => user.email === this.email);

    if ((emailOld !== this.email && existeEmailOdont) || existeEmailPacient || existeEmailSeguro || existeEmailUser) {
      this.Odonform.get('email').setErrors({ repeatEmailOdonto: true });
      this.toastr.warning('El email ya se encuentra registrado, vuelva a intentar', 'MENSAJE');
    }
  }

  fillOdontologo() {
    this.Odonform.get('id').setValue(this.odonService.odontologoSelected.id);
    this.Odonform.get('nombre').setValue(this.odonService.odontologoSelected.nombre);
    this.Odonform.get('cedula').setValue(this.odonService.odontologoSelected.cedula);
    this.Odonform.get('email').setValue(this.odonService.odontologoSelected.email);
    this.Odonform.get('especialidad').setValue(this.odonService.odontologoSelected.especialidad);
    this.Odonform.get('telefono').setValue(this.odonService.odontologoSelected.telefono);
    this.Odonform.get('jornadaLaboral').setValue(this.odonService.odontologoSelected.jornadaLaboral);

    if (Object.keys(this.odonService.odontologoSelected.horario).length !== 0) {
      const tam = Object.keys(this.odonService.odontologoSelected.horario).length;
      for (let i = 0; i < tam; i++) {
        const element = this.odonService.odontologoSelected.horario[i];
        if (element.dia === element.dia) {
          this.Odonform.get(element.dia).setValue(true);
        }
      }
    }
    this.file = this.odonService.odontologoSelected.foto;
    this.imageUrl = this.odonService.odontologoSelected.foto;
  }

  uploadFile(event: any) {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      const pattern = /image-*/;
      if (!file.type.match(pattern)) {
        this.toastr.error('El formato de la imagen es incorrecto', 'MENSAJE');
        return;
      }
      const reader = new FileReader(); // HTML5 FileReader API
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };

    }
  }

  saveOdontologo() {
    if (!this.Odonform.get('lunes').value && !this.Odonform.get('martes').value &&
      !this.Odonform.get('miércoles').value && !this.Odonform.get('jueves').value &&
      !this.Odonform.get('viernes').value && !this.Odonform.get('sábado').value) {
      this.toastr.warning('Seleccione los días de trabajo del Odontólogo', 'MENSAJE');
    } else {
      this.validateCedula();
      this.validateEmail();
      this.getInfoOdontologo();
      this.odont.email = this.odont.email.toLowerCase();
      this.odonService.editOdontologo(this.odont);
      this.toastr.success('Registro actualizado exitosamente', 'MENSAJE');
      this.close();

    }
  }

  horario(jornada) {
    const lista = [];

    if (jornada === 'Matutina') {
      this.horaInicioJ = '08:00';
      this.horaFinJ = '13:00';
      this.horas = ['08:00', '08:20', '08:40', '09:00',
        '09:20', '09:40', '10:00', '10:20',
        '10:40', '11:00', '11:20', '11:40',
        '12:00', '12:20', '12:40', '13:00'];
    }
    if (jornada === 'Vespertina') {
      this.horaInicioJ = '13:00';
      this.horaFinJ = '18:00';
      this.horas = ['13:00', '13:20', '13:40', '14:00',
        '14:20', '14:40', '15:00', '15:20',
        '15:40', '16:00', '16:20', '16:40',
        '17:00', '17:20', '17:40', '18:00'];

    }
    if (jornada === 'Tiempo Completo') {
      this.horaInicioJ = '08:00';
      this.horaFinJ = '18:00';
      this.horas = ['08:00', '08:20', '08:40', '09:00',
        '09:20', '09:40', '10:00', '10:20',
        '10:40', '11:00', '11:20', '11:40',
        '12:00', '12:20', '12:40', '13:00',
        '14:00', '14:20', '14:40', '15:00',
        '15:20', '15:40', '16:00', '16:20',
        '16:40', '17:00', '17:20', '17:40',
        '18:00'];

    }
    if (this.Odonform.get('lunes').value) {
      const lunes = {
        dia: 'lunes',
        horaInicio: this.horaInicioJ,
        horaFin: this.horaFinJ,
        horas: this.horas,
      };
      lista.push(lunes);
    }
    if (this.Odonform.get('martes').value) {
      const martes = {
        dia: 'martes',
        horaInicio: this.horaInicioJ,
        horaFin: this.horaFinJ,
        horas: this.horas,
      };
      lista.push(martes);
    }
    if (this.Odonform.get('miércoles').value) {
      const miercoles = {
        dia: 'miércoles',
        horaInicio: this.horaInicioJ,
        horaFin: this.horaFinJ,
        horas: this.horas
      };
      lista.push(miercoles);
    }
    if (this.Odonform.get('jueves').value) {
      const jueves = {
        dia: 'jueves',
        horaInicio: this.horaInicioJ,
        horaFin: this.horaFinJ,
        horas: this.horas
      };
      lista.push(jueves);
    }
    if (this.Odonform.get('viernes').value) {
      const viernes = {
        dia: 'viernes',
        horaInicio: this.horaInicioJ,
        horaFin: this.horaFinJ,
        horas: this.horas
      };
      lista.push(viernes);
    }
    if (this.Odonform.get('sábado').value) {
      const sabado = {
        dia: 'sábado',
        horaInicio: this.horaInicioJ,
        horaFin: this.horaFinJ,
        horas: this.horas
      };
      lista.push(sabado);
    }
    this.odont.horario = lista;
  }

  getInfoOdontologo() {
    this.odont.id = this.odonService.odontologoSelected.id;
    this.odont.cedula = this.Odonform.get('cedula').value;
    this.odont.nombre = this.Odonform.get('nombre').value;
    this.odont.email = this.Odonform.get('email').value;
    this.odont.especialidad = this.Odonform.get('especialidad').value;
    this.odont.foto = this.Odonform.get('foto').value;
    this.odont.telefono = this.Odonform.get('telefono').value;
    this.odont.jornadaLaboral = this.Odonform.get('jornadaLaboral').value;
    this.odont.foto = this.odonService.odontologoSelected.foto;
    if (this.imageUrl !== this.odonService.odontologoSelected.foto) {
      this.odont.foto = this.imageUrl;
    }
    this.horario(this.odont.jornadaLaboral);
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

  msgValidateEmail() {
    return this.Odonform.get('email').hasError('pattern') ? 'Correo electrónico invalido' :
      this.Odonform.get('email').hasError('required') ? 'Campo Requerido' :
        this.Odonform.get('email').hasError('repeatEmailOdonto') ? 'El email ya se encuentra registrado' :
              '';
  }

  msgValidateCedula() {
    return this.Odonform.get('cedula').hasError('required') ? 'Campo obligatorio' :
      this.Odonform.get('cedula').hasError('minlength') ? 'La identidad debe tener 9 digitos' :
        this.Odonform.get('cedula').hasError('repeatOdonto') ? 'Número de identificación ya registrado' :
            '';
  }

  getErrorMessageT(){
    return  this.Odonform.get('telefono').hasError('required') ? 'Campo obligatorio' : 
    this.Odonform.get('telefono').hasError('minlength') ? 'El número de teléfono debe tener de 7 a 10 dígitos':
    '';
  }


  jornadaL(event) {
    if (event.value === 'Matutina') {
      this.horaJornada = '08:00 a.m - 13:00 p.m';
    } else if (event.value === 'Vespertina') {
      this.horaJornada = '13:00 p.m - 18:00 p.m';
    } else {
      this.horaJornada = '08:00 a.m - 18:00 p.m';
    }
  }

}
