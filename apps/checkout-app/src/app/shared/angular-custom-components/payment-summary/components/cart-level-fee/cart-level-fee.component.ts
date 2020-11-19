import { Component, OnInit, Input } from '@angular/core';
import { CartDetails } from '../../interface/cart-details';

@Component({
  selector: 'app-cart-level-fee',
  templateUrl: './cart-level-fee.component.html',
  styleUrls: ['./cart-level-fee.component.scss'],
})
export class CartLevelFeeComponent implements OnInit {
  @Input() cartDetails: CartDetails;
  totalCartFee = {
    amount: 0,
    points: 0,
  };
  constructor() {}

  ngOnInit(): void {
    this.calculateCartFee(this.cartDetails?.items);
  }

  calculateCartFee(cartItems) {
    if (cartItems?.length > 0) {
      cartItems.forEach((item) => {
            this.totalCartFee.amount += (item?.sellingPrice?.breakup?.rewardFee?.amount)? item?.sellingPrice?.breakup?.rewardFee?.amount: 0;
            this.totalCartFee.points += (item?.sellingPrice?.breakup?.rewardFee?.points)? item?.sellingPrice?.breakup?.rewardFee?.points: 0;
          });
    }
  }
}
