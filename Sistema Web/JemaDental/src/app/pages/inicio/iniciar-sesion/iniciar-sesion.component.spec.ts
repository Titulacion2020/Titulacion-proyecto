import { AuthService } from './../../../services/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatIconModule } from '@angular/material';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { FcmService } from './../../../services/fcm/fcm.service';
import { DebugElement} from '@angular/core';
import {BrowserModule, By} from '@angular/platform-browser';
import { User } from 'firebase';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';


/*
class getCedulaMock {
  cedula: '1234567890';
  getCedula(){
    return this.cedula;
  }
}
*/
 const mockUserJSON = {
  email: 'user@gmail.com',
  friendcount: 0,
  image: '',
  mobile: '9999999999',
  name: 'User',
  uid: 'XXXX'
};
/*
class UserServiceStub {
  getUser(): Observable<User> {
      return Observable.of(mockUserJSON);
  }
}
*/
class AuthenticationServiceStub {
  login(email: string, password: string) {
  }
  resetPassword(email: string) {
  }
}
class AngularFireAuthStub {
  readonly auth: AuthStub = new AuthStub();
}
class AuthStub {
  onAuthStateChanged() {
     // return Observable.of({uid: '1234'});
  }
}



describe('IniciarSesionComponent', () => {
  let component: IniciarSesionComponent;
  let fixture: ComponentFixture<IniciarSesionComponent>;
 // let service: getCedulaMock;
 let auntserve: AngularFireAuth;
 let firestore: AngularFirestore;
 let storage: AngularFireStorage; 
 let fcm: FcmService;
 let de: DebugElement;
 //const mockAuthService: AuthService = new AuthService(auntserve, firestore,storage, fcm);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarSesionComponent],
      imports:
      [ AngularFireAuthModule, RouterTestingModule.withRoutes([]), AngularFireModule.initializeApp(environment.firebase),
        FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,        
      ],
      providers: [ AuthService, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarSesionComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

/*
  it('Deberia ser falso cuando los campos son incorrectos', ()=>{
   // expect(component.inicioSesionForm.valid).toBeFalsy();
    component.inicioSesionForm.controls['cedula'].setValue('1234567890');
    component.inicioSesionForm.controls['password'].setValue('Mafer123');
   // expect(component.inicioSesionForm.valid).toBeTruthy();

   // spyOn(service, 'getCedula').and.returnValue('1234567890');
    const result = component.onLogin();
    expect(result).toBe('1234567890');
    
  });
*/
/*
it('Should call login', async(() => {
  const loginButton = de.query(By.css('#onLogin-btn'));
 // expect(loginButton).not.toBeNull('Login button not found');

  spyOn(mockAuthService, 'login').and.callThrough();
  de.query(By.css('#email')).nativeElement.value = 'user@gmail.com';
  de.query(By.css('#password')).nativeElement.value = 'password';
  fixture.detectChanges();

  // Login button is enabled
  expect(loginButton.nativeElement.disabled).toBe(false);
  loginButton.nativeElement.click();
  fixture.detectChanges();
  expect(mockAuthService.login).toHaveBeenCalled();
}));
*/



  it('Debería validar el inicio de sesión', ()=>{
    let cedula = component.inicioSesionForm.controls['cedula'];
    cedula.setValue('1765821268');
    let password = component.inicioSesionForm.controls['password'];
    password.setValue('Pass123');
    expect(component.inicioSesionForm.valid).toBeTruthy();
  });
  
  it('Debería validar los campos del inicio de sesión', () =>{
    component.cedula = '1725542961';
    component.password = 'Mafer123';
    expect(component.cedula.length).toBe(10);
  })

//pruebas

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar los campos del inicio de sesión', () =>{ 
    let cedula = component.inicioSesionForm.controls.cedula;
    let pass = component.inicioSesionForm.controls.password;

    let errors = {};
    errors = cedula.errors || {};
    expect (errors['required']).toBeTruthy();

    component.cedula = '1725542961';
    cedula.setValue('1234567890');
    expect(cedula.hasError('minlength', ['minlength'])).toEqual(false);
    expect(component.cedula.length).toBe(10);

    pass.setValue('Mafer123');
    errors = pass.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Debería retornar un usuario, cuando se ingresa las credenciales', done =>{
    const user = 'mafercordova5@hotmail.com';
    const pass = 'Mafer123';
    component.authService.login(user,pass).then(res =>{
      expect(typeof res).toBe('object');
      done();
    }).catch((err) =>{
      expect(err.message).toEqual('expected');
    });
  });

});
