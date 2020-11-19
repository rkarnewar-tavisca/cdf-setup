import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramFeeComponent } from './program-fee.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';

describe('ProgramFeeComponent', () => {
  let component: ProgramFeeComponent;
  let fixture: ComponentFixture<ProgramFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramFeeComponent],
      imports: [CultureModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create program fee component', () => {
    expect(component).toBeTruthy();
  });
});
