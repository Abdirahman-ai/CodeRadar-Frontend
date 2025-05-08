import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
