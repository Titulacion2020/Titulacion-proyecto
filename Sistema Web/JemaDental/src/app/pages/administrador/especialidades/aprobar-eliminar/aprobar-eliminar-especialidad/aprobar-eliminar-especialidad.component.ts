import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from './../../../../../services/especialidad/especialidad.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-aprobar-eliminar-especialidad',
  templateUrl: './aprobar-eliminar-especialidad.component.html',
  styleUrls: ['./aprobar-eliminar-especialidad.component.css']
})
export class AprobarEliminarEspecialidadComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: AuthService,
    private toastmsg: ToastrService,  
    private EspecialidadService: EspecialidadService,
    private dialogRef: MatDialogRef<AprobarEliminarEspecialidadComponent>) {
      dialogRef.disableClose = true;
     }

  ngOnInit() {
    
  }
  borrarEspecialidad(){
    this.EspecialidadService.deleteEspecialidad(this.EspecialidadService.espeSelectedBorrar);
    this.toastmsg.success('Registro eliminado exitosamente', 'MENSAJE');
    this.dialogRef.close();
    return true;
  }

  close(): void {
    this.dialogRef.close();
  } 
 
}
