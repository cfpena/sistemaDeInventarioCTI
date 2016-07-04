import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {ITEM} from './item.model';
import {CrearItemPage} from '../crear_item/crear_item';
@Component({
  templateUrl: 'build/pages/item/item.html'
})
export class ItemPage implements OnInit {
  title: string ='Ítems';
  items: ITEM[]=[
    {id: 1,  codigo: 'Item001',  nombre: 'uuu',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: ' ', cantidad:'20'}
  ];
  template: string = 'null';

  @Input()
  itemNuevo = {
    id:10, codigo: '', nombre: "", marca:'', modelo:'',descripcion:"",cantidad:''
  }

  @Input()
  itemModificar= {
    id:10, codigo: '', nombre: "", marca:'', modelo:'',descripcion:"",cantidad:''
  }
  count=10;
  id=0;
  selected: number[]=[];

  constructor( _navController:NavController,private menu: MenuController) {

  }
  openMenu(){
    this.menu.open();
  }

  //crea un item
  crear(){
    this.items.push(this.itemNuevo);
    this.template='null';
    this.count++;
    this.itemNuevo = {
      id:this.count, codigo: '', nombre: "", marca:'', modelo:'', descripcion:"" ,cantidad:''
    }
  }
goModificar(id: string){
  this.template='modificar'
  this.id=parseInt(id);
  this.itemModificar = JSON.parse(JSON.stringify(this.items.find(item => item.id == this.id)));
}

//modifica el usario
modificar(){
let index =this.items.findIndex(item => item.id == this.id);
this.items[index] =JSON.parse(JSON.stringify(this.itemModificar));
this.template='null';
}

eliminar(){

  for(var i in this.selected){
    console.log(this.selected[i]);
    let index =this.items.findIndex(item => item.id==this.selected[i]);
    console.log(index);
    this.items.splice(index,1);
  }
  this.selected=[];
}

select(id: any){
/*  let index: number;
  index = this.selected.findIndex(num => num == parseInt(id));
  if(index==-1){
  this.selected.push(parseInt(id));}
  else{this.selected.splice(index,1)};*/
}

  goCrearItem(){
    this.template='crear';
  }

cancelar(){
  this.template='null';
}

//retrasa la carga de la pagina 100 ms
public ngOnInit() {
  window.setTimeout(()=>{
  },100);
}

}
