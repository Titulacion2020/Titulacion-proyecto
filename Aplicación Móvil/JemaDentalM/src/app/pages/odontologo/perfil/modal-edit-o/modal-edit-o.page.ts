import { AuthService } from './../../../../services/auth/auth.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-edit-o',
  templateUrl: './modal-edit-o.page.html',
  styleUrls: ['./modal-edit-o.page.scss'],
})
export class ModalEditOPage implements OnInit {

  @Input() value: string;
  @Input() isName: boolean;
  @Input() isTelf: boolean;
  @Input() isEmail: boolean;
  email = '';
  pass: string;
  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  // tslint:disable-next-line: max-line-length
  patternEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  nameForm = new FormGroup({
    data: new FormControl('', [Validators.required])
  });
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.pattern(this.patternEmail)])
  });
  title: string;

  constructor(
    private modalCtrl: ModalController,
    private pacientService: PacienteService,
    private odontService: OdontologoService,
    private toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.nameForm.get('data').setValue(this.value);
    this.emailForm.get('email').setValue(this.value);
    if (this.isName === true) {
      this.title = 'Nombres y Apellidos';
    }
    if (this.isTelf === true) {
      this.title = 'Número de teléfono';
    }
    if (this.isEmail === true) {
      this.title = 'Correo electrónico';
    }
  }

  closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  saveData() {
    if (this.isName === true) {
      this.odontService.odontologoSelected.nombre = this.nameForm.get('data').value;
      this.odontService.editProfile(this.odontService.odontologoSelected);
      this.closeModal();
    }
    if (this.isTelf === true) {
      this.odontService.odontologoSelected.telefono = this.nameForm.get('data').value;
      this.odontService.editProfile(this.odontService.odontologoSelected);
      this.closeModal();
    }
    if (this.isEmail === true) {
      this.email = this.emailForm.get('email').value.toLowerCase();
      if (this.email.trim().length === 0) {
        this.presentToastE('Ingrese el correo electrónico');
        return;
      }
      if (this.emailForm.get('email').hasError('pattern')) {
        this.presentToastE('El correo electrónico es incorrecto');
        return;
      }
      const pacientFilteredE = this.pacientService.arrayPacientes.find(
        pacientFilterbyemail => pacientFilterbyemail.email === this.email);
      const odontFilteredE = this.odontService.arrayOdontologos.find(
        odontFilterbyemail => odontFilterbyemail.email === this.email);
      const userFilteredE = this.authService.arrayUsuarios.find(
        userFilterbyemail => userFilterbyemail.email === this.email);

      if ((pacientFilteredE !== undefined && this.email !== this.odontService.odontologoSelected.email)
        || (odontFilteredE !== undefined && this.email !== this.odontService.odontologoSelected.email)
        || (userFilteredE !== undefined && this.email !== this.odontService.odontologoSelected.email)) {
        const mensaje = 'El email ingresado pertenece a otra cuenta';
        this.presentToastE(mensaje);
      } else {
        this.updateEmail();
      }
    }
  }

  updateEmail() {
    this.pass = localStorage.getItem('passwordUser');
    try {
      this.authService.reAuth(this.odontService.odontologoSelected.email, this.pass)
        .then((res) => {
          this.authService.updateLoginEmail(this.email).then((em) => {
            this.odontService.odontologoSelected.email = this.email;
            this.odontService.editProfile(this.odontService.odontologoSelected);
            this.closeModal();
          }).catch((err) => {
            this.presentToastE(this.convertMessage(err.code));
          });
        })
        .catch((err) => {
          this.presentToastE('A ocurrido un error');
        });
    } catch (error) {
      this.presentToastE('A ocurrido un error');
    }
  }

  convertMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use': {
        return 'El email ya se encuentra en uso';
      }
      case 'auth/invalid-email': {
        return 'Formato incorrecto del email';
      }
      default: {
        return 'Login error try again later.';
      }
    }
  }

  async presentToastE(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      header: 'MENSAJE',
      position: 'top'
    });
    toast.present();
  }

}
