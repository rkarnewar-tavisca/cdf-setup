import { Component, OnInit, Input } from '@angular/core';
import { CHECKOUT_CONST } from '@shared/constants/checkout-constant';

@Component({
  selector: 'app-insurance-placeholder',
  templateUrl: './insurance-placeholder.component.html',
  styleUrls: ['./insurance-placeholder.component.scss'],
})
export class InsurancePlaceholderComponent implements OnInit {
  @Input() addonProductList: any[];
  CHECKOUT_CONST = CHECKOUT_CONST;
  constructor() {}

  ngOnInit() {}
}
