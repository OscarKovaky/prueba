import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GenericHttp } from 'src/http/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPokemonComponent } from './components/add-pokemon/add.pokemon.component';
import { ListPokemonComponent } from './components/list-pokemon/list.pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    ListPokemonComponent,
    AddPokemonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{
    provide: GenericHttp,
    useFactory: (httpClient: HttpClient) => {
      return new GenericHttp(httpClient);
    },
    deps: [HttpClient]
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
