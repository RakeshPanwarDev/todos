import { Component, inject, signal } from '@angular/core';
import { LeaveService } from '../../../services/leave-service';

@Component({
  selector: 'app-leave-list',
  imports: [],
  templateUrl: './leave-list.html',
  styleUrl: './leave-list.css',
})
export class LeaveList {

  leaveService=inject(LeaveService);

  leaves=signal<any[]>([]);

  ngOnInit() {
    this.leaveService.getLeaves().subscribe((leaves: any[]) => {
      this.leaves.set(leaves);
    });
  }

}
