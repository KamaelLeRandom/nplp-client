import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthentificationService } from '../../services/authentification-service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  router = inject(Router);
  authService = inject(AuthentificationService);
  formBuilder = inject(FormBuilder);
  registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]],
  });
  passwordsMatch: boolean = false;
  errorDisplay: string = "";

  ngOnInit() {
    this.registerForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  checkPasswords() {
    const newPassword = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.passwordConfirm;

    this.passwordsMatch = newPassword === confirmPassword;
  }

  onSubmit() {
    console.log('register', this.registerForm, this.registerForm.valid)
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value.name as string, this.registerForm.value.email as string, this.registerForm.value.password as string)
        .subscribe(({
          next: (response) => {
            const confirmed = window.confirm(`Veuillez confirmer votre mail grâce à l'email envoyé avant de pouvoir vous connectez.`);
            if (confirmed)
              this.router.navigateByUrl('/login');
          },
          error: (error) => {
            this.errorDisplay = error.error;
          }
        }))
      ;
    }
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
