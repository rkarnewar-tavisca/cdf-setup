import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_PIPES } from './pipes';
import { ScreenFullHeightDirective, SkeletonDirective } from './directives';

const DIRECTIVES = [ScreenFullHeightDirective, SkeletonDirective];

@NgModule({
  declarations: [...SHARED_PIPES, ...DIRECTIVES],
  imports: [CommonModule],
  exports: [...SHARED_PIPES, ...DIRECTIVES],
})
export class ThemeModule {}
