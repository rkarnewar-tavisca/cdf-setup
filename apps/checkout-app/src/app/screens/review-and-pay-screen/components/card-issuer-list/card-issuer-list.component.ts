import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CARD_ISSUER_ICONS } from '../../resources';
import { cardIssuedBy } from '../../utils';

@Component({
  selector: 'app-card-issuer-list',
  templateUrl: './card-issuer-list.component.html',
  styleUrls: ['./card-issuer-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardIssuerListComponent implements OnInit, AfterViewInit {
  @Input() allowedCardTypes: Array<string> = [];


  constructor(private sanitizer: DomSanitizer) {}
  allowedCardImages = [];

  ngOnInit(): void {
    // this.svg = this.sanitizer.bypassSecurityTrustHtml(this.VI);
  }

  ngAfterViewInit(): void {
    this.resolveCardImages();
  }
  /**
   * Resolve Card Logo based on allowed card types.
   * @memberof CardIssuerListComponent
   */
  resolveCardImages(): void {
    this.allowedCardTypes.forEach((issuer) => {
      let key = '';
      key = Object.keys(cardIssuedBy).find(i => cardIssuedBy[i] === issuer);
      if (CARD_ISSUER_ICONS[`${key}`]) {
        this.allowedCardImages.push({
          type: issuer,
          logo: this.sanitizer.bypassSecurityTrustHtml(
            CARD_ISSUER_ICONS[`${key}`]
          ),
        });
      }
    });
  }
}
