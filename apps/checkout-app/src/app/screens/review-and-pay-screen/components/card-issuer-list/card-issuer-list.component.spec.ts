import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultureModule } from '@orxe-culture/angular';
import { CHECKOUT_CONST } from '@shared/constants';

import { CardIssuerListComponent } from './card-issuer-list.component';

describe('CardIssuerListComponent', () => {
  let component: CardIssuerListComponent;
  let fixture: ComponentFixture<CardIssuerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardIssuerListComponent],
      imports: [
        CultureModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIssuerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should resolve card type image when allowed cards are provided', () => {
    component.allowedCardTypes = CHECKOUT_CONST.ALLOWED_CARDS;
    const spy = jest.spyOn(component, 'resolveCardImages');
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.allowedCardImages).toBeDefined();
    expect(component.allowedCardImages.length).toEqual(CHECKOUT_CONST.ALLOWED_CARDS.length);
    const cardLogos = fixture.debugElement.nativeElement.querySelector(
      '.card-issuer__logo'
    );
    expect(cardLogos).toBeTruthy();
    console.log(cardLogos);
  });

  it('should not resolve card type image when allowed cards are empty', () => {
    component.allowedCardTypes = [];
    const spy = jest.spyOn(component, 'resolveCardImages');
    component.ngAfterViewInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(component.allowedCardImages.length).toEqual(0);
  });

  it('should check reward-card__note to be renderd', () => {
    const rewardCardNote = fixture.debugElement.nativeElement.querySelector(
      '.reward-card__note'
    );
    expect(rewardCardNote).toBeTruthy();
  });
});
