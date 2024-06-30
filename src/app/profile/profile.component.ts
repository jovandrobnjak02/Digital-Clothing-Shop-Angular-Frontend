import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [FormsModule, CommonModule], 
  standalone: true
})
export class ProfileComponent implements OnInit {
  user!: User;
  editing: boolean = false;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const user2 = this.authService.currentUserValue; 
    this.user = (await (this.userService.getUserById(user2!.id))).data
  }

  toggleEdit(): void {
    this.editing = !this.editing;
  }

  saveUser(): void {
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (data) => {
        console.log('User updated', data);
        this.editing = false;
      },
      error: (error) => console.error('Failed to update user', error)
    });
  }
}
