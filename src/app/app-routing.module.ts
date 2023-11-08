import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'vendedor',
    loadChildren: () =>
      import('./vendedor/vendedor.module').then((m) => m.VendedorPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registro-usuarios',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./registro-usuarios/registro-usuarios.module').then(
            (m) => m.RegistroUsuariosPageModule
          ),
      },
      {
        path: ':rutaProcedente',
        loadChildren: () =>
          import('./registro-usuarios/registro-usuarios.module').then(
            (m) => m.RegistroUsuariosPageModule
          ),
      },
    ],
  },
  {
    path: 'camera-log',
    loadChildren: () =>
      import('./camera-log/camera-log.module').then(
        (m) => m.CameraLogPageModule
      ),
  },
  {
    path: 'donador',
    loadChildren: () =>
      import('./donador/donador.module').then((m) => m.DonadorPageModule),
  },
  {
    path: 'solicitante',
    loadChildren: () =>
      import('./solicitante/solicitante.module').then(
        (m) => m.SolicitantePageModule
      ),
  },
  {
    path: 'register',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
      {
        path: ':origin',
        loadChildren: () =>
          import('./register/register.module').then(
            (m) => m.RegisterPageModule
          ),
      },
    ],
  },
  {
    path: 'products',

    children: [
      {
        path: ':id',

        loadChildren: () =>
          import('./products/products.module').then(
            (m) => m.ProductsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
