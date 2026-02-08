import { Routes } from '@angular/router';
import { Product } from './product/product';
import { UserList } from './user-list/user-list';
import { Todo } from './todo/todo';
import { Counter } from './counter/counter';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';
import { ColorPicker } from './color-picker/color-picker';
import { Review } from './review/review';
import { EmployeeList } from './ems/feature/employee-list/employee-list';
import { EmsHome } from './ems/ems-home/ems-home';
import { LeaveList } from './ems/feature/leave-list/leave-list';
import { Dashboard } from './ems/feature/dashboard/dashboard';

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "color", component: ColorPicker },
    { path: "review", component: Review },
    { path: "product", component: Product },
    { path: "counter", component: Counter },
    { path: "users", component: UserList },
    { path: "todo", component: Todo },
    { path: "ems", component: EmsHome,
        children: [
            { path: "employees", component: EmployeeList },
            { path: "dashboard", component: Dashboard },
            { path: "leave", component: LeaveList },
            {redirectTo: 'dashboard', pathMatch: 'full', path: '' }
        ]
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: "**", component: PageNotFound }
];
