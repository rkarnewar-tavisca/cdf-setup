import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit, Input, ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent implements AfterViewInit {
  @Input() dynamicSkeleton;
  skeleton: string;
  inline = true;

  @ViewChild('placeholder')
  placeholder: ElementRef;

  constructor(private _renderer: Renderer2, private _cdr:ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.skeleton = this.skeleton ? this.skeleton : this.dynamicSkeleton;
    this.inline = this.dynamicSkeleton ? false : true;
    this.createObjectElement();
    setTimeout(() => {
      const skeletonObject = document.getElementById(this.skeleton) as any;
      const orxeSkeleton = document.createElement('orxe-skeleton');
      orxeSkeleton.setAttribute('active', 'true');
      try {
        orxeSkeleton.appendChild(skeletonObject.contentDocument.childNodes[0]);
      } catch {}
      this._renderer.appendChild(this.placeholder.nativeElement, orxeSkeleton);
      skeletonObject.remove();
    }, 300);
    this._cdr.detectChanges();
  }

  private createObjectElement() {
    const obj = document.createElement('object');
    obj.setAttribute('data', `assets/skeletons/${this.skeleton}.svg`);
    obj.setAttribute('id', this.skeleton);
    obj.style.visibility = 'hidden';
    document.body.appendChild(obj);
    return obj;
  }
}
