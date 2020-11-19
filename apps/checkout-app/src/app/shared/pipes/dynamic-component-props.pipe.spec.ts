import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppState } from '@orxe-sdk/app-state';
import { Observable } from 'rxjs';
import { IAppState } from '../../core/store/state/app.state';
import { CheckoutService } from '../services/checkout.service';
import { DynamicComponentPropsPipe } from './dynamic-component-props.pipe';
describe('DynamicComponentPropsPipe', () => {
  beforeAll(() => {
    AppState.init();
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [],
      providers: [
        {
          provide: CheckoutService,
        },
        {
          provide: Store,
          useValue: {
            pipe: jest.fn().mockReturnValue(new Observable()),
          },
        },
      ],
    }).compileComponents();
  }));

  it('create an instance', inject(
    [Store, CheckoutService],
    (_store: Store<IAppState>, _checkoutService: CheckoutService) => {
      const pipe = new DynamicComponentPropsPipe(_store, _checkoutService);
      expect(pipe).toBeTruthy();
    }
  ));

  it('should check an transform function', inject(
    [Store, CheckoutService],
    (_store: Store<IAppState>, _checkoutService: CheckoutService) => {
      const pipe = new DynamicComponentPropsPipe(_store, _checkoutService);
      const response = pipe.transform(
        { productId: 123 },
        { default: [], initial: ['productId', 'profiles'] }
      );
      expect(JSON.parse(response)).toEqual({
        productId: 123,
        profiles: [],
      });
    }
  ));
});
