import { Component, OnInit } from '@angular/core';
import { SeguroService } from './../../../../../services/seguro/seguro.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-aprobar-eliminar-seguro',
  templateUrl: './aprobar-eliminar-seguro.component.html',
  styleUrls: ['./aprobar-eliminar-seguro.component.css']
})
export class AprobarEliminarSeguroComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService,
    private toastmsg: ToastrService,  
    private seguroService: SeguroService,
    private dialogRef: MatDialogRef<AprobarEliminarSeguroComponent>) {
      dialogRef.disableClose = true;
     }

  ngOnInit() {
  }
  borrarSeguro(){
    this.seguroService.deleteSeguro(this.seguroService.seguroSelectedBorrar);
    this.toastmsg.success('Registro eliminado exitosamente', 'MENSAJE');
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  } 
}
