import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {Persona} from '../persona/persona.model';

import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import { Http, Headers } from '@angular/http';
import {PersonaService} from './persona.service';
import {Url} from '../../url';

/*
  Generated class for the PersonaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/persona/persona.html',
  directives: [MaterializeDirective],
  providers: [PersonaService],
})

export class PersonaPage implements OnInit {
  title: string ='Personas';
  //personas de prueba
  personas: Persona[]=[];
  //selector de html a mostrar dependiendo de la accion
  template: string = 'null';
  personasTemporal: Persona[]=[];
  //persona en blanco para crear una persona

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
  tiposIdentificaciones = ['Tipo de Identificación...', 'cédula', 'nombre'];
  generos = ['Elija un genero...','Femenino','Masculino'];
  funcions = ['Elija una funcion...','Natural','Profesor','Estudiante','Ayudante'];

  tiposBusquedas = ['cédula', 'nombre'];
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
//cedula: '',nombre: '', apellido: "", correo:'', funcion:'',telefono:"",celular:'',genero:''
//crea persona
  crear(){
    let validator = new Validator();

    if (!validator.isValid(this.personaNueva)) this.presentToast('Corrija el formulario');
    else if (this.personaNueva.cedula=='' || this.personaNueva.cedula.length < 10) this.presentToast('Cedula vacia');
    else if(this.personaNueva.nombre=='') this.presentToast('Nombre vacio');
    else if(this.personaNueva.apellido=='') this.presentToast('Apellido vacio');
    else if(this.personaNueva.correo=='') this.presentToast('Email vacio');
    else if(this.personaNueva.funcion=='' || this.personaNueva.funcion==this.funcions[0])this.presentToast('Roll no definido');
    else if(this.personaNueva.telefono.length!= 7) this.presentToast('Convencional de 7 numeros');
    else if(this.personaNueva.celular.length!= 10) this.presentToast('Celular de 10 numeros');
    else if(this.personaNueva.genero=='' || this.personaNueva.genero==this.generos[0])this.presentToast('Elija genero');
    else{
    this.personas.push(this.personaNueva);
    this.template='null';
    this.count++;
    this.personaNueva = new Persona();
  }
}
  //abre el html de modificar
  goModificar(persona: Persona) {
    console.log(persona)
          this.personaModificar=JSON.parse(JSON.stringify(persona))

          this.template='modificar'

  }
  //modifica la persona
  modificar(){
    this.personaService.updatePersona(this.personaModificar).then(result => this.listar());
    this.template='null';
  }
  //elimina una o mas personas
  eliminar(){

    for(var persona of this.personasEliminar){
      this.personaService.eliminarPersona(persona).then(result =>
        { console.log(result) }).catch(error=> console.log(error))
    }
    //se deja en blanco la lista a eliminar
    this.personasEliminar= Array<Persona>();
    //se refrescan los datos del servidor
    this.listar();
  }
//agrega o elimina ids de personas en lista para saber cual ha sido seleccionada
//funcion que agrega los usuarios a la lista para eliminarlos luego
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
  //cierra html y regresa a la lista por defecto
  cancelar(){
    this.template='null';
  }

  buscar(){
    //si el valor es diferente de vacio entonces se manda a buscar, sino se listan los datos sin filtros
    if(this.busqueda.valor.trim() != ""){
    this.personaService.getBuscar(this.busqueda.valor).then(personas => { this.personas = personas; return personas }).then(personas => {
    })}
    else{this.listar()}
    return this.personas
  }
  //retrasa la carga de la pagina 100 ms
  public ngOnInit() {
    window.setTimeout(()=>{
    },100);
}
}
