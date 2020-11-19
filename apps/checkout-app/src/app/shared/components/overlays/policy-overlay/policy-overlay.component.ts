import { Component, OnInit } from '@angular/core';
import { Overlay } from '../overlay';

@Component({
  selector: 'policy-overlay',
  templateUrl: './policy-overlay.component.html',
  styleUrls: ['./policy-overlay.component.scss']
})
export class PolicyOverlayComponent extends Overlay implements OnInit {
  ngOnInit(): void {}
}
