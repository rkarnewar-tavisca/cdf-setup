import {
    Injectable,
    ComponentFactoryResolver,
    ViewContainerRef,
} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LoadEmailInputService {
    count = 1;
    orgCount = 0;
    constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {
    }

    /**
     * Dynamically creates Email Input component and display it
     * @param componentType Type of the component to load
     * @param containerRef Container reference where the new component will load
     */
    public showEmailInput<T>(componentType: T, containerRef: ViewContainerRef): T {
        if (this.orgCount < this.count) {
            this.orgCount = this.orgCount + 1;
            const inputComponent = this.getComponentInstance<T>(componentType, containerRef);
            return inputComponent;
        }
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
        const componentRef = viewContainerRef.createComponent(componentFactory);
        return componentRef.instance as any;
    }
}
