import {
  Component,
  OnInit,
} from '@angular/core';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';
import { Overlay } from '../overlay';

@Component({
  selector: 'cancel-hotel-overlay',
  templateUrl: './cancel-hotel-overlay.component.html',
  styleUrls: ['./cancel-hotel-overlay.component.scss'],
})
export class CancelHotelOverlayComponent extends Overlay implements OnInit {
  CHECKOUT_CONST = CHECKOUT_CONST;

  ngOnInit(): void {
  }
}
