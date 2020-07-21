import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/MainPage/MainPage.component';
import { NewsComponent } from './pages/News/News.component';
import { LostPageComponent } from './pages/lost-page/lost-page.component';
import { HeaderComponent } from './components/header/header.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { shortDomain } from './pipes/short-url.pipe';
import { DateAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NewsComponent,
    LostPageComponent,
    HeaderComponent,
    NewsListComponent,
    shortDomain,
    DateAgoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
