import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Overlay } from '@shared/components';

@Component({
  selector: 'app-billing-address-edit',
  templateUrl: './billing-address-edit.component.html',
})
export class BillingAddressEditComponent extends Overlay implements OnInit {
  @Input() submittedBillingAddressFormData: any;
  @Input() selectedAddressProfile = null;
  @Output() onSaveBillingAddress: EventEmitter<any> = new EventEmitter<any>();
  formSubmitted: any = {
    status: false,
  };
  constructor() {
    super();
  }

  ngOnInit(): void {}

  close() {
    super.close();
  }
  submitBillingAddressForm(event) {
    if (event.valid && this.formSubmitted.status) {
      this.onSaveBillingAddress.emit(event);
      this.close();
    }
  }

  saveAddress() {
    // validate form
    this.formSubmitted = {
      status: true,
    };
  }
}
