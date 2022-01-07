import { Component, OnInit } from '@angular/core';
import { AllegroService } from 'src/app/services/allegro.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  constructor(private allegroService: AllegroService) {}

  ngOnInit(): void {
    this.allegroService
      .getProducts()
      .then((data) =>
        data.subscribe((response) => console.log(response.items)),
      );
  }
}
