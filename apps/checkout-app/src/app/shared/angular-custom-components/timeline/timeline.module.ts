import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineComponent, TimelineItemComponent } from './components';
import { CultureModule } from '@orxe-culture/angular';

@NgModule({
  declarations: [TimelineComponent, TimelineItemComponent],
  imports: [CommonModule, CultureModule],
  exports: [TimelineComponent, TimelineItemComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimelineModule {}
