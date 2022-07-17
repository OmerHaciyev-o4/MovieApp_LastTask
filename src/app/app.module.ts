import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AlertifyService } from './services/alertify.services';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MoviesModule,
    AuthModule,
    CoreModule
  ], // modules
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
  ], //component  providers - services
  providers: [

  ],
  bootstrap: [AppComponent], //starter component
})
export class AppModule { }
