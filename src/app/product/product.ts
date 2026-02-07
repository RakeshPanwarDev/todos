import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {

  search = signal("");

  products = signal<string[]>(["phone", "tablet", "keyboard", "mouse"]);

  filteredProducts = signal<string[]>(this.products());

  stateList=[
    { stateId: 1, stateName: 'Maharastra' },
    { stateId: 2, stateName: 'Gujarat' },
    { stateId: 3, stateName: 'Rajasthan' },
    { stateId: 4, stateName: 'Punjab' }
  ];

  cityList=[
    { cityId: 1, cityName: 'Mumbai', stateId: 1 },
    { cityId: 2, cityName: 'Pune', stateId: 1 },
    { cityId: 3, cityName: 'Ahmedabad', stateId: 2 },
    { cityId: 4, cityName: 'Rajkot', stateId: 2 },
    { cityId: 5, cityName: 'Jaipur', stateId: 3 },
    { cityId: 6, cityName: 'Udaipur', stateId: 3 },
    { cityId: 7, cityName: 'Ludhiana', stateId: 4 },
    { cityId: 8, cityName: 'Amritsar', stateId: 4 }
  ];

  selectedStateId: number | null = null;
  citiesForSelectedState: any[] = [];

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

  onCountryChange(event: any) {
    console.log(event.target.value);
    this.citiesForSelectedState =this.cityList.filter(city=>city.stateId===+event.target.value);
    
  }
}
