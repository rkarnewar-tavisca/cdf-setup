import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  OnChanges,
  SimpleChanges,
  ComponentFactoryResolver,
} from '@angular/core';
import { SkeletonLoaderComponent } from '../components/index';
@Directive({ selector: '[skeletonUntil]' })
export class SkeletonDirective implements OnChanges {
  @Input() skeletonUntil: any;
  @Input() skeletonUntilSvg?: string;
  @Input() skeletonUntilInline?: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private container: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const component = this.container['_hostView'][8] as any;
    this.container.clear();
    if (
      changes.skeletonUntil.firstChange &&
      !changes.skeletonUntil.currentValue
    ) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        SkeletonLoaderComponent
      );
      const instance = this.container.createComponent(componentFactory)
        .instance;
      if (this.skeletonUntilSvg) {
        instance.skeleton = this.skeletonUntilSvg.replace('.svg', '');
        instance.inline = this.skeletonUntilInline;
      } else {
        instance.skeleton = component.__proto__.constructor.name
          .toLowerCase()
          .replace('component', '');
      }
    } else {
      this.container.createEmbeddedView(this.templateRef);
    }
  }
}
