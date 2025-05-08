import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ContributionSummary } from '../../services/contribution.service';

import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-contribution-pie',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './contribution-pie.component.html',
  styleUrls: ['./contribution-pie.component.scss']
})
export class ContributionPieComponent implements OnChanges {
  @Input() summary: ContributionSummary[] = [];

  commitLabels: string[] = [];
  commitData: number[] = [];

  locLabels: string[] = [];
  locData: number[] = [];

  commitChart: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };
  locChart: ChartConfiguration<'pie'>['data'] = { labels: [], datasets: [] };

  ngOnChanges(): void {
    this.commitLabels = this.summary.map(s => s.githubUsername);
    this.commitData = this.summary.map(s => s.commits);

    this.locLabels = this.summary.map(s => s.githubUsername);
    this.locData = this.summary.map(s => s.linesOfCode);

    this.commitChart = {
      labels: this.commitLabels,
      datasets: [{ data: this.commitData }]
    };

    this.locChart = {
      labels: this.locLabels,
      datasets: [{ data: this.locData }]
    };
  }

  chartType: ChartType = 'pie';
}
