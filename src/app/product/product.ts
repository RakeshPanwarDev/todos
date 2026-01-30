import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {

  search = signal("");

  products = signal<string[]>(["phone", "tablet", "keyboard", "mouse"]);

  filteredProducts = signal<string[]>(this.products());

  constructor(private router: Router, private route: ActivatedRoute) {
    //URL to signal
    this.route.queryParamMap.subscribe(params => {
      this.search.set(params.get('search') || '')
    });
    //signal to UI update
    effect(() => {
      const value = this.search().toLowerCase();
      this.filteredProducts.set(this.products().filter(product => product.toLowerCase().includes(value)));
    });
  }

  updateUrl() {
    this.router.navigate([], {
      queryParams: { search: this.search() }
    })
  }

}
