import { Router } from '@angular/router';
import { OdontologoService } from './../../services/odontologo/odontologo.service';
import { PacienteService } from './../../services/paciente/paciente.service';
import { AuthService } from './../../services/auth/auth.service';
import { PacienteInterface } from './../../interfaces/paciente-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastController, AlertController } from '@ionic/angular';
import { FcmService } from 'src/app/services/fcm.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.page.html',
  styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {

  // tslint:disable-next-line: max-line-length
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  hideNew = false;
  hideConfirm = false;
  subscribe: Subscription;
  password = '';
  confirmPass = '';
  email = '';
  cedula = '';
  nombre = '';
  telefono = '';
  pExist = false;
  oExist = false;
  newPaciente: PacienteInterface = {};
  nombrePattern: any =  /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/;

  registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.pattern(this.nombrePattern)]),
    email: new FormControl('', [Validators.pattern(this.emailPattern)]),
    pass: new FormControl('', [Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])/)]),
    confirmPass: new FormControl(''),
  });

  // tslint:disable-next-line: max-line-length
  fotoPaciente: any = 'https://firebasestorage.googleapis.com/v0/b/jema-dental.appspot.com/o/imageOdontProfile%2Fuserphoto.png?alt=media&token=79e54081-7486-41ec-b380-e3ff34def585';
  id_paciente = '';
  id_odontologo = '';

  constructor(
    private authService: AuthService,
    public pacientService: PacienteService,
    public odontService: OdontologoService,
    private toastController: ToastController,
    public router: Router,
    private fcmService: FcmService,
    private db: AngularFirestore,
    private alertController: AlertController
  ) {
  }

  ngOnInit() { }

  buscarUsuario(evento) {
    console.log(this.cedula);
    

    if (!this.cedula || this.cedula.length < 9) {

      this.pExist = false;
      this.oExist = false;
      this.telefono = '';
      this.registroForm.reset();
      this.registroForm.get('nombre').setValue('');
      this.registroForm.get('confirmPass').setValue('');
      this.registroForm.get('pass').setValue('');
      this.registroForm.get('email').setValue('');
      return;
    }

    // Buscar si el número de cédula ingresado ya se encuentra registrado en la web
    const pacientFilteredC = this.pacientService.arrayPacientes.find(
      pacientFilterbycedula => pacientFilterbycedula.cedula === this.cedula);

    const odontFilteredC = this.odontService.arrayOdontologos.find(
      odontFilterbycedula => odontFilterbycedula.cedula === this.cedula);

    if (pacientFilteredC) {
      // Paciente
      this.pExist = true;
      this.oExist = false;
      this.registroForm.get('nombre').setValue(pacientFilteredC.nombre);
      this.telefono = pacientFilteredC.telefono;
      this.registroForm.get('email').setValue(pacientFilteredC.email);
      this.id_paciente = pacientFilteredC.id;
    }
    if (odontFilteredC) {
      // Odontologo
      this.oExist = true;
      this.pExist = false;
      this.registroForm.get('nombre').setValue(odontFilteredC.nombre);
      this.telefono = odontFilteredC.telefono;
      this.registroForm.get('email').setValue(odontFilteredC.email);
      this.id_odontologo = odontFilteredC.id;
    }

    if (!pacientFilteredC && !odontFilteredC) {
      // User No existe
      this.pExist = false;
      this.oExist = false;
      this.telefono = '';
      this.registroForm.reset();
      this.registroForm.get('nombre').setValue('');
      this.registroForm.get('confirmPass').setValue('');
      this.registroForm.get('pass').setValue('');
      this.registroForm.get('email').setValue('');
    }
  }

  createAccount() {
    this.nombre = this.registroForm.get('nombre').value;
    this.password = this.registroForm.get('pass').value;
    this.confirmPass = this.registroForm.get('confirmPass').value;
    this.email = this.registroForm.get('email').value;

    // Mensajes de validación de los Input
    if (this.cedula.trim().length === 0) {
      this.presentToastE('Ingrese su número de identificación');
      return;
    }
    if (this.cedula.length < 9) {
      this.presentToastE('Número de identificación incorrecto');
      return;
    }
    if (this.nombre.trim().length === 0) {
      this.presentToastE('Ingrese sus nombres y apellidos');
      return;
    }
    if (this.registroForm.get('nombre').hasError('pattern')) {
      this.presentToastE('Nombres y Apellidos incorrectos');
      return;
    }
    if (this.telefono.trim().length === 0) {
      this.presentToastE('Ingrese su número de teléfono');
      return;
    }
    if (this.telefono.length < 7) {
      this.presentToastE('Número de teléfono incorrecto');
      return;
    }
    if (this.email.trim().length === 0) {
      this.presentToastE('Ingrese su correo electrónico');
      return;
    }
    if (this.registroForm.get('email').hasError('pattern')) {
      this.presentToastE('Correo electrónico incorrecto');
      return;
    }
    if (this.password.trim().length === 0) {
      this.presentToastE('Ingrese la contraseña');
      return;
    }
    if (this.registroForm.get('pass').hasError('pattern') || this.password.length < 8) {
      this.presentToastE('La contraseña debe tener mínimo 8 caracteres y una letra mayúscula');
      return;
    }
    if (this.confirmPass.trim().length === 0) {
      this.presentToastE('Confirme la contraseña');
      return;
    }
    if (this.password !== this.confirmPass) {
      this.presentToastE('La contraseñas no coinciden');
      return;
    }

    // Si el paciente ya se encuentra registrado en la web
    if (this.pExist) {
      // Paciente
      this.authService.registroUsuario(this.email, this.password).then((res) => {
        this.fcmService.generateToken(this.id_paciente).then().catch(); // TOKEN
        this.alertCreateAccount();
      }).catch((err) => {
        // console.log(err);
        this.alertAccount(this.convertMessage(err.code));
      });
    }

    // Si el odontólogo ya se encuentra registrado en la web
    if (this.oExist) {
      // Odontologo
      this.authService.registroUsuario(this.email, this.password).then((res) => {
        this.fcmService.generateTokenO(this.id_odontologo).then().catch(); // TOKEN
        this.alertCreateAccount();
      }).catch((err) => {
        // console.log(err);
        this.alertAccount(this.convertMessage(err.code));
      });
    }

    // El usuario no se encuentra registrado en la web y será registrado automaticamente como paciente
    if (!this.pExist && !this.oExist) {
      // User no existe
      const pacientFilteredE = this.pacientService.arrayPacientes.find(
        pacientFilterbyemail => pacientFilterbyemail.email === this.email);

      const odontFilteredE = this.odontService.arrayOdontologos.find(
        odontFilterbyemail => odontFilterbyemail.email === this.email);

      const userFilteredC = this.authService.arrayUsuarios.find(
        userFilterbycedula => userFilterbycedula.cedula === this.cedula);

      const userFilteredE = this.authService.arrayUsuarios.find(
        userFilterbyemail => userFilterbyemail.email === this.email);

      if (userFilteredC) {
        this.presentToastE('El número de cédula ya se encuentra registrado en otra cuenta');
        return;
      }

      if (pacientFilteredE || odontFilteredE || userFilteredE) {
        this.presentToastE('El email pertenece a otra cuenta');
      } else {
        const id_user = this.db.createId();
        this.newPaciente = {
          id: id_user,
          nombre: this.nombre,
          cedula: this.cedula,
          foto: this.fotoPaciente,
          email: this.registroForm.get('email').value,
          hClinica: '',
          rol: {
            paciente: true
          },
          seguro: 'sin seguro',
          telefono: this.telefono,
          token: ''
        };
        this.pacientService.addPaciente(this.newPaciente).then(() => {
         // console.log('User Register OK');
          this.fcmService.generateToken(id_user).then().catch(); // TOKEN
        }).catch(error => console.log('Error User Register', error));

        this.authService.registroUsuario(this.email, this.password).then((res) => {
          this.alertCreateAccount();
        }).catch((err) => {
          // console.log(err);
          this.alertAccount(this.convertMessage(err.code));
        });
      }
    }

  }

  async alertAccount(msg) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: msg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  convertMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': {
        return 'La cuenta que estas intentando crear ya existe';
      }
      case 'auth/invalid-email': {
        return 'Formato incorrecto del email';
      }
      default: {
        return 'Login error try again later.';
      }
    }
  }

  async alertCreateAccount() {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: 'Usuario registrado existosamente, puedes iniciar sesión',
      backdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/inicio']);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToastE(msg: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      header: 'MENSAJE',
      position: 'bottom'
    });
    toast.present();
  }

}
