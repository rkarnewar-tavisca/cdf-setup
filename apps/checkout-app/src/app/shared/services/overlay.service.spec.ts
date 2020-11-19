import { TestBed } from '@angular/core/testing';

import { OverlayService } from './overlay.service';
import {
  ViewContainerRef,
  CUSTOM_ELEMENTS_SCHEMA,
  Component
} from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RemoveHotelOverlayComponent } from '../components/overlays/remove-hotel-overlay/remove-hotel-overlay.component';
// import { PaymentOptionsOverlayComponent } from '../components/overlays/payment-options-overlay/payment-options-overlay.component';

@Component({
  selector: 'app-mock-component',
  template: `
    <div></div>
  `
})
export class MockComponent {
  constructor(private readonly _viewContainerRef: ViewContainerRef) {}
}

describe('OverlayService', () => {
  let service: OverlayService;
  let viewContainerRef: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveHotelOverlayComponent, MockComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [RemoveHotelOverlayComponent]
      }
    });
    service = TestBed.inject(OverlayService);
    const fixture = TestBed.createComponent(MockComponent);
    viewContainerRef = fixture.debugElement.injector.get(ViewContainerRef);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test(`should render overlay component on document`, () => {
    service.showOverlay(RemoveHotelOverlayComponent, viewContainerRef);
    const overlayElement: HTMLCollection = document.getElementsByTagName(
      'remove-hotel-overlay'
    );
    expect(overlayElement.length).toEqual(1);
  });
});
