import { AuthService } from './../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { OdontologoService } from 'src/app/services/odontologo/odontologo.service';
import { CitaService } from 'src/app/services/cita/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userUid: string = null;
  public isAdmin: any = null;
  public isSecret: any = null;

  fechaI: any;
  fechaF: any;

  repetidos: any = {};

  constructor(
    private AFauth: AngularFireAuth,
    public authService: AuthService,
    private fcmService: FcmService,
    private odontologoService: OdontologoService,
    private citaService: CitaService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.fcmNotifications(this.userUid);
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles);
          this.isSecret = Object.assign({}, userRole.roles);
          this.isAdmin = this.isAdmin.hasOwnProperty('administrador');
          this.isSecret = this.isSecret.hasOwnProperty('secretaria');
        });
      } else {
        this.router.navigate(['/inicioSesion']);
      }
    });
  }

  onLogout() {
    this.AFauth.auth.signOut();
    this.router.navigate(['/inicioSesion']);

  }


  // Get Params Notifications
  fcmNotifications(id_user: string) {
    // this.fcmService.getPermission(id_user);
    this.fcmService.refreshToken(id_user);
    this.fcmService.receiveMessages();
  }

  validateDataNotifications() {
    Swal.fire({
      title: '<b style="font-family:sans-serif; font-size: 20px; color:black;">¿Está seguro de querer realizar esta acción?</b>',
      html: '<a style="font-family:sans-serif; font-size: 15px; color:black;">Se enviará notificaciones a todos los odontólogos,' +
        'con el número total de citas confirmadas para hoy.</a>',
      showCancelButton: true,
      confirmButtonColor: 'blueviolet',
      cancelButtonColor: '#eb445a',
      confirmButtonText: 'Sí, Enviar!',
      cancelButtonText: 'No, Cancelar!',
      reverseButtons: false // change button positon
    }).then(res => {
      if (res.value) {
        this.filterDate();
      }
    }).catch(error => {
      Swal.fire('Error', 'Intente nuevamente', 'error')
    });

  }

  // Filter Date
  async filterDate() {
    const date = new Date;

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const dateStart = year + '-' + month + '-' + day + ' 00:00';
    const newDateStart = +new Date(dateStart);
    this.fechaI = (Math.floor(newDateStart));

    const dateEnd = year + '-' + month + '-' + day + ' 23:59';
    const newDateEnd = +new Date(dateEnd);
    this.fechaF = (Math.floor(newDateEnd));

    this.getCitasOdontologos();
  }


  // Notification Odontologos

  async getCitasOdontologos() {
    // this.odontologoService
    const citas_subs = this.citaService.getCitas_odontologos_filter(this.fechaI, this.fechaF).subscribe(data => {
      citas_subs.unsubscribe();

      const citas_data = []
      const total_citas = {}

      if (data.length !== 0) {
        for (const cita of data) {
          const cita_search = citas_data.find(search => search.odontologo === cita.odontologo);
          if (!cita_search) {
            citas_data.push(cita);
          }
        }

        data.forEach(
          numero => {
            total_citas[numero.odontologo] = (total_citas[numero.odontologo] || 0) + 1;
          }
        );

        for (const cita_odon of citas_data) {
          const odon_subs = this.odontologoService.getUser_Odontologo(cita_odon.odontologo).subscribe(res => {
            odon_subs.unsubscribe();
            if (res.length !== 0) {
              for (const c of res) {
                if (c.token) {
                  const msg = 'Citas confirmadas para hoy: ' + total_citas[c.cedula];
                  this.fcmService.sendPostRequest(msg, c.token);
                }
              }
              Swal.fire('Enviado', 'Los odontólogos han sido notificados ', 'success');
            }
          });
        }

      }
    });


  }



}
