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


@Component({
  templateUrl: 'build/pages/inventario/inventario.html',
  directives: [MaterializeDirective],
})


export class InventarioPage implements OnInit{
    title: string ='Inventario';

    tiposMovimientoIngreso: Tipo_Movimiento = {id:1, nombre: 'ingreso'};
    tiposMovimientoSalida: Tipo_Movimiento = {id:3, nombre: 'salida'};

    items: ITEM[]=[
      {id: 1,  Codigo: '1234567890',  Nombre: 'resistencia',  Marca: 'Marca 1',  Modelo: 'Modelo 1',  Descripcion: 'Resistencia100 ', Stock:150, Is_dispositivo: false, Is_kit: false, Images:'', Items:''},
      {id: 2,  Codigo: '1234456891',  Nombre: 'capacitor',  Marca: 'Marca 2',  Modelo: 'Modelo 2',  Descripcion: 'Capacitor100 ',   Stock:200, Is_dispositivo: false, Is_kit: false, Images:'', Items:''},
      {id: 3,  Codigo: '0956787892',  Nombre: 'ítem',  Marca: 'Marca 3',  Modelo: 'Modelo 3',  Descripcion: 'Resistencia50 ',  Stock:800, Is_dispositivo: false, Is_kit: false, Images:'', Items:'' }];

    movimientodetalle1: Movimiento_Detalle[] = [{id:1, cantidad:2, Is_DetalleKit: false, item: this.items[0]},
      {id:2, cantidad:10, Is_DetalleKit: false, item:  this.items[1]},
      {id:3, cantidad:5, Is_DetalleKit: false, item:  this.items[2]}];
    movimientodetalle2: Movimiento_Detalle[] = [{id:1, cantidad:5, Is_DetalleKit: false, item: this.items[0]},
      {id:2, cantidad:8, Is_DetalleKit: false, item:  this.items[2]}];
    movimientodetalle3: Movimiento_Detalle[] = [{id:1, cantidad:10, Is_DetalleKit: false, item: this.items[0]}];
    movimientodetalle4: Movimiento_Detalle[] = [{id:1, cantidad:12, Is_DetalleKit: false, item: this.items[0]},
      {id:2, cantidad:10, Is_DetalleKit: false, item:  this.items[1]},
      {id:3, cantidad:5, Is_DetalleKit: false, item:  this.items[2]}];

    movimientos: Movimiento[] = [{id: 1,  fecha: '17/07/2016', tipo_movimiento: this.tiposMovimientoIngreso, observaciones: 'Compra de items', movimiento_detalle: this.movimientodetalle1},
      {id: 2,  fecha: '18/07/2016', tipo_movimiento: this.tiposMovimientoIngreso, observaciones: 'Compras de junio', movimiento_detalle: this.movimientodetalle2},
      {id: 3,  fecha: '19/07/2016', tipo_movimiento: this.tiposMovimientoIngreso, observaciones: 'Compras', movimiento_detalle: this.movimientodetalle3},
      {id: 4,  fecha: '20/07/2016', tipo_movimiento: this.tiposMovimientoSalida, observaciones: 'Baja', movimiento_detalle: this.movimientodetalle4}];

    Proveedor1: Persona = {url: '1',  CI:'0912345678', Nombre: 'Adriano',  Apellido: 'Pinargote',  Email: 'a@prueba.com', Telefono: '0959605816', Genero: 'Masculino'};
    Proveedor2: Persona = {url: '2',  CI:'0965321094',  Nombre: 'Janina', Apellido: 'Costa',  Email: 'j@prueba.com', Telefono: '04-6025888', Genero: 'Femenino'};
    Proveedores: Persona[]=[{url: '1',  CI:'0912345678', Nombre: 'Adriano',  Apellido: 'Pinargote',  Email: 'a@prueba.com', Telefono: '0959605816', Genero: 'Masculino'},
      {url: '2',  CI:'0965321094',  Nombre: 'Janina', Apellido: 'Costa',  Email: 'j@prueba.com', Telefono: '04-6025888', Genero: 'Femenino'}];

    ingresos: Ingreso[] = [{id: 1, Acta_entrega: '2016-000123', movimiento: this.movimientos[0], proveedor: this.Proveedor1},
      {id: 2, Acta_entrega: '2016-000124', movimiento: this.movimientos[1], proveedor: this.Proveedor2},
      {id: 3, Acta_entrega: '2016-000125', movimiento: this.movimientos[2], proveedor: this.Proveedor1}];

    salidas: Salida[] = [{id:1, No_Acta_Salida:'2016-S00051', movimiento: this.movimientos[3], Motivo_salida: 'Baja contable'}];


    template: string = 'null';
    templateMovimiento: string ='ingreso_inventario'
    idProveedor: string ='';
    nombreProveedor: string ='';

    @Input() ingresoNuevo = new Ingreso();
    @Input() salidaNuevo = new Salida();
    @Input() movimientoNuevo = new Movimiento();
    @Input() proveedorNuevo = new Persona();

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

    constructor( private navController:NavController,private menu: MenuController){
        //this.inventarioTemporal=this.inventarios;
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
      let proveedorActual: Persona[];
      let proveedorNuevo: Persona;
      let id = this.idProveedor;
      if (this.idProveedor.length==10){
        console.log('voy a buscar el proveedor');
        proveedorActual = this.Proveedores.filter(function (proveedor){
          console.log(id);
          if (proveedor.CI.toLowerCase().indexOf(id.toLowerCase())>=0){
            console.log(proveedor.Apellido);
            proveedorNuevo = proveedor;
            return true;
          }
          console.log('no encontre :(');
          return false;
        })
        this.proveedorNuevo=proveedorNuevo;
        this.nombreProveedor = proveedorNuevo.Nombre + ' ' + proveedorNuevo.Apellido;
      }
      //console.log(this.proveedorNuevo.Apellido);
    }


    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
      window.setTimeout(()=>{
      },100);
    }
}
