import { OdontologoService } from '../../services/odontologo/odontologo.service';
import { PacienteService } from '../../services/paciente/paciente.service';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FcmService } from 'src/app/services/fcm.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  hidePass = false;
  cedula = '';
  password = '';
  emailP: string;
  emailO: string;
  subscription: Subscription;

  constructor(
    public authService: AuthService,
    public pacientService: PacienteService,
    public odontService: OdontologoService,
    public toastController: ToastController,
    public router: Router,
    private fcmService: FcmService
  ) { }

  ngOnInit() {

  }

  async onLogin() {

    if (this.cedula.trim().length === 0) {
      this.presentToastE('Ingrese su número de cédula');
      return;
    }
    if (this.password.trim().length === 0) {
      this.presentToastE('Ingrese la contraseña');
      return;
    }

    // Buscar a que tipo de usuario pertenece la cédula (paciente/odontólogo)
    const pacientFilteredC = this.pacientService.arrayPacientes.find(
      pacientFilterbycedula => pacientFilterbycedula.cedula === this.cedula);
    const odontFilteredC = this.odontService.arrayOdontologos.find(
      odontFilterbycedula => odontFilterbycedula.cedula === this.cedula);

    // Si el número de cédula pertenece al paciente buscará el email para el inicio de sesión
    if (pacientFilteredC) {

      this.subscription = this.pacientService.getOnePacientebyC(this.cedula).subscribe(user => {
        this.emailP = user[0].email;
        this.authService.login(this.emailP, this.password).then((res) => {

          for (const us of user) {
           // console.log('User:  → ', us);
            this.fcmService.generateToken(us.id).catch().catch();
          }

          this.presentToast();
          localStorage.setItem('passwordUser', this.password);
          this.router.navigate(['menuP']);
        }).catch((err) => {
          this.presentToastE('El número de cédula y/o contraseña son incorrectas');
        });
        this.subscription.unsubscribe();
      });
    }

    // Si el número de cédula pertenece al odontólogo buscará el email para el inicio de sesión
    if (odontFilteredC) {
      this.subscription = this.odontService.getOdontologobyC(this.cedula).subscribe(odo => {

        this.emailO = odo[0].email;
        this.authService.login(this.emailO, this.password).then((resu) => {

          for (const us of odo) {
          //  console.log('User:  → ', us);
            this.fcmService.generateTokenO(us.id).catch().catch();
          }
          this.presentToast();
          localStorage.setItem('passwordUser', this.password);
          this.router.navigate(['menuO']);
        }).catch((err) => {
          this.presentToastE('El número de cédula y/o contraseña son incorrectas');
        });
        this.subscription.unsubscribe();
      });
    }

    // Usuario no encontrado
    if (!pacientFilteredC && !odontFilteredC) {
      this.presentToastE('Usuario no registrado');
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Bienvenido/a',
      duration: 2000,
      color: 'success',
      header: 'MENSAJE',
      position: 'top'
    });
    toast.present();
  }

  async presentToastE(msg) {
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
