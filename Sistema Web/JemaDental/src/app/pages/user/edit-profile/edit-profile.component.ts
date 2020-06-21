import { UserInterface } from 'src/app/models/user-model';
import { AuthService } from './../../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChildren, ElementRef, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));
  @ViewChildren('fileInput') el: ElementRef;
  imageUrl: any;
  file: any;

  editBasicInfForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl('', [Validators.required]),
    telefono: new FormControl(''),
    cedula: new FormControl(''),
    email: new FormControl(''),
    imagen: new FormControl(),
  });
  constructor(
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    private authService: AuthService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.fillInfoUser();
  }

  fillInfoUser() {
    this.editBasicInfForm.get('nombre').setValue(this.authService.userSelected.nombre);
    this.editBasicInfForm.get('telefono').setValue(this.authService.userSelected.telefono);
    this.editBasicInfForm.get('cedula').setValue(this.authService.userSelected.cedula);
    this.file = this.authService.userSelected.imagen;
    this.imageUrl = this.authService.userSelected.imagen;
  }

  uploadFile(event: any) {
    if (event.target.files[0]) {
      const file: File = event.target.files[0];
      const pattern = /image-*/;
      if (!file.type.match(pattern)) {
        this.toastr.error('El formato de la imagen es incorrecto', 'MENSAJE');
        return;
      }
      const reader = new FileReader(); // HTML5 FileReader API
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };

    }
  }

  editProfile(user: UserInterface) {
    user.id = this.authService.userSelected.id;
    user.email = this.authService.userSelected.email;

    if (this.imageUrl !== this.authService.userSelected.imagen) {
      user.imagen = this.imageUrl;
    } else {
      user.imagen = this.authService.userSelected.imagen;
    }
    this.authService.updateUser(user);
    this.dialogRef.close();
    this.toastr.success('Información actualizada exitosamente', 'MENSAJE');
  }

  close(): void {
    this.dialogRef.close();
  }

  check(event: KeyboardEvent) {
    var preg = /^([0-9]+\.?[0-9]{0,2})$/; 
     if ((preg.test(event.key) !== true) && event.keyCode > 31 && !this.allowedChars.has(event.keyCode)){
       event.preventDefault();
     }
   }

  msgValidateNombre() {
    return this.editBasicInfForm.get('nombre').hasError('required') ? 'Campo obligatorio' :
      '';
  }

}
