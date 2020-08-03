import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SugerenciaInterface } from './../../../../interfaces/sugerencia-model';
import { SugerenciaService } from './../../../../services/sugerencia/sugerencia.service';
import { AuthService } from './../../../../services/auth/auth.service';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.page.html',
  styleUrls: ['./pacientes-list.page.scss'],
})
export class PacientesListPage implements OnInit {

  sugerencias: SugerenciaInterface[];
  fecha: number;
  constructor(
    public authService: AuthService,
    public odontologoService: OdontologoService,
    public sugerenciaService: SugerenciaService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.getAllSugerenciasByO();
    this.fecha = Date.parse(Date());
  }
  async getAllSugerenciasByO() {
    await this.authService.isAuth().subscribe(auth => {
       if (auth) {
         this.odontologoService.getOneOdontologobyE(auth.email).subscribe(user => {
           user.map(usu => {
            this.sugerenciaService.getSugerenciasByCedulaO(usu.cedula).subscribe(suge => {
              this.sugerencias = suge;
            });
           });
         });
       }
     });
   }

  onEdit(element) {
    this.sugerenciaService.sugerenciaSelected = Object.assign({}, element);
    this.router.navigate(['/menuO/o/editSugerencia']);
  }

  async onDelete(element) {
    const alert = await this.alertController.create({
      header: 'MENSAJE',
      message: '¿Estas seguro de eliminar la sugerencia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.sugerenciaService.deleteSugerenciaM(element);
            this.presentToast();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sugerencia eliminada exitosamente',
      duration: 2000,
      color: 'success',
      header: '',
      position: 'top'
    });
    toast.present();
  }
}
