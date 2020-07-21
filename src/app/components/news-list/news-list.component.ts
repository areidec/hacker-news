import { Component, OnInit, Input } from '@angular/core';
import { Hit } from '../../hn.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @Input() hits: Hit[];
  @Input() lastItem: number;

  constructor() { }
  ngOnInit(): void { }
}
