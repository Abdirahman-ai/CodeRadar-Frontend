import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContributionService, ContributionSummary } from '../services/contribution.service';
import { ProjectService, Project } from '../services/project.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ContributionPieComponent } from '../charts/contribution-pie/contribution-pie.component';

@Component({
  selector: 'app-contribution-summary',
  standalone: true,
  imports: [CommonModule, NgFor, ContributionPieComponent],
  templateUrl: './contribution-summary.component.html',
  styleUrls: ['./contribution-summary.component.scss']
})
export class ContributionSummaryComponent implements OnInit {
  summary: ContributionSummary[] = [];
  projects: Project[] = [];
  selectedProjectId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contributionService: ContributionService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.selectedProjectId = Number(this.route.snapshot.paramMap.get('projectId'));

    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });

    this.fetchSummary(this.selectedProjectId);
  }

  fetchSummary(projectId: number): void {
    this.contributionService.getSummaryByProjectId(projectId).subscribe(data => {
      this.summary = data;
    });
  }

  onProjectChange(event: Event): void {
    const id = Number((event.target as HTMLSelectElement).value);
    this.selectedProjectId = id;
    this.router.navigate(['/summary', id]);
    this.fetchSummary(id);
  }
}

