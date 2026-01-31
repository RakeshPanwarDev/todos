import { Component, signal } from '@angular/core';
import { ReviewService } from '../services/review';



export interface Review{
  id: number;
  name: string;
  job: string;
  image: string;
  comment: string;
} 

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.html',
  styleUrl: './review.css',
})
export class Review {

  reviews: Review[] = [];
  currentIndex=signal(0);
  loading=signal(true);

  constructor(private reviewService: ReviewService) {}

  get currentReview(): Review | null {
    return this.reviews.length > 0 ? this.reviews[this.currentIndex()] : null;
  }

  ngOnInit() {
    this.reviewService.getReviews().subscribe((data: Review[]) => {
      this.reviews = data;
      this.loading.set(false);
    });
  }

  nextReview() {
    let index=this.currentIndex()+1;
    if (index >= this.reviews.length) {
      index = 0;
    }
    this.currentIndex.set(index);
  }

  prevReview() {
    let index=this.currentIndex()-1;
    if (index < 0) {
      index = this.reviews.length - 1;
    }   
    this.currentIndex.set(index);
  }
  randomReview() {
    let index = Math.floor(Math.random() * this.reviews.length);  
    this.currentIndex.set(index);
  }  
}