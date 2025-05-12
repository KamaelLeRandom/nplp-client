import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from '../services/authentification-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  loginObj: any = {
    name: '',
    password: '',
  }

  constructor(private service: AuthentificationService) { }

  onLogin() {
    this.service.login(this.loginObj.name, this.loginObj.password);
  }

  onForgotPassword() {
    const email = this.email;

    if (!email || !email.includes('@')) {
      alert('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    this.service.forgotPassword(email)
      .subscribe(({
        next: (response) => {
          alert('Un e-mail de réinitialisation a été envoyé.')
        },
        error: (error) => {
          console.log('error', error)
          alert("Erreur lors de l'envoi de l'e-mail.")
        }
      }))
    ;
  }
}
