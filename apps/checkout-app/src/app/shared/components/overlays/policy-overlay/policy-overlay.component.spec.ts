import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PolicyOverlayComponent } from './policy-overlay.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('PolicyOverlayComponent', () => {
  let component: PolicyOverlayComponent;
  let fixture: ComponentFixture<PolicyOverlayComponent>;

  const policyJSONData = require('src/assets/mock/rules-and-policies.json');

  const overlayData: any = {
    rules: policyJSONData,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyOverlayComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyOverlayComponent);
    component = fixture.componentInstance;
    component.data = overlayData;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test(`should render title as provided in data`, () => {
    const titleElement = fixture.nativeElement.querySelector('.overlay-title');
    expect(titleElement.textContent.trim()).toEqual(
      overlayData.rules.title.trim()
    );
  });

  test(`should render description as provided in data`, () => {
    const descriptionElement = fixture.nativeElement.querySelector(
      '.policy-overlay-description'
    );
    expect(descriptionElement.textContent.trim()).toEqual(
      overlayData.rules.description.trim()
    );
  });
});
