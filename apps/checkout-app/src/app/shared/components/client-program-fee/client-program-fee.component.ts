import { Component, OnInit, Input } from '@angular/core';
import { PAYMENT_SUMMARY_CONST } from '../../angular-custom-components/payment-summary/constants/payment-summary-constant';

@Component({
  selector: 'client-program-fee',
  templateUrl: './client-program-fee.component.html',
  styleUrls: ['./client-program-fee.component.scss'],
})
export class ClientProgramFeeComponent implements OnInit {
  constructor() { }
  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;
  @Input() breakup: any;
  ngOnInit() { }
}
