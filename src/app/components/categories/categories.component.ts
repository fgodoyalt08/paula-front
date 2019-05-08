import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public categories = {1: 'Labiales', 2: 'Perfumes', 3: 'Joyería'}
  public numbers = Array(10).fill(4); // [4,4,4,4,4]

  constructor() { }

  ngOnInit() {
    
  }

  showDelete() {
    
  }

}
