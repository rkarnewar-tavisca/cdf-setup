import { Injectable, ViewContainerRef } from '@angular/core';
import { ComponentResolverService } from './component-resolver.service';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private readonly componentResolver: ComponentResolverService) {}

  /**
   * Dynamically creates overlay component and display it
   * @param componentType Type of the component to load
   * @param containerRef Container reference where the new component will load
   * @param data Data required for new component or overlay
   */
  public showOverlay<T>(
    componentType: T,
    containerRef: ViewContainerRef,
    data: any = {}
  ): void {
    const overlay = this.componentResolver.resolve<T>(
      componentType,
      containerRef
    );
    overlay.data = data;
    overlay.open();
    return overlay;
  }
}
