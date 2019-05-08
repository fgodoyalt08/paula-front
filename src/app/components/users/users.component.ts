import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public numbers = Array(10).fill(4); // [4,4,4,4,4]

  constructor() { }

  ngOnInit() {
    
  }

  showDelete() {
    
  }

}
