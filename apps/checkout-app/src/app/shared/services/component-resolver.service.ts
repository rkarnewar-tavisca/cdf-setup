import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentResolverService {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  /**
   * Creates a component based on provided type and returns it's instance
   * @param componentType Type of the component to load
   * @param containerRef Container reference where the new component will load
   */
  public resolve<T>(componentType: T, viewContainerRef: ViewContainerRef): any {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      componentType as any
    );
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    return componentRef.instance as any;
  }
}
