import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AngularMaterialImportsModule } from './angular-material-imports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './pages/user/user.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoutingComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialImportsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [
    { provide: MatDialog, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
