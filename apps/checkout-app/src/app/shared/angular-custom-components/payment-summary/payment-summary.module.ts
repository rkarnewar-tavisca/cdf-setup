import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CultureModule } from '@orxe-culture/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';
import { components } from './components/index';
import { PaymentSummaryComponent } from './payment-summary.component';
import { ThemeModule } from '../../theme.module';

@NgModule({
  declarations: [PaymentSummaryComponent, ...components],
  imports: [
    CommonModule,
    CultureModule,
    ReactiveFormsModule,
    FormsModule,
    OrxeFormsModule,
    ThemeModule,
  ],
  exports: [PaymentSummaryComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaymentSummaryModule {}
