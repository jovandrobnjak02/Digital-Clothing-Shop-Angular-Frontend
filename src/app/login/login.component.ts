import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        this.authService.login(response);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
