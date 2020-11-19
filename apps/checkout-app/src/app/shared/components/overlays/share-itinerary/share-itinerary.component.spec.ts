import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareItineraryComponent } from './share-itinerary.component';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import Cart from '@orxe-checkout-sdk/cart';
import { LoadEmailInputService } from '../../../services/load-email-input.service';
import { Observable } from 'rxjs';

describe('ShareItineraryComponent', () => {
  let component: ShareItineraryComponent;
  let fixture: ComponentFixture<ShareItineraryComponent>;
  let emailLoaderService: LoadEmailInputService;
  const singleInstanceArr = [{ inputData: { value: 'test', status: 'VALID' } }];
  const multipleInstanceArr = [
    { inputData: { value: 'test', status: 'VALID' } },
    { inputData: { value: 'test', status: 'VALID' } },
  ];

  const mockComponent = {
    removeInput: new Observable(),
    valueChanged: new Observable(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareItineraryComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CultureModule],
      providers: [
        {
          provide: Cart,
        },
        {
          provide: LoadEmailInputService,
          useValue: {
            showEmailInput: jest.fn().mockReturnValue(mockComponent),
          },
        },
      ],
    }).compileComponents();
    emailLoaderService = TestBed.inject(LoadEmailInputService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create share itinerary component', () => {
    expect(component).toBeTruthy();
  });

  it('should change the btnDisableFlag to false when emails is valid', () => {
    component.instanceArr = singleInstanceArr;
    component.checkInputValidity();
    expect(component.btnDisableFlag).toBe(false);
  });

  it('should change the btnDisableFlag to true when email is invalid', () => {
    singleInstanceArr[0].inputData.value = '';
    component.instanceArr = singleInstanceArr;
    component.checkInputValidity();
    expect(component.btnDisableFlag).toBe(true);
  });

  it('should change the btnDisableFlag to false when multiple emails is valid', () => {
    component.instanceArr = multipleInstanceArr;
    component.checkInputValidity();
    expect(component.btnDisableFlag).toBe(false);
  });

  it('should change the btnDisableFlag to false when multiple emails is valid and some of them are empty', () => {
    multipleInstanceArr[0].inputData.value = '';
    component.instanceArr = multipleInstanceArr;
    component.checkInputValidity();
    expect(component.btnDisableFlag).toBe(false);
  });

  it('should change the btnDisableFlag to true when one of multiple emails is invalid', () => {
    multipleInstanceArr[0].inputData.status = 'INVALID';
    component.instanceArr = multipleInstanceArr;
    component.checkInputValidity();
    expect(component.btnDisableFlag).toBe(true);
  });

  it('should set the count of inputs to 1 when close method called', () => {
    component.close();
    expect(emailLoaderService.count).toBe(1);
  });

  it('should called add method when onClickAddBtn method has been called', () => {
    const spy = spyOn(component, 'add');
    component.onClickAddBtn();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit the shareEmails event when onClickShareBtn method has been called', () => {
    component.instanceArr = multipleInstanceArr;
    const spy = spyOn(component.shareEmails, 'emit');
    component.onClickShareBtn();
    expect(spy).toHaveBeenCalled();
  });

  it('should call the checkInputValidity method when removeInput method called with key', () => {
    const spy = spyOn(component, 'checkInputValidity');
    component.instanceArr = multipleInstanceArr;
    component.removeInput(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call the checkInputValidity method when removeInput method called with key greater than 1', () => {
    const spy = spyOn(component, 'checkInputValidity');
    component.instanceArr = multipleInstanceArr;
    component.removeInput(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should render add another email link button', () => {
    component.instanceArr = [1, 2, 3, 4];
    component.maxEmailsAllowed = 5;
    fixture.detectChanges();
    const addEmailLink = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#add-email-link'
    );
    expect(addEmailLink).toBeTruthy();
  });

  it('should call onClickAddBtn method when user click on add another email link', () => {
    component.instanceArr = [1, 2, 3, 4];
    component.maxEmailsAllowed = 5;
    fixture.detectChanges();
    const spy = spyOn(component, 'onClickAddBtn');
    const addEmailLink = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#add-email-link'
    );
    addEmailLink.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should render cancel button', () => {
    const cancelBtn = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#cancel-btn'
    );
    expect(cancelBtn).toBeTruthy();
  });

  it('should call close method when user click on cancel button', () => {
    const spy = spyOn(component, 'close');
    const cancelBtn = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#cancel-btn'
    );
    cancelBtn.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should render share button', () => {
    const shareBtn = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#share-btn'
    );
    expect(shareBtn).toBeTruthy();
  });

  it('should call onClickShareBtn method when user click on share button', () => {
    const spy = spyOn(component, 'onClickShareBtn');
    const shareBtn = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#share-btn'
    );
    shareBtn.click();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
