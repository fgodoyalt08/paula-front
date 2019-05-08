import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public categories = {1: 'Labiales', 2: 'Perfumes', 3: 'Joyería'}
  public numbers = Array(10).fill(4); // [4,4,4,4,4]

  constructor() { }

  ngOnInit() {
    
  }

  showDelete() {
    
  }

}
