import { PacienteInterface } from 'src/app/interfaces/paciente-model';
import { AuthService } from './../../../services/auth/auth.service';
import { PacienteService } from './../../../services/paciente/paciente.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-p',
  templateUrl: './menu-p.page.html',
  styleUrls: ['./menu-p.page.scss'],
})
export class MenuPPage implements OnInit {

  pages = [
    {
      title: 'Inicio',
      url: '/menuP/p/inicio',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/menuP/p/perfil',
      icon: 'contact'
    },
    {
      title: 'Nosotros',
      url: '/menuP/p/nosotros',
      icon: 'people'
    },
    {
      title: 'Contáctanos',
      url: '/menuP/p/contactanos',
      icon: 'call'
    }
  ];
  public userEmail: string = null;
  public userPaciente: PacienteInterface = {};
  selectedPath = '';
  constructor(
    public router: Router,
    private AFauth: AngularFireAuth,
    public pacientService: PacienteService,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userEmail = auth.email;
        this.pacientService.getOnePaciente(this.userEmail).subscribe(user => {
          user.map(res => {
            this.userPaciente = res;
            this.pacientService.pacienteSelected = res;
          });
        });
      }
    });
  }

  logOut() {
    this.AFauth.auth.signOut();
    localStorage.setItem('passwordUser', '');
    this.presentLoading();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere un momento...',
      duration: 2000,
      spinner: 'lines'
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigateByUrl('/inicio');
    // console.log('Loading dismissed!');
  }

}
