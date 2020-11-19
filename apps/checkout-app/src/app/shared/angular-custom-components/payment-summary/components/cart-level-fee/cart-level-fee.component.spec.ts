import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultureModule, CultureService } from '@orxe-culture/angular';

import { CartLevelFeeComponent } from './cart-level-fee.component';

describe('CartLevelFeeComponent', () => {
  let component: CartLevelFeeComponent;
  let fixture: ComponentFixture<CartLevelFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartLevelFeeComponent ],
      imports: [CultureModule],
      providers: [
        {
          provide: CultureService,
          useValue: {
            orxeTranslate: jest.fn().mockReturnValue('total'),
          },
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLevelFeeComponent);
    component = fixture.componentInstance;
    component.cartDetails = require('../../../../../../assets/mock/get-cart.json');
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call calculateCartFee and return totalCartFee', () => {
    expect(component.totalCartFee.amount).toBe(200);
    expect(component.totalCartFee.points).toBe(1000);
  });
  it('should create HTML and display fee', () => {
    const cartFee = fixture.debugElement.nativeElement.querySelector('div#cartFee');
    expect(cartFee).toBeTruthy();
  });
});
