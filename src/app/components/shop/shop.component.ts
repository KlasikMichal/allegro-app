import { Component, OnInit } from '@angular/core';
import { AllegroService } from 'src/app/services/allegro.service';
import Products from 'src/app/types/products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  public products!: Products[];
  public text: string = 'Wyszukaj produkt';
  public searchText: string = '';

  constructor(private allegroService: AllegroService) {}

  ngOnInit(): void {
    this.allegroService
      .getProducts()
      .then((data) =>
        data.subscribe((response) => (this.products = response.items.regular)),
      );
  }

  clear() {
    this.text = '';
  }

  inputText(event: any) {
    this.searchText = event.target.value;
  }

  search() {
    this.allegroService
      .getProducts(this.searchText)
      .then((data) =>
        data.subscribe((response) => (this.products = response.items.promoted)),
      );
  }
}
