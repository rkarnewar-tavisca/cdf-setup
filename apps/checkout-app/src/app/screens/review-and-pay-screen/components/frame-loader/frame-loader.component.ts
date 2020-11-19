import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '@env/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { ICCNumberSettings } from './interfaces';
import { CC_STYLES } from './constants';

@Component({
  selector: 'app-frame-loader',
  template: `
    <iframe
      #frame
      [src]="source"
      style="display:block"
      frameborder="0"
      width="100%"
      height="56"
      id="cc-frame"
      scrolling="no"
      marginheight="0"
    ></iframe>
  `,
  styleUrls: ['./frame-loader.component.scss'],
})
export class FrameLoaderComponent implements OnInit, AfterViewInit {
  source: SafeResourceUrl;
  @ViewChild('frame', { static: true }) frameReference: ElementRef;

  private onTokenize$ = new BehaviorSubject<any>(null);
  private onBlur$ = new BehaviorSubject<any>(null);
  private onActivation$ = new BehaviorSubject<any>(null);
  private onKeyup$ = new Subject<any>();

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
    this.source = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${environment.pciBaseUrl}`
    );
  }

  ngOnInit() {
    window.addEventListener('message', (message) => {
      if (message.data?.type?.toLowerCase() === 'onactivate') {
        this.onActivation$.next(message.data);
        // Inject card number component styles
        if (message && message.data) {
          this.injectStyles();
        }
      }
      if (message.data?.type?.toLowerCase() === 'onerror') {
        if (message.data.body.invalid) {
          this.renderer.setAttribute(
            this.frameReference.nativeElement,
            'height',
            '75.6'
          );
        } else {
          this.renderer.setAttribute(
            this.frameReference.nativeElement,
            'height',
            '56'
          );
        }
      }
      if (message.data?.type?.toLowerCase() === 'ontokenize') {
        this.onTokenize$.next(message.data.body);
      }
      if (message.data?.type?.toLowerCase() === 'onblur') {
        this.onBlur$.next(message.data.body);
      }
      if (message.data?.type?.toLowerCase() === 'onkeyup') {
        this.onKeyup$.next(message.data.body);
      }
    });
  }

  ngAfterViewInit() {
    this.injectStyles();
  }

  get onTokenize(): Observable<any> {
    return this.onTokenize$.asObservable();
  }

  get onBlur(): Observable<any> {
    return this.onBlur$.asObservable();
  }

  get onActivation(): Observable<any> {
    return this.onActivation$.asObservable();
  }

  get onKeyup(): Observable<any> {
    return this.onKeyup$.asObservable();
  }

  injectStyles() {
    const data = {
      kind: 'styles',
      body: {
        styleUrls: [
          'https://oski-cdn.s3.amazonaws.com/common/css/fonts/ProximaNova/proxima-nova.css',
        ],
        styles: CC_STYLES
      },
    };

    this.updateFrame(data);
  }

  setDefaults(defaults: ICCNumberSettings) {
    this.updateFrame({
      kind: 'defaults',
      body: defaults,
    });
  }

  updateCardDetail(cardDetails: { cardNumber: string; cardType?: string }) {
    if (!cardDetails) {
      return;
    }

    const data = {
      kind: 'cardInfo',
      body: {
        cardNumber: cardDetails.cardNumber || '',
        cardType: cardDetails.cardType,
      },
    };

    this.updateFrame(data);
  }

  private updateFrame(data: any) {
    const frameElement = document.getElementById('cc-frame') as any;
    const doc = frameElement.contentWindow;
    if (doc) {
      doc.postMessage(data, '*');
    }
  }
}
