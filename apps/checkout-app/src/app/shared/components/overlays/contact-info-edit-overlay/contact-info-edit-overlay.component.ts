import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validation } from '@orxe-angular/forms';
import { Overlay } from '../overlay';

@Component({
  selector: 'app-contact-info-edit-overlay',
  templateUrl: './contact-info-edit-overlay.component.html',
  styleUrls: ['./contact-info-edit-overlay.component.scss'],
})
export class ContactInfoEditOverlayComponent
  extends Overlay
  implements OnInit, OnChanges {
  @Input() contactDetail: any;
  @Input() contactInfoSaveStatus: {
    status: boolean;
    message?: string;
    errorResponse?: any;
  };
  @Output() onSubmitted: EventEmitter<any> = new EventEmitter<any>();

  public viewModel: any = {
    isNeedToVerifyEmail: false,
  };
  editContactForm: FormGroup = this.fb.group(
    {
      phone: [
        null,
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
      secondaryPhone: [null, [Validators.pattern('^[0-9]{10,15}$')]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
          ),
        ],
      ],
      verifyEmail: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$'
          ),
        ],
      ],
    },
    {
      validators: this.checkEmails('email', 'verifyEmail'),
    }
  );

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.editContactForm.get('phone').setValue(this.contactDetail?.phone);
    this.editContactForm
      .get('secondaryPhone')
      .setValue(this.contactDetail?.secondaryPhone);
    this.editContactForm.get('email').setValue(this.contactDetail?.email);
    this.editContactForm
      .get('verifyEmail')
      .setValue(this.contactDetail?.verifyEmail);
  }

  ngOnChanges(changes?: SimpleChanges) {
    if (this.contactInfoSaveStatus?.status) {
      this.close();
    }
  }

  close() {
    super.close();
  }

  onBlurValidateInputs(fieldName: string): void {}

  /**
   * custom validation for retype email.
   *
   * @param {string} controlName
   * @param {string} matchingControlName
   * @returns {object}
   * @memberof ContactInfoFormComponent
   */
  checkEmails(controlName: string, matchingControlName: string): object {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  restrict(event) {
    const allowedKeys = [8, 9, 37, 39];
    if (
      !parseInt(event.key) &&
      event.key !== '0' &&
      !allowedKeys.includes(event.keyCode)
    ) {
      event.preventDefault();
      return false;
    }
  }

  errorState(fieldName: string): boolean {
    return (
      this.editContactForm.get(fieldName).touched &&
      this.editContactForm.get(fieldName).errors != null
    );
  }

  saveChangesContactInfoEdit() {
    if (!this.editContactForm.valid) {
      Validation.validateAllFormFields(this.editContactForm);
    } else {
      this.onSubmitted.emit({
        valid: this.editContactForm.valid,
        data: {
          ...this.editContactForm.value,
          profiles: this.contactDetail?.profiles,
          profileName: this.contactDetail?.profileName,
        },
      });
    }
  }

  cancelContactInfoEdit() {
    this.close();
  }

  onChangeContactInfoInputs(key: string) {
    switch (key) {
      case 'email':
        if (
          this.contactDetail?.email !== this.editContactForm.get('email').value
        ) {
          this.viewModel.isNeedToVerifyEmail = true;
          this.editContactForm.get('verifyEmail').setValue(null);
        } else {
          this.viewModel.isNeedToVerifyEmail = false;
          this.editContactForm
            .get('verifyEmail')
            .setValue(this.contactDetail?.email);
        }
        break;
    }
  }
}
