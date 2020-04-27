import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { MatTableDataSource } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public hashTagForm = new FormGroup({
    hashtag: new FormControl('', Validators.required)
  });
  hashtags = []
  users = []
  userlist = []
  selectedItems = []
  message = ''
  public dataSource = new MatTableDataSource<Element>();
  displayedColumns: string[] = ['isSaved', 'keyword', 'tweetId', 'userName', 'userScreenName', 'originalText', 'followerCount', 'createdAt'];
  constructor(
    private dashboardservice: DashboardService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getHashTag('')
  }

  async getHashTag(hashtag) {
    this.getUsers();
    if (!this.hashTagForm.value.hashtag && !hashtag) {
      this.getTags()
    } else {
      const hashTagParam = this.hashTagForm.value.hashtag ? this.hashTagForm.value.hashtag : hashtag
      await new Promise(accept => this.dashboardservice.getHashTags(hashTagParam).subscribe(async (data) => {
        this.users = data.users
        this.hashtags = data.hash_tags.keywords
        await Promise.all(this.users.map(user => {
          user.keyword = hashTagParam
          if (this.userlist.find(u => u.tweet_id_str === user.tweet_id_str)) {
            user.is_saved = true
          } else {
            user.is_saved = false
          }
        }))
        this.dataSource.data = this.users;
      }, accept));
    }
  }

  getUsers() {
    new Promise(accept => this.dashboardservice.getUsers().subscribe((data) => {
      this.userlist = data.users
    }, accept))
  }

  getTags() {
    new Promise(accept => this.dashboardservice.getTags().subscribe((data) => {
      this.hashtags = data.hash_tags.keywords
    }, accept))
  }

  selectedItem(item) {
    if (item.is_saved) {
      this.selectedItems.push(item)
    }
  }

  isSelected(id) {
    if (this.selectedItems.find(a => a.tweet_id_str === id)) return true;
    else false;
  }

  saveUser() {
    if (this.selectedItems.length < 1) return;
    const users = this.selectedItems.filter(item => {
      return item.is_saved === true
    })
    new Promise(accept => this.dashboardservice.saveUsers(users).subscribe((data) => {
      this.message = 'Successfully Saved.'
    }, accept))
    setTimeout(() => {
      this.message = ''
    }, 5000)
    this.selectedItems = []
    this.users.map(user => {
      if (user.find(u => u.tweet_id_str === user.tweet_id_str)) {
        user.is_saved = true
      }
    })
  }

  deleteTag(tag) {
    this.dashboardservice.deleteTag(tag).subscribe((data) => {
      this.hashtags = data.hash_tags.keywords
    });
  }

}
