import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { AddChangeLinesComponent } from './components/add-change/add-change-lines/add-change-lines.component';
import { AddChangePricelinesComponent } from './components/add-change/add-change-pricelines/add-change-pricelines.component';
import { AddChangeStationsComponent } from './components/add-change/add-change-stations/add-change-stations.component';
import { AddChangeVehicleComponent } from './components/add-change/add-change-vehicle/add-change-vehicle.component';
import { AddChangeTimetableComponent } from './components/add-change/add-change-timetable/add-change-timetable.component';
import { BusmapsComponent } from './components/busmaps/busmaps.component';
import { BusLocationComponent } from './components/busmaps/bus-location/bus-location.component';
import { BuyATicketComponent } from './components/buy-a-ticket/buy-a-ticket.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PricelistComponent } from './components/pricelist/pricelist.component';
import { RegAdminContComponent } from './components/register/reg-admin-cont/reg-admin-cont.component';
import { ShowTicketsComponent } from './components/show-tickets/show-tickets.component';
import { TicketValidationComponent } from './components/ticket-validation/ticket-validation.component';

//gard

const routes: Routes = [
  {
    path:'', 
    component:HomeComponent
  },
  {
    path:'home', 
    component:HomeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    MenubarComponent,
    TimetableComponent,
    EditProfileComponent,
    AddChangeLinesComponent,
    AddChangePricelinesComponent,
    AddChangeStationsComponent,
    AddChangeVehicleComponent,
    AddChangeTimetableComponent,
    BusmapsComponent,
    BusLocationComponent,
    BuyATicketComponent,
    NotificationsComponent,
    PricelistComponent,
    RegAdminContComponent,
    ShowTicketsComponent,
    TicketValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
