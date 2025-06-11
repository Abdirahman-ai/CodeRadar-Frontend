import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.http.post('http://localhost:8080/api/auth/login', this.loginForm.value).subscribe({
    next: () => {
        this.successMessage = 'Login successful!';
        // this.loginForm.reset(); // sets the email and password textbox to blank
        setTimeout(() => this.router.navigate(['/projects']), 1500);
      },
         error: err => {
        this.errorMessage = 'Login failed: ' + (err.error?.message || 'Invalid credentials');
      }
    });
  }
}
