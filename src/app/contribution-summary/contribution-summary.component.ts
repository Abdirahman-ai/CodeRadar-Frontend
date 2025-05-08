import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContributionService, ContributionSummary } from '../services/contribution.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-contribution-summary',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './contribution-summary.component.html',
  styleUrl: './contribution-summary.component.scss'
})
export class ContributionSummaryComponent implements OnInit {
  summary: ContributionSummary[] = [];
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private contributionService: ContributionService
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.contributionService.getSummaryByProjectId(this.projectId).subscribe((data) => {
      this.summary = data;
    });
  }
}
