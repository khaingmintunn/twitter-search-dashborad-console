import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { MatTableDataSource } from '@angular/material';
import { Sort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
declare var require: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [
    DatePipe
  ]
})
export class UserComponent implements OnInit {
  users = []
  sortDirection = '';
  sortActive = '';
  public dataSource = new MatTableDataSource<Element>();
  displayedColumns: string[] = ['keyword', 'tweetId', 'userName', 'userScreenName', 'originalText', 'followerCount', 'createdAt'];
  constructor(
    private dashboardservice: DashboardService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  public sortDataByMatHeader(sort: Sort) {
    this.sortActive = sort.active;
    this.sortDirection = sort.direction;
    this.getSortData();
  }

  getSortData() {
    const data = this.users
    let dataSource = [];
    dataSource = data.sort((a, b) => {
      const isAsc = this.sortDirection === 'asc';
      switch (this.sortActive) {
        case 'keyword': return this.compare(a.keyword, b.keyword, isAsc)
        case 'tweetId': return this.compare(a.tweet_id_str, b.tweet_id_str, isAsc)
        case 'userName': return this.compare(a.user_name, b.user_name, isAsc)
        case 'originalText': return this.compare(a.original_text, b.original_text, isAsc)
        case 'userScreenName': return this.compare(a.user_screen_name, b.user_screen_name, isAsc)
        case 'followerCount': return this.compare(a.followers_count, b.followers_count, isAsc)
        case 'createdAt': return this.compare(this.datePipe.transform(a.tweet_created_at, 'MM/dd/yyyy HH:mm'),
          this.datePipe.transform(b.tweet_created_at, 'MM/dd/yyyy HH:mm'), isAsc);
        default: return 0;
      }
    })
    this.dataSource.data = dataSource
  }

  compare(a, b, isAsc) {
    if (this.checkNullOrEmpty(a) || a < b) {
      return -1 * (isAsc ? 1 : -1);
    }
    if (this.checkNullOrEmpty(b) || a > b) {
      return 1 * (isAsc ? 1 : -1);
    }
    return 0;
  }

  checkNullOrEmpty(data: any) {
    if (data === null || data === undefined || data === '') {
      return true;
    }
    return false;
  }

  getUsers() {
    new Promise(accept => this.dashboardservice.getUsers().subscribe((data) => {
      this.users = data.users
      this.dataSource.data = this.users;
    }, accept));
  }
}
