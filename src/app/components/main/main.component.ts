import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from 'src/app/interfaces/news';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private allIDs = [];
  private filteredIDs = [];

  public newsList: News[] = [];
  private newsCounter: number = 0;

  private idSubscription!: Subscription;
  private newsSubscription!: Subscription;

  constructor(private _fetch: MainService) { }

  ngOnInit(): void {
    this.idSubscription = this._fetch.getNewsIDs()
      .subscribe(
        res => {
          this.allIDs = res;
          this.filterNewsIDs();
          this.getNews();
        }
      );

  }

  filterNewsIDs() {
    for( let i = this.newsCounter ; i < (this.newsCounter + 10); i++) {
      this.filteredIDs.push(this.allIDs[i]);
    }
    this.newsCounter = this.newsCounter + 10;
  }
  getNews() {
    for (let i = this.newsCounter - 10; i < this.filteredIDs.length; i++) {
      this.newsSubscription = this._fetch.getNewsByID(this.filteredIDs[i])
      .subscribe(res => this.newsList.push(res));
    }
  }

  loadMore() {
    this.filterNewsIDs();
    this.getNews();
  }
}
