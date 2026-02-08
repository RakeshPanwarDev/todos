import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  
  private http=inject(HttpClient);

  baseUrl = 'http://localhost:3000/leaves';

  getLeaves():Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

}
