import { Component, Input, OnInit } from '@angular/core';
import { News } from 'src/app/interfaces/news';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() newsDetail: News = {
    id: 0,
    url: '',
    by: '',
    title: '',
    time: 0,
    text: '',
    type: '',
    score: 0,
    descendants: 0
  }

  newsTime !: string;

  constructor() { }

  ngOnInit(): void {
    this.toDate(this.newsDetail.time);
  }

  toDate($unix: number) {
    const date = new Date($unix * 1000);
    const dateString = date.toLocaleDateString();
    this.newsTime = dateString;
  }

}
