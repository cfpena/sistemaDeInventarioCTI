import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {Persona} from '../persona/persona.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import { Http, Headers } from '@angular/http';
import {PersonaService} from './persona.service';
import {Url} from '../../url';


@Component({
  templateUrl: 'build/pages/persona/persona.html',
  directives: [MaterializeDirective],
  providers: [PersonaService],
})

export class PersonaPage implements OnInit {
  title: string ='Personas';
  personas: Persona[]=[];
  template: string = 'null';
  personasTemporal: Persona[]=[];
  personasEliminar: Persona[] = [];
  @Input()
  personaNueva = new Persona();
  //persona en blanco usada como persona temporal para modificar persona
  @Input()
  personaModificar= new Persona;
  //variable para asignar id incremental para personas locales
  count=10;
  //usado para mantener el id de la persona que se esta modificando o eliminando
  id=0;
  //lista de ids seleccionados por el checkbox
  selected: number[]=[];
  tiposIdentificaciones = ['Tipo de Identificación...', 'cédula', 'Nombre'];
  Generos = ['Elija un Genero...','F','M'];
  tiposBusquedas = ['cédula', 'Nombre'];
  busqueda={tipo: 'cédula', valor: ''};


  constructor( private navController:NavController,private menu: MenuController,
    private personaService: PersonaService,
    private http: Http) {
      this.personasTemporal=this.personas;
  }
  //abre el menu
openMenu(){
  this.menu.open();
}

//Presenta un mensaje al existir un error
presentToast(text: string) {
let toast = Toast.create({
  message: text,
  duration: 3000
});

toast.onDismiss(() => {
  console.log('Dismissed toast');
});
  this.navController.present(toast);
}


listar() {
  //las promesas retornan promesas por lo tanto el resultado se debe tratar como una promesa, con el then y catch
    this.personaService.getPersonas().then(personas => { this.personas = personas; return personas }).then(personas => {
    })
    return this.personas
}


//CI: '',Nombre: '', Apellido: "", Email:'',Telefono:"",Genero:''
//crea una persona nueva
  crear(){

    let validator = new Validator();

    if (!validator.isValid(this.personaNueva))                                                  this.presentToast('Corrija el formulario');
    else if (this.personaNueva.CI=='' || this.personaNueva.CI.length < 10)                      this.presentToast('Cedula vacia o Incompleta');
    else if(this.personaNueva.Nombre=='')                                                       this.presentToast('Nombre vacio o Incorrecto');
    else if(this.personaNueva.Apellido=='')                                                     this.presentToast('Apellido vacio o Incorrecto');
    else if(this.personaNueva.Email=='')                                                        this.presentToast('Email vacio o Incorrecto');
    else if(this.personaNueva.Telefono.length!= 10)                                             this.presentToast('Convencional de 10 numeros. Ejm <09....>');
    else if(this.personaNueva.Genero=='' || this.personaNueva.Genero==this.Generos[0])          this.presentToast('Elija Genero');

    else{
    this.personas.push(this.personaNueva);
    let persona = JSON.parse(JSON.stringify(this.personaNueva))
    this.personaService.createPersona(persona).then(result => this.listar());
    this.template='null';
    this.count++;
    this.personaNueva = new Persona();
    this.listar();

  }
}



  //modifica la persona
  modificar(){
    let validator = new Validator();
    if (!validator.isValid(this.personaModificar))                                              this.presentToast('Corrija el formulario');
    else if (this.personaModificar.CI=='' || this.personaModificar.CI.length < 10)              this.presentToast('Cedula vacia o Incompleta');
    else if(this.personaModificar.Nombre=='')                                                   this.presentToast('Nombre vacio o Incorrecto');
    else if(this.personaModificar.Apellido=='')                                                 this.presentToast('Apellido vacio o Incorrecto');
    else if(this.personaModificar.Email=='')                                                    this.presentToast('Email vacio o Incorrecto');
    else if(this.personaModificar.Telefono.length!= 10)                                         this.presentToast('Convencional de 10 numeros. Ejm <09....>');
    else if(this.personaModificar.Genero=='' || this.personaModificar.Genero==this.Generos[0])  this.presentToast('Elija Genero');

    else{
    this.personaService.updatePersona(this.personaModificar).then(result => this.listar());
    this.template='null';
    this.listar();
  }
}



  //elimina una o mas personas
  eliminar(){

    for(var persona of this.personasEliminar){
      this.personaService.eliminarPersona(persona).then(result =>
        { console.log(result) }).catch(error=> console.log(error))  }
    //se deja en blanco la lista a eliminar
    this.personasEliminar= Array<Persona>();
    //se refrescan los datos del servidor
    this.listar();
  }

//agrega o elimina ids de personas en lista para saber cual ha sido seleccionada
//funcion que agrega las personas a la lista para eliminarlos luego
select(persona: Persona) {
    if (!this.personasEliminar.some(persona => persona == persona)) {
        this.personasEliminar.push(persona);
    }else {
        let index = this.personasEliminar.findIndex(x => x == persona)
        this.personasEliminar.splice(index, 1)
    };

}

  //abre html de crear persona
    goCrearPersona(){
      this.template='crear';
    }

  //llama al html de modificarPersona
    goModificar(persona: Persona) {
        console.log(persona)
              this.personaModificar=JSON.parse(JSON.stringify(persona))
              this.template='modificar'
      }


  //cierra html y regresa a la lista por defecto
  cancelar(){
    this.template='null';
  }


  buscar(){
    //si el valor es diferente de vacio entonces se manda a buscar, sino se listan los datos sin filtros
    if(this.busqueda.valor.trim() != ""){
        this.personaService.getBuscar(this.busqueda.valor).then(personas => { this.personas = personas; return personas }).then(personas => {    })}
    else{this.listar()}
        return this.personas
  }

  //retrasa la carga de la pagina 100 ms
  public ngOnInit() {
    this.listar();
}
}
