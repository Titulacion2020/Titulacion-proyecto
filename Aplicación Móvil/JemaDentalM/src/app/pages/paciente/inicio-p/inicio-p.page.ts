import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OdontologoService } from './../../../services/odontologo/odontologo.service';
import { PacienteInterface } from './../../../interfaces/paciente-model';
import { PacienteService } from './../../../services/paciente/paciente.service';
import { AuthService } from './../../../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-p',
  templateUrl: './inicio-p.page.html',
  styleUrls: ['./inicio-p.page.scss'],
})
export class InicioPPage implements OnInit {
  public userEmail: string = null;
  public userPaciente: PacienteInterface = {};
  constructor(
    private AFauth: AngularFireAuth,
    public authService: AuthService,
    public pacientService: PacienteService,
    public odontService: OdontologoService,
    public alertController: AlertController,
    private router: Router
  ) { }

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

  async alertCita() {
    const alert = await this.alertController.create({
      header: 'AVISO',
      message: 'Recuerde que las citas solo se pueden agendar en la especialidad: <b>Odontología General</b>',
      backdropDismiss: false,
      buttons: [
         {
          text: 'OK',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/menuP/p/citas']);
          }
        }
      ]
    });

    await alert.present();
  }

}
