import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink} from '@angular/router';
import { AuthService } from '../app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'clothingstore-frontend';
  constructor(public authService: AuthService) {}

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
