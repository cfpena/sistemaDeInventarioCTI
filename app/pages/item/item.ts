import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController, Toast, Modal } from 'ionic-angular';
import { ITEM } from './item.model';
import { MaterializeDirective } from "../../materialize-directive";
import { Validator } from "validator.ts/Validator";
import { Url } from '../../url'
import { Http, Headers } from '@angular/http';
import { ItemService } from './item.service';


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
    title: string = 'Ítems';
    items:  Array<ITEM> =[]
    template: string = 'null';
    itemsTemporal: ITEM[] = [];
    itemsEliminar: ITEM[] = [];
    @Input()
    itemNuevo = new ITEM();
    @Input()
    itemModificar = new ITEM;
    id = 0;
    count = 10;
    selected: number[] = [];
    tiposBusquedas = ['código', 'Nombre'];
    busqueda = { tipo: 'codigo', valor: '' };
    tiposFotos = ['archivo', 'cámara'];
    foto = { tipo: 'camara', valor: '' };
    constructor(private navController: NavController, private menu: MenuController,
        private itemService: ItemService,
        private http: Http) {
        this.itemsTemporal = this.items;
    }
    //abre el menu
    openMenu() {
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
      this.items =[]
      return  this.itemService.getElementos(this.navController).then(items => { this.items = items; return items }).then(result=>{
          this.itemService.getDispositivos(this.navController).then(items => {
            for(var item of items){
              this.items.push(item)
            }
          })
        })
    }

    crear() {
      console.log(JSON.stringify(this.itemNuevo))
        let validator = new Validator();
        console.log(validator.validate(this.itemNuevo))
        this.itemNuevo.Stock=0;
        if (!validator.isValid(this.itemNuevo)){ this.presentToast('Corrija el formulario');}
      //  else if (this.itemNuevo.Stock < 1 || this.itemNuevo.Stock > 50 || this.itemNuevo.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
        else {
            let item = JSON.parse(JSON.stringify(this.itemNuevo)) as ITEM
           if(item.Imagen=='') item.Imagen = null
            this.itemService.createItem(item,this.navController).then(result => this.listar());
            this.template = 'null';
            this.itemNuevo = new ITEM();
        }

    }

    //abre el html de modificar
    goModificar(item: ITEM) {
      for(var key in item){
        this.itemModificar[key]= item[key]
      }
        this.itemModificar = JSON.parse(JSON.stringify(item))
        this.template = 'modificar'
    }

    modificar() {
        let validator = new Validator();
        if (!validator.isValid(this.itemModificar)) this.presentToast('Corrija el formulario');

      //  else if (this.itemModificar.Stock < 1 || this.itemModificar.Stock > 50 || this.itemModificar.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
        else {
            this.itemService.updateItem(this.itemModificar,this.navController).then(result => this.listar());
            this.template = 'null';
        }

    }

    eliminar() {

        for (var item of this.itemsEliminar) {
            this.itemService.eliminarItem(item,this.navController).then(result =>
            { this.listar()}).catch(error => console.log(error))
        }
        //se deja en blanco la lista a eliminar
        this.itemsEliminar = Array<ITEM>();

    }


    select(item: ITEM) {
        if (!this.itemsEliminar.some(item => item == item)) {
            this.itemsEliminar.push(item);
        } else {
            let index = this.itemsEliminar.findIndex(x => x == item)
            this.itemsEliminar.splice(index, 1)
        };

    }

    goCrearItem() {
        this.template = 'crear';
    }

    cancelar() {
        this.template = 'null';
    }


    buscar() {
        if (this.busqueda.valor.trim() != "") {
            this.itemService.getBuscarElemento(this.busqueda.valor,this.navController).then(items => { this.items = items; return items }).then(items => {
              this.itemService.getBuscarDispositivo(this.busqueda.valor,this.navController).then(items => {
                for(var item of items){
                  this.items.push(item)
                }
              })

            })
        }
        else { this.listar() }
    }

    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
        this.listar();
    }
}
