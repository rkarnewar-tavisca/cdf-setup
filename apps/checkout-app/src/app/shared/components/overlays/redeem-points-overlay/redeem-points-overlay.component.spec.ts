import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemPointsOverlayComponent } from './redeem-points-overlay.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RedeemPointsOverlayComponent', () => {
  let component: RedeemPointsOverlayComponent;
  let fixture: ComponentFixture<RedeemPointsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedeemPointsOverlayComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemPointsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test(`should render title 'Payment options'`, () => {
    const element = fixture.nativeElement;
    const titleElement = element.querySelector('.overlay-title');
    const expectedTitle = 'Payment options';
    expect(titleElement.textContent.trim()).toEqual(expectedTitle.trim());
  });

  test(`should render heading as 'How many points would you like to redeem?'`, () => {
    const headingElement = fixture.nativeElement.querySelector(
      '.overlay-heading'
    );
    const expectedHeading = 'How many points would you like to redeem?';
    expect(headingElement.textContent).toEqual(expectedHeading);
  });

  test(`should set isOpen to false when we cancels redemption `, () => {
    component.cancelRedemption();
    expect(component.isOpen).toBeFalsy();
  });
});
