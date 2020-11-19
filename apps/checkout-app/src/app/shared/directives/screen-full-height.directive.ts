import {
  Directive,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[screenFullHeight]',
})
export class ScreenFullHeightDirective implements AfterViewInit {
  constructor(private elemRef: ElementRef) {}

  ngAfterViewInit() {
    this.setPageHeight();
  }
  @HostListener('window:resize')
  onResize() {
    this.setPageHeight();
  }

  /**
   * Set full height to the page
   */
  setPageHeight() {
    const headerComponent = document.querySelector('orxe-header');
    const headerComponentHeight = headerComponent?.clientHeight;
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    );
    const styles = window.getComputedStyle(this.elemRef.nativeElement);
    const paddingTotal = parseFloat(styles['paddingTop']) + parseFloat(styles['paddingBottom']);
    this.elemRef.nativeElement.style.height = `${
      vh - headerComponentHeight - paddingTotal
    }px`;
  }
}
