import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../services/project.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule, NgChartsModule], 
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  onCreateProject(): void {
    this.router.navigate(['/projects/new']);
  }

  onLogout(): void {
    // Clear stored auth/session data if any
    sessionStorage.clear();
    localStorage.clear();

    // Redirect to login
    this.router.navigate(['/login']);
  }
}
