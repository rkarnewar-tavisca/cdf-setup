import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelHotelOverlayComponent } from './cancel-hotel-overlay.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CancelHotelOverlayComponent', () => {
  let component: CancelHotelOverlayComponent;
  let fixture: ComponentFixture<CancelHotelOverlayComponent>;

  const mockData = require('src/assets/mock/cancel-hotel-overlay-test-data.json');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CancelHotelOverlayComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelHotelOverlayComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test(`should render title as provided in data`, () => {
    const titleElement = fixture.nativeElement.querySelector('.overlay-title');
    expect(titleElement.textContent.trim()).toEqual(
      mockData.hotelInfo.title.trim()
    );
  });

  test(`should throw exception when no data is passed`, () => {
    component.data = {};
    expect(() => fixture.detectChanges()).toThrow();
  });
});
