import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormularioComponent } from './components/formulario/formulario.component';


import { HttpClientModule } from '@angular/common/http';
import { UneteComponent } from './components/unete/unete.component';
import { RouterModule } from '@angular/router';
import { app_routes } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { PasswordComponent } from './components/password/password.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ComisionComponent } from './components/comision/comision.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';


import { PerfilService } from './services/perfil.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';

//servicios
import { PedidoService } from './services/pedido.service';
import { ArticulosService } from './services/articulos.service';
import { RegistrarService } from './services/registrar.service';

//alert

import { NotificationComponent} from './_directives/toastr-notification.component';    
import { NotificationService} from './_services/toastr-notification.service';    


@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    UneteComponent,
    LoginComponent,
    PasswordComponent,
    PerfilComponent,
    ComisionComponent,
    PedidosComponent,
    ConfiguracionComponent,
    UserLayoutComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    DetallePedidoComponent,
    UsersComponent,
    ProductsComponent,  
    CategoriesComponent,
    OrdersComponent,
    NotificationComponent
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    app_routes, FormsModule, ReactiveFormsModule
  ],
  providers: [RegistrarService, PerfilService, PedidoService, ArticulosService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
