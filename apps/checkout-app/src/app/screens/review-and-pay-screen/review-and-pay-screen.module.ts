import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewAndPayScreenRoutingModule } from './review-and-pay-screen-routing.module';
import { CultureModule } from '@orxe-culture/angular';
import { SharedModule } from '@shared/shared.module';
import { containers } from './containers';
import { components } from './components';
import { ReviewAndPayService } from './services/review-and-pay-screen.service';
import { overlays } from './overlays/';

@NgModule({
  declarations: [...containers, ...components, ...overlays],
  imports: [
    CommonModule,
    ReviewAndPayScreenRoutingModule,
    SharedModule,
    CultureModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[ReviewAndPayService]
})
export class ReviewAndPayScreenModule {}
