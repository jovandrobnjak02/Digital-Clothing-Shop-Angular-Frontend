import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      address: this.address,
      password: this.password
    };
    this.authService.register(user).subscribe(
      () => {
        this.authService.login({ email: this.email, password: this.password }).subscribe(
          response => {
            this.authService.register(response);
          },
          error => {
            console.error('Login failed after registration', error);
          }
        );
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
