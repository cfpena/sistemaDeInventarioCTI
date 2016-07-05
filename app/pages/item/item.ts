import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {ITEM} from './item.model';
import {MaterializeDirective} from "../../materialize-directive";

@Component({
  templateUrl: 'build/pages/item/item.html'
})
export class ItemPage implements OnInit {
  title: string ='Ítems';
  items: ITEM[]=[
    {id: 1,  codigo: '1234567890',  nombre: 'Resistencia',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: 'Resistencia100 ', cantidad:'20'}
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

  constructor( private navController:NavController,private menu: MenuController){
  }

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


  //crea un item
  crear(){
    if (this.itemNuevo.codigo=='' || this.itemNuevo.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
   else if(this.itemNuevo.nombre=='') this.presentToast('Nombre vacio');
   else if(this.itemNuevo.descripcion=='') this.presentToast('Descripción vacio');
   else if(this.itemNuevo.marca=='') this.presentToast('Marca vacio');
   else if(this.itemNuevo.modelo=='') this.presentToast('Modelo vacio');
   else if(this.itemNuevo.cantidad.length < 1 || this.itemNuevo.cantidad.length > 2 || this.itemNuevo.cantidad=='0') this.presentToast('Cantidad mínima 1 máximo 99');
   else{
    this.items.push(this.itemNuevo);
    this.template='null';
    this.count++;
    this.itemNuevo = {
      id:this.count, codigo: '', nombre: "", marca:'', modelo:'', descripcion:"" ,cantidad:''
    }
  }
  }

goModificar(id: string){
  this.template='modificar'
  this.id=parseInt(id);
  this.itemModificar = JSON.parse(JSON.stringify(this.items.find(item => item.id == this.id)));
}

//modifica el usario
modificar(){
if (this.itemModificar.codigo=='' || this.itemModificar.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
 else if(this.itemModificar.nombre=='') this.presentToast('Nombre vacio');
 else if(this.itemModificar.descripcion=='') this.presentToast('Descripción vacio');
 else if(this.itemModificar.marca=='') this.presentToast('Marca vacio');
 else if(this.itemModificar.modelo=='') this.presentToast('Modelo vacio');
 else if(this.itemModificar.cantidad.length < 1 || this.itemModificar.cantidad.length > 2 || this.itemModificar.cantidad=='0') this.presentToast('Cantidad mínima 1 máximo 99');
 else{
let index =this.items.findIndex(item => item.id == this.id);
this.items[index] =JSON.parse(JSON.stringify(this.itemModificar));
this.template='null';
}
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
  let index: number;
  index = this.selected.findIndex(num => num == parseInt(id));
  if(index==-1){
  this.selected.push(parseInt(id));}
  else{this.selected.splice(index,1)};
    console.log(this.selected);
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
