import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { ShopComponent } from './components/shop/shop.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    ContactComponent,
    AboutComponent,
    ShopComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: 'contact', component: ContactComponent },
      { path: 'about', component: AboutComponent },
      { path: 'shop', component: ShopComponent },
      { path: '', component: MainComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
