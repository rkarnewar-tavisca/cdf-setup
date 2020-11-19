import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-addon-product-detail-placeholder',
  templateUrl: './addon-product-detail-placeholder.component.html',
  styleUrls: ['./addon-product-detail-placeholder.component.scss'],
})
export class AddonProductDetailPlaceholderComponent implements OnInit {
  @Input() addOnProductsList: any[] = [];
  constructor() {}

  ngOnInit() {}
}
