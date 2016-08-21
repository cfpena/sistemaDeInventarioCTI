import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import {Persona} from '../persona/persona.model';
import {Tipo_Movimiento} from '../inventario/movimiento.model';
import {Movimiento} from '../inventario/movimiento.model';
import {Movimiento_Detalle} from '../inventario/movimiento_detalle.model';
import {Ingreso} from '../inventario/ingreso.model';
import {Salida} from '../inventario/salida.model';
import {ITEM} from '../item/item.model';
import { Http, Headers } from '@angular/http';
import {PersonaService} from '../persona/persona.service';
import {ItemService } from '../item/item.service';


@Component({
  templateUrl: 'build/pages/inventario/inventario.html',
  directives: [MaterializeDirective],
  providers: [PersonaService, ItemService],
})


export class InventarioPage implements OnInit{
    title: string ='Inventario';

    tiposMovimientoIngreso: Tipo_Movimiento = {id:1, nombre: 'ingreso'};
    tiposMovimientoSalida: Tipo_Movimiento = {id:3, nombre: 'salida'};

    items: ITEM[]=[];

    movimientodetalle1: Movimiento_Detalle[] = [{id:1, cantidad:2, Is_DetalleKit: false, item: this.items[0],serie:''},
      {id:2, cantidad:10,Is_DetalleKit: false, item:  this.items[1], serie:''},
      {id:3, cantidad:5, Is_DetalleKit: false, item:  this.items[2], serie:''}];
    movimientodetalle2: Movimiento_Detalle[] = [{id:1, cantidad:5, Is_DetalleKit: false, item: this.items[0], serie:''},
      {id:2, cantidad:8, Is_DetalleKit: false, item:  this.items[2], serie:''}];
    movimientodetalle3: Movimiento_Detalle[] = [{id:1, cantidad:10, Is_DetalleKit: false, item: this.items[0], serie:''}];
    movimientodetalle4: Movimiento_Detalle[] = [{id:1, cantidad:12, Is_DetalleKit: false, item: this.items[0], serie:''},
      {id:2, cantidad:10, Is_DetalleKit: false, item:  this.items[1], serie:''},
      {id:3, cantidad:5, Is_DetalleKit: false, item:  this.items[2], serie:''}];

    movimientos: Movimiento[] = [{id: 1,  fecha: '17/07/2016', tipo_movimiento: this.tiposMovimientoIngreso, observaciones: 'Compra de items', movimiento_detalle: this.movimientodetalle1},
      {id: 2,  fecha: '18/07/2016', tipo_movimiento: this.tiposMovimientoIngreso, observaciones: 'Compras de junio', movimiento_detalle: this.movimientodetalle1},
      {id: 3,  fecha: '19/07/2016', tipo_movimiento: this.tiposMovimientoIngreso, observaciones: 'Compras', movimiento_detalle: this.movimientodetalle1},
      {id: 4,  fecha: '20/07/2016', tipo_movimiento: this.tiposMovimientoSalida, observaciones: 'Baja', movimiento_detalle: this.movimientodetalle1}];


    Proveedores: Persona[]=[];

    ingresos: Ingreso[] = [{id: 1, Acta_entrega: '2016-000123', movimiento: this.movimientos[0], proveedor: this.Proveedores[0]},
      {id: 2, Acta_entrega: '2016-000124', movimiento: this.movimientos[1], proveedor: this.Proveedores[0]},
      {id: 3, Acta_entrega: '2016-000125', movimiento: this.movimientos[2], proveedor: this.Proveedores[0]}];

    salidas: Salida[] = [{id:1, No_Acta_Salida:'2016-S00051', movimiento: this.movimientos[3], Motivo_salida: 'Baja contable'}];


    template: string = 'null';
    templateMovimiento: string ='ingreso_inventario'
    templateItem: string='null';
    idProveedor: string ='';
    nombreProveedor: string ='NO EXISTE EL PROVEEDOR';
    descripcionItem: string =''
    listaFiltradaItem: ITEM[];
    listaMovimientoDet: Movimiento_Detalle[]=[];
    cantidad=0;
    serie: string='';

    @Input() ingresoNuevo = new Ingreso();
    @Input() salidaNuevo = new Salida();
    @Input() movimientoNuevo = new Movimiento();
    @Input() proveedorNuevo = new Persona();
    @Input() itemNuevo = new ITEM();

    @Input() movimientoMostrar = new Movimiento();

    countMov=10;
    countIng=10;
    countSal=10;
    id=0;
    selected: number[]=[];
    //tipos = ['Elija tipo','ítem','kit'];
    //estados = ['Elija un estado...','disponible','no disponible'];
    tiposBusquedas = ['Ingreso', 'Salida'];
    busqueda={tipoB: 'código', valor: ''};
    itemSeleccionado: boolean = false;

    constructor( private navController:NavController,private menu: MenuController,
      private personaService: PersonaService, private itemService: ItemService,
      private http: Http){
        //this.inventarioTemporal=this.inventarios;
        //this.listarProveedores();
        //this.listarItems();
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

    goIngresarMovimiento(){
      this.template='ingresar_movimiento';
    }

    //ingreso a inventario
    crearIngreso(){
      let validator = new Validator();
      console.log(JSON.stringify(validator.validate(this.ingresoNuevo)));
      if (this.validarIngreso()){
        this.movimientos.push(this.movimientoNuevo);
        this.ingresos.push(this.ingresoNuevo);
        this.template='null';
        this.countMov++;
        this.countIng++;
        this.movimientoNuevo = new Movimiento();
        this.ingresoNuevo = new Ingreso();
        this.proveedorNuevo = new Persona();
        this.nombreProveedor = 'NO EXISTE EL PROVEEDOR';
      }
    }

    crearSalida(){
      let validator = new Validator();
      console.log(JSON.stringify(validator.validate(this.salidaNuevo)));
      if (this.validarIngreso()){
        this.movimientos.push(this.movimientoNuevo);
        this.salidas.push(this.salidaNuevo);
        this.template='null';
        this.countMov++;
        this.countSal++;
        this.movimientoNuevo = new Movimiento();
        this.salidaNuevo = new Salida();
        this.proveedorNuevo = new Persona();
        this.nombreProveedor = 'NO EXISTE EL PROVEEDOR';
      }
    }

    validarMovimiento() {
      let validator = new Validator();
      if (!validator.isValid(this.movimientoNuevo)) this.presentToast('ERROR!');
      else if (this.movimientoNuevo.fecha=='') this.presentToast ('Seleccione la fecha del movimiento');
      else return true
      return false
    }

    validarIngreso(){
      this.movimientoNuevo.tipo_movimiento = this.tiposMovimientoIngreso;
      let validator = new Validator();
      if (!validator.isValid(this.ingresoNuevo)) this.presentToast('ERROR!');
      else if (this.ingresoNuevo.Acta_entrega=='') this.presentToast ('Acta de entrega no puede ser vacio');
      else if (!validator.isValid(this.ingresoNuevo.proveedor)) this.presentToast ('Error en proveedor');
      else if (!this.validarMovimiento()) this.presentToast('Movimiento invalido');
      else return true
      return false
    }

    validarSalida(){
      this.movimientoNuevo.tipo_movimiento = this.tiposMovimientoSalida;
      let validator = new Validator();
      if (!validator.isValid(this.salidaNuevo)) this.presentToast('ERROR!');
      else if (this.salidaNuevo.No_Acta_Salida=='') this.presentToast ('Acta de salida no puede ser vacio');
      else if (this.salidaNuevo.Motivo_salida=='') this.presentToast ('Motivo salida no puede ser vacio');
      else if (!this.validarMovimiento()) this.presentToast('Movimiento invalido');
      else return true
      return false
    }

    goVerMovimiento(id: string){
      this.template='ver_movimiento';
      this.id=parseInt(id);
      this.movimientoMostrar = JSON.parse(JSON.stringify(this.movimientos.find(movimiento => movimiento.id == this.id)));
      if (this.movimientoMostrar.tipo_movimiento.id ==1) this.goIngreso();
      else if (this.movimientoMostrar.tipo_movimiento.id==3) this.goSalida();
      else this.templateMovimiento ='';
    }

    goIngreso(){
      this.templateMovimiento = 'ingreso_inventario'
    }

    goSalida(){
      this.templateMovimiento = 'salida_inventario'
    }


    cancelar(){
      this.template='null';
    }

    select(id: any){
      let index: number;
      index = this.selected.findIndex(num => num == parseInt(id));

      if(index==-1){
      this.selected.push(parseInt(id));}
      else{this.selected.splice(index,1)};
      console.log(this.selected);
    }

    buscarProveedor(){
      console.log(this.idProveedor);
      //this.proveedorNuevo = JSON.parse(JSON.stringify(this.Proveedores.find(persona => persona.CI == this.idProveedor)));
      if (this.idProveedor.length==10){
        console.log('voy a buscar el proveedor');
        this.personaService.getBuscar(this.idProveedor).then(personas => {this.Proveedores = personas; return personas }).then(personas => {    })
        if (this.Proveedores.length==1){
          console.log('voy a buscar el proveedor');
          this.proveedorNuevo=this.Proveedores[0];
          this.nombreProveedor = this.proveedorNuevo.Nombre + ' ' + this.proveedorNuevo.Apellido;
        }
      }
    }

    buscarItem(){
      console.log('buscar item');
      if (this.descripcionItem!==''){
        console.log('buscar item1');
        this.itemService.getBuscarElemento(this.descripcionItem,this.navController).then(items => { this.listaFiltradaItem = items; return items }).then(items => {
          this.itemService.getBuscarDispositivo(this.descripcionItem,this.navController).then(items => {
            for(var item of items){
              this.listaFiltradaItem.push(item)
            }
          })
        })
      }else{
        this.listaFiltradaItem =[];
      }
    }

    seleccionarItem(item: ITEM){
      console.log(item);
      console.log(this.itemNuevo);
      this.itemNuevo=JSON.parse(JSON.stringify(item));
      console.log(this.itemNuevo);
      this.descripcionItem = this.itemNuevo.Codigo +' - '+ this.itemNuevo.Nombre;
      this.listaFiltradaItem=[];
      this.itemSeleccionado =true;
      //this.itemSeleccionado = item;
    }

    agregarItem(){
      if (this.itemSeleccionado){
        if (this.itemNuevo.Es_Dispositivo){
          console.log('es dispositivo');
          for(var _i = 0; _i < this.cantidad; _i++){
            this.listaMovimientoDet.push({id:0, cantidad: 1, Is_DetalleKit: false, item: this.itemNuevo, serie:''});
          }
        }else{
          this.listaMovimientoDet.push({id:0, cantidad: this.cantidad, Is_DetalleKit: false, item: this.itemNuevo, serie:''});
        }
        this.movimientoNuevo.movimiento_detalle=this.listaMovimientoDet;
        this.itemNuevo = new ITEM();
        this.cantidad=0;
        this.itemSeleccionado = false;
      }
    }

    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
      window.setTimeout(()=>{
      },100);
    }
}
