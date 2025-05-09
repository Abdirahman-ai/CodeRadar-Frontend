import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContributionSummaryComponent } from './contribution-summary/contribution-summary.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'summary/:projectId', component: ContributionSummaryComponent }
];
