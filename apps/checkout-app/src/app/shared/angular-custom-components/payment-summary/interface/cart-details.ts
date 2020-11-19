export interface CartDetails {
  id: string;
  currency: string;
  pointsType?: string;
  items: CartItem[];
  price: CartPrice | any;
  chargePrice: ChargePrice | any;
  createdAtUtc: string;
  updatedAtUtc: string;
  productsList: CartItem[];
  addOnProductsList?: CartItem[];
}

interface CartPrice {
  amount: number;
  points: number;
  breakup?: {
    fees: FeesWithWaivedComponent[] | [];
    offers: PriceAdjustment[];
    adjustments?: PriceAdjustment[];
    paymentOptions: PaymentOptions[];
  };
}

interface ChargePrice {
  currency: string;
  amount: number;
  points: number;
}

interface CostPrice {
  amount?: number;
  amountWithoutTax?: number;
}

interface SellingPrice {
  amount: number;
  points: number;
  breakup?: SellingPriceBreakup | any;
}

interface SellingPriceBreakup {
  paymentOptions?: PaymentOptions[];
  rewardFee: FeesWithWaivedComponent;
  offers: PriceAdjustment[] | [];
  adjustments: PriceAdjustment | any;
}

interface PaymentOptions {
  id: string;
  rewardId: string;
  amount?: number;
  points?: number;
}

interface CartItem {
  id: string;
  productId: string;
  productType: string;
  dependsOn?: {
    itemRefId: string;
  };
  costPrice: CostPrice;
  sellingPrice: SellingPrice;
  productDetailsLink: string;
}

interface PriceAdjustment {
  id: string;
  type: string;
  desc?: string;
  amount?: number;
  points?: number;
  refId?: string;
}

interface WaivedComponent {
  desc?: string;
  amount: number;
  points: number;
}

interface FeesWithWaivedComponent extends PriceAdjustment {
  waivedComponent: WaivedComponent;
}
