import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveHotelOverlayComponent } from './remove-hotel-overlay.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('RemoveHotelOverlayComponent', () => {
  let component: RemoveHotelOverlayComponent;
  let fixture: ComponentFixture<RemoveHotelOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RemoveHotelOverlayComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveHotelOverlayComponent);
    component = fixture.componentInstance;
    component.data = {};
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test(`should render title as 'Remove Hotel`, () => {
    const titleElement = fixture.nativeElement.querySelector('.overlay-title');
    expect(titleElement.textContent.trim()).toEqual('Remove Hotel'.trim());
  });
});
