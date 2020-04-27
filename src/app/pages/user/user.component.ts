import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users = []
  public dataSource = new MatTableDataSource<Element>();
  displayedColumns: string[] = ['keyword', 'tweetId', 'userName', 'userScreenName', 'originalText', 'followerCount', 'createdAt'];
  constructor(private dashboardservice: DashboardService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    new Promise(accept => this.dashboardservice.getUsers().subscribe((data) => {
      this.users = data.users
      this.dataSource.data = this.users;
    }, accept));
  }
}
