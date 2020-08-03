import { LoadingController, MenuController } from '@ionic/angular';
import { OdontologoInterface } from 'src/app/interfaces/odontologo-model';
import { AuthService } from './../../../services/auth/auth.service';
import { OdontologoService } from './../../../services/odontologo/odontologo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-o',
  templateUrl: './menu-o.page.html',
  styleUrls: ['./menu-o.page.scss'],
})
export class MenuOPage implements OnInit {

  pages = [
    {
      title: 'Inicio',
      url: '/menuO/o/inicio',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/menuO/o/perfil',
      icon: 'contact'
    },
    {
      title: 'Nosotros',
      url: '/menuO/o/nosotros',
      icon: 'people'
    },
    {
      title: 'Contáctanos',
      url: '/menuO/o/contactanos',
      icon: 'call'
    }
  ];
  selectedPath = '';
  public userEmail: string = null;
  public userOdontologo: OdontologoInterface = {};
  constructor(
    public router: Router,
    private AFauth: AngularFireAuth,
    private authService: AuthService,
    public odontService: OdontologoService,
    private loadingController: LoadingController,
    public menuCtrl: MenuController,
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userEmail = auth.email;
        this.odontService.getOneOdontologobyE(this.userEmail).subscribe(user => {
          user.map(res => {
            this.userOdontologo = res;
            this.odontService.odontologoSelected = res;
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
    this.router.navigate(['/inicio']);
    // console.log('Loading dismissed!');
  }

}
