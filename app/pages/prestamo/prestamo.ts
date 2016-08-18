import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';
import {PersonaPage} from '../persona/persona';
import {Prestamo} from '../prestamo/prestamo.model';
import {MaterializeDirective} from "../../materialize-directive";
import {DatePicker} from 'ionic-native';



@Component({
  templateUrl: 'build/pages/prestamo/prestamo.html',
  directives: [MaterializeDirective],

})
export class PrestamoPage implements OnInit{

  title: string ='Prestamos';

  personas: Persona[]=[];
ITEMS: ITEM[]=[];
KITS: Kit[]=[]

  prestamos: Prestamo[] = [
    {id: 1, personas:this.personas, items:this.ITEMS, kits: this.KITS, cantidad:8, disponible: true, devuelto:false, fecha_prestamo:'12/05/16', fecha_fin: '12/06/2016'},
    {id: 2, personas:this.personas, items:this.ITEMS, kits: this.KITS, cantidad:10, disponible: true, devuelto:false, fecha_prestamo:'12/05/16', fecha_fin: '12/06/2016'},
  ];


  template: string = 'null';
  prestamosTemporal: Prestamo[]=[];

  @Input()
  prestamoNuevo = {
    id:10, typeIdentificacion: '',inputIdentificacion: '', busqueda: "", inputbusqueda:''
  }
  constructor(private _navController:NavController,private menu: MenuController) {
    this.prestamosTemporal=this.prestamos;
  }

  openMenu(){
    this.menu.open();
  }

  goCrearPersona(){
      this._navController.push(PersonaPage,{});
      this.template='crear';
  }

  goNuevoPrestamo(){
    this.template='nuevo_prestamo';
  }
  goModificar(id: string){
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


  select(id: any){
    let index: number;
    index = this.selected.findIndex(num => num == parseInt(id));

    if(index==-1){
      this.selected.push(parseInt(id));}
      else{this.selected.splice(index,1)};
      console.log(this.selected);

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
      window.setTimeout(()=>{
      },100);
    }



  }
