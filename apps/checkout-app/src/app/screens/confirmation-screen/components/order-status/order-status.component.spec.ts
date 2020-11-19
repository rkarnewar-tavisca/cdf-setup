import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStatusComponent } from './order-status.component';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  ViewContainerRef,
} from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';
import { OverlayService } from '@shared/services/overlay.service';
import { Observable } from 'rxjs';
import Cart from '@orxe-checkout-sdk/cart';
import { CHECKOUT_CONST } from '@shared/constants';

describe('OrderStatusComponent', () => {
  let component: OrderStatusComponent;
  let fixture: ComponentFixture<OrderStatusComponent>;
  let overlayService: OverlayService;
  let viewContainerRef: ViewContainerRef;
  let mockComponentObject = {
    maxEmailsAllowed: 2,
    shareEmails: new Observable(),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderStatusComponent],
      imports: [CultureModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
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
    overlayService = TestBed.inject(OverlayService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStatusComponent);
    component = fixture.componentInstance;
    component.viewModel = {
      shareEmailOverlayInstance: {
        ngOnChanges: jest.fn(),
      },
    };
    viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
    fixture.detectChanges();
  });

  it('should create order-status component', () => {
    expect(component).toBeTruthy();
  });

  it('should call openOverlay method when onClickOnLinks method invoked with link', () => {
    const spy = spyOn(component, 'openOverlay');
    component.onClickOnLinks('share-itinerary');
    expect(spy).toHaveBeenCalled();
  });

  it('should update the max number of email input when openOverlay method called', () => {
    component.openOverlay('share-itinerary');
    fixture.detectChanges();
    expect(component.maxEmailsAllowed).toBe(
      mockComponentObject.maxEmailsAllowed
    );
  });

  it('should return null when openOverlay method called with other string than overlay', () => {
    const result = component.openOverlay('default');
    fixture.detectChanges();
    expect(result).toBe(null);
  });

  it('should check share itinerary button renderd successfully when booking status is true', () => {
    component.orderSummaryDetail.orderStatus =
      CHECKOUT_CONST.ORDER_CONFIRMED_STATUS;
    fixture.detectChanges();
    const shareEmailLink = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#confirmation-share-itinerary-btn'
    );
    expect(shareEmailLink).toBeTruthy();
  });

  it('should call onClickOnLinks when user click on share itinerary', () => {
    const spy = spyOn(component, 'onClickOnLinks');
    component.orderSummaryDetail.orderStatus =
      CHECKOUT_CONST.ORDER_CONFIRMED_STATUS;
    fixture.detectChanges();
    const shareEmailLink = fixture.debugElement.nativeElement.querySelector(
      'orxe-button#confirmation-share-itinerary-btn'
    );
    shareEmailLink.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should call ngOnChanges function if shareEmailStatus status is true', () => {
    component.shareEmailStatus = { status: true };
    component.ngOnChanges();
    fixture.detectChanges();
    expect(
      component.viewModel.shareEmailOverlayInstance.ngOnChanges
    ).toHaveBeenCalled();
  });
});
