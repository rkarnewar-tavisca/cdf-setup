import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import '@orxe-components/header';

@Component({
  selector: 'checkout-header',
  templateUrl: './checkout-header.component.html',
  styleUrls: ['./checkout-header.component.scss'],
})
export class CheckoutHeaderComponent implements OnInit {
  @Input() title: string = 'Checkout';
  @Input() subTitle: string;
  @Input() leftIcon: String;
  @Input() leftIconA11y: String;
  @Output() onClickIcon = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onLeftIconClickHeader() {
    this.onClickIcon.emit('leftIcon');
  }
}
