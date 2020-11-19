import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingScreenRoutingModule } from './landing-screen-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CultureModule } from '@orxe-culture/angular';
import { containers } from './containers/index';
import { components } from './components/index';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    LandingScreenRoutingModule,
    SharedModule,
    CultureModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LandingScreenModule { }
