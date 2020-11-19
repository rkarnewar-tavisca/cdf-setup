import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { ValidationService } from '@shared/services/validation.service';
import { Actions } from '@ngrx/effects';
import { IAppState } from '../state/app.state';
import {
  ValidateBin,
  ValidateBinFailure,
  ValidateBinSuccess,
} from '../actions/review-and-pay.actions';
import { cold, hot } from 'jasmine-marbles';
import { ValidationEffects } from './validation.effects';

describe('ValidationEffects', () => {
  let actions$: Observable<any>;
  let effects: ValidationEffects;
  let mockStore: MockStore<IAppState>;
  let validationService: any;

  const mockData = {
    errorCode: '',
    isValidBin: true,
    message: 'Bin validation was successful',
  };

  beforeEach(() => {
    jest.setTimeout(10000);
    TestBed.configureTestingModule({
      providers: [
        ValidationEffects,
        Actions,
        {
          provide: ValidationService,
          useValue: {
            validateBin: jest.fn(),
          },
        },
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} }),
      ],
    });

    effects = TestBed.inject(ValidationEffects);
    mockStore = TestBed.inject(MockStore);
    validationService = TestBed.inject(ValidationService);
  });

  test('should be created', () => {
    expect(effects).toBeTruthy();
  });

  test('should return a bin validation details stream with ValidateBin action', () => {
    const binResponse = mockData;
    const req = {
      request: {
        cardNumber: '123',
        isAgent: false,
      },
    };
    const action = new ValidateBin(req);
    const outcome = new ValidateBinSuccess(binResponse);

    // Dispatch ValidateBin action after 10 frames
    actions$ = hot('-a', { a: action });
    const response = cold('-a|', { a: binResponse });
    const expected = cold('--b', { b: outcome });
    validationService.validateBin.mockReturnValue(response);
    expect(effects.validateBin$).toBeObservable(expected);
  });

  test('should return a ValidateBinFailure action on failure', () => {
    const req = {
      request: {
        cardNumber: '123',
        isAgent: false,
      },
    };
    const action = new ValidateBin(req);
    const error = new Error();
    const outcome = new ValidateBinFailure(error);

    // Dispatch GetCartDetail action
    actions$ = hot('-a', { a: action });
    const response = cold('-#|', {}, error);
    const expected = cold('--(b|)', { b: outcome });
    validationService.validateBin.mockReturnValue(response);
    expect(effects.validateBin$).toBeObservable(expected);
  });
});
