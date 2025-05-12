import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification-service.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  imports: [ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  authService = inject(AuthentificationService);
  token: string = '';

  formBuilder = inject(FormBuilder);
  passwordForm = this.formBuilder.group({
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
  });
  passwordsMatch = false;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (!token) {
        this.router.navigateByUrl("/error", { state: { message: "Aucun token trouvé" }});
      }
      this.token = token;
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  checkPasswords() {
    const newPassword = this.passwordForm.value.password;
    const confirmPassword = this.passwordForm.value.passwordConfirm;

    this.passwordsMatch = newPassword === confirmPassword;
  }

  onSubmit() {
    if (this.passwordForm.value.password && this.passwordsMatch)
      this.authService.resetPassword(this.token, this.passwordForm.value.password)
        .subscribe(({
          next: (response) => {
            this.router.navigateByUrl("/login")
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        }))
      ;
  }
}
