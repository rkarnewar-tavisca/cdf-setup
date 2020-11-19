import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultureModule } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';

import { ContactInfoEditOverlayComponent } from './contact-info-edit-overlay.component';
import { CartService } from '@shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { ReactiveFormsModule } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';

describe('ContactInfoEditOverlayComponent', () => {
  let component: ContactInfoEditOverlayComponent;
  let fixture: ComponentFixture<ContactInfoEditOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactInfoEditOverlayComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CoreModule,
        CultureModule,
        ReactiveFormsModule,
        OrxeFormsModule,
      ],
      providers: [
        {
          provide: CartService,
        },
        {
          provide: Cart,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoEditOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onChangeContactInfoInputs', () => {
    spyOn(component, 'onChangeContactInfoInputs');
    component.onChangeContactInfoInputs('mock');
    fixture.detectChanges();
    expect(component.onChangeContactInfoInputs).toHaveBeenCalled();
  });

  it('should call onChangeContactInfoInputs and set isNeedToVerifyEmail as false if email not changed', () => {
    component.contactDetail = {
      email: 'abc@gm.com',
      verifyEmail: 'abc@gm.com',
    };
    component.editContactForm.get('email').setValue('abc@gm.com');
    component.onChangeContactInfoInputs('email');
    fixture.detectChanges();
    expect(component.viewModel.isNeedToVerifyEmail).toBeFalsy();
  });

  it('should call onChangeContactInfoInputs and set isNeedToVerifyEmail as true if email changed', () => {
    component.contactDetail = {
      email: 'abc@gm.com',
      verifyEmail: 'abc@gm.com',
    };
    component.editContactForm.get('email').setValue('pqr@gm.com');
    component.onChangeContactInfoInputs('email');
    fixture.detectChanges();
    expect(component.viewModel.isNeedToVerifyEmail).toBeTruthy();
  });

  it('should call cancelContactInfoEdit', () => {
    spyOn(component, 'cancelContactInfoEdit');
    component.cancelContactInfoEdit();
    fixture.detectChanges();
    expect(component.cancelContactInfoEdit).toHaveBeenCalled();
  });

  it('should emit onSubmitted event when saveChangesContactInfoEdit is called', () => {
    component.editContactForm.get('phone').setValue('1234376975');
    component.editContactForm.get('secondaryPhone').setValue('1234376975');
    component.editContactForm.get('email').setValue('pqr@gm.com');
    component.editContactForm.get('verifyEmail').setValue('pqr@gm.com');
    spyOn(component.onSubmitted, 'emit');
    component.saveChangesContactInfoEdit();
    expect(component.onSubmitted.emit).toHaveBeenCalled();
    expect(component.onSubmitted.emit).toBeCalledTimes(1);
  });

  it('should call errorState method and return error', () => {
    let data = component.errorState('phone');
    fixture.detectChanges();
    expect(data).toEqual(false);
  });

  it('should trigger keydown event and return true if restrict function is called', () => {
    const select = fixture.debugElement.nativeElement.querySelector(
      '#contact-info-phone-input'
    );
    select.value = String.fromCharCode(8);
    const eventTriggered = select.dispatchEvent(new Event('keydown'));
    fixture.detectChanges();
    expect(eventTriggered).toBeTruthy();
  });

  it('should call restrict and return false to restrict input', () => {
    const event = {
      keyCode: 8,
      preventDefault: jest.fn(),
    };
    const eventTriggered = component.restrict(event);
    fixture.detectChanges();
    expect(eventTriggered).toBeFalsy();
  });

  it('Should set mustMatch error to verifyEmail control when checkEmails custom validation called', () => {
    component.editContactForm.controls.verifyEmail.setErrors(null);
    component.editContactForm.controls.verifyEmail.setValue('test@gmail.com');
    fixture.detectChanges();
    component.checkEmails('email', 'verifyEmail');
    fixture.detectChanges();
    expect(
      component.editContactForm.controls.verifyEmail.errors.mustMatch
    ).toBeTruthy();
  });

  it('should call close function if status is true', () => {
    spyOn(component, 'close');
    component.contactInfoSaveStatus = { status: true };
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.close).toHaveBeenCalled();
  });

  it('should call cancelContactInfoEdit to close the overlay', () => {
    spyOn(component, 'close');
    component.contactInfoSaveStatus = { status: true };
    component.cancelContactInfoEdit();
    fixture.detectChanges();
    expect(component.close).toHaveBeenCalled();
  });
});
