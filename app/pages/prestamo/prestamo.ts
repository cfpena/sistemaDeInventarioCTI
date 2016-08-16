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



@Component({
  templateUrl: 'build/pages/prestamo/prestamo.html',
  directives: [MaterializeDirective],
  providers: [PrestamoService],

})
export class PrestamoPage implements OnInit{
  title: string ='Prestamos';
  Personas: Persona[]=[];
  ITEMS: ITEM[]=[];
  prestamos: Prestamo[] = [];
  template: string = 'null';
  prestamosTemporal: Prestamo[]=[];
  prestamosEliminar: Prestamo[]=[];

  @Input()
  prestamoNuevo = new Prestamo();

  @Input()
  prestamoModificar= new Prestamo;
  constructor( private navController:NavController,private menu: MenuController,
    private prestamoService: PrestamoService,
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



  //variable para asignar id incremental para personas locales
  count=10;
  //usado para mantener el id del prestamo que se esta modificando o eliminando
  id=0;
  //lista de ids seleccionados por el checkbox
  selected: number[]=[];
  tiposIdentificaciones = ['Tipo de Identificación...', 'cédula', 'nombre'];
  tiposBusquedas = ['código', 'nombre'];
  busqueda={tipo: 'código', valor: ''};

  listar() {
    //las promesas retornan promesas por lo tanto el resultado se debe tratar como una promesa, con el then y catch
      this.prestamoService.getPrestamos().then(prestamos => { this.prestamos = prestamos; return prestamos }).then(prestamos => {
      })
      return this.prestamos
  }

  select(prestamo: Prestamo) {
      if (!this.prestamosEliminar.some(prestamo => prestamo == prestamo)) {
          this.prestamosEliminar.push(prestamo);
      }else {
          let index = this.prestamosEliminar.findIndex(x => x == prestamo)
          this.prestamosEliminar.splice(index, 1)
      };

  }
    /*
    buscar(){
      let busquedaTemp = this.busqueda;
      if(busquedaTemp.valor=='') this.prestamos=this.prestamosTemporal;
      this.prestamos=this.prestamosTemporal.filter(function(prestamo){
        if(busquedaTemp.tipo=='código') {
          console.log("codigo");
          return prestamo.codigo.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
        }
        else return prestamo.nombre.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
      })
    }*/
    public ngOnInit() {
      this.listar();
    }



  }
