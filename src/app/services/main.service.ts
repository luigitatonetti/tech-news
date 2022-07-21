import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _url: string = 'https://hacker-news.firebaseio.com/v0/';

  constructor(private http: HttpClient) { }

  getNewsIDs() {
    return this.http.get<[]>(this._url + 'newstories.json');
  }

  getNewsByID(id: number): Observable<News> {
    return this.http.get<News>(this._url + `item/${id}.json`);
  }
}
