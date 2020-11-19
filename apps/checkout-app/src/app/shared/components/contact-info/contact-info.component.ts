import {
  Component,
  OnInit,
  Input,
  ViewContainerRef,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { OverlayService } from '@shared/services/overlay.service';
import { ContactInfoEditOverlayComponent } from '../overlays/contact-info-edit-overlay/contact-info-edit-overlay.component';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit, OnChanges {
  @Input() contactInfo: any;
  @Input() contactInfoSaveStatus: {
    status: boolean;
    message?: string;
    errorResponse?: any;
  };
  @Output() onSubmitted: EventEmitter<any> = new EventEmitter<any>();

  public viewModel: any = {
    editContactInfoOverlayInstance: null,
  };
  constructor(
    private _overlayService: OverlayService,
    private readonly _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.contactInfoSaveStatus) {
      this.viewModel.editContactInfoOverlayInstance.contactInfoSaveStatus = this.contactInfoSaveStatus;
      this.viewModel.editContactInfoOverlayInstance.ngOnChanges();
    }
  }

  onEditContactInfo() {
    this.viewModel.editContactInfoOverlayInstance = this._overlayService.showOverlay(
      ContactInfoEditOverlayComponent,
      this._viewContainerRef
    );
    this.viewModel.editContactInfoOverlayInstance.contactDetail = this.contactInfo;
    this.viewModel.editContactInfoOverlayInstance.onSubmitted.subscribe(
      (response: any) => {
        this.onSubmitted.emit(response);
      }
    );
  }
}
