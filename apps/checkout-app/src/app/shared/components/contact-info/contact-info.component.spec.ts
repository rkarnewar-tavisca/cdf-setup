import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoComponent } from './contact-info.component';
import { CUSTOM_ELEMENTS_SCHEMA, ViewContainerRef } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { CoreModule } from '@core/core.module';
import { CartService } from '@shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpClientModule } from '@angular/common/http';
import { OverlayService } from '@shared/services/overlay.service';
import { Observable } from 'rxjs';

describe('ContactInfoComponent', () => {
  let component: ContactInfoComponent;
  let fixture: ComponentFixture<ContactInfoComponent>;
  let mockComponentObject = {
    contactDetail: { phone: '1234567890' },
    onSubmitted: new Observable(null),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactInfoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CoreModule, CultureModule, HttpClientModule],
      providers: [
        {
          provide: CartService,
        },
        {
          provide: Cart,
        },
        {
          provide: OverlayService,
          useValue: {
            showOverlay: jest.fn().mockReturnValue(mockComponentObject),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoComponent);
    component = fixture.componentInstance;
    component.viewModel = {
      editContactInfoOverlayInstance: {
        ngOnChanges: jest.fn(),
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onEditContactInfo', () => {
    spyOn(component, 'onEditContactInfo');
    component.onEditContactInfo();
    fixture.detectChanges();
    expect(component.onEditContactInfo).toHaveBeenCalled();
  });

  it('should set the contactInfo as input when onEditContactInfo method called', () => {
    component.contactInfo = { phone: '1234567890' };
    component.onEditContactInfo();
    fixture.detectChanges();
    expect(component.contactInfo).toBe(mockComponentObject.contactDetail);
  });

  it('should get contact-info--heading from span and its class', () => {
    const paymentSummaryHeading = fixture.debugElement.nativeElement.querySelector(
      '#contact-info--heading'
    );
    expect(
      paymentSummaryHeading.classList.contains('container__contact-info__title')
    ).toBeTruthy();
  });

  it('should call ngOnChanges function if contactInfoSaveStatus status is true', () => {
    component.contactInfoSaveStatus = { status: true };
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      component.viewModel.editContactInfoOverlayInstance.ngOnChanges
    ).toHaveBeenCalled();
  });

  // it('should emit the onSubmitted event when onSubmitted event triggered from overlay', () => {
  //   component.contactInfo = { phone: '1234567890' };
  //   spyOn(component.onSubmitted, 'emit');
  //   component.onEditContactInfo();
  //   fixture.detectChanges();
  //   expect(component.onSubmitted.emit).toHaveBeenCalled();
  //   expect(component.onSubmitted.emit).toBeCalledTimes(1);
  // });
});
