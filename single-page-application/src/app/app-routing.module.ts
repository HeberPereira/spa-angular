
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component'
import { LogoutComponent } from './pages/logout/logout.component'
import { TokenGuard } from './_guards/token.guard'
import { MsalGuard } from '@azure/msal-angular'
import { SigninRedirectCallbackComponent } from './pages/signin-redirect-callback/signin-redirect-callback-component'
import { ProfileGuard } from './_guards/profile.guard'
import { ServiceSettingGuard } from './_guards/service-setting.guard'
import { PrivacyPolicyGuard } from './_guards/privacy-policy.guard'
import { UserPreferencesGuard } from './_guards/user-preferences.guard'

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    canActivate: [MsalGuard],
    children: [
      //* HOME *//
      {
        path: '',
        loadChildren: () =>
          import('./pages/home/home.module').then(
            ({ HomeModule }) => HomeModule
          )
      },
      {
        path: ':code',
        loadChildren: () =>
          import('./pages/home/home.module').then(
            ({ HomeModule }) => HomeModule
          )
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./pages/login/login.module').then(
            ({ LoginModule }) => LoginModule
          )
      },
      {
        path: 'signin-callback',
        component: SigninRedirectCallbackComponent
      },

      //* Cluster Settings *//
      {
        path: 'configuration/user-preferences',
        canActivate: [TokenGuard],
        canActivateChild: [UserPreferencesGuard],
        loadChildren: () =>
          import('./pages/user-preferences/user-preferences.module').then(
            ({ UserPreferencesModule }) => UserPreferencesModule
          )
      },
      {
        path: 'configuration/service-setting',
        canActivate: [TokenGuard],
        canActivateChild: [ServiceSettingGuard],
        loadChildren: () =>
          import('./pages/service-setting/service-setting.module').then(
            ({ ServiceSettingModule }) => ServiceSettingModule
          )
      },
      {
        path: 'user-management/profile',
        canActivate: [TokenGuard],
        canActivateChild: [ProfileGuard],
        loadChildren: () =>
          import('./pages/profile/profile.module').then(
            ({ ProfileModule }) => ProfileModule
          )
      },
      {
        path: 'user-management/privacy-policy',
        canActivate: [TokenGuard],
        canActivateChild: [PrivacyPolicyGuard],
        loadChildren: () =>
          import('./pages/privacy-policy/privacy-policy.module').then(
            ({ PrivacyPolicyModule }) => PrivacyPolicyModule
          )
      }
    ]
  },
  {
    path: 'signin-callback',
    component: LogoutComponent
  },
  {
    path: 'logout',
    component: SigninRedirectCallbackComponent
  }
]
const isIframe = window !== window.parent && !window.opener

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes
    })
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
