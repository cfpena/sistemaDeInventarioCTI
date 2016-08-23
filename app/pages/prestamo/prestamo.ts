import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';
import {PersonaPage} from '../persona/persona';
import {Prestamo} from '../prestamo/prestamo.model';
import {MaterializeDirective} from "../../materialize-directive";
import {DatePicker} from 'ionic-native';
import {PrestamoService} from './prestamo.service';
import {Url} from '../../url';
import { Http, Headers } from '@angular/http';
import {ItemService} from '../item/item.service';
import {PersonaService} from '../persona/persona.service';
import { Validator } from "validator.ts/Validator";
import { Acta } from './acta.model';
import { Devolucion } from './devolucion.model';

@Component({
  templateUrl: 'build/pages/prestamo/prestamo.html',
  directives: [MaterializeDirective],
  providers: [PrestamoService, ,ItemService, PersonaService],

})
export class PrestamoPage implements OnInit{
  title: string ='Prestamos';

  Personas: Persona[]=[];
  ITEMS: ITEM[]=[];

  template: string = 'null';
  prestamosTemporal: Prestamo[]=[];
  prestamosEliminar: Prestamo[]=[];
  actaTemporal: Acta[]=[];
  actaEliminar: Acta[]=[];

  items: Array<ITEM>=[]
  busquedaItem={valor: ''};
  personas: Array<Persona>=[]
  prestamos:  Array<Prestamo> =[]
  actas:  Array<Acta> =[]


  //variable para asignar id incremental para personas locales
  count=10;
  //usado para mantener el id del prestamo que se esta modificando o eliminando
  id=0;
  //lista de ids seleccionados por el checkbox
  selected: number[]=[];
  tiposIdentificaciones = ['cédula', 'Nombre'];
  busqueda={tipo: 'cédula', valor: ''};
  estaSeleccionadaPersona=false;
  descripcionPersona: string ='';
  personaSeleccionada=new Persona();
  listaFiltradaPersona:Persona[]=[];

  @Input()
  prestamoNuevo = new Prestamo();

  @Input()
  prestamoModificar= new Prestamo;
  constructor( private navController:NavController,private menu: MenuController,
    private prestamoService: PrestamoService,
    private itemService: ItemService,
    private personaService: PersonaService,
    private http: Http) {
      this.prestamosTemporal=this.prestamos;
    }

    openMenu(){
      this.menu.open();
    }

    goCrearPersona(){
      //this._navController.push(PersonaPage,{});
      this.template='crear';
    }

    goNuevoPrestamo(){
      this.template='nuevo_prestamo';
    }
    goModificar(prestamo: Prestamo) {
      console.log(prestamo)
      this.prestamoModificar=JSON.parse(JSON.stringify(prestamo))
      this.template='modificar'
    }

    cancelar(){
      this.template='null';
    }


    //funcion listar que lista todos los kits creados
    listar_actas() {
      this.actas =[]
      this.prestamoService.getActas(this.navController).then(actas => { this.actas = actas ; return actas}).then(result=>{
        console.log("listando actas");
        for(var acta of this.actas){
          this.prestamoService.llenarPrestador(acta,this.navController)
        }
      })
    }

    select(prestamo: Prestamo) {
      if (!this.prestamosEliminar.some(prestamo => prestamo == prestamo)) {
        this.prestamosEliminar.push(prestamo);
      }else {
        let index = this.prestamosEliminar.findIndex(x => x == prestamo)
        this.prestamosEliminar.splice(index, 1)
      };

    }


    modificar() {
      let validator = new Validator();
      if (!validator.isValid(this.prestamoModificar)) this.presentToast('Corrija el formulario');

      else {
        this.prestamoService.updatePrestamo(this.prestamoModificar,this.navController).then(result => this.listar_actas());
        this.template = 'null';
      }

    }

    //busca el ítem
    buscarItem() {
      if (this.busquedaItem.valor.trim()!= "") {
        this.itemService.getBuscarElemento(this.busquedaItem.valor,this.navController).then(items => { this.items = items; return items }).then(items => {
          this.itemService.getBuscarDispositivo(this.busquedaItem.valor,this.navController).then(items => {
            for(var item of items){
              this.items.push(item)
              console.log("busca")
            }
          })
        })
      }
      else {console.log("vacio")}
    }

    buscarPersona(){
      console.log('buscar persona');
      if (this.descripcionPersona!==''){
        console.log('buscar persona1');
        this.personaService.getBuscar(this.descripcionPersona, this.navController).then(personas => {this.listaFiltradaPersona=personas; return personas})
      }else{
        this.listaFiltradaPersona=[];
      }
    }

    seleccionarPersona(persona: Persona){
      this.personaSeleccionada = JSON.parse(JSON.stringify(persona));
      this.descripcionPersona = this.personaSeleccionada.Nombre + ' ' +this.personaSeleccionada.Apellido;
      this.estaSeleccionadaPersona=true;
      this.listaFiltradaPersona=[];
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

    public ngOnInit() {
      this.listar_actas();
      this.personaService.getPersonas(this.navController).then(personas => {
        this.personas = personas
      });
    }



  }
