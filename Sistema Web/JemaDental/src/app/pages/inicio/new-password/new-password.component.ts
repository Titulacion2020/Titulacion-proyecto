import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  hideNew = false;
  hideConfirm = false;

  newPass: string;
  confirmPass: string;
  mostrarComponente: boolean;

  resetPassForm = new FormGroup({
    newpass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])/)]),
    confirmpass: new FormControl('', [Validators.required])
  });

  constructor(
    private toastr: ToastrService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    if (!this.route.snapshot.queryParams.oobCode) {

    } else {
      this.mostrarComponente = true;
    }
  }

  resetPass() {
    this.newPass = this.resetPassForm.get('newpass').value;
    this.confirmPass = this.resetPassForm.get('confirmpass').value;

    if (this.newPass !== this.confirmPass) {
      this.toastr.error('Las contraseñas no coinciden', 'MENSAJE');
    } else {
      const code = this.route.snapshot.queryParams.oobCode;
      this.afAuth.auth.confirmPasswordReset(code, this.newPass)
        .then(() => this.toastr.success('Contraseña restablecida exitosamente', 'MENSAJE'));
    }
  }

  msgValidateNewPass() {
    if (this.resetPassForm.get('newpass').hasError('required')) {
      return 'Campo Requerido';
    } else {
      return 'La contraseña debe tener minimo 8 caracteres y una letra mayuscula';
    }
  }

  msgValidateComfirmPass() {
    return this.resetPassForm.get('confirmpass').hasError('required') ? 'Campo Requerido' :
      '';
  }

}
