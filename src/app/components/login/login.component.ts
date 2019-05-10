import { Component, OnInit } from '@angular/core' ;
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Text } from '@angular/compiler';
import * as $ from 'jquery';
import { NotificationService } from '../../_services/toastr-notification.service';  
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute, private http: HttpClient, private _notificationservice:NotificationService, private route: Router) {}
  
  private oauthUrl = "http://127.0.0.1:8000/api/auth/login";
    public user:any; 
    public password:any;
    public remember:boolean=false;

  ngOnInit() {
    document.body.className = "newbg";
  }

  login() {

  	var headers = new HttpHeaders({
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    });

    let postData = {
        email: this.user,
        password: this.password,
        remember_me: this.remember
    }
    console.warn(postData);
    return this.http.post(this.oauthUrl, postData, {
        headers: headers
    })
    .subscribe(
      res => {
         if(typeof(res['access_token']) == "string"){
           localStorage.setItem('at', res['access_token']);
           this.route.navigate(['/inicio/perfil'])
         }else{
           this.showErrorNotification("Ops, intentelo nuevamente")
         }
    },err => {
      if (typeof err.error.message != "undefined")
        if(err.error.message.includes("users_email_unique")){
            this.showErrorNotification("El correo ya está registrado")
        }else if(err.error.message.includes("Unauthorized")){
            this.showErrorNotification("Los datos son incorrectos")
        }

      if(typeof(err.error.errors) != "undefined")
      if(typeof Object.keys(err.error.errors) == "object"){
        let msg = '';
        Object.keys(err.error.errors).forEach( (e, key) => {
          console.warn(err.error.errors[e])
          msg += e + " : " + err.error.errors[e] + '<br>';
        });
        this.showErrorNotification(msg);
      }
      //debugger;
    },
    () => console.log('yay'))
  }

  public showSuccessNotification(msg){  
    this._notificationservice.success(msg);  
  }  
  
  public showErrorNotification(msg){  
    this._notificationservice.error(msg);  
  }  

}