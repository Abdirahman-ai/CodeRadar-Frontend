import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContributionService } from '../../services/contribution.service';

@Component({
  selector: 'app-contribution-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contribution-list.component.html',
  styleUrls: ['./contribution-list.component.scss']
})
export class ContributionListComponent implements OnInit {
  contributions: any[] = [];

  constructor(private contributionService: ContributionService) {}

  ngOnInit(): void {
    this.contributionService.getAllContributions().subscribe(data => {
      this.contributions = data;
    });
  }
}
