import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInputComponent } from './email-input.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrxeFormsModule } from '@orxe-angular/forms';

describe('EmailInputComponent', () => {
  let component: EmailInputComponent;
  let fixture: ComponentFixture<EmailInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailInputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule, CultureModule, FormsModule, CommonModule, OrxeFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create email input component', () => {
    expect(component).toBeTruthy();
  });

  it('should set errorState false when email is valid', () => {
    component.emailInputForm.controls.email.setValue('test@gmail.com');
    component.onInputChange('event');
    expect(component.errorState).toBe(false);
  });

  it('should set errorState true when email is invalid', () => {
    component.emailInputForm.controls.email.setValue('test');
    component.onInputChange('event');
    expect(component.errorState).toBe(true);
  });

  it('should emit event when onClickClose method called', () => {
    const spy = spyOn(component.removeInput,'emit')
    component.onClickClose();
    expect(spy).toHaveBeenCalled();
  });

  it('should remain errorState as it is false when onInputBlur method called with other value', () => {
    component.onInputBlur('event');
    expect(component.errorState).toBe(false);
  });

  it('should set errorState true when email is invalid', () => {
    component.onInputBlur({details:''});
    expect(component.errorState).toBe(false);
  });

  it('should render email input element', () => {
    const inputElement = fixture.debugElement.nativeElement.querySelector('orxe-input');
    expect(inputElement).toBeTruthy();
  });

});
