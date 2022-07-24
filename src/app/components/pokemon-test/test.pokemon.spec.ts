
import { FormBuilder } from "@angular/forms";
import { TestPokemon } from "./test.pokemon.component";

describe('TestPokemon',()=>{
    let componente: TestPokemon

    beforeEach(()=>{
         componente = new TestPokemon(new FormBuilder());
    })

    it('Deben Existir el campo text', () =>{
        expect(componente.form.contains('nombre')).toBeTruthy();
        expect(componente.form.contains('imagen')).toBeTruthy();
        expect(componente.form.contains('ataque')).toBeTruthy();
        expect(componente.form.contains('defensa')).toBeTruthy();
    })
})