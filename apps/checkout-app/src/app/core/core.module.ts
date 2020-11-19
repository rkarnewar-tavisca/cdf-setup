import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from '@store/effects/user.effects';
import { metaReducers } from '@store/meta-reducers/index';
import { appReducers } from '@store/reducers/app.reducers';
import { UserService, UserSessionService } from './services';
import { CartEffects } from '@store/effects/cart.effects';
import { OrderEffect } from '@store/effects/order.effects';
import { ValidationEffects } from '../core/store/effects/validation.effects';
// Used while logging
const MICROAPP_TAG = 'CHECKOUT-MICROAPP_MICROAPP';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot([
      UserEffects,
      CartEffects,
      OrderEffect,
      ValidationEffects
    ]),
    StoreDevtoolsModule.instrument({
      name: MICROAPP_TAG,
      logOnly: environment.production,
    }),
  ],
  providers: [UserService, UserSessionService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in AppModule only.'
      );
    }
  }
}
