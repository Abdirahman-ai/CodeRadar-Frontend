import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  projectForm!: FormGroup;
  githubForm!: FormGroup;
  users: User[] = [];
  mode: 'manual' | 'github' = 'manual';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      repoUrl: ['', Validators.required],
      userIds: [[]]
    });

    this.githubForm = this.fb.group({
      repoUrl: ['', Validators.required],
      personalAccessToken: ['', Validators.required]
    });

    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  onSubmitManual(): void {
    if (this.projectForm.invalid) return;

    const { name, repoUrl, userIds } = this.projectForm.value;

    const contributions = userIds.map((id: number) => ({
      userId: id,
      commits: 0,
      linesOfCode: 0,
      pullRequests: 0,
      issues: 0
    }));

    this.projectService.createProject({ name, repoUrl, contributions }).subscribe(project => {
      this.router.navigate(['/summary', project.id]);
    });
  }

  onSubmitGitHub(): void {
    if (this.githubForm.invalid) return;

    const { repoUrl, personalAccessToken } = this.githubForm.value;

    this.projectService.importFromGitHub({ repoUrl, personalAccessToken }).subscribe(project => {
      this.router.navigate(['/summary', project.id]);
    });
  }
}
