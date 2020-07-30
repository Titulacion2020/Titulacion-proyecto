import { ModalEditPage } from './modal-edit/modal-edit.page';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PacienteInterface } from './../../../interfaces/paciente-model';
import { PacienteService } from './../../../services/paciente/paciente.service';
import { OdontologoService } from './../../../services/odontologo/odontologo.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil-p',
  templateUrl: './perfil-p.page.html',
  styleUrls: ['./perfil-p.page.scss'],
})
export class PerfilPPage implements OnInit {

  userEmail: string = null;
  hideNew = false;
  hideConfirm = false;
  image: any;
  passwordForm = new FormGroup({
    pass: new FormControl('', [Validators.pattern(/^(?=.*[A-Z])/)]),
    confirmPass: new FormControl('')
  });
  password = '';
  confirmPass = '';
  public userPaciente: PacienteInterface = {};

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
        this.pacientService.getOnePaciente(this.userEmail).subscribe(user => {
          user.map(res => {
            this.userPaciente = res;
            this.image = this.pacientService.pacienteSelected.foto;
          });
        });
      }
    });
  }

  async addPhoto() {
    const libraryImage = await this.openLibrary();
    this.image = 'data:image/jpg;base64,' + libraryImage;
    this.pacientService.pacienteSelected.foto = this.image;
    this.pacientService.editProfile(this.pacientService.pacienteSelected);
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
    const namePacient = this.userPaciente.nombre;
    const name = true;
    const telf = false;
    const email = false;
    this.presentModal(namePacient, name, telf, email);
  }

  editTelfP() {
    const telfPacient = this.userPaciente.telefono;
    const name = false;
    const telf = true;
    const email = false;
    this.presentModal(telfPacient, name, telf, email);
  }

  editEmailP() {
    const emailPacient = this.userPaciente.email;
    const name = false;
    const telf = false;
    const email = true;
    this.presentModal(emailPacient, name, telf, email);
  }

  async presentModal(valor, val1, val2, val3) {
    const modal = await this.modalController.create({
      cssClass: 'my-custom-modal-css',
      component: ModalEditPage,
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
      this.authService.reAuth(this.pacientService.pacienteSelected.email, localStorage.getItem('passwordUser'))
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
