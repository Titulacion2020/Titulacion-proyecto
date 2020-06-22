import { Subscription } from 'rxjs';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.page.html',
  styleUrls: ['./modal-edit.page.scss'],
})
export class ModalEditPage implements OnInit {

  @Input() value: string;
  @Input() isName: boolean;
  @Input() isTelf: boolean;
  @Input() isEmail: boolean;
  email = '';
  pass: string;
  // tslint:disable-next-line: max-line-length
  patternEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;
  nameForm = new FormGroup({
    data: new FormControl('', [Validators.required])
  });
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.patternEmail)])
  });
  title: string;

  constructor(
    private modalCtrl: ModalController,
    private pacientService: PacienteService,
    private odontService: OdontologoService,
    private toastController: ToastController,
    private authService: AuthService
  ) { }

  closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

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

  saveData() {
    if (this.isName === true) {
      this.pacientService.pacienteSelected.nombre = this.nameForm.get('data').value;
      this.pacientService.editProfile(this.pacientService.pacienteSelected);
      this.closeModal();
    }
    if (this.isTelf === true) {
      this.pacientService.pacienteSelected.telefono = this.nameForm.get('data').value;
      this.pacientService.editProfile(this.pacientService.pacienteSelected);
      this.closeModal();
    }
    if (this.isEmail === true) {
      this.email = this.emailForm.get('email').value.toLowerCase();
      if (this.email.trim().length === 0) {
        this.presentToastE('El correo electrónico es incorrecto');
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
      if ((pacientFilteredE !== undefined && this.email !== this.pacientService.pacienteSelected.email)
        || (odontFilteredE !== undefined && this.email !== this.pacientService.pacienteSelected.email)
        || (userFilteredE !== undefined && this.email !== this.pacientService.pacienteSelected.email)) {
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
      this.authService.reAuth(this.pacientService.pacienteSelected.email, this.pass)
        .then((res) => {
          this.authService.updateLoginEmail(this.email).then((em) => {
            this.pacientService.pacienteSelected.email = this.email;
            this.pacientService.editProfile(this.pacientService.pacienteSelected);
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
        return 'El email ya se encuentra registrado en otra cuenta';
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
