import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../service/dashboard.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Sort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ReplyMessageDialogComponent } from '../../components/reply-message-dialog/reply-message-dialog.component'
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
  message: '';
  sortDirection = '';
  sortActive = '';
  inputChangeStatus = false;
  currentPage = 0;
  showGeneratedText = [];
  tempEditGeneratedText;
  retData: any;
  filteredResult: [];
  selectedItems: object[] = [];
  public dataSource = new MatTableDataSource<Element>();
  displayedColumns: string[] = ['isReply', 'keyword', 'tweetId', 'userName', 'userScreenName', 'originalText', 'followerCount', 'createdAt'];

  filterForm = new FormGroup({
    keyword: new FormControl(''),
    tweetId: new FormControl(''),
    userName: new FormControl(''),
    userScreenName: new FormControl(''),
    originalText: new FormControl(''),
    followerCount: new FormControl(''),
    createdAt: new FormControl(''),
  });
  constructor(
    private dashboardservice: DashboardService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUsers()
    this.getValueByChangeFormControl()
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

  getValueByChangeFormControl() {
    this.filterForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(() => {
        if (this.inputChangeStatus === true) {
          this.inputChangeStatus = false;
        } else {

        }
        this.currentPage = 0;
        const i = this.showGeneratedText.indexOf(false);
        if (i >= 0) {
          this.showGeneratedText[i] = true;
          this.dataSource.data[i]['generated_text'] = this.tempEditGeneratedText;
        }
        setTimeout(() => {
          this.retData = this.users
          this.applyFilter();
        }, 500);
      })
    this.filterForm.get('keyword').valueChanges.subscribe(x => {
      this.inputChangeStatus = true;
    });
  }

  applyFilter() {
    let temp = this.retData;
    if (!this.checkNullOrEmpty(this.filterForm.value.keyword)) {
      temp = this.filterDataByValue('keyword', this.filterForm.value.keyword, temp);
    }

    if (!this.checkNullOrEmpty(this.filterForm.value.tweetId)) {
      temp = this.filterDataByValue('tweetId', this.filterForm.value.tweetId, temp);
    }

    if (!this.checkNullOrEmpty(this.filterForm.value.userName)) {
      temp = this.filterDataByValue('userName', this.filterForm.value.userName, temp);
    }

    if (!this.checkNullOrEmpty(this.filterForm.value.userScreenName)) {
      temp = this.filterDataByValue('userScreenName', this.filterForm.value.userScreenName, temp);
    }

    if (!this.checkNullOrEmpty(this.filterForm.value.originalText)) {
      temp = this.filterDataByValue('originalText', this.filterForm.value.originalText, temp);
    }

    if (!this.checkNullOrEmpty(this.filterForm.value.followerCount)) {
      temp = this.filterDataByValue('followerCount', this.filterForm.value.followerCount, temp);
    }

    if (!this.checkNullOrEmpty(this.filterForm.value.createdAt)) {
      temp = this.filterDataByValue('createdAt', this.filterForm.value.createdAt, temp);
    }
    this.filteredResult = temp;
    this.dataSource.data = this.filteredResult;
  }

  filterDataByValue(key: string, filterOne: any, dataArray: any) {
    const filterResult = [];
    if (key === undefined || filterOne === 'no-selected') {
      if (filterOne === 'no-selected') {
        this.filterForm.patchValue({
          status: ''
        });
      }
      return dataArray;
    }
    for (let eachData of dataArray) {
      if (key === 'createdAt') {
        const datetime = new Date(eachData.tweet_created_at);
        datetime.setHours(datetime.getHours() + 9);
        const dataDate = this.datePipe.transform(datetime, 'MM/dd/yyyy');
        const dataFilterDate = this.datePipe.transform(filterOne, 'MM/dd/yyyy');
        if (dataDate === dataFilterDate) {
          filterResult.push(eachData);
        }
      } else if (key === 'keyword') {
        if (eachData.keyword.toLowerCase().indexOf(filterOne.toLowerCase()) > -1) {
          filterResult.push(eachData);
        }
      } else if (key === 'tweetId') {
        if (eachData.tweet_id_str.toLowerCase().indexOf(filterOne.toLowerCase()) > -1) {
          filterResult.push(eachData);
        }
      } else if (key === 'userName') {
        if (eachData.user_name.toLowerCase().indexOf(filterOne.toLowerCase()) > -1) {
          filterResult.push(eachData);
        }
      } else if (key === 'userScreenName') {
        if (eachData.user_screen_name.toLowerCase().indexOf(filterOne.toLowerCase()) > -1) {
          filterResult.push(eachData);
        }
      } else if (key === 'originalText') {
        if (eachData.original_text.toLowerCase().indexOf(filterOne.toLowerCase()) > -1) {
          filterResult.push(eachData);
        }
      } else if (key === 'followerCount') {
        if (Number(eachData.followers_count) >= Number(filterOne)) {
          filterResult.push(eachData);
        }
      }
    }
    return filterResult
  }

  getUsers() {
    new Promise(accept => this.dashboardservice.getUsers().subscribe((data) => {
      data.users.map(user => {
        user.is_check = false
      })
      this.users = data.users
      this.filteredResult = data.users;
      this.dataSource.data = this.filteredResult;
    }, accept));
  }

  selectedItem(item) {
    if (item.is_check) {
      this.selectedItems.push(item)
    }
  }

  isCheckItem() {
    const selected = this.selectedItems.filter(item => {
      return item.is_check === true
    })
    return selected.length > 0 ? true : false;
  }

  replyMessage() {
    const selected = this.selectedItems.filter(item => {
      return item.is_check === true
    })
    const submitMsgDialogRef = this.dialog.open(ReplyMessageDialogComponent, {
      width: '500px',
      panelClass: 'submit-msg-overlay-pane',
      autoFocus: false,
      data: selected
    });
    submitMsgDialogRef.afterClosed().subscribe(data => {
      if (data) {
        const replyParams = {
          text: data,
          tweets: selected
        }
        this.dashboardservice.replyTweet(replyParams).subscribe(data => {
          this.message = 'Tweet reply successfully.';
          this.selectedItems = []
          selected.map(item => {
            item.is_check = false
          })
        })
        setTimeout(() => {
          this.message = ''
        }, 5000)
      }
    });
  }
}
