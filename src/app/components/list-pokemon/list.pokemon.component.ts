import { Component, OnInit, ViewChild} from '@angular/core';
import {PokemonListService} from './list-pokemon.service'
import { SelectListItem } from 'src/app/models/SelectListItem';
import { Observable } from 'rxjs';
import { PokemonRequest } from 'src/app/models/pokemonRequest';
import { AddPokemonComponent } from '../add-pokemon/add.pokemon.component';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
    selector: 'list-pokemon-component',
    templateUrl: './list.pokemon.component.html',
    styleUrls: ['./list.pokemon.component.css']
  })

  export class ListPokemonComponent implements OnInit {
    list: SelectListItem[] = [];
    public Id_Pokemon: any;
    public NombrePokemon: any;
    public ImagenPokemon: any;
    public ValueAtaquePokemon:any;
    public ValueDefensaPokemon:any;
    public isDataInInputSearch:boolean = false;
    public textoDeInputSearch: string = "";
    
  @ViewChild(AddPokemonComponent)
  editPoke!: AddPokemonComponent;

  miFormulario: FormGroup =  this.fb.group({ 
    input_searchData:['']
})

  private loadPokemosResponse!: Observable<SelectListItem[]>;

  constructor (private readonly service:PokemonListService,
    private fb:FormBuilder){

    }

  ngOnInit(): void {
      this.loadList();
  }

  private loadList(){
      this.loadPokemosResponse  = this.service.GetPokemos();

      this.loadPokemosResponse.subscribe(response => {
         this.list  = response
      })
    }

  public DeleteItem(data:number){
      this.service.DeletePokemon(this.DeletePokemonRequest(data)).subscribe(data => {
        console.log("result",data)
        window.location.reload(); 
      })

    }

  DeletePokemonRequest(data:number){    
    return {
        id:data
     } as PokemonRequest  
  }

  EditPokemonRequest(data:number){    
    return {
      id:data
   } as PokemonRequest  

  }

  public reloadComponet(){
    this.isDataInInputSearch = false;
    window.location.reload(); 
 }



 public SearchData(){
  let data  = Number(this.textoDeInputSearch)
  if(data > 0){
      this.isDataInInputSearch = true;
      this.SeachPokemon(data)
  }
}

  public EditItem(data:number){
      this.service.GetPokemon(this.EditPokemonRequest(data)).subscribe(data =>{
       this.Id_Pokemon = data.id 
       this.NombrePokemon = data.name 
       this.ImagenPokemon = data.image
       this.ValueAtaquePokemon = data.attack
       this.ValueDefensaPokemon = data.defense

       this.editPoke.setFormPokemon(data.id,data.name,data.image,data.attack,data.defense);
       this.editPoke.ActivateForm()
    })
  }

  public SeachPokemon(data:number){
    let pequeños = this.list.filter(id  => id.id === data)
    this.list = pequeños.slice()
  }

}


