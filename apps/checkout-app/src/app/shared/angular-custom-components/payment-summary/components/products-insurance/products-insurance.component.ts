import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-insurance',
  templateUrl: './products-insurance.component.html',
  styleUrls: ['./products-insurance.component.scss'],
})
export class ProductsInsuranceComponent implements OnInit {
  @Input() addOnProductsList: any[];
  constructor() {}

  ngOnInit() {}
}
