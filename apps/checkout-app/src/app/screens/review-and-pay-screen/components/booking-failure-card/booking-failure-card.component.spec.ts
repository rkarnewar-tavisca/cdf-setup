import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultureModule } from '@orxe-culture/angular';

import { BookingFailureCardComponent } from './booking-failure-card.component';

describe('BookingFailureCardComponent', () => {
  let component: BookingFailureCardComponent;
  let fixture: ComponentFixture<BookingFailureCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingFailureCardComponent ],
      imports: [CultureModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingFailureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
