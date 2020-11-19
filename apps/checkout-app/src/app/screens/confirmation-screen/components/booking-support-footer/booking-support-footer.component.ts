import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-support-footer',
  templateUrl: './booking-support-footer.component.html',
  styleUrls: ['./booking-support-footer.component.scss'],
})
export class BookingSupportFooterComponent implements OnInit {
  @Input() orderSummaryDetail: any;
  constructor() {}

  ngOnInit(): void {}
}
