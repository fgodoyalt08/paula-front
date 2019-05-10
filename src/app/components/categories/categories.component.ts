import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Form, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { NotificationService } from '../../_services/toastr-notification.service';  

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:any;
 
  formCategories:FormGroup;

  constructor(private _notificationservice:NotificationService, private  http:HttpClient) {
    this.formCategories= new FormGroup({
      name: new FormControl('',Validators.required),
      parent: new FormControl('',Validators.required)
    })

    this.getCategories()
  }

  ngOnInit() {
    
  }

  showDelete() {
    
  }

  guardarCategory(){

    let headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('at')
    });

    let args = {
      name : this.formCategories.value.name,
      parent: this.formCategories.value.parent
    }

    this.http.post('http://127.0.0.1:8000/api/auth/categories', args, {
        headers: headers
    })
    .subscribe(
      res => {
        this.getCategories();
        this.formCategories.value.name = '';
        this.formCategories.value.parent = '';
        this.showSuccessNotification("Listo!");
    },err => {
      if (typeof err.error.message != "undefined")
        if(err.error.message.includes("users_email_unique")){
            this.showErrorNotification("El correo ya está registrado")
        }

      if(typeof(err.error.error) != "undefined")
      if(typeof Object.keys(err.error.error) == "object"){
        let msg = '';
        Object.keys(err.error.error).forEach( (e, key) => {
          console.warn(err.error.error[e])
          msg += e + " : " + err.error.error[e] + '<br>';
        });
        this.showErrorNotification(msg);
      }
    },
    () => console.log('yay'))
  }

  public showSuccessNotification(msg){  
    this._notificationservice.success(msg);  
  }  
  
  public showErrorNotification(msg){  
    this._notificationservice.error(msg);  
  }  


  @ViewChild('dismissButton') dismissButton: ElementRef;

  triggerFalseClick() {
      let el: HTMLElement = this.dismissButton.nativeElement as HTMLElement;
      el.click();
  }

  getCategories(){
    var headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + localStorage.getItem('at')
    });

    this.http.get('http://127.0.0.1:8000/api/auth/categories', {
        headers: headers
    })
    .subscribe(
      res => {
        this.categories = res;
    },err => {
      alert(JSON.parse(err));
    },
    () => console.log('yay'))
  }
}
