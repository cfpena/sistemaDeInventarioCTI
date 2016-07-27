import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Prestamo} from '../prestamo/prestamo.model';
import {MaterializeDirective} from "../../materialize-directive";
import {DatePicker} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/prestamo/prestamo.html',
  directives: [MaterializeDirective],
})
export class PrestamoPage implements OnInit{
  /*
  items = ITEMS;
  kits = KITS;*/
  title: string ='Prestamos';

  prestamos: Prestamo[] = [
    {id: 1, typeIdentificacion: 'cedula', inputIdentificacion:"", busqueda:'código', inputbusqueda:''},
    {id: 2, typeIdentificacion: 'nombre', inputIdentificacion:"", busqueda:'nombre', inputbusqueda:''},
  ];



  template: string = 'null';

  @Input()
  prestamoNuevo = {
    id:10, typeIdentificacion: '',inputIdentificacion: '', busqueda: "", inputbusqueda:''
  }
  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }
  goCrear(){
    this.template='crear';
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
  tiposBusquedas = ['Buscar por...', 'código', 'nombre'];
  busquedaTablaPrestamos = ['Buscar por...', 'nombre de persona', 'cédula de persona', 'nombre de item','código de item'];




  select(id: any){
    let index: number;
    index = this.selected.findIndex(num => num == parseInt(id));

    if(index==-1){
      this.selected.push(parseInt(id));}
      else{this.selected.splice(index,1)};
      console.log(this.selected);

    }
    public ngOnInit() {
    }



  }
