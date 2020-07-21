import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './pages/MainPage/MainPage.component';
import { NewsComponent } from "./pages/News/News.component";
import { LostPageComponent } from './pages/lost-page/lost-page.component'

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'news/:id', component: NewsComponent },
  { path: '**', component: LostPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
