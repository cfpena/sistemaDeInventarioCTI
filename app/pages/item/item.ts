import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController, Toast, Modal } from 'ionic-angular';
import {ITEM} from './item.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";


@Component({
  templateUrl: 'build/pages/item/item.html',
  directives: [MaterializeDirective],
})
export class ItemPage implements OnInit {
  title: string ='Ítems';
  items: ITEM[]=[
    {id: 1,  codigo: '1234567890',  nombre: 'Resistencia',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: 'Resistencia100 ', cantidad:20, esDispositivo:true, image:''},
    {id: 2,  codigo: '1234456891',  nombre: 'Capacitor',  marca: 'Marca 2',  modelo: 'Modelo 2',  descripcion: 'Capacitor100 ', cantidad:70, esDispositivo:true, image:''},
    {id: 3,  codigo: '0956787892',  nombre: 'Ítem',  marca: 'Marca 3',  modelo: 'Modelo 3',  descripcion: 'Resistencia50 ', cantidad:16, esDispositivo:true, image:'' }
  ];
  itemsTemporal: ITEM[]=[];
  template: string = 'null';

  @Input()
  itemNuevo = new ITEM();

  @Input()
  itemModificar=new ITEM();

  count=10;
  id=0;

  selected: number[]=[];
  tiposBusquedas = ['código', 'nombre'];
  busqueda={tipo: '', valor: ''};

  constructor( private navController:NavController,private menu: MenuController){
    this.itemsTemporal=this.items;
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
    let validator = new Validator();
    console.log(JSON.stringify(validator.validate(this.itemNuevo)));
    if(!validator.isValid(this.itemNuevo)) this.presentToast('Corrija el formulario');
   else if (this.itemNuevo.codigo=='' || this.itemNuevo.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
   else if(this.itemNuevo.nombre=='') this.presentToast('Nombre vacio');
   else if(this.itemNuevo.descripcion=='') this.presentToast('Descripción vacio');
   //else if(this.itemNuevo.marca=='') this.presentToast('Marca vacio');
   //else if(this.itemNuevo.modelo=='') this.presentToast('Modelo vacio');
   else if(this.itemNuevo.cantidad < 1 || this.itemNuevo.cantidad > 50 || this.itemNuevo.cantidad==0) this.presentToast('Cantidad mínima 1 máximo 50');

   else{
    this.items.push(this.itemNuevo);
    this.template='null';
    this.count++;
    this.itemNuevo = new ITEM();
    }
  }

goModificar(id: string){
  this.template='modificar'
  this.id=parseInt(id);
  this.itemModificar = JSON.parse(JSON.stringify(this.items.find(item => item.id == this.id)));
}

//modifica el usario
modificar(){
 let validator = new Validator();
 console.log(JSON.stringify(validator.validate(this.itemModificar)));
 if(!validator.isValid(this.itemModificar)) this.presentToast('Corrija el formulario');
 else if (this.itemModificar.codigo=='' || this.itemModificar.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
 else if(this.itemModificar.nombre=='') this.presentToast('Nombre vacio');
 else if(this.itemModificar.descripcion=='') this.presentToast('Descripción vacio');
 //else if(this.itemModificar.marca=='') this.presentToast('Marca vacio');
 //else if(this.itemModificar.modelo=='') this.presentToast('Modelo vacio');
 else if(this.itemModificar.cantidad < 1 || this.itemModificar.cantidad > 50 || this.itemModificar.cantidad==0) this.presentToast('Cantidad mínima 1 máximo 50');

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

buscar(){

  let busquedaTemp = this.busqueda;
  if(busquedaTemp.valor=='') this.items=this.itemsTemporal;

  this.items=this.itemsTemporal.filter(function(item){
    if(busquedaTemp.tipo=='código') return item.codigo == busquedaTemp.valor;
    else return item.nombre.toLowerCase().indexOf(busquedaTemp.valor)>=0;
  })
}
//retrasa la carga de la pagina 100 ms
public ngOnInit() {
  window.setTimeout(()=>{
  },100);
}

}
