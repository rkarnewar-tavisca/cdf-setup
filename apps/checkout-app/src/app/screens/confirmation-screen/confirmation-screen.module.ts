import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationScreenRoutingModule } from './confirmation-screen-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CultureModule } from '@orxe-culture/angular';
import { containers } from './containers';
import { components } from './components';

@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    ConfirmationScreenRoutingModule,
    SharedModule,
    CultureModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfirmationScreenModule {}
