import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.dashboardForm = this.fb.group({
      projectName: ['', Validators.required]
    });
  }

  onCreate(): void {
    const projectName = this.dashboardForm.value.projectName;

    // we can route to /create-project with the name as a query param if needed
    console.log('Creating project:', projectName);
    this.router.navigate(['/projects/new'], { queryParams: { name: projectName } });
  }
}
