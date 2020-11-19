import { Component, OnInit } from '@angular/core';
import { Overlay } from '../overlay';

@Component({
  selector: 'redeem-points-overlay',
  templateUrl: './redeem-points-overlay.component.html',
  styleUrls: ['./redeem-points-overlay.component.scss'],
})
export class RedeemPointsOverlayComponent extends Overlay implements OnInit {
  ngOnInit(): void {}

  public redeemPoints(): void {}

  public cancelRedemption(): void {
    super.close();
  }
}
