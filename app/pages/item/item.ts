import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController, Toast, Modal } from 'ionic-angular';
import {ITEM} from './item.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import {Url} from '../../url'
import {Http, Headers} from '@angular/http';
import {ItemService} from './item.service';


/*
  Generated class for the ItemPage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
  templateUrl: 'build/pages/item/item.html',
  directives: [MaterializeDirective],
  providers: [ItemService],
})
export class ItemPage implements OnInit {
  title: string ='Ítems';
  items: ITEM[]=[];
  itemsTemporal: ITEM[]=[];
  template: string = 'null';
  itemsEliminar: ITEM[] = [];

  @Input()
  itemNuevo = new ITEM();

  @Input()
  itemModificar=new ITEM();



  @Input()
  credenciales = {
      clave: '', clave2: ''
  }

  count=10;
  id=0;
  selected: number[]=[];
  tiposBusquedas = ['código', 'nombre'];
  busqueda={tipo: 'código', valor: ''};
  //valor del campo de busqueda
  //busqueda = {valor: '' };

  constructor( private navController:NavController,private menu: MenuController,
    private itemService: ItemService,
    private http: Http){
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

  listar() {
    //las promesas retornan promesas por lo tanto el resultado se debe tratar como una promesa, con el then y catch
      this.itemService.getItems().then(items => { this.items = items; return items }).then(items => {

      })
      return this.items
  }

  //crea un item
  crear(){
    let validator = new Validator();
    console.log(JSON.stringify(validator.validate(this.itemNuevo)));
    if(!validator.isValid(this.itemNuevo)) this.presentToast('Corrija el formulario');
    else if (this.itemNuevo.codigo=='' || this.itemNuevo.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
    else if(this.itemNuevo.nombre=='') this.presentToast('Nombre vacio');
    else if(this.itemNuevo.descripcion=='') this.presentToast('Descripción vacio');
    else if(this.itemNuevo.cantidad < 1 || this.itemNuevo.cantidad > 50 || this.itemNuevo.cantidad==0) this.presentToast('Cantidad mínima 1 máximo 50');

    else{
    this.items.push(this.itemNuevo);
    this.template='null';
    this.count++;
    this.itemNuevo = new ITEM();
  }

  }

  //abre el html de modificar
goModificar(item: ITEM){
  console.log(item)
  this.template='modificar'
  this.itemModificar = JSON.parse(JSON.stringify(this.items.find(item => item.id == this.id)));
}

//modifica el item
modificar(){
 let validator = new Validator();
 /*
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
}*/

this.itemService.updateItem(this.itemModificar).then(result => this.listar());
this.template='null'


}

eliminar(){
  for(var item of this.itemsEliminar){
    this.itemService.eliminarItem(item).then(result =>
      { console.log(result) }).catch(error=> console.log(error))
  }
  //se deja en blanco la lista a eliminar
  this.itemsEliminar= Array<ITEM>();
  //se refrescan los datos del servidor
  this.listar();
}

select(item: ITEM){
  if (!this.itemsEliminar.some(item => item == item)) {
      this.itemsEliminar.push(item);
  }else {
      let index = this.itemsEliminar.findIndex(x => x == item)
      this.itemsEliminar.splice(index, 1)
  };
}

goCrearItem(){
  this.template='crear';
  }

cancelar(){
  this.template='null';
}

buscar(){
  //si el valor es diferente de vacio entonces se manda a buscar, sino se listan los datos sin filtros
  if(this.busqueda.valor.trim() != ""){
  this.itemService.getBuscar(this.busqueda.valor).then(items => { this.items = items; return items }).then(items => {
  })}
  else{this.listar()}
  return this.items
}
//retrasa la carga de la pagina 100 ms
public ngOnInit() {
  window.setTimeout(()=>{
  },100);
}



}
