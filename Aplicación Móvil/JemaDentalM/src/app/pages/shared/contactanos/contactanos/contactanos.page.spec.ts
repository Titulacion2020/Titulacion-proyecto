import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactanosPage } from './contactanos.page';

describe('ContactanosPage', () => {
  let component: ContactanosPage;
  let fixture: ComponentFixture<ContactanosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactanosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactanosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
