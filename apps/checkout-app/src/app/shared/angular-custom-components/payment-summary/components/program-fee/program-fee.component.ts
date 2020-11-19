import { Component, OnInit, Input } from '@angular/core';
import { PAYMENT_SUMMARY_CONST } from '../../constants/payment-summary-constant';

@Component({
  selector: 'app-program-fee',
  templateUrl: './program-fee.component.html',
  styleUrls: ['./program-fee.component.scss'],
})
export class ProgramFeeComponent implements OnInit {
  PAYMENT_SUMMARY_CONST = PAYMENT_SUMMARY_CONST;

  @Input() clientProgramFee;
  constructor() {}

  ngOnInit() {}
}
