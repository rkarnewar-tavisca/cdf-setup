import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelerInfoScreenRoutingModule } from './traveler-info-screen-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CultureModule } from '@orxe-culture/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { OrxeFormsModule } from '@orxe-angular/forms';
import { TravelerInfoService } from './services/traveler-info.service';
import { containers } from './containers/index';
import { components } from './components/index';

@NgModule({
    declarations: [...containers, ...components],
    imports: [
        CommonModule,
        TravelerInfoScreenRoutingModule,
        SharedModule,
        CultureModule,
        ReactiveFormsModule,
        OrxeFormsModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [TravelerInfoService]
})
export class TravelerInfoScreenModule { }
