import { EditSeguroComponent } from './../edit-seguro/edit-seguro.component';
import { ViewSeguroComponent } from './../view-seguro/view-seguro.component';
import { NewSeguroComponent } from './../new-seguro/new-seguro.component';
import { AprobarEliminarSeguroComponent } from './../aprobar-eliminar/aprobar-eliminar-seguro/aprobar-eliminar-seguro.component';
import { SeguroService } from './../../../../services/seguro/seguro.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-seguros-list',
  templateUrl: './seguros-list.component.html',
  styleUrls: ['./seguros-list.component.css']
})
export class SegurosListComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'nombre','telefono','direccion','email','accion'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    public router: Router,
    public authService: AuthService,
    private toastr: ToastrService,
    private seguroService: SeguroService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.seguroService.getAllSeguros().subscribe(seguros => this.dataSource.data = seguros);
    this.dataSource.paginator = this.paginator;
  }

  onNew() {
    this.openDialogNew();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(element) {
    this.openDialogEdit();
    if (element) {
      this.seguroService.seguroSelected = Object.assign({}, element);
    }
  }

  onView(element){
    this.openDialogView();
    if (element) {
      this.seguroService.seguroSelected = Object.assign({}, element);
    }
  }


  onDelete(element) {
    this.openDialogConfirmar();
    if (element) {
      this.seguroService.seguroSelectedBorrar = Object.assign({}, element);
    }
  }

  openDialogConfirmar(): void {
    this.dialog.open(AprobarEliminarSeguroComponent);
  }

  openDialogView() {
    this.dialog.open(ViewSeguroComponent);
  }

  openDialogNew() {
    this.dialog.open(NewSeguroComponent);
  }

  openDialogEdit() {
    this.dialog.open(EditSeguroComponent);
  }

}
