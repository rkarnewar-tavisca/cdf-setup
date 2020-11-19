import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FrameLoaderComponent } from './frame-loader.component';
import { filter } from 'rxjs/operators';

describe('FrameLoaderComponent', () => {
  let component: FrameLoaderComponent;
  let fixture: ComponentFixture<FrameLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FrameLoaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen to onActivate event', (done) => {
    const message = { type: 'onActivate', body: {} };
    component.ngOnInit();

    window.postMessage(message, '*');
    component.onActivation
      .pipe(filter((val) => val !== null))
      .subscribe((res) => {
        expect(res).toEqual(message);
        done();
      });
  });

  it('should listen to onTokenize event', (done) => {
    const message = { type: 'onTokenize', body: { token: '12345' } };
    component.ngOnInit();

    window.postMessage(message, '*');
    component.onTokenize
      .pipe(filter((val) => val !== null))
      .subscribe((res) => {
        expect(res).toEqual(message.body);
        done();
      });
  });

  it('should listen to onBlur event', (done) => {
    const message = { type: 'onBlur', body: { maskedNumber: '****' } };
    component.ngOnInit();

    window.postMessage(message, '*');
    component.onBlur.pipe(filter((val) => val !== null)).subscribe((res) => {
      expect(res).toEqual(message.body);
      done();
    });
  });

  it('should listen to onKeyup event', (done) => {
    const message = { type: 'onKeyup', body: '*' };
    component.ngOnInit();

    window.postMessage(message, '*');
    component.onKeyup.pipe(filter((val) => val !== null)).subscribe((res) => {
      expect(res).toEqual(message.body);
      done();
    });
  });
  it('should update card details', () => {
    const mockedPostMessage = jest.fn();
    const originalDocument = { ...document };
    const documentSpy = jest.spyOn(global, 'document', 'get');

    documentSpy.mockImplementation(() => ({
      ...originalDocument,
      getElementById: jest.fn().mockImplementation(() => ({
        contentWindow: {
          postMessage: mockedPostMessage,
        },
      })),
    }));
    component.updateCardDetail({ cardNumber: '', cardType: '' });
    expect(mockedPostMessage).toHaveBeenCalled();

    documentSpy.mockRestore();
  });

  it('should return void if updateCardDetail is called with null', () => {
    const outcome = component.updateCardDetail(null);
    expect(outcome).toEqual(undefined);
  });

  it('should set defaults', () => {
    const mockedPostMessage = jest.fn();
    const originalDocument = { ...document };
    const documentSpy = jest.spyOn(global, 'document', 'get');

    documentSpy.mockImplementation(() => ({
      ...originalDocument,
      getElementById: jest.fn().mockImplementation(() => ({
        contentWindow: {
          postMessage: mockedPostMessage,
        },
      })),
    }));
    component.setDefaults({
      label: 'Card number',
      transitCode: '465487545646456',
    });
    expect(mockedPostMessage).toHaveBeenCalled();
    documentSpy.mockRestore();
  });

  it('should inject styles', () => {
    const mockedPostMessage = jest.fn();
    const originalDocument = { ...document };
    const documentSpy = jest.spyOn(global, 'document', 'get');

    documentSpy.mockImplementation(() => ({
      ...originalDocument,
      getElementById: jest.fn().mockImplementation(() => ({
        contentWindow: {
          postMessage: mockedPostMessage,
        },
      })),
    }));
    component.injectStyles();
    expect(mockedPostMessage).toHaveBeenCalled();
    documentSpy.mockRestore();
  });
});
