import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-review-sub-total',
  templateUrl: './trip-review-sub-total.component.html',
  styleUrls: ['./trip-review-sub-total.component.scss'],
})
export class TripReviewSubTotalComponent implements OnInit {
  @Input() cartDetails: any;
  @Input() userProfile: any;
  @Input() userSessionData: any;
  constructor() {}

  ngOnInit() {}
}
