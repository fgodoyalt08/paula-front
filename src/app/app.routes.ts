import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



import { FormularioComponent } from './components/formulario/formulario.component';
import { UneteComponent } from './components/unete/unete.component';
import { ngfactoryFilePath } from '@angular/compiler/src/aot/util';
import { PathLocationStrategy } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ComisionComponent } from './components/comision/comision.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
    { path: 'registro', component: FormularioComponent },
    {path:'unete', component:UneteComponent},
    { path: 'login', component: LoginComponent},
    {path:'inicio', component:UserLayoutComponent,children:[
        {path:'perfil', component:PerfilComponent},
        {path:'comision', component:ComisionComponent},
        {path:'pedidos', component:PedidosComponent},
        {path:'config', component:ConfiguracionComponent},
        {path:'detalle', component:DetallePedidoComponent},
        {path:'users', component:UsersComponent},
        {path:'products', component:ProductsComponent},
        {path:'categories', component:CategoriesComponent},
        {path:'orders', component:OrdersComponent},
        {path:'**',  redirectTo:'home/perfil'}
    ]},
    { path: '**', redirectTo:'unete'}

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

     

 
export const app_routes=RouterModule.forRoot(routes)