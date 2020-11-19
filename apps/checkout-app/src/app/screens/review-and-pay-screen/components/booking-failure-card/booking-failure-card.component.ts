import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booking-failure-card',
  templateUrl: './booking-failure-card.component.html',
  styleUrls: ['./booking-failure-card.component.scss']
})
export class BookingFailureCardComponent implements OnInit {

  @Input() showAlert = true;
  constructor() { }

  ngOnInit(): void {
  }

}
