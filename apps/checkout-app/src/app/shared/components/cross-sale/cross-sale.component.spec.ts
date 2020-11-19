import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSaleComponent } from './cross-sale.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CrossSaleComponent', () => {
  let component: CrossSaleComponent;
  let fixture: ComponentFixture<CrossSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrossSaleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create cross sale component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
