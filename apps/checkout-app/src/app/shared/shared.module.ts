import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_COMPONENTS, OVERLAY_COMPONENTS } from './components';
import { CultureModule } from '@orxe-culture/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';
import { PaymentSummaryModule } from './angular-custom-components/payment-summary/payment-summary.module';
import { TimelineModule } from './angular-custom-components/timeline/timeline.module';
import { ThemeModule } from './theme.module';

const ANGULAR_CUSTOM_COMPONENTS_LIST = [PaymentSummaryModule, TimelineModule];

@NgModule({
  declarations: [...SHARED_COMPONENTS, ...OVERLAY_COMPONENTS],
  imports: [
    CommonModule,
    CultureModule,
    ...ANGULAR_CUSTOM_COMPONENTS_LIST,
    FormsModule,
    ReactiveFormsModule,
    OrxeFormsModule,
    ThemeModule,
  ],
  exports: [
    ...SHARED_COMPONENTS,
    ...ANGULAR_CUSTOM_COMPONENTS_LIST,
    ReactiveFormsModule,
    OrxeFormsModule,
    ThemeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
