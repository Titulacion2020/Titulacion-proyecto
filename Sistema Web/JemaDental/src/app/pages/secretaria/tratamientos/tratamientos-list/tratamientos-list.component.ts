import { Component, OnInit, ViewChild } from '@angular/core';
import { TratamientoService } from './../../../../services/tratamiento/tratamiento.service';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NewTratamientoComponent } from './../new-tratamiento/new-tratamiento.component';
import { EditTratamientoComponent } from './../edit-tratamiento/edit-tratamiento.component';
import { AprobarEliminarTratamientoComponent } from './../aprobar-eliminar-tratamiento/aprobar-eliminar-tratamiento.component';
import { OdontologoService } from './../../../../services/odontologo/odontologo.service';
@Component({
  selector: 'app-tratamientos-list',
  templateUrl: './tratamientos-list.component.html',
  styleUrls: ['./tratamientos-list.component.css']
})
export class TratamientosListComponent implements OnInit {

  myDate = Date.now();

  dentistList: any[] = [];
  fecha: any;
  displayedColumns: string[] = ['fecha', 'cipaciente', 'namepaciente' , 'seguro', 'especialidad',
  'odontologo','tratamiento','precio','observacion', 'accion'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public router: Router,
    public authService: AuthService,
    public odontService: OdontologoService,
    private toastr: ToastrService,
    private tratamientoMService: TratamientoService,
    private dialog: MatDialog,
    private readonly afs: AngularFirestore
  ) { }

  especialidadSelect: any;

  ngOnInit() {

    this.tratamientoMService.getAllTratamientosMedicos().subscribe(tratamientoMedico => {
      this.dataSource.data = tratamientoMedico;
      const tam = Object.keys(this.dataSource.data).length;
      for (let i = 0; i< tam; i++){
        const element = this.dataSource.data[i];
        this.fecha = new Date(element['fecha']);
        this.dataSource.data[i]['fecha'] = this.tratamientoMService.formtDate(this.fecha);
      }
    });
  
  }

 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onNew() {
    this.openDialogNew();
  }

  onEdit(element) {
    this.openDialogEdit();
    if (element) {
      this.tratamientoMService.selectTratamientoM = Object.assign({}, element);
     }
  }

  openDialogNew(): void {
    this.dialog.open(NewTratamientoComponent);
  }

  openDialogEdit(): void {
   this.dialog.open(EditTratamientoComponent);
  }

  onDelete(element) {
    this.openDialogConfirmar();
    if (element) {
      this.tratamientoMService.selectTratamientoBorrar = Object.assign({}, element);
    }
  }

  openDialogConfirmar(): void {
    this.dialog.open(AprobarEliminarTratamientoComponent);
  }
}
