
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component'
import { AppBarComponent } from './shared/app-bar/app-bar.component'
import { AppContentComponent } from './shared/app-content/app-content.component'
import { AppNavComponent } from './shared/app-nav/app-nav.component'
import { SharedModule } from './shared/shared.module'
import { SysbarComponent } from './shared/sysbar/sysbar.component'
import { SyspanelComponent } from './shared/syspanel/syspanel.component'
import { IPublicClientApplication, PublicClientApplication, InteractionType, BrowserCacheLocation, LogLevel } from '@azure/msal-browser'
import { MsalGuard, MsalInterceptor, MsalBroadcastService, MsalInterceptorConfiguration, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalGuardConfiguration, MsalRedirectComponent } from '@azure/msal-angular'
import { msalConfig, loginRequest, protectedResources } from './auth-config'
import { LoadingSpinnerInterceptor } from './_services/interceptors/loader.interceptor'
import { TokenGuard } from './_guards/token.guard'
import { Interceptor } from './_services/interceptors/interceptor.service'
import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { ServiceSettingGuard } from './_guards/service-setting.guard'
import { ProfileGuard } from './_guards/profile.guard'
import { PrivacyPolicyGuard } from './_guards/privacy-policy.guard'
import { UserPreferencesGuard } from './_guards/user-preferences.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatMenuModule } from '@angular/material/menu'
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1 // Remove this line to use Angular Universal

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.debug(message)
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig)
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>()

  protectedResourceMap.set(protectedResources.api.endpoint, protectedResources.api.scopes)

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  }
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MasterLayoutComponent,
    SysbarComponent,
    SyspanelComponent,
    AppBarComponent,
    AppNavComponent,
    AppContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MsalModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    
  ],
  providers: [
    Interceptor,
    [
      { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoadingSpinnerInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
    TokenGuard,
    ProfileGuard,
    PrivacyPolicyGuard,
    ServiceSettingGuard,
    UserPreferencesGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
