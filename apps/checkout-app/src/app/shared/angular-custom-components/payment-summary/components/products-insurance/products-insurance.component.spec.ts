import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInsuranceComponent } from './products-insurance.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';

describe('ProductsInsuranceComponent', () => {
  let component: ProductsInsuranceComponent;
  let fixture: ComponentFixture<ProductsInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsInsuranceComponent],
      imports: [CultureModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create product insurance component', () => {
    expect(component).toBeTruthy();
  });
});
