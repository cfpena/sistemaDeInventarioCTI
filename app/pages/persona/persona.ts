import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {Persona} from '../persona/persona.model';
import {CrearPersonaPage} from '../crear_persona/crear_persona';
import {MaterializeDirective} from "../../materialize-directive";

/*
  Generated class for the PersonaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/persona/persona.html',
  directives: [MaterializeDirective],
})

export class PersonaPage implements OnInit {
  title: string ='Personas';
  //personas de prueba
  personas: Persona[]=[
  {id: 1,  cedula:'0912345678', nombre: 'Adriano',  apellido: 'Pinargote',  correo: 'a@prueba.com', funcion:'estudiante', telefono: '0959605816', genero: 'M', esPrestario: false, esProveedor: false},
  {id: 2,  cedula:'0965321094',  nombre: 'Janina', apellido: 'Costa',  correo: 'j@prueba.com', funcion:'ayudante', telefono: '04-6025888', genero: 'M', esPrestario: false, esProveedor: false},
  {id: 3,  cedula:'0930128897',  nombre: 'Maria', apellido: 'Pozo',  correo: 'm@prueba.com', funcion:'estudiante', telefono: '04-6025888', genero: 'F', esPrestario: false, esProveedor: false}

];
  //selector de html a mostrar dependiendo de la accion
  template: string = 'null';
  personasTemporal: Persona[]=[];
  //persona en blanco para crear una persona
  @Input()
  personaNueva = {
    id:10, cedula: '',nombre: '', apellido: "", correo:'', funcion:'',telefono:"",genero:'', esPrestario: false, esProveedor:false
  }
  //persona en blanco usada como persona temporal para modificar persona
  @Input()
  personaModificar= {
    id:10, cedula: '',nombre: '', apellido: "", correo:'', funcion:'',telefono:"",genero:'', esPrestario: false, esProveedor:false
  }
  //variable para asignar id incremental para personas locales
  count=10;
  //usado para mantener el id de la persona que se esta modificando o eliminando
  id=0;
  //lista de ids seleccionados por el checkbox
  selected: number[]=[];
  tiposIdentificaciones = ['Tipo de Identificación...', 'Cédula', 'Nombre'];
  generos = ['Elija un género...','Femenino','Masculino'];
  funcions = ['Elija una función...','Profesor','Estudiante','Ayudante', 'Otro'];

  tiposBusquedas = ['Cédula', 'Nombre'];
  busqueda={tipo: 'Cédula', valor: ''};
  constructor( private navController:NavController,private menu: MenuController) {
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

//cedula: '',nombre: '', apellido: "", correo:'', funcion:'',telefono:"",celular:'',genero:''
//crea persona
  crear(){
     if (this.personaNueva.cedula=='' || this.personaNueva.cedula.length < 10) this.presentToast('Cedula vacia');
    else if(this.personaNueva.nombre=='') this.presentToast('Nombre vacio');
    else if(this.personaNueva.apellido=='') this.presentToast('Apellido vacio');
    else if(this.personaNueva.correo=='') this.presentToast('Email vacio');
    else if(this.personaNueva.funcion=='' || this.personaNueva.funcion==this.funcions[0])this.presentToast('Roll no definido');
    else if(this.personaNueva.telefono.length!= 7) this.presentToast('Convencional de 7 numeros');
    else if(this.personaNueva.genero=='' || this.personaNueva.genero==this.generos[0])this.presentToast('Elija genero');
    else{
    this.personas.push(this.personaNueva);
    this.template='null';
    this.count++;
    this.personaNueva = {
      id:this.count,  cedula: '',nombre: '', apellido: "", correo:'', funcion:'',telefono:"",genero:'', esPrestario: false, esProveedor: false
    }
  }
}
  //abre el html de modificar
  goModificar(id: string){
    this.template='modificar'
    this.id=parseInt(id);
    this.personaModificar = JSON.parse(JSON.stringify(this.personas.find(persona => persona.id == this.id)));
  }
  //modifica la persona
  modificar(){
  let index =this.personas.findIndex(persona => persona.id == this.id);
  if(this.personaModificar.nombre=='' || this.personaNueva.cedula.length < 10) this.presentToast('Nombre vacio');
  else if(this.personaModificar.apellido=='') this.presentToast('Apellido vacio');
  else if(this.personaModificar.correo=='') this.presentToast('Email vacio');
  else if(this.personaModificar.funcion=='' || this.personaModificar.funcion==this.funcions[0])this.presentToast('Roll no definido');
  else if(this.personaModificar.telefono.length!= 7) this.presentToast('Convencional de 7 numeros');
  else if(this.personaModificar.genero=='' || this.personaModificar.genero==this.generos[0])this.presentToast('Elija genero');

  this.personas[index] =JSON.parse(JSON.stringify(this.personaModificar));
  this.template='null';
  }
  //elimina una o mas personas
  eliminar(){

    for(var i in this.selected){
      console.log(this.selected[i]);
      let index =this.personas.findIndex(persona => persona.id==this.selected[i]);
      console.log(index);
      this.personas.splice(index,1);
    }
    this.selected=[];
  }
//agrega o elimina ids de personas en lista para saber cual ha sido seleccionada
  select(id: any){
    let index: number;
    index = this.selected.findIndex(num => num == parseInt(id));
    if(index==-1){
    this.selected.push(parseInt(id));}
    else{this.selected.splice(index,1)};
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
    let busquedaTemp = this.busqueda;
    if(busquedaTemp.valor=='') this.personas=this.personasTemporal;
    this.personas=this.personasTemporal.filter(function(persona){
      if(busquedaTemp.tipo=='cédula') {
        console.log("cédula");
        return persona.cedula.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
      }
      else return persona.nombre.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
    })
  }
  //retrasa la carga de la pagina 100 ms
  public ngOnInit() {
    window.setTimeout(()=>{
    },100);
}
}
