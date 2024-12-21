import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//used to build and validate forms reactively.
import { Router } from '@angular/router';
import { RegisterService } from '../../service/register.service';//making API calls to handle registration and login requests.

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize Login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Initialize Register Form
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      avatar: [''],
      role: ['customer'], // Default role is 'customer'
    });
  }

  // Register a New User
  onRegister(): void {
    if (this.registerForm.invalid) {
      return;// Prevent submission if the form is invalid
    }

    const userDetails = this.registerForm.value;

    this.registerService.registerUser(userDetails).subscribe({
      next: (response: any) => {
        const createdUser = response.data.addUser;
        alert(`User created successfully! User ID: ${createdUser.id}`);
        // Navigate to Login after successful registration
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Registration failed', err);
        alert(err.message || 'Registration failed. Please try again later.');
      },
    });
  }

  // Login User
  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.registerService.loginUser(credentials).subscribe({
        next: (response: any) => {
          const tokens = response.data.login;
          // Save tokens to localStorage or sessionStorage
          localStorage.setItem('access_token', tokens.access_token);
          localStorage.setItem('refresh_token', tokens.refresh_token);

          alert('Logged in successfully');
          // Set flag in localStorage
          localStorage.setItem('hasVisitedAuth', 'true');

          // Navigate to the main page
          this.router.navigate(['/category/1']);
        },
        error: (err: any) => {
          console.error('Login failed', err);
          alert(err.message || 'Login failed. Please check your credentials and try again.');
        },
      });
    }
  }
}