import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import {Kit} from '../kit/kit.model';
import {KITELEMENTO} from '../kit/kitelemento.model';
import {Url} from '../../url'
import {Http, Headers} from '@angular/http';
import {KitService} from './kit.service';
import {ItemService} from '../item/item.service';

@Component({
  templateUrl: 'build/pages/kit/kit.html',
  directives: [MaterializeDirective],
  providers: [KitService,ItemService],
})
export class KitPage implements OnInit{
title: string ='Kits';
template: string = 'null';
kits: Array<Kit>=[]
items: Array<ITEM>=[]
kitsTemporal: Kit[] = [];
kitsEliminar: Kit[] = [];
count=10;
id=0;
selected: number[]=[];
tiposBusquedas = ['código', 'nombre'];
busqueda={tipo: 'código', valor: ''};
descripcionItem: string ='';
itemsBusquedas = ['código', 'nombre'];
busquedaItem={valor: ''};
itemsKits: ITEM[] = [];
templateItem: string='null';
cantidad=0;
itemSeleccionado: boolean = false;

listaFiltradaItem: ITEM[];
listakitelementos: KITELEMENTO[]=[];

@Input()
kitNuevo = new Kit();
@Input()
kitModificar= new Kit;

@Input() itemNuevo = new ITEM();

  constructor(private navController:NavController,private menu: MenuController,
    private kitService: KitService,
    private itemService: ItemService,
    private http: Http) {
    this.kitsTemporal=this.kits;
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

    //funcion listar que lista todos los kits creados
    listar() {
      this.kits =[]
        this.kitService.getKits(this.navController).then(kits => { this.kits = kits ; return kits  }).then(result=>{
            console.log("listando kits");
          })
    }

  //crea un kit
  crear() {
      let validator = new Validator();
      if (!validator.isValid(this.kitNuevo)) this.presentToast('Corrija el formulario');
    //  else if (this.itemNuevo.Codigo == '' || this.itemNuevo.Codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
      //else if (this.kitNuevo.Nombre == '') this.presentToast('Nombre vacio');
    //  else if (this.itemNuevo.Descripcion == '') this.presentToast('Descripción vacio');
      //else if (this.kitNuevo.Stock < 1 || this.kitNuevo.Stock > 50 || this.kitNuevo.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
      else {
          let kit = JSON.parse(JSON.stringify(this.kitNuevo))
          this.kitService.createKit(kit,this.navController).then(result => this.listar());
          this.template = 'null';
          this.count++;
          this.kitNuevo = new Kit();
      }

  }


  //abre el html de modificar
  goModificar(kit: Kit) {
          this.kitModificar=JSON.parse(JSON.stringify(kit))
          this.template='modificar'

  }

  //modifica el usario
  modificar(){
    let validator = new Validator();
    console.log(this.kitModificar);
  //  if(!validator.isValid(this.kitModificar)) this.presentToast('Corrija el formulario');
    //else if (this.kitModificar.Codigo=='' || this.kitModificar.Codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
  //else if(this.kitModificar.Nombre=='') this.presentToast('Nombre vacio');
//  else if(this.kitModificar.Descripcion=='') this.presentToast('Descripción vacio');
  //else if(this.kitModificar.Marca=='') this.presentToast('Marca vacio');
  //else if(this.kitModificar.Modelo=='') this.presentToast('Modelo vacio');
  //else{

    this.kitService.updateKit(this.kitModificar,this.navController).then(result => this.listar());
    this.template = 'null';
  //}
  }

  eliminar(){
    for(var kit of this.kitsEliminar){
      this.kitService.eliminarKit(kit, this.navController).then(result =>
        {this.listar() }).catch(error=> console.log(error))
    }
    //se deja en blanco la lista a eliminar
    this.kitsEliminar= Array<Kit>();
    //se refrescan los datos del servidor

  }

  select(kit: Kit){
    if (!this.kitsEliminar.some(kit => kit == kit)) {
        this.kitsEliminar.push(kit);
    }else {
        let index = this.kitsEliminar.findIndex(x => x == kit)
        this.kitsEliminar.splice(index, 1)
    };
  }

  goCrearKit(){
    this.template='crear';
  }

  cancelar(){
    this.template='null';
  }

//Busqueda de Kits en la tabla principal
  buscar() {
      if (this.busqueda.valor.trim() != "") {
          this.kitService.getBuscar(this.busqueda.valor,this.navController).then(kits => { this.kits = kits; return kits }).then(kits => {
          })
      }
      else { this.listar() }
  }

//Busqueda de item para agregar al kit
  buscarItem() {
      if (this.busquedaItem.valor.trim()!= "") {
          this.itemService.getBuscarElemento(this.busquedaItem.valor,this.navController).then(items => { this.items = items; return items }).then(items => {
            this.itemService.getBuscarDispositivo(this.busquedaItem.valor,this.navController).then(items => {
              for(var item of items){
                this.items.push(item)
                console.log("busca")
              }
            })
          })
      }
      else {console.log("vacio")}
  }


  seleccionarItem(item: ITEM){
    console.log(item);
    this.itemNuevo=JSON.parse(JSON.stringify(item));
    console.log(this.itemNuevo);
    this.descripcionItem = this.itemNuevo.Codigo +' - '+ this.itemNuevo.Nombre;
    this.listaFiltradaItem=[];
    if (item.Es_Dispositivo){
      this.templateItem='Dispositivo';
      this.cantidad=1;
    }else{
      this.templateItem='Elemento';
    }
    this.itemSeleccionado =true;
    //this.itemSeleccionado = item;
  }

  agregarItem(){
    console.log('voy a agregar item');
    if (this.itemSeleccionado){
      console.log('si existe item seleccionado');
      if (this.itemNuevo.Es_Dispositivo){
        console.log('es dispositivo');
        for(var _i = 0; _i < this.cantidad; _i++){
          this.listakitelementos.push({id:0, cantidad: 1, Is_Dispositivo: true, item: this.itemNuevo,kit: this.kitNuevo});
        }
      }else{
        console.log('es elemento');
        this.listakitelementos.push({id:0, cantidad: this.cantidad, Is_Dispositivo: false, item: this.itemNuevo,kit: this.kitNuevo});
      }
      console.log('ingreso de item al kit');
      this.itemNuevo = new ITEM();
      this.cantidad=0;
      this.itemSeleccionado = false;
    }
  }

/*
  seleccionarItem2(item: ITEM){
        console.log(item);
        console.log(this.itemNuevo);
        this.itemNuevo=JSON.parse(JSON.stringify(item));
        console.log(this.itemNuevo);
        this.descripcionItem = this.itemNuevo.Codigo +' - '+ this.itemNuevo.Nombre;
        this.listaFiltradaItem=[];
        this.itemSeleccionado =true;
        //this.itemSeleccionado = item;
      }

      listarItems() {
        //las promesas retornan promesas por lo tanto el resultado se debe tratar como una promesa, con el then y catch
          this.itemService.getElementos(this.navController).then(items => { this.items = items; return items }).then(result=>{
            this.itemService.getDispositivos(this.navController).then(items => {
              for(var item of items){
                this.items.push(item)
              }
            })
          })
          return this.items
      }

      buscarItem2(){
        console.log('buscar item');
        this.listarItems();
        let itemsFiltro: ITEM[];
        let busquedaItem = this.descripcionItem;
        let elementoEncontrado: string;

        if (busquedaItem!==''){
          console.log('buscar item1');
          itemsFiltro = this.items.filter(function (item){
            console.log(busquedaItem);
            if (item.Codigo.toLowerCase().indexOf(busquedaItem.toLowerCase())>=0 ||  item.Nombre.toLowerCase().indexOf(busquedaItem.toLowerCase())>=0){
              elementoEncontrado= item.Codigo+" - "+item.Nombre;
              console.log(elementoEncontrado);
              return true;
            }
            return false;
          }.bind(this));
          this.listaFiltradaItem = itemsFiltro;
        }else{
          this.listaFiltradaItem =[];
        }
      }
*/

    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
          this.listar();
  }

}
