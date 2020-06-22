import { Subscription } from 'rxjs';
import { OdontologoService } from '../../../../services/odontologo/odontologo.service';
import { PacienteInterface } from '../../../../interfaces/paciente-model';
import { AuthService } from '../../../../services/auth/auth.service';
import { CitaMInterface } from '../../../../interfaces/cita-model';
import { PacienteService } from '../../../../services/paciente/paciente.service';
import { CitaService } from '../../../../services/cita/cita.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-citas-p',
  templateUrl: './citas-p.page.html',
  styleUrls: ['./citas-p.page.scss'],
})
export class CitasPPage implements OnInit {

  citas: CitaMInterface[];
  public userPaciente: PacienteInterface = {};
  fecha: any;
  subscribe: Subscription;
  constructor(
    public citaMService: CitaService,
    public pacientService: PacienteService,
    public alertController: AlertController,
    public toastController: ToastController,
    public authService: AuthService,
    public router: Router,
    public odontService: OdontologoService,
  ) { }

  ngOnInit() {
    this.getUserAuth();
  }

  async alertCita() {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Recuerde que las citas solo se pueden agendar en la especialidad: <b>Odontología General</b>',
      backdropDismiss: true,
      buttons: [
         {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/menuP/p/newCita']);
          }
        }
      ]
    });

    await alert.present();
  }

  async onDelete(element) {
    const alert = await this.alertController.create({
      header: 'MENSAJE',
      message: '¿Estas seguro de cancelar la cita médica?',
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
            this.citaMService.deleteCitaM(element);
            this.presentToast();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Cita médica cancelada exitosamente',
      duration: 2000,
      color: 'success',
      header: '',
      position: 'bottom'
    });
    toast.present();
  }

  async getUserAuth() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.pacientService.getOnePaciente(auth.email).subscribe(user => {
          user.map(res => {
            this.userPaciente = res;
            this.subscribe = this.citaMService.getCitasByCedulaP(this.userPaciente.cedula).subscribe(cita => {
              this.citas = cita;
              const tam = Object.keys(cita).length;
              for (let i = 0; i < tam; i++) {
                const element = this.citas[i];
                this.fecha = new Date(element.fecha);
                this.citas[i].fecha = this.citaMService.formtDate(this.fecha);
              }
            });
          });
        });
      }
    });
  }

  onEdit(element) {
    if (element) {
      this.citaMService.selectCitaM = Object.assign({}, element);
      this.router.navigate(['/menuP/p/editCita']);
    }
  }



}
