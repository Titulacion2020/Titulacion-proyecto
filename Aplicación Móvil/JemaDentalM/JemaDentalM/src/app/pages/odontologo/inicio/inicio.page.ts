import { OdontologoService } from './../../../services/odontologo/odontologo.service';
import { AuthService } from './../../../services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { OdontologoInterface } from 'src/app/interfaces/odontologo-model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public userEmail: string = null;
  public userOdontologo: OdontologoInterface = {};
  constructor(
    private AFauth: AngularFireAuth,
    public authService: AuthService,
    public odontService: OdontologoService,
  ) { }

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
}
