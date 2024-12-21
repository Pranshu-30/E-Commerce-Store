
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../service/profile.service'; // Create and use this service

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService, // Inject ProfileService
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  // Load profile data from backend
  loadProfileData() {
    this.isLoading = true;
    this.profileService.getUserProfile().subscribe({// make an HTTP request to a backend API endpoint to fetch the user's profile data.

      next: (profileData: any) => {
        this.profileForm.patchValue({
          name: profileData.name,
          address: profileData.address,
          phone: profileData.phone,
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load profile data', err);
        this.isLoading = false;
      },
    });
  }

  // Update profile data to backend
  onUpdateProfile() {
    if (this.profileForm.invalid) {
      return;
    }

    const profileData = this.profileForm.value;//Extracts the form values using this.profileForm.value.

    this.profileService.updateUserProfile(profileData).subscribe({//ends the updated profile to the backend API.
      next: (response: any) => {
        alert('Profile updated successfully!');
        console.log('Updated profile:', response);
      },
      error: (err: any) => {
        console.error('Failed to update profile', err);
        alert('Failed to update profile. Please try again.');
      },
    });
  }

  // Optional: Navigate away (e.g., to home) after update
  onSubmit() {
    this.router.navigate(['']);//n used after successfully saving or updating data.
  }
}


