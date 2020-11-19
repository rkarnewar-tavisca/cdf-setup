import { Component, OnInit, Output } from '@angular/core';
import { Overlay } from '../overlay';

@Component({
  selector: 'remove-hotel-overlay',
  templateUrl: './remove-hotel-overlay.component.html',
  styleUrls: ['./remove-hotel-overlay.component.scss']
})
export class RemoveHotelOverlayComponent extends Overlay implements OnInit {

  ngOnInit(): void {
  }
}
