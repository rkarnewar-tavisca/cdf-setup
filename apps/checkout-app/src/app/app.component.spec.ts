/**
 * NOTE : There are some JEST issue occures while running below test cases.
 *        This issue has been already raised to orxe team.
 *        So to avoid error we have commented below code and added dummy fake test case which always shows positive result.
 *        Once issue has been solved we can uncomment this code and remove dummy test case.
 */



import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@core/core.module';
import { CultureModule } from '@orxe-culture/angular';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService } from './shared/services/cart.service';
import Cart from '@orxe-checkout-sdk/cart';
import { HttpClientModule } from '@angular/common/http';
import { Logger } from '@orxe-sdk/logging';
import { CheckoutService } from '@shared/services/checkout.service';


fdescribe('AppComponent', () => {
  let component: AppComponent;
  let dom: any;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, CoreModule, CultureModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: CartService,
          useValue: {
            getCart: jest.fn().mockReturnValue('test'),
          },
        },
        {
          provide: Cart,
        },
        {
          provide: CheckoutService,
          useValue: {
            setHeaders: jest.fn().mockReturnValue('test'),
          },
        },
      ],
    });
    Logger.init = jest.fn().mockImplementation(() => {});
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    dom = fixture.nativeElement;
  }));

  test('App component should exist', () => {
    fixture.detectChanges();
    expect(component).toBeDefined();
  });
});
