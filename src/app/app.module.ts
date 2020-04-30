import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material';
import { AngularMaterialImportsModule } from './angular-material-imports.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './pages/user/user.component'
import { CustomPaginator } from '../app/paginator/custom-paginator';
import { ReplyMessageDialogComponent } from '../app/components/reply-message-dialog/reply-message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoutingComponent,
    LoginComponent,
    UserComponent,
    ReplyMessageDialogComponent
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
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
