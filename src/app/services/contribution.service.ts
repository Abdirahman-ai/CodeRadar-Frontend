import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContributionSummary {
  userId: number;
  githubUsername: string;
  commits: number;
  linesOfCode: number;
  pullRequests: number;
  issues: number;
  commitPercentage: number;
  locPercentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class ContributionService {
  private apiUrl = 'http://localhost:8080/api/contributions';

  constructor(private http: HttpClient) {}

  getSummaryByProjectId(projectId: number): Observable<ContributionSummary[]> {
    return this.http.get<ContributionSummary[]>(
      `${this.apiUrl}/summary/project/${projectId}`
    );
  }

  getAllContributions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }  
}

