import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, NgZone, APP_INITIALIZER } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { environment } from '@env/environment';
import { CultureModule } from '@orxe-culture/angular';
import { SharedModule } from '@shared/shared.module';
import Cart from '@orxe-checkout-sdk/cart';
import { XhrInterceptor } from '@shared/utils/http-interceptor';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutService } from '@shared/services/checkout.service';
import { AppState } from '@orxe-sdk/app-state';

if (environment.mock) {
  XhrInterceptor.intercept();
}

export function getProductSettings(_checkoutService: CheckoutService) {
  _checkoutService.getSettings().subscribe((res) => {
    AppState.set('settings', res);
  });
  return () => _checkoutService.getSettings();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CultureModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: Cart,
      useFactory: () => Cart.getInstance(environment.baseUrl, environment.shellBaseUrl),
    },
    {
      provide: APP_INITIALIZER,
      useFactory: getProductSettings,
      multi: true,
      deps: [CheckoutService],
    },
  ],
  bootstrap: !environment.production ? [AppComponent] : [AppComponent],
  entryComponents: !environment.production ? [] : [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector, private ngZone: NgZone) {
    (window as any).ngZone = this.ngZone;
  }

  ngDoBootstrap() {
    const elm = createCustomElement(AppComponent, {
      injector: this.injector,
    }) as any;
    customElements.define('orxe-checkout-app', elm);
  }
}
