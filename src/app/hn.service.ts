import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Res {
  nbPages: number,
  page: number,
  hits: Array<Hit>
}

export interface Hit {
  author: string,
  created_at: string,
  num_comments: number,
  objectID: string,
  title: string,
  url: string,
  points: number
}

@Injectable({
  providedIn: 'root'
})
export class Hn {
  _url = 'https://hn.algolia.com/api/v1'
  constructor(private http: HttpClient) { }

  getNews(page = 0) {
    return this.http.get(`${this._url}/search`, {
      params: {
        tags: 'front_page',
        page: page + ''
      }
    }).pipe(
      map( (res: Res) => {
        let result = {
          hits: [],
          nbPages: res.nbPages,
          page: res.page
        };
        res.hits.map(({author, created_at, num_comments, objectID, title, url, points}) => {
          result.hits.push({
            author,
            created_at,
            num_comments,
            objectID,
            title,
            url,
            points
          })
        })
        return result
      })
    )
  }

  getItemComments(id: string, page = 0) {
    return this.http.get(`${this._url}/search`, {
      params: {
        tags: `comment,story_${id}`,
        page: page + ''
      }
    })
  }
}
