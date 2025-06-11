import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      githubUsername: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignup(): void {
    this.successMessage = '';
    this.errorMessage = '';
    
    this.http.post('http://localhost:8080/api/auth/signup', this.signupForm.value).subscribe({
      next: () => {
        this.successMessage = 'Account created successfully!';
        this.signupForm.reset();
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        this.errorMessage = 'Signup failed: ' + (err.error?.message || 'Something went wrong.');
      }
    });
  }
}
