import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../review/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  apiUrl = 'http://localhost:3000/reviews';
  constructor(private http: HttpClient) {}
  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }
}
