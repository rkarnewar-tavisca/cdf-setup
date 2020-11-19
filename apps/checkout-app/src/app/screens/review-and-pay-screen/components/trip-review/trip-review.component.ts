import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-review',
  templateUrl: './trip-review.component.html',
  styleUrls: ['./trip-review.component.scss'],
})
export class TripReviewComponent implements OnInit {
  @Input() cartDetails: any;
  @Input() userSessionData: any;
  @Input() productTravelerDetails: any;
  constructor() {}

  ngOnInit() {}
}
