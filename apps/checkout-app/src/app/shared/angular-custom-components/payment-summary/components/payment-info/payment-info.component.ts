import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-info',
  template: `
    <div orxe-id="payment-info">
      <ng-template
        orxe-id="payment-info-points"
        [ngIf]="paymentBreakup?.points"
      >
        {{ paymentBreakup?.points | orxeDecimal }}
        {{ 'payment-summary.points_label' | orxeTranslate }}</ng-template
      >
      <ng-template [ngIf]="paymentBreakup?.points && paymentBreakup?.amount">
        +
      </ng-template>
      <ng-template
        orxe-id="payment-info-amount"
        [ngIf]="paymentBreakup?.amount"
      >
        {{ paymentBreakup?.amount | orxeCurrency }}
      </ng-template>
    </div>
  `,
  styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent implements OnInit {
  @Input() paymentBreakup;
  @Input() readOnly;
  constructor() {}

  ngOnInit() {}
}
