import { PacienteService } from './../services/paciente/paciente.service';
import { OdontologoService } from './../services/odontologo/odontologo.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private AFauthO: AngularFireAuth,
    private router: Router,
    private odontService: OdontologoService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.AFauthO.authState.pipe(map(auth => {
      if (isNullOrUndefined(auth)) {
        return true;
      } else {
        this.odontService.getOneOdontologobyE(auth.email).subscribe(odo => {
          if (odo.length !== 0) {
            this.router.navigate(['/menuO']);
          } else {
            this.router.navigate(['/menuP']);
          }
        });
        return false;
      }
    }
    ));
  }

}
