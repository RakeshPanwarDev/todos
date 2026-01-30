import { Routes } from '@angular/router';
import { Product } from './product/product';
import { UserList } from './user-list/user-list';
import { Todo } from './todo/todo';
import { Counter } from './counter/counter';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
    { path: "home", component: Home },
    { path: "product", component: Product },
    { path: "counter", component: Counter },
    { path: "users", component: UserList },
    { path: "todo", component: Todo },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { path: "**", component: PageNotFound }
];
