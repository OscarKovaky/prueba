import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector:"test-pokemon-component",
    templateUrl:"./test.pokemon.component.html",
    styleUrls:["./test.pokemon.component.css"]
})
export class TestPokemon {
    form: FormGroup; 

    constructor(fb: FormBuilder){

        this.form = fb.group({
            nombre:[''],
            imagen:[''],
            ataque:[0],
            defensa:[0],
        })
    }
}