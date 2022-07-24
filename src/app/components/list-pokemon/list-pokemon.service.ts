
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PokemonRequest } from 'src/app/models/pokemonRequest';
import { GenericHttp } from '../../../http/http';

import { SelectListItem } from '../../models/SelectListItem';

@Injectable({
  providedIn: 'root'
})
export class PokemonListService {

  constructor(private readonly _http: GenericHttp) {

  }


public GetPokemos():Observable<SelectListItem[]> {
    return this._http.Get<SelectListItem[]>('https://bp-pokemons.herokuapp.com/?idAuthor=1');
  }

public GetPokemon(savePokemonRequest: PokemonRequest):Observable<PokemonRequest> {
    return this._http.Get<PokemonRequest>(`https://bp-pokemons.herokuapp.com/${savePokemonRequest.id}`);
}

public DeletePokemon(savePokemonRequest: PokemonRequest):Observable<PokemonRequest> {
    return this._http.Delete<PokemonRequest>(`https://bp-pokemons.herokuapp.com/${savePokemonRequest.id}`);
  }
}