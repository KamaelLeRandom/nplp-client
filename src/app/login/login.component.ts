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
  loginObj: any = {
    name: '',
    password: '',
  }

  constructor(private service: AuthentificationService) { }

  onLogin() {
    this.service.login(this.loginObj.name, this.loginObj.password);
  }
}
