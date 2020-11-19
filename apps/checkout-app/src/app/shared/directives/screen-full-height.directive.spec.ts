import { ScreenFullHeightDirective } from './screen-full-height.directive';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import {
  Component,
  HostListener,
  AfterViewInit,
  ElementRef
} from '@angular/core';

@Component({
  template: `<div screenFullHeight>Test Component</div>`,
})
class TestComponent implements AfterViewInit {
  constructor(private elemRef: ElementRef) {}

  ngAfterViewInit() {
    this.setPageHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.setPageHeight();
  }
  setPageHeight() {
  }
}

describe('ScreenFullHeightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenFullHeightDirective, TestComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  test('should set pageHeight after view init', () => {
    spyOn(component, 'setPageHeight');
    component.ngAfterViewInit();
    expect(component.setPageHeight).toBeCalled();
  });

  test('should trigger setPageHeight method when window is resized', () => {
    const spyOnResize = spyOn(component, 'setPageHeight');
    window.dispatchEvent(new Event('resize'));
    expect(spyOnResize).toHaveBeenCalled();
  });
});
