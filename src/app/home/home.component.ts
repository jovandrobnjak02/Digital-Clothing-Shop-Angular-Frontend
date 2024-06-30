import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  text: string = 'Our suits are legen... wait for it...';
  textArray: string[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}

