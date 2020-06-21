import { FcmService } from './../../../../services/fcm/fcm.service';
import { PacienteInterface } from './../../../../models/paciente-model';
import { PacienteService } from './../../../../services/paciente/paciente.service';
import { SolicitudService } from './../../../../services/solicitud/solicitud.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { SolicitudInterface } from './../../../../models/solicitud-model';

@Component({
  selector: 'app-responder-solicitud',
  templateUrl: './responder-solicitud.component.html',
  styleUrls: ['./responder-solicitud.component.css']
})
export class ResponderSolicitudComponent implements OnInit {


  solicitudForm = new FormGroup({
    comentario: new FormControl('', Validators.required),
  });

  dataPaciente: PacienteInterface;

  constructor(
    private toastr: ToastrService,
    public solicitudService: SolicitudService,
    private dialogRef: MatDialogRef<ResponderSolicitudComponent>,
    private pacienteService: PacienteService,
    private fcmService: FcmService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  onSaveSolicitud() {

    let newdata: SolicitudInterface;
    let estado = this.solicitudService.selectSolicitud.estado;
    newdata = this.solicitudService.selectSolicitud;

    newdata.respuesta = this.solicitudForm.get('comentario').value;
    newdata.estadoSolicitud = estado;

    if (newdata.estadoSolicitud === 'Aprobada') {

      this.pacienteService.getUser_Token(newdata.cedulaSolicitante).subscribe(data => {
        for (let paciente of data) {
          this.dataPaciente = paciente;
          if (paciente) {
            if (paciente.token) {
              // Notification
              const msg = 'Su solicitud fué aprobada exitosamente.';
              this.fcmService.sendPostRequest(msg, paciente.token);
            }
          }
        }

      });
    }

    if (newdata.estadoSolicitud === 'Negada') {

      this.pacienteService.getUser_Token(newdata.cedulaSolicitante).subscribe(data => {
        for (let paciente of data) {
          this.dataPaciente = paciente;
          if (paciente) {
            if (paciente.token) {
              // Notification
              const msg = 'Su solicitud fué negada.';
              this.fcmService.sendPostRequest(msg, paciente.token);
            }
          }
        }

      });
    }

    if (this.solicitudService.selectSolicitud !== undefined) {
      this.solicitudService.updateSolicitud(newdata);
      this.toastr.success('Respuesta enviada exitosamente', 'MENSAJE');
      this.close();
    } else {
      this.toastr.warning('La solicitud no existe', 'MENSAJE');
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  msgValidateComentario() {
    return this.solicitudForm.get('comentario').hasError('required') ? 'Campo obligatorio' :
      '';
  }

}
