import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hn } from '../../hn.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './News.component.html',
  styleUrls: ['./News.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  hits = [];
  comments = [];
  currentPage = 0;
  nbPages: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Hn
  ) { }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.doRequest(id);
  }

  doRequest(id, page = 0) {
    this.subscriptions.add(
      this.service.getItemComments(id, this.currentPage).subscribe((p: {hits: [], page: number, nbPages: number}) => {
        // if not found comments redirect to 404
        if (p.hits.length < 1) {
          this.router.navigate(['**']);
          return;
        }
        this.nbPages = p.nbPages;
        this.currentPage = p.page;
        this.hits = [...this.hits, ...p.hits];
        if (this.nbPages - 1 === this.currentPage) {
          this.generateCommentTree(this.hits)
          return;
        }
        this.currentPage++;
        this.doRequest(id, this.currentPage);
      })
    );
  }

  generateCommentTree(arr) {
    this.comments = arr.filter(a => a.parent_id === a.story_id);
    this.generateChilds(this.comments);
    console.log(this.comments)
  }

  generateChilds(arr) {
    arr.forEach(a => {
      let id = +a.objectID;
      a.childs = this.hits.filter(b => b.parent_id === id);

      if(a.childs.length > 0) {
        this.generateChilds(a.childs)
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
