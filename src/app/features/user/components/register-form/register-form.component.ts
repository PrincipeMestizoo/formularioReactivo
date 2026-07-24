import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        username: [
          null,
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)],
        ],
        password: [null, [Validators.required, Validators.minLength(8)]],
        passwordConfirm: [null, [Validators.required]],
        age: [
          null,
          [Validators.required, Validators.min(15), Validators.max(90)],
        ],
        terminos: [false, [Validators.requiredTrue]],
      },
      {
        validators: [this.mustMatch('password', 'passwordConfirm')],
      },
    );
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }

  onClick() {
    if (this.form.valid) {
      console.log('Datos del formulario:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  isInvalid(controlName: string, errorCode: string) {
    const control = this.form.get(controlName);

    if (!control) {
      return false;
    }

    return control.hasError(errorCode) && control.touched;
  }
}
