import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  repoUrl: string;
}

export interface GitHubImportRequest {
  repoUrl: string;
  personalAccessToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(project: any): Observable<Project> {
    return this.http.post<Project>(this.apiUrl, project);
  }

  importFromGitHub(request: GitHubImportRequest): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/github-import`, request);
  }
}
