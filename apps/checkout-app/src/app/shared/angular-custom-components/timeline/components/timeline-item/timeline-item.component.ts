import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineItemComponent implements OnInit {
  standardTitleColorClassList = [
    'primary',
    'secondary',
    'tertiary',
    'error',
    'neutral',
  ];
  isTitleColorAvailable: boolean;
  /**
   * This property allows to set icon for the steps
   */
  @Input() icon: string;
  /**
   * This property allows to set  title
   */
  @Input() title: string;
  /**
   * This property allows to set title color
   */
  @Input() titleColor: string;
  /**
   * This property is used set the timeline active
   */
  @Input() step: string;
  constructor() {}
  ngOnInit(): void {
    this.isTitleColorAvailable = this.standardTitleColorClassList.includes(
      this.titleColor
    );
  }
}
