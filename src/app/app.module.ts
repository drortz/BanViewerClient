
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule, MatFormFieldModule, MatAutocompleteModule, MatExpansionModule,
  MatSlideToggleModule, MatOptionModule, MatInputModule, MatTableModule,
  MatTreeModule, MatIconModule, MatSelectModule, MatStepperModule} from '@angular/material';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { BanInfoComponent } from './ban-info/ban-info.component';
import { OrderActionComponent } from './ban-info/order-action/order-action.component';
import { InterfacesComponent } from './ban-info/interfaces/interfaces.component';
import { SearchByInterfaceNamePipe } from './pipes/interfaces.pipe';
import { SearchByAttributeNamePipe } from './pipes/attributes.pipe';

import {TreeModule} from 'primeng/tree';
import { ProductConfigurationComponent } from './ban-info/product-configuration/product-configuration.component';
import { LogViewerComponent } from './ban-info/log-viewer/log-viewer.component';
import { FlowDetailsComponent } from './ban-info/flow-details/flow-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoaderSpinnerComponent,
    BanInfoComponent,
    OrderActionComponent,
    InterfacesComponent,
    SearchByInterfaceNamePipe,
    SearchByAttributeNamePipe,
    ProductConfigurationComponent,
    LogViewerComponent,
    FlowDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatOptionModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatTreeModule,
    MatIconModule,
    MatSelectModule,
    MatStepperModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
