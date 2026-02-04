import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { decrement, increment, reset } from '../store/counter.action';
import { counterFeature } from '../store/counter.feature';

@Component({
  selector: 'app-counter',
  imports: [AsyncPipe],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {


  name = 'Angular';
  value = '';

  counter = signal(0);
  counter1 = 0;
  counter$ = new BehaviorSubject(0);
  ngrxCounter$!: Observable<number>;

  constructor(private store:Store) {
    this.ngrxCounter$ = this.store.select(counterFeature.selectCounterState);
  }

  onInput(value: any) {
    this.value = value.target.value;
  }

  handleEvent(action: string) {
    if (action === 'plus') this.counter1++;
    else if (action === 'minus') {
      if (this.counter1 >= 1) this.counter1--;
    } else if (action === 'reset') {
      this.counter1 = 0;
    }
  }
  handleEventWithSignal(action: string) {
    if (action === 'plus') this.counter.update((count) => count + 1);
    else if (action === 'minus') {
      if (this.counter() >= 1) this.counter.update((count) => count - 1);
    } else if (action === 'reset') {
      this.counter.set(0);
    }
  }
  handleEventWithRxjs(action: string) {
    if (action === 'plus') {
      this.counter$.next(this.counter$.value + 1);
    } else if (action === 'minus') {
      if (this.counter$.value >= 1) this.counter$.next(this.counter$.value - 1);
    } else if (action === 'reset') {
      this.counter$.next(0);
    }
  }

  handleEventWithNgrx(action: string) {
    if (action === 'plus') {
      this.store.dispatch(increment());
    } else if (action === 'minus') {
      this.store.dispatch(decrement());
    } else if (action === 'reset') {
      this.store.dispatch(reset());
    }
  }
}