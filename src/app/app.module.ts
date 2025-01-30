import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerErrorCardComponent } from './components/server-error-card/server-error-card.component';
import { DetailsComponent } from './pages/details/details.component';
import { SearchFiltersComponent } from "./pages/search/search-filters/search-filters.component";
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchFiltersComponent,
    HttpClientModule,
    ServerErrorCardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
