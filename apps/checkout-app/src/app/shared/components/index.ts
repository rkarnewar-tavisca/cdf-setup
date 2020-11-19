import { CheckoutHeaderComponent } from './checkout-header/checkout-header.component';
import { CrossSaleComponent } from './cross-sale/cross-sale.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { ClientProgramFeeComponent } from './client-program-fee/client-program-fee.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ProductPlaceholderComponent } from './product-placeholder/product-placeholder.component';
import { InsurancePlaceholderComponent } from './insurance-placeholder/insurance-placeholder.component';
import { ClientFeeCardComponent } from './client-fee-card/client-fee.component';

// Import Overlay Components - Starts
import { CancelHotelOverlayComponent } from './overlays/cancel-hotel-overlay/cancel-hotel-overlay.component';
import { RemoveHotelOverlayComponent } from './overlays/remove-hotel-overlay/remove-hotel-overlay.component';
import { PolicyOverlayComponent } from './overlays/policy-overlay/policy-overlay.component';
import { RedeemPointsOverlayComponent } from './overlays/redeem-points-overlay/redeem-points-overlay.component';
import { ShareItineraryComponent } from './overlays/share-itinerary/share-itinerary.component';
import { EmailInputComponent } from './overlays/share-itinerary/components/email-input/email-input.component';
import { ContactInfoEditOverlayComponent } from './overlays/contact-info-edit-overlay/contact-info-edit-overlay.component';
// Import Overlay Components - Ends

export const SHARED_COMPONENTS = [
  CheckoutHeaderComponent,
  CrossSaleComponent,
  SkeletonLoaderComponent,
  ClientProgramFeeComponent,
  ContactInfoComponent,
  ProductPlaceholderComponent,
  InsurancePlaceholderComponent,
  ClientFeeCardComponent
];

export const OVERLAY_COMPONENTS = [
  CancelHotelOverlayComponent,
  RemoveHotelOverlayComponent,
  PolicyOverlayComponent,
  RedeemPointsOverlayComponent,
  ShareItineraryComponent,
  EmailInputComponent,
  RedeemPointsOverlayComponent,
  ContactInfoEditOverlayComponent
];

export * from './skeleton-loader/skeleton-loader.component';
export * from './overlays/overlay';
