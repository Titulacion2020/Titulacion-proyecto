import { OdontologoInterface } from './../../../interfaces/odontologo-model';
import { ModalEditOPage } from './modal-edit-o/modal-edit-o.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { OdontologoService } from './../../../services/odontologo/odontologo.service';
import { PacienteService } from './../../../services/paciente/paciente.service';
import { AuthService } from './../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userEmail: string = null;
  hideNew = false;
  hideConfirm = false;
  image: any;
  passwordForm = new FormGroup({
    pass: new FormControl('', [Validators.pattern(/^(?=.*[A-Z])/)]),
    confirmPass: new FormControl('', Validators.required)
  });
  password: string;
  confirmPass: string;
  public userOdontologo: OdontologoInterface = {};

  constructor(
    public authService: AuthService,
    public pacientService: PacienteService,
    public odontService: OdontologoService,
    private camera: Camera,
    public toastController: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userEmail = auth.email;
        this.odontService.getOneOdontologobyE(this.userEmail).subscribe(user => {
          user.map(res => {
            this.userOdontologo = res;
            this.image = res.foto;
          });
        });
      }
    });
  }

  async addPhoto() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
    this.odontService.odontologoSelected.foto = this.image;
    this.odontService.editProfile(this.odontService.odontologoSelected);
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  editNameP() {
    const namePacient = this.userOdontologo.nombre;
    const name = true;
    const telf = false;
    const email = false;
    this.presentModal(namePacient, name, telf, email);
  }

  editTelfP() {
    const telfPacient = this.userOdontologo.telefono;
    const name = false;
    const telf = true;
    const email = false;
    this.presentModal(telfPacient, name, telf, email);
  }

  editEmailP() {
    const emailPacient = this.userOdontologo.email;
    const name = false;
    const telf = false;
    const email = true;
    this.presentModal(emailPacient, name, telf, email);
  }

  async presentModal(valor, val1, val2, val3) {
    const modal = await this.modalController.create({
      cssClass: 'my-custom-modal-css',
      component: ModalEditOPage,
      componentProps: {
        value: valor,
        isName: val1,
        isTelf: val2,
        isEmail: val3
      },
    });
    return await modal.present();
  }

  onChangePass() {
    this.password = this.passwordForm.get('pass').value;
    this.confirmPass = this.passwordForm.get('confirmPass').value;

    if (this.password.trim().length === 0) {
      this.presentToastE('Ingrese la nueva contraseña', 'danger');
      return;
    }
    if (this.confirmPass.trim().length === 0) {
      this.presentToastE('Confirme la nueva contraseña', 'danger');
      return;
    }
    if (this.passwordForm.get('pass').hasError('pattern') || this.password.length < 8) {
      this.presentToastE('La contraseña debe tener mínimo 8 caracteres y una letra mayúscula', 'danger');
      return;
    }
    if (this.password !== this.confirmPass) {
      this.presentToastE('La contraseñas no coinciden', 'danger');
      return;
    }

    try {
      this.authService.reAuth(this.odontService.odontologoSelected.email, localStorage.getItem('passwordUser'))
        .then((res) => {
          this.authService.updatePassword(this.password);
          this.presentToastE('Contraseña actualizada exitosamente', 'success');
          localStorage.setItem('passwordUser', this.password);
          this.passwordForm.reset();
        })
        .catch((err) => {
          this.presentToastE('Contraseña actual incorrecta', 'danger');
        });
    } catch (error) {
      this.presentToastE('Por favor ingrese la contraseña actual', 'danger');
    }
  }

  async presentToastE(msg: any, type: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: type,
      header: 'MENSAJE',
      position: 'bottom'
    });
    toast.present();
  }

}
