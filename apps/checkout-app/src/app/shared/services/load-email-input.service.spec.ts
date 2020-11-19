import { TestBed } from '@angular/core/testing';


import { ViewContainerRef, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { LoadEmailInputService } from './load-email-input.service';
import { EmailInputComponent } from '../components/overlays/share-itinerary/components/email-input/email-input.component';
import { CultureModule } from '@orxe-culture/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrxeFormsModule } from '@orxe-angular/forms';

@Component({
    selector: 'app-mock-component',
    template: `<div></div>`
})
export class MockComponent {
    constructor(private readonly _viewContainerRef: ViewContainerRef) {
    }
}

describe('LoadEmailInputService', () => {
    let service: LoadEmailInputService;
    let viewContainerRef: ViewContainerRef;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [EmailInputComponent, MockComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports:[ReactiveFormsModule, CultureModule, FormsModule, CommonModule, OrxeFormsModule]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [EmailInputComponent],
            },
        });
        service = TestBed.inject(LoadEmailInputService);
        const fixture = TestBed.createComponent(MockComponent);
        viewContainerRef = fixture.debugElement.injector.get(
            ViewContainerRef
        );
    });

    test('should be created LoadEmailInputService', () => {
        expect(service).toBeTruthy();
    });

    test(`should render input component on document`, () => {
        service.showEmailInput(EmailInputComponent, viewContainerRef);
        const inputElement: HTMLCollection = document.getElementsByTagName('app-email-input');
        expect(inputElement.length).toEqual(1);
    });
});
