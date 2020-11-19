import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProgramFeeComponent } from './client-program-fee.component';
import { CultureModule } from '@orxe-culture/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ClientProgramFeeComponent', () => {
  let component: ClientProgramFeeComponent;
  let fixture: ComponentFixture<ClientProgramFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientProgramFeeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports:[CultureModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientProgramFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
