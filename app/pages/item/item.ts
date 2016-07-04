import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {ITEM} from './item.model';
@Component({
  templateUrl: 'build/pages/item/item.html'
})
export class ItemPage implements OnInit {
  title: string ='Ítems';
  ITEMS: ITEM[]=[
    {id: 1,  codigo: 'Item001',  nombre: 'uuu',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: ' ', cantidad:'20'},
    {id: 2,  codigo: 'Item002',  nombre: 'Item 2',  marca: 'Marca 1',  modelo: 'Modelo 2',  descripcion: ' ', cantidad:'10'},
    {id: 3,  codigo: 'Item003',  nombre: 'Item 3',  marca: 'Marca 2',  modelo: 'Modelo 3',  descripcion: ' ', cantidad:'15'}
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

  constructor( private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

  //crea un item
  crear(){
    this.ITEMS.push(this.itemNuevo);
    this.template='null';
    this.count++;
    this.itemNuevo = {
      id:this.count, codigo: '', nombre: "", marca:'', modelo:'', descripcion:"" ,cantidad:''
    }
  }
goModificar(id: string){
  this.template='modificar'
  this.id=parseInt(id);
  this.itemModificar = JSON.parse(JSON.stringify(this.ITEMS.find(item => item.id == this.id)));
}

//modifica el usario
modificar(){
let index =this.ITEMS.findIndex(item => item.id == this.id);
this.ITEMS[index] =JSON.parse(JSON.stringify(this.itemModificar));
this.template='null';
}

eliminar(){

  for(var i in this.selected){
    console.log(this.selected[i]);
    let index =this.ITEMS.findIndex(item => item.id==this.selected[i]);
    console.log(index);
    this.ITEMS.splice(index,1);
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
