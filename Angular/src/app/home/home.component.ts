import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  user: any = null;

  constructor(private authService: AuthService, private apiService: ApiService) {}

  async login() {
    try {
      this.user = await this.authService.signInWithGoogle();
      console.log('User logged in: ', this.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async sendDataToApi() {
    const data = { message: 'Hello Flask!' }; // Replace with your actual data

    try {
      const response = await (await this.apiService.postData(data)).toPromise();
      console.log('API Response: ', response);
    } catch (error) {
      console.error('Error sending data to API: ', error);
    }
  }
}