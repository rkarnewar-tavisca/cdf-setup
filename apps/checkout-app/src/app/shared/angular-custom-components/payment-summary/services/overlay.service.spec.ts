import { TestBed } from '@angular/core/testing';
import { CultureModule } from '@orxe-culture/angular';
import { OverlayService } from './overlay.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';
import {
  ViewContainerRef,
  CUSTOM_ELEMENTS_SCHEMA,
  Component
} from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { PromoCodeOverlayComponent } from '../overlays/promo-code-overlay/promo-code-overlay.component';
import Cart from '@orxe-checkout-sdk/cart';

@Component({
  selector: 'app-mock-component',
  template: `
    <div></div>
  `
})
export class OverlayMock {
  constructor(private readonly _viewContainerRef: ViewContainerRef) {}
}

describe('OverlayService', () => {
  let service: OverlayService;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromoCodeOverlayComponent, OverlayMock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        CultureModule,
        OrxeFormsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: Cart
        }
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [PromoCodeOverlayComponent]
      }
    });
    service = TestBed.inject(OverlayService);
    const fixture = TestBed.createComponent(OverlayMock);
    viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
  });

  test('should be created OverlayService', () => {
    expect(service).toBeTruthy();
  });

  test(`should render overlay component on document`, () => {
    service.showOverlay(PromoCodeOverlayComponent, viewContainerRef);
    const overlayElement: HTMLCollection = document.getElementsByTagName(
      'promo-code-overlay'
    );
    expect(overlayElement.length).toEqual(1);
  });
});
