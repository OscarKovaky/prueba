
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PokemonRequest } from 'src/app/models/pokemonRequest';
import { ResponseApi } from 'src/app/models/ResponseApi';
import { GenericHttp } from '../../../http/http';

import { SelectListItem } from '../../models/SelectListItem';

@Injectable({
  providedIn: 'root'
})
export class AddPokemonService {

  
  constructor(private readonly _http: GenericHttp) {
  }


public SavePokedex(savePokemonRequest: PokemonRequest): Observable<PokemonRequest> {
    return this._http.Post<PokemonRequest>('https://bp-pokemons.herokuapp.com/?idAuthor=1', savePokemonRequest);
}

public UpdatePokemon(savePokemonRequest: PokemonRequest):Observable<PokemonRequest> {
  return this._http.Put<PokemonRequest>(`https://bp-pokemons.herokuapp.com/${savePokemonRequest.id}`,savePokemonRequest);
} 

}