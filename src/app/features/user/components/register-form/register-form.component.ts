import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,32}/,
          ),
        ],
      ],
      age: [
        null,
        [Validators.required, Validators.min(1), Validators.max(120)],
      ],
      ficha: [{ value: null, disabled: true }, [Validators.required]],
    });

    this.form.get('email')!.valueChanges.subscribe({
      next: (data: string) => {
        if (data.includes('@sena')) {
          this.form.get('ficha')!.enable();
        } else {
          this.form.get('ficha')!.disable();
        }
      },
    });
  }

  onClick() {
    if (this.form.valid) {
      console.log(this.form.value);
      console.log(this.form.getRawValue());
    }
  }

  isInvalid(controlName: string, errorCode: string) {
    const control = this.form.get(controlName);

    if (!control) {
      return false;
    }

    const touched = control.touched;

    return control.hasError(errorCode) && touched;
  }
}