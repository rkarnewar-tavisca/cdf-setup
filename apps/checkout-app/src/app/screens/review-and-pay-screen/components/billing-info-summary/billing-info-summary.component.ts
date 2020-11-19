import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-info-summary',
  templateUrl: './billing-info-summary.component.html',
  styleUrls: ['./billing-info-summary.component.scss']
})
export class BillingInfoSummaryComponent implements OnInit {

  @Input() billingFormValues;
  constructor() { }

  ngOnInit(): void {
  }

}
