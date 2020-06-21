import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordComponent } from './new-password.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { ToastrModule} from 'ngx-toastr';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPasswordComponent ],
      imports: [ AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule,
        AngularFirestoreModule, ToastrModule.forRoot(), MatToolbarModule, AngularFireStorageModule,
        RouterTestingModule.withRoutes([]), FormsModule, ReactiveFormsModule, MatIconModule, MatInputModule, 
        MatButtonModule, MatCardModule, MatFormFieldModule
      ],
      providers: [{ provide: AngularFirestore }, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería validar que la contaseña tenga minimo 8 caracteres y una letra mayuscula', 
  () =>{ 
    let newpass = component.resetPassForm.controls['newpass'];
    expect(newpass.valid).toBeFalsy();

    let errors = {};
    errors = newpass.errors || {};
    expect (errors['required']).toBeTruthy();

    component.newPass = 'Pass1234';
    expect(component.newPass.length).toBe(8);
    newpass.setValue('Pass1234');
    expect(newpass.hasError('minlength', ['minlength'])).toEqual(false);
  
    newpass.setValue('Pass1234');
    errors = newpass.errors || {};
    expect(errors['pattern']).toBeFalsy();
  });

});
