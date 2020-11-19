import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CultureModule } from '@orxe-culture/angular';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ClientFeeCardComponent } from './client-fee.component';


@Component({
  selector: 'test-component-wrapper',
  template: '<client-fee [clientProgramFee]="clientProgramFee"></client-fee>'
})
class TestComponentWrapper {
  clientProgramFee = 15;
}


describe('ClientFeeComponent', () => {
  let component: ClientFeeCardComponent;
  let fixture: ComponentFixture<TestComponentWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientFeeCardComponent, TestComponentWrapper],
      imports: [
        CultureModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentWrapper);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create the client program fee component instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set client program fee in component input', () => {
    expect(component.clientProgramFee).toEqual(15);
  });

  it('should render the client program fee in DOM', () => {
    const programFee = fixture.debugElement.nativeElement.querySelector('span.align-right')
    expect(programFee.textContent).toEqual(' $15.00 ');
  });
});
