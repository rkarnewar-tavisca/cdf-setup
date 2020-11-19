import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {
  }

  public overlay;

  /**
   * Dynamically creates overlay component and display it
   * @param componentType Type of the component to load
   * @param containerRef Container reference where the new component will load
   * @param data Data required for new component or overlay
   */
  public showOverlay<T>(componentType: T, containerRef: ViewContainerRef, data: any = {}): void {
    this.overlay = this.getComponentInstance<T>( componentType, containerRef);
    this.overlay.data = data;
    this.overlay.open();
  }


  /**
   * Creates a component based on provided type and returns it's instance
   * @param componentType Type of the component to load
   * @param containerRef Container reference where the new component will load
   */
  private getComponentInstance<T>(componentType: T, viewContainerRef: ViewContainerRef): any {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType as any
    );
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    return componentRef.instance as any;
  }
}
