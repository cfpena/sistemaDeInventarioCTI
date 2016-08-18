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
    template: string = 'null';
    itemsTemporal: ITEM[]=[];
    itemsEliminar: ITEM[] = [];
    @Input()
    itemNuevo = new ITEM();
    @Input()
    itemModificar= new ITEM;
    id=0;
    count=10;
    selected: number[]=[];
    tiposBusquedas = ['código', 'Nombre'];
    busqueda={tipo: 'codigo', valor: ''};
    tiposFotos = ['archivo', 'cámara'];
    foto={tipo: 'camara', valor: ''};
    constructor( private navController:NavController,private menu: MenuController,
      private itemService: ItemService,
      private http: Http) {
        this.itemsTemporal=this.items;
    }
    //abre el menu
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
        console.log(items);
      })
      return this.items
  }

  crear(){
      let validator = new Validator();
      if(!validator.isValid(this.itemNuevo)) this.presentToast('Corrija el formulario');
      else if (this.itemNuevo.Codigo=='' || this.itemNuevo.Codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
      else if(this.itemNuevo.Nombre=='') this.presentToast('Nombre vacio');
      else if(this.itemNuevo.Descripcion=='') this.presentToast('Descripción vacio');
      else if(this.itemNuevo.Stock < 1 || this.itemNuevo.Stock> 50 || this.itemNuevo.Stock==0) this.presentToast('Cantidad mínima 1 máximo 50');
      else{
        this.items.push(this.itemNuevo);
        let item = JSON.parse(JSON.stringify(this.itemNuevo))
        this.itemService.createItem(item).then(result => this.listar());
        this.template='null';
        this.count++;
        this.itemNuevo = new ITEM();
    }
  }

    //abre el html de modificar
    goModificar(item: ITEM) {
      console.log(item)
            this.itemModificar=JSON.parse(JSON.stringify(item))
            this.template='modificar'
    }

    modificar(){
      let validator = new Validator();
      if(!validator.isValid(this.itemModificar)) this.presentToast('Corrija el formulario');
      else if (this.itemModificar.Codigo=='' || this.itemModificar.Codigo.length < 10)
      this.presentToast('Código debe tener 10 dígitos');
      else if(this.itemModificar.Nombre=='') this.presentToast('Nombre vacio');
      else if(this.itemModificar.Descripcion=='') this.presentToast('Descripción vacio');
      else if(this.itemModificar.Stock < 1 || this.itemModificar.Stock > 50 || this.itemModificar.Stock==0)
        this.presentToast('Cantidad mínima 1 máximo 50');
      else{
        this.itemService.updateItem(this.itemModificar).then(result => this.listar());
        this.template='null';
    }
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
      this.listar();
    }


  select(item: ITEM) {
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
      if(this.busqueda.valor.trim() != ""){
      this.itemService.getBuscar(this.busqueda.valor).then(items => { this.items = items; return items }).then(items => {
      })}
      else{this.listar()}
      return this.items
    }
    
    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
      this.listar();
  }
  }
