import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContributionService, ContributionSummary } from '../services/contribution.service';
import { ProjectService, Project } from '../services/project.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-contribution-summary',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, NgChartsModule],
  templateUrl: './contribution-summary.component.html',
  styleUrls: ['./contribution-summary.component.scss']
})
export class ContributionSummaryComponent implements OnInit {
  summary: ContributionSummary[] = [];
  projects: Project[] = [];
  selectedProjectId!: number;

  chartType: ChartType = 'pie';
  commitChart: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  locChart: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };

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

      this.commitChart = {
        labels: data.map(d => d.githubUsername),
        datasets: [{ data: data.map(d => d.commits) }]
      };

      this.locChart = {
        labels: data.map(d => d.githubUsername),
        datasets: [{ data: data.map(d => d.linesOfCode) }]
      };
    });
  }

  onProjectChange(event: Event): void {
    const id = Number((event.target as HTMLSelectElement).value);
    this.selectedProjectId = id;
    this.router.navigate(['/summary', id]);
    this.fetchSummary(id);
  }

  get totalCommits() {
    return this.summary.reduce((sum, s) => sum + s.commits, 0);
  }

  get totalLinesOfCode() {
    return this.summary.reduce((sum, s) => sum + s.linesOfCode, 0);
  }

  get totalChanges() {
    return this.summary.reduce((sum, s) => sum + s.pullRequests + s.issues, 0);
  }
}
