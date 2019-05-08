import { Component, OnInit, ComponentFactoryResolver, Injectable } from '@angular/core';
import { RegistrarService } from 'src/app/services/registrar.service';
import { Form, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ReferenteService } from 'src/app/services/referente.service';
import *  as $ from 'jquery';
import { shareReplay } from 'rxjs/operators';
import {Observable} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { NotificationService } from '../../_services/toastr-notification.service';  

class  Distributor {
  id: number;
  name: string;
  office: string;
  date: string;
  code: string;
  primaryCode: string;
  address: string;
  city: string;
  province: string;
  country: string;
  bank: string;
  account: string;
  phone: string;
  email: string;
  gender: string;
  birthDate: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
@Injectable()
export class FormularioComponent implements OnInit {
  distributoresObservable : Observable<Distributor[]>;
  messageError:string;
  user:string;
  password:string;
  contratoVendedorIndependiente:string = "Compañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A Vereda Compañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A Vereda Compañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A Vereda Compañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A Vereda  Compañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A Vereda Compañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A Vereda Compañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A VeredaCompañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A Vereda Compañia con domicilio en Avenida 15 No. 5 - 187 de Facatavivà, Cundimarca, con domicilio contractual ubicado en el lote El Oasis 7A Vereda";
  error:boolean=false;
  mismoLugar:boolean=true;
  cargando:boolean;
  opc:boolean=true; //correspode a las opciones de contactar un consultor independiente--> true: ya conoce; false: ubicar consultor
  nuevoUsuario:FormGroup;
  referentes:any[]=[];
  objectKeys = Object.keys;
  deptosConsultoras={opt1: 'opt1', opt2: 'opt2', opt3: 'opt3'};
  tipoDoc={cc: 'Cedula de ciudadanía(CC)', ce: 'Cedula de extranjería(CE)'};
  formReferente:FormGroup;
  formLogin:FormGroup;
  termYCond:boolean;
  contract:boolean=false;
  noEncontrado:boolean=false;
  existe:boolean=false;
  step:number=1;
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  step4:boolean=false;
  step5:boolean=false;
  
  constructor(private regService: RegistrarService, 
    private referenteService:ReferenteService,
    private  http:HttpClient,
    private _notificationservice:NotificationService,
    private route: Router) { 
    this.termYCond=false;
    this.formReferente=new FormGroup({
      id:new FormControl('',Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      ubicacion: new FormGroup({
        depto:new FormControl(''),
        ciudad:new FormControl(''),
        barrio:new FormControl('')
      }),
      referID: new FormControl('', Validators.required)
    })
    this.formLogin= new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
    this.nuevoUsuario= new FormGroup({
      asociado:new FormGroup({
        nombre:new FormControl('',Validators.required),
        apellido:new FormControl('',Validators.required),
        tipoDoc:new FormControl(this.tipoDoc['cc'],Validators.required),
        nroDoc:new FormControl('',Validators.required),
        celular:new FormControl('',Validators.required),
        correo:new FormControl('',Validators.required),
        fechaNac:new FormControl('',Validators.required),
      }),
      complementario:new FormGroup({
        alias:new FormControl('',Validators.required),
        telefono:new FormControl('',Validators.required),
        genero:new FormControl('f',Validators.required),
        domicilio:new FormGroup({
          depto:new FormControl(''),
          ciudad:new FormControl('',Validators.required),
          barrio:new FormControl(''),
          direccion:new FormControl('',Validators.required),
          categoria:new FormControl('',Validators.required),
          referencia:new FormControl(''),
          mismoLugar:new FormControl('true',Validators.required)
      })
        
    }),
    referente:new FormGroup({
      id:new FormControl('', Validators.required),
    }), 
      
    usuario:new FormGroup({
      password:new FormControl('',Validators.required),
      c_password:new FormControl('',Validators.required)
    })
     
  
    });
    
  }
  
  ngOnInit() {
  }

  getAll() {
    return this.http.get<Distributor[]>('http://127.0.0.1:8000/api/distributors');
  }
  
  acceptContract(){
    this.contract=!this.contract;
  }

  addNewUser(data){
    return this.http.post<Distributor[]>('http://127.0.0.1:8000/api/auth/signup', data);
  }

  goIn(data){
   return this.http.post<Distributor[]>('http://127.0.0.1:8000/api/auth/login', data); 
  }

  buscarReferente(){
  
    let nombre:string=this.formReferente.controls['nombre'].value;
    let apellido:string=this.formReferente.controls['apellido'].value;
    let id:number=this.formReferente.controls['id'].value;

    let ubicacion:Object={
      depto:(<FormGroup>this.formReferente.controls['ubicacion']).controls['depto'].value,
      ciudad:(<FormGroup>this.formReferente.controls['ubicacion']).controls['ciudad'].value,
      barrio:(<FormGroup>this.formReferente.controls['ubicacion']).controls['barrio'].value

    }
    
    this.getAll().subscribe(val => {
      //this.referentes = val;

      if (this.formReferente.controls['nombre'].value!="") {
        this.referentes=(this.referenteService.buscarNombre(val, nombre));
      }else{
        if(this.formReferente.controls['id'].value!=""){
          this.referentes=this.referenteService.buscarCodigo(val, id.toString())

        }else{
          this.referentes=this.referenteService.buscarZona(ubicacion['depto'],ubicacion['ciudad'],ubicacion['barrio']);
        }

      }
      
      if(this.referentes.length==0){
        this.noEncontrado=true;
      }else{
        this.noEncontrado=false;
      };

      this.formReferente.reset({
        id:'',
        nombre:'',
        apellido:'',
        ubicacion:{
          depto:'',
          ciudad:'',
          barrio:'',
        }
      });

    });
  };

  validarReferente(){
     if(this.formReferente.value.referID != ""){
        this.step1=false;
        this.step2=false;
        this.step3=true;
        this.step4=false;
        this.step5=false;
     }else{
        this.showErrorNotification("Seleccione un referente por favor")
     }
  }

  // registrar(correo:string, password: string){
  //   this.cargando=true;
  //   console.log(correo+password)
  //   this.regService.setUser(correo, password).subscribe(
  //     (data:any)=>{
  //       console.log(data);
  //       this.cargando=false;
  //     },
  //     error=>{
  //       console.log(error.message);
  //       if (error.message.indexOf('404')>0) {
  //         this.messageError=  'Nombre no encontrado';
          
  //       }
        
  //       this.error= true;
  //       this.cargando=false;
           
  //     });
      
  // }

  //registrar el usuario
  guardarUsuario(){

    let body:Object={
      last_name:this.nuevoUsuario.value['asociado']['apellido'],
      name: this.nuevoUsuario.value['asociado']['nombre'],
      documentType:this.nuevoUsuario.value['asociado']['tipoDoc'],
      documentNumber:this.nuevoUsuario.value['asociado']['nroDoc'],
      mobile:this.nuevoUsuario.value['asociado']['celular'],
      email:this.nuevoUsuario.value['asociado']['correo'],
      birthDate:this.nuevoUsuario.value['asociado']['fechaNac'],
      favoriteName:this.nuevoUsuario.value['complementario']['alias'],
      phone:this.nuevoUsuario.value['complementario']['telefono'],
      gender:this.nuevoUsuario.value['complementario']['genero'],
      departament:this.nuevoUsuario.value['complementario']['domicilio']['depto'],
      city:this.nuevoUsuario.value['complementario']['domicilio']['ciudad'],
      district:this.nuevoUsuario.value['complementario']['domicilio']['barrio'],
      address:this.nuevoUsuario.value['complementario']['domicilio']['direccion'],
      category:this.nuevoUsuario.value['complementario']['domicilio']['categoria'],
      reference:this.nuevoUsuario.value['complementario']['domicilio']['referencia'],
      otherDeliveryAddress: (this.nuevoUsuario.value['complementario']['domicilio']['mismoLugar']) ? 1: 0,
      idReferente:this.nuevoUsuario.value['referente']['id'],
      username:this.nuevoUsuario.value['usuario']['nombre'],
      password:this.nuevoUsuario.value['usuario']['password'],
      c_password:this.nuevoUsuario.value['usuario']['c_password'],
    };
    
    this.addNewUser(body).subscribe(val => {
      this.showSuccessNotification("Listo te envíamos un email para que confirmes tu correo electrónico");
        this.step1=false;
        this.step2=false;
        this.step3=false;
        this.step4=true;
        this.step5=false;

        this.user = this.nuevoUsuario.value['asociado']['correo'];
    },
    err => {
      
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

    });
    //this.regService.addUser(body);

  }

  //cambiar de opciones de busqueda de representante
  conoceReferente(conoce:boolean){
    this.opc=conoce;
  }

  //corresponde al check de aceptar terminos y condiciones
  aceptarTerm(){
    this.termYCond=!this.termYCond;
  }
  
  verificarNombreUsuario(usuario:string){
    // this.sesionService(this.nuevoUsuario.value['usuario']['nombre']).subscribe(existe=>if (existe){this.ocupado=true})
    let usuarioNoDisp:string[]=['gera','gera2'];
    if(usuarioNoDisp.includes(usuario)==true){
      this.existe=true;
    }else{
      this.existe=false;
    }
  }
  //confirma validacion del ingreso de datos personales
  guardarDPersonal(){
    console.warn(this.nuevoUsuario.controls['asociado'].valid);
    if (this.nuevoUsuario.controls['asociado'].valid){
        this.step=2;
       // this.buscarReferente();
        console.log('valido')

      };
      // 

      
      //registrar usuaruio en bd y solicitar al servicio de inicio de sesion permiso para ingresar
      //this.sesionService(this.form)
      //

    
  }

  login(){
    this.goIn({email:this.formLogin.value.email, password:this.formLogin.value.password}).subscribe(val => {
      console.warn("WII", val);
      this.route.navigate(['/inicio/perfil'])
    },
    err => {
      console.warn("OPS: ", err);
      if (err.statusText == 'Unauthorized') this.showErrorNotification("Los datos son incorrectos");
    })
  }

  public showSuccessNotification(msg){  
    this._notificationservice.success(msg);  
  }  
  
  public showErrorNotification(msg){  
    this._notificationservice.error(msg);  
  }  

}
