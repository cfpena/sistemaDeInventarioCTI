import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import {Kit} from '../kit/kit.model';
import {KitDetalle} from '../kit/kit.model';
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


  kitsEliminar: Kit[] = [];

  templateItem: string='null';
  busqueda = { tipo: 'codigo', valor: '' };

  descripcionItem: string ='';
  itemSeleccionado= new ITEM();
  estaSeleccionadoItem: boolean=false;
  listaFiltradaItem: ITEM[]=[];
  cantidad=0;

  listaDetalleKit: KitDetalle[]=[];

  @Input()  kitNuevo = new Kit();
  @Input()  kitModificar= new Kit;

  constructor(private navController:NavController,private menu: MenuController,
    private kitService: KitService,
    private itemService: ItemService,
    private http: Http) {

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
      if (!validator.isValid(this.kitNuevo)) this.presentToast('Corrija el formulario / verifique si ingresó items al kit');
      else {
        this.kitNuevo.KitDetalle = this.listaDetalleKit
        let kit = JSON.parse(JSON.stringify(this.kitNuevo))
        for (var kitdet of kit.KitDetalle){
          kitdet.Item=kitdet.Item.url
        }
        let result=this.kitService.createKit(kit,this.navController).then(result => {this.listar();
          //let result=this.kitService.createKit(kit,this.navController).then(result => {this.listar();
          this.presentToast('Kit creado correctamente');
        }).catch(err=> {return false});
        this.kitNuevo = new Kit();
        this.descripcionItem='';
        this.cantidad=0;
        this.itemSeleccionado = new ITEM();
        this.estaSeleccionadoItem = false;
        this.listaFiltradaItem=[];
        this.listaDetalleKit=[];
        this.template = 'null';
      }

    }

    goModificar(kit: Kit) {
      for(var key in kit){
        this.kitModificar[key]= kit[key]
      }

      this.listaDetalleKit=this.kitModificar.KitDetalle
      var kitdetalle: KitDetalle[]=[]
      for(var detalle of this.listaDetalleKit){
        this.kitService.llenarItem(detalle.Item,this.navController).then(result=>{
          let det= new KitDetalle
          det.Cantidad=detalle.Cantidad
          det.Item=result
          kitdetalle.push(det)
        })
      }
      this.listaDetalleKit=kitdetalle
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
      this.listaDetalleKit=[]
    }

    eliminar(){
      console.log(this.kitsEliminar)
      for(var kit of this.kitsEliminar){
        this.kitService.eliminarKit(kit,this.navController).then(result =>

          { console.log(result)
            this.listar()
            this.presentToast('Se ha eliminado con éxito');
          }).catch(error=> console.log(error))

        }
        //se deja en blanco la lista a eliminar
        this.kitsEliminar= Array<Kit>();
        //se refrescan los datos del servidor

      }

      select(kit: Kit){
        if (!this.kitsEliminar.some(result => result == kit)) {
          this.kitsEliminar.push(kit);
        }else {
          let index = this.kitsEliminar.findIndex(x => x == kit)
          this.kitsEliminar.splice(index, 1)
        };
      }

      //generar codigo para el siguiente item
      generarCodigoKit(){
        var codigoAnterior;
        let nuevoCodigo;
        //getUltimoCodItem : retorna el ultimo codigo para sumarle 1 para el nuevoC
        this.kitService.getUltimoCodKit(this.navController).then(codigoAnterior => {
          console.log("Codigo anterior " + codigoAnterior);
          codigoAnterior = codigoAnterior + 1;
          nuevoCodigo = codigoAnterior;
          console.log("Codigo nuevo" + nuevoCodigo);
          this.kitNuevo.Codigo= nuevoCodigo.toString();
        });
      }

      goCrearKit(){
        this.generarCodigoKit();
        this.template='crear';
      }

      cancelar(){
        this.kitNuevo = new Kit();
        this.itemSeleccionado = new ITEM();
        this.descripcionItem='';
        this.cantidad=0;
        this.listaFiltradaItem=[];
        this.listaDetalleKit=[];
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

        if (this.descripcionItem.trim()!= "") {

          this.itemService.getBuscarItem(this.descripcionItem,this.navController).then(items => {
            this.listaFiltradaItem = items;
            return items;
          }).then(items => {
            if (this.listaFiltradaItem.length==0){
              this.presentToast('No existe un ítem para agregar');
              this.descripcionItem='';
            }
          })
        }
        else {
          this.listaFiltradaItem=[];
        }
      }

      seleccionarItem(item: ITEM){
        this.itemSeleccionado=JSON.parse(JSON.stringify(item));
        this.descripcionItem = this.itemSeleccionado.Codigo +' - '+ this.itemSeleccionado.Nombre;
        this.listaFiltradaItem=[];
        this.estaSeleccionadoItem =true;
      }

      agregarItem(){
        console.log(this.listaDetalleKit)
        if (this.itemSeleccionado){
          if((this.descripcionItem)  != ""){
          let kitdet= new KitDetalle()
          kitdet.Cantidad = this.cantidad
          kitdet.Item = this.itemSeleccionado
          this.listaDetalleKit.push(kitdet)
          this.itemSeleccionado = new ITEM();
          this.cantidad=0;
          this.descripcionItem='';
          this.estaSeleccionadoItem = false;
        }else{
            this.presentToast('No existe ítem para agregar');
        }
        }
      }

      eliminarItem(kitdetalle: KitDetalle){
        let index=this.listaDetalleKit.indexOf(kitdetalle)
        this.listaDetalleKit.splice(index,1)
      }

      //retrasa la carga de la pagina 100 ms
      public ngOnInit() {
        this.listar();
      }

    }
