import { Component,ComponentFactoryResolver,Input,OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PokemonRequest } from "src/app/models/pokemonRequest";
import { ListPokemonComponent } from "../list-pokemon/list.pokemon.component";
import { AddPokemonService } from "./add.pokemon.service";


@Component({
    selector:"add-pokemon-component",
    templateUrl:"./add.pokemon.component.html",
    styleUrls:["./add.pokemon.component.css"]
})



export class AddPokemonComponent implements OnInit {
    public id_Poke:any;
    public Nombre: string="";
    public Imagen:string="";
    public valueAtaque:number=0;
    public valueDefensa:number=0;
    public id_Autor:any;
    public isEditPokemon:boolean = false;
    public isCancelOperation:boolean = false;
    public isCreateOperation:boolean = false;
    

    @Input() id_Pokemon: string = " ";
    @Input() nombrePokemon: string = " ";
    @Input() imagenPokemon: string = " "; 
    @Input() ataquePokemon: number = 0; 
    @Input() defensaPokemon: number = 0; 

    @ViewChild(ListPokemonComponent) listSearch!: ListPokemonComponent;

    miFormulario: FormGroup =  this.fb.group({
        nombre:['',Validators.required],
        imagen:['',Validators.required],
        ataque:[0,Validators.required],
        defensa:[0,Validators.required],
        input_tip_ataque:[0,Validators.required],
        input_tip_defensa:[0,Validators.required],
    })

    constructor(private fb:FormBuilder,
        private pokeService:AddPokemonService ){        
    }

    ngOnInit(): void {
        this.miFormulario.get("ataque")?.valueChanges.subscribe(val => {
            this.valueAtaque = val;
            this.miFormulario.get("input_tip_ataque")?.setValue(val);
          });

          this.miFormulario.get("defensa")?.valueChanges.subscribe(val => {
            this.valueDefensa = val
            this.miFormulario.get("input_tip_defensa")?.setValue(val);
          });  
    }

    campoNoValido(campo: string){
        return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched
    }

    changeInputAtaque(e:any){
    }

    changeInputDefensa(e:any){
    }

    submitFormulario(){

        if(!this. isValidData()){
            alert("Verifique los campos! no puede ver valores 0 o Inputs vacios!");
        }

        if(this.id_Poke > 0 && this. isValidData()){
            this.pokeService.UpdatePokemon(this.EditPokemonRequest()).subscribe( resp =>{
                console.log("Exito",resp);
                this.resetData();
                window.location.reload(); 
            })
        }else if(this. isValidData()){
            this.pokeService.SavePokedex(this.savePokemonRequest()).subscribe( resp =>{
                console.log("Exito",resp);
                this.resetData();
                window.location.reload(); 
            })
        }
    }


    public setFormPokemon(id:number,name:string,image:string,atack:number,defence:number){
        this.id_Poke = id
        this.Nombre = name
        this.Imagen = image
        this.valueAtaque = atack
        this.valueDefensa = defence
        this.isEditPokemon = true;
        this.miFormulario.get("nombre")?.setValue(name)
        this.miFormulario.get("imagen")?.setValue(image)
        this.miFormulario.get("ataque")?.setValue(atack)
        this.miFormulario.get("defensa")?.setValue(defence)
    }

    public setCancelEditPokemon(){
        this.isEditPokemon = false;
        this.id_Poke = 0
        this.miFormulario.get("nombre")?.setValue("")
        this.miFormulario.get("imagen")?.setValue("")
        this.miFormulario.get("ataque")?.setValue(0)
        this.miFormulario.get("defensa")?.setValue(0)
        this.isCreateOperation = false;

    }

   public resetData() {
    this.miFormulario.get("nombre")?.setValue("")
    this.miFormulario.get("imagen")?.setValue("")
    this.miFormulario.get("ataque")?.setValue(0)
    this.miFormulario.get("defensa")?.setValue(0)
   }


   public OperationCreatePokemon(){
     this.isCreateOperation = true;
   }

   public ActivateForm(){
     this.isCreateOperation = true;
   }


  public isValidData (){
    return this.Nombre.length > 0 && this.Imagen.length > 0 && this.valueAtaque > 0 && this.valueDefensa > 0
  }

  public isCreateOrEditForm(){
    let result = false;
    if(this.id_Poke > 0){
        result = true;
    }else{
        result = false
    }
    return result
  }

   EditPokemonRequest(){    
        return {
            id: this.id_Poke,
            attack: this.valueAtaque,
            defense: this.valueDefensa,
            idAuthor: 1,
            hp:1000,
            image: this.Imagen,
            name: this.Nombre,
            type:"n/a"
        } as PokemonRequest  
    }

    savePokemonRequest(){    
        return {
            attack: this.valueAtaque,
            defense: this.valueDefensa,
            idAuthor: 1,
            hp:1000,
            image: this.Imagen,
            name: this.Nombre,
            type:"n/a"
        } as PokemonRequest  
    }
}