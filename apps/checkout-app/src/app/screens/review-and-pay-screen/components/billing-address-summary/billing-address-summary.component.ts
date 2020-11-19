import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { OverlayService } from '@shared/services/overlay.service';
import { IBillingAddress } from '../../interface';
import { BillingAddressEditComponent } from '../../overlays/billing-address-edit/billing-address-edit.component';
// import { BillingAddressEditComponent } from '../../overlays/billing-address-edit';
@Component({
  selector: 'app-billing-address-summary',
  templateUrl: './billing-address-summary.component.html',
  styleUrls: ['./billing-address-summary.component.scss'],
})
export class BillingAddressSummaryComponent implements OnInit, OnChanges {
  @Input() selectedAddressProfile;
  // @Input() savedBillingAddressData: IBillingAddress[] = [];
  @Input() submittedBillingAddressFormData: any;
  @Output() onSaveBillingAddress: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSubmitSummaryData: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _overlayService: OverlayService,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.selectedAddressProfile) {
      this.onSubmitSummaryData.emit({
        data: this.selectedAddressProfile,
        valid: true,
      });
    }
  }

  ngOnChanges() {
    // TODO check in case of back
    if (this.submittedBillingAddressFormData) {
      this.selectedAddressProfile = this.submittedBillingAddressFormData;
    }
  }

  onEditAddress() {
    const editAddressOverlay: any = this._overlayService.showOverlay(
      BillingAddressEditComponent,
      this._viewContainerRef
    );
    // editAddressOverlay.savedBillingAddressData = this.savedBillingAddressData;
    // editAddressOverlay.submittedBillingAddressFormData = this.submittedBillingAddressFormData;
    editAddressOverlay.selectedAddressProfile = this.selectedAddressProfile;
    editAddressOverlay.onSaveBillingAddress.subscribe((data) => {
      console.log(data);
      this.onSaveBillingAddress.emit(data);
    });
  }
}
