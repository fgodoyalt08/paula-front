import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private route: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(
      params=>{
        
        var headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + localStorage.getItem('at')
        });

        return this.http.get('http://127.0.0.1:8000/api/auth/user', {
            headers: headers
        })
        .subscribe(
          res => {
            localStorage.setItem('u', JSON.stringify(res));
        },err => {
          localStorage.clear();
          this.route.navigate(['/ingresar']);
        },
        () => console.log('yay'))

      }
    )
  }

}
