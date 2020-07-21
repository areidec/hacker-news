import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hn, Hit } from '../../hn.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './MainPage.component.html',
  styleUrls: ['./MainPage.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  hits: Hit[];
  currPage: number;
  lastPage: number;
  loading = true;
  lastItem = 0;

  constructor(public service: Hn) { }

  ngOnInit(): void {
    this.subscriptions.add(this.service.getNews().subscribe(p => {
      this.hits = p.hits;
      this.currPage = p.page;
      this.lastPage = p.nbPages;
      this.loading = false;
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  showMore():void {
    this.loading = true;
    this.currPage++;
    this.subscriptions.add(this.service.getNews(this.currPage).subscribe(p => {
      this.lastItem = this.hits.length;
      this.hits = p.hits;
      this.loading = false;
    }))
  }
}
