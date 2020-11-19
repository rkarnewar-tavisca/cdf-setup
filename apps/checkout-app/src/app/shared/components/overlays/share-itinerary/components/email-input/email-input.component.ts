import { Component, Input, Output, EventEmitter, ChangeDetectorRef, AfterContentChecked, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss']
})
export class EmailInputComponent implements OnInit {

  inputData: AbstractControl;

  errorState: Boolean = false;

  @Input('labelId') labelId = null;

  @Output() removeInput: EventEmitter<any> = new EventEmitter<any>();

  @Output() valueChanged: EventEmitter<any> = new EventEmitter<any>();

  emailInputForm = this._fb.group(
    {
      email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    }
  );

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.inputData = (this.emailInputForm.get('email'));
  }

  onInputChange(e) {
    if (this.emailInputForm.get('email').status === 'INVALID') {
      this.errorState = true;
    } else {
      this.errorState = false;
    }
    this.inputData = (this.emailInputForm.get('email'));
    this.valueChanged.emit(this.emailInputForm.get('email'));
  }

  onClickClose() {
    this.removeInput.emit(this.labelId)
  }

  onInputBlur(e) {
    if (e.details === "") {
      this.errorState = false;
    }
  }

}
