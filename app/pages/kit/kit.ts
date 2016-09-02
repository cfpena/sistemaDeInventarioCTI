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
itemsBusquedas = ['código', 'nombre'];
busquedaItem={valor: ''};
itemsKits: ITEM[] = [];
templateItem: string='null';
cantidad=0;


descripcionItem: string ='';
itemSeleccionado= new ITEM();
estaSeleccionadoItem: boolean=false;
listaFiltradaItem: ITEM[]=[];

listakitelementos: KITELEMENTO[]=[];

itemsAgregados=[]

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
      return  this.kitService.getKits(this.navController).then(kits => { this.kits = kits ; return kits  }).then(result=>{
            console.log("listando kits");
          })
    }

  //crea un kit
  crear() {
    console.log('crear')
      let validator = new Validator();
      if (!validator.isValid(this.kitNuevo)) this.presentToast('Corrija el formulario');
      else {
        for(let item of this.itemsAgregados){
          if(item.Es_Dispositivo){
            console.log(item)
            this.kitNuevo.Dispositivos.push(item.url)
          }
        }

          let kit = JSON.parse(JSON.stringify(this.kitNuevo))
          console.log(JSON.stringify(kit))
          let result=this.kitService.createKit(kit,this.listakitelementos,this.navController).then(result => {this.listar();
          this.presentToast('Kit creado correctamente');
        }).catch(err=> {return false});
        this.kitNuevo = new Kit();
        this.descripcionItem='';
        this.cantidad=0;
        this.itemSeleccionado = new ITEM();
        this.estaSeleccionadoItem = false;
        this.listaFiltradaItem=[];
        this.listakitelementos=[];
        this.itemsAgregados=[]
        this.template = 'null';


      }

  }


  //abre el html de modificar
  goModificar(kit: Kit) {
    for(var key in kit){
      this.kitModificar[key]= kit[key]
    }
          this.kitModificar=JSON.parse(JSON.stringify(kit))
          this.template='modificar'

  }


  modificar(){
    let validator = new Validator();
    console.log(this.kitModificar);
    if(!validator.isValid(this.kitModificar)) this.presentToast('Corrija el formulario');
  else{
    this.presentToast('Datos modificados correctamente');
    this.kitService.updateKit(this.kitModificar,this.navController).then(result => this.listar());
    this.template = 'null';
    this.kitNuevo= new Kit()
    this.itemSeleccionado = new ITEM();
    this.cantidad=0;
  }
  }

  eliminar(){
    for(var kit of this.kitsEliminar){
      this.kitService.eliminarKit(kit,this.navController).then(result =>
        { this.listar()
          this.presentToast('Se ha eliminado con éxito');
        }).catch(error=> console.log(error))

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
    this.kitNuevo = new Kit();
    this.itemSeleccionado = new ITEM();
    this.descripcionItem='';
    this.cantidad=0;
    this.listaFiltradaItem=[];
    this.listakitelementos=[];
    this.itemsAgregados=[]
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
    console.log("buscar item");
      if (this.descripcionItem.trim()!= "") {
        console.log("buscar item2");
          this.itemService.getBuscarElemento(this.descripcionItem,this.navController).then(items => { this.listaFiltradaItem = items; return items }).then(items => {
            this.itemService.getBuscarDispositivo(this.descripcionItem,this.navController).then(items => {
              for(var item of items){
                this.listaFiltradaItem.push(item)
                console.log("busca")
              }
            })
          })
      }
      else {
        this.listaFiltradaItem=[];
        console.log("vacio");
      }
  }


  seleccionarItem(item: ITEM){
    console.log(item);
    this.itemSeleccionado=JSON.parse(JSON.stringify(item));
    console.log(this.itemNuevo);
    this.descripcionItem = this.itemSeleccionado.Codigo +' - '+ this.itemSeleccionado.Nombre;
    this.listaFiltradaItem=[];
    if (item.Es_Dispositivo){
      this.templateItem='Dispositivo';
      this.cantidad=1;
    }else{
      this.templateItem='Elemento';
    }
    this.estaSeleccionadoItem =true;
    //this.itemSeleccionado = item;

  }


  agregarItem(){
    console.log(this.itemsAgregados)
    console.log(this.listakitelementos)

    if (this.itemSeleccionado){
      if (this.itemSeleccionado.Es_Dispositivo){
        console.log('es dispositivo');
        this.itemsAgregados.push(this.itemSeleccionado)
      }else{
        let kitelemento= new KITELEMENTO()
        kitelemento.cantidad = this.cantidad
        kitelemento.Elemento = this.itemSeleccionado.url
        this.listakitelementos.push(kitelemento)
        this.itemsAgregados.push(this.itemSeleccionado)
      }
      this.itemSeleccionado = new ITEM();
      this.cantidad=0;
      this.estaSeleccionadoItem = false;
    }
  }


      eliminarItem(item: ITEM){
        let index=this.itemsAgregados.indexOf(item)
        this.itemsAgregados.splice(index,1)
      }

    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
          this.listar();
  }

}
