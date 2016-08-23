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

  descripcionItem: string ='';
  itemSeleccionado= new ITEM();
  estaSeleccionadoItem: boolean=false;
  listaFiltradaItem: ITEM[]=[];
  cantidad=0;

  listaPrestamos: Prestamo[]=[];

  @Input()
  prestamoNuevo = new Prestamo();
  @Input() actaNuevo = new Acta();

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

    buscarItem(){
      console.log('buscar item');
      if (this.descripcionItem!==''){
        console.log('buscar item1');
        this.itemService.getBuscarElemento(this.descripcionItem,this.navController).then(items => { this.listaFiltradaItem = items; return items }).then(items => {
          this.itemService.getBuscarDispositivo(this.descripcionItem,this.navController).then(items => {
            for(var item of items){
              this.listaFiltradaItem.push(item)
            }
          })
        })
      }else{
        this.listaFiltradaItem=[];
      }
    }

    seleccionarItem(item: ITEM){
      console.log('estoy en seleccionar item');
      console.log(item);
      console.log(this.itemSeleccionado);
      this.itemSeleccionado=JSON.parse(JSON.stringify(item));
      console.log(this.itemSeleccionado);
      this.descripcionItem = this.itemSeleccionado.Codigo +' - '+ this.itemSeleccionado.Nombre;
      this.listaFiltradaItem=[];
      this.estaSeleccionadoItem =true;
      //this.itemSeleccionado = item;
    }

    agregarItem(){
      if (this.itemSeleccionado){
        if (this.itemSeleccionado.Es_Dispositivo){
          console.log('es dispositivo');
          for(var _i = 0; _i < this.cantidad; _i++){
            //this.listaMovimientoDet.push({id:0, cantidad: 1, Is_DetalleKit: false, item: this.itemNuevo, serie:''});
            this.listaPrestamos.push({url:'', Cantidad: 1, Fecha:'',  Detalle: '', Objeto: this.itemSeleccionado, Acta: this.actaNuevo});
          }
        }else{
          console.log('es elemento');
          this.listaPrestamos.push({url:'', Cantidad: this.cantidad, Fecha:'',  Detalle: '', Objeto: this.itemSeleccionado, Acta: this.actaNuevo});
        }
        this.descripcionItem = '';
        this.itemSeleccionado = new ITEM();
        this.cantidad=0;
        this.estaSeleccionadoItem = false;
      }
    }

    eliminarPrestamo(prestamo: Prestamo){
      let index=this.listaPrestamos.indexOf(prestamo)
      this.listaPrestamos.splice(index,1)
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

    /*  this.prestamoService.getPrestador(this.navController).then(personas => {
          this.personas = personas
      });
*/    }



  }
