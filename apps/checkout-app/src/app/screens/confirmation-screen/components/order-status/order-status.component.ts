import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { OverlayService } from '@shared/services/overlay.service';
import { ShareItineraryComponent } from '@shared/components/overlays/share-itinerary/share-itinerary.component';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
})
export class OrderStatusComponent implements OnInit, OnChanges {
  @Input() orderSummaryDetail = {
    orderStatus: null,
    cartDetails: null,
    trackingId: null,
  };
  @Input('maxEmailsAllowed') maxEmailsAllowed = 1;
  @Output() shareEmails: EventEmitter<any> = new EventEmitter<any>();
  @Input() shareEmailStatus: {
    status: boolean;
    message?: string;
    errorResponse?: any;
  };
  CHECKOUT_CONST = CHECKOUT_CONST;
  viewModel: any = {
    shareEmailOverlayInstance: null,
    todaysDate: new Date(),
  };

  constructor(
    private _overlayService: OverlayService,
    private readonly _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.shareEmailStatus) {
      this.viewModel.shareEmailOverlayInstance.shareEmailStatus = this.shareEmailStatus;
      this.viewModel.shareEmailOverlayInstance.ngOnChanges();
    }
  }

  onClickOnLinks(linkId: string) {
    this.openOverlay(linkId);
  }

  openOverlay(overlayName: string) {
    switch (overlayName) {
      case 'share-itinerary':
        this.viewModel.shareEmailOverlayInstance = this._overlayService.showOverlay(
          ShareItineraryComponent,
          this._viewContainerRef
        );
        this.viewModel.shareEmailOverlayInstance.maxEmailsAllowed = this.maxEmailsAllowed;
        this.viewModel.shareEmailOverlayInstance.shareEmails.subscribe(
          (data: any) => {
            this.shareEmails.emit(data);
          }
        );
        break;
      default:
        return null;
    }
  }
}
