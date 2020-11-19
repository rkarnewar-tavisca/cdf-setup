import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Overlay } from './../overlay';
import { LoadEmailInputService } from '../../../services/load-email-input.service';
import { EmailInputComponent } from './components/email-input/email-input.component';

@Component({
  selector: 'app-share-itinerary',
  templateUrl: './share-itinerary.component.html',
  styleUrls: ['./share-itinerary.component.scss'],
})
export class ShareItineraryComponent
  extends Overlay
  implements OnInit, AfterViewInit, OnChanges {
  @Input('maxEmailsAllowed') maxEmailsAllowed = 1;
  @ViewChild('containerRef', { read: ViewContainerRef, static: true })
  containerRef: ViewContainerRef;
  @Output() shareEmails: EventEmitter<any> = new EventEmitter<any>();
  @Input() shareEmailStatus: {
    status: boolean;
    message?: string;
    errorResponse?: any;
  };
  viewModel: any = {
    showSpinnerButton: false,
  };
  btnDisableFlag = true;

  instanceArr = [];

  constructor(
    private _inputLoaderService: LoadEmailInputService,
    private _cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this._inputLoaderService.count = this.maxEmailsAllowed;
  }

  ngOnChanges(changes?: SimpleChanges) {
    if (this.shareEmailStatus?.status) {
      this.viewModel.showSpinnerButton = false;
      this.close();
    } else {
      this.viewModel.showSpinnerButton = false;
    }
  }

  close() {
    this._inputLoaderService.count = 1;
    this._inputLoaderService.orgCount = 0;
    super.close();
  }

  onClickAddBtn() {
    this.add();
  }

  ngAfterViewInit() {
    this.add();
    this._cdr.detectChanges();
  }

  add() {
    const emailInput: any = this._inputLoaderService.showEmailInput(
      EmailInputComponent,
      this.containerRef
    );
    if (emailInput) {
      emailInput.removeInput.subscribe((data) => {
        this.removeInput(data);
      });
      emailInput.valueChanged.subscribe((inputValue) => {
        this.checkInputValidity();
      });
      this.instanceArr.push(emailInput);
      this.updateInputArr();
    }
  }

  checkInputValidity() {
    if (this.instanceArr.length > 1) {
      const validEmptyArray = this.instanceArr.filter(
        (instance) =>
          instance.inputData.value === '' &&
          instance.inputData.status === 'VALID'
      );
      const validArray = this.instanceArr.filter(
        (instance) =>
          instance.inputData.value !== '' &&
          instance.inputData.status === 'VALID'
      );
      if (validEmptyArray.length === this.instanceArr.length) {
        this.btnDisableFlag = true;
      } else {
        validArray.length + validEmptyArray.length === this.instanceArr.length
          ? (this.btnDisableFlag = false)
          : (this.btnDisableFlag = true);
      }
    } else {
      const validArray = this.instanceArr.filter(
        (instance) =>
          instance.inputData.value !== '' &&
          instance.inputData.status === 'VALID'
      );
      validArray.length === this.instanceArr.length
        ? (this.btnDisableFlag = false)
        : (this.btnDisableFlag = true);
    }
  }

  onClickShareBtn() {
    if (!this.viewModel.showSpinnerButton) {
      this.viewModel.showSpinnerButton = true;
      const emailsArray = this.instanceArr.map(
        (input) => input.inputData.value
      );
      const filteredEmailArray = emailsArray.filter(
        (email) => email != null && email != ''
      );
      this.shareEmails.emit(filteredEmailArray);
    }
  }

  removeInput(key) {
    this.updateInputArr(key);
    key = key - 1;
    if (key > 0) {
      this.containerRef.remove(key);
      this._inputLoaderService.orgCount = this._inputLoaderService.orgCount - 1;
    }
    this.checkInputValidity();
  }

  updateInputArr(key?) {
    if (key) {
      this.instanceArr = this.instanceArr.filter(
        (instance) => instance.labelId !== key
      );
    }
    for (let i = 0; i < this.instanceArr.length; i++) {
      if (this.instanceArr.length === 1) {
        this.instanceArr[i].labelId = null;
      } else {
        this.instanceArr[i].labelId = i + 1;
      }
    }
  }
}
