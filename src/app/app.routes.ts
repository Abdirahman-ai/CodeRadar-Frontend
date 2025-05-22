import { Routes } from '@angular/router';
import { HomeComponent } from './homepage/homepage.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContributionSummaryComponent } from './contribution-summary/contribution-summary.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { ContributionListComponent } from './contributions/contribution-list/contribution-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/new', component: CreateUserComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'projects/new', component: CreateProjectComponent },
    { path: 'summary/:projectId', component: ContributionSummaryComponent },
    { path: 'contributions', component: ContributionListComponent },
];
