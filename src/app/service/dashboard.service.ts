import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private endpoint = environment.endpoint;
  private authUserSubject = new Subject<any>();
  authUser$: Observable<any> = this.authUserSubject.asObservable();
  constructor(private http: HttpClient) { }
  getHashTags(hashtag): Observable<any> {
    return this.http.get(this.endpoint + 'hashtag', { params: { hashtag } });
  }

  login(user): Observable<any> {
    return this.http.post(this.endpoint + 'login', user);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.endpoint + 'get');
  }

  getTags(): Observable<any> {
    return this, this.http.get(this.endpoint + 'tag');
  }

  saveUsers(users): Observable<any> {
    return this.http.post(this.endpoint + 'save', { users });
  }

  deleteTag(hashtag): Observable<any> {
    return this.http.delete(this.endpoint + 'tag', { params: { hashtag } });
  }

  replyTweet(reply): Observable<any> {
    return this.http.post(this.endpoint + 'reply', reply);
  }

  async isLoggedIn() {
    if (localStorage.getItem('user')) {
      await this.authUserSubject.next(localStorage.getItem('user'));
    } else {
      await this.authUserSubject.next(null);
    }
  }
}
