import { Component, OnInit } from '@angular/core';
import { CitaService } from './../../../../../services/cita/cita.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-aprobar-eliminar-cita-m',
  templateUrl: './aprobar-eliminar-cita-m.component.html',
  styleUrls: ['./aprobar-eliminar-cita-m.component.css']
})
export class AprobarEliminarCitaMComponent implements OnInit {

  constructor(public router: Router,
    private toastmsg: ToastrService,  
    private citaService: CitaService,
    private dialogRef: MatDialogRef<AprobarEliminarCitaMComponent>){
      dialogRef.disableClose = true;
     }

  ngOnInit() {
  }
  borrarCitaM(){
    this.citaService.deleteCitaM(this.citaService.selectCitaMBorrar);
    this.toastmsg.success('Registro eliminado exitosamente', 'MENSAJE');
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  } 

}
