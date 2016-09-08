import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import {Persona} from '../persona/persona.model';
import {FacturaIngreso} from '../inventario/inventario.model';
import {IngresoEgreso} from '../inventario/inventario.model';
import {ITEM} from '../item/item.model';
import { Http, Headers } from '@angular/http';
import {InventarioService} from '../inventario/inventario.service';
import {PersonaService} from '../persona/persona.service';
import {ItemService } from '../item/item.service';
import {UsuarioService } from '../usuario/usuario.service';



@Component({
  templateUrl: 'build/pages/inventario/inventario.html',
  directives: [MaterializeDirective],
  providers: [PersonaService, ItemService, InventarioService, UsuarioService],
})


export class InventarioPage implements OnInit{
  title: string ='Inventario';

  template: string = 'null';
  templateMovimiento: string ='ingreso_inventario'
  templateItem: string='null';

  movimientos: FacturaIngreso[]=[];

  descripcionProveedor: string ='';
  listaFiltradaProveedor: Persona[] =[];
  proveedorSeleccionado= new Persona();
  estaSeleccionadoProveedor: boolean=false;

  descripcionItem: string ='';
  listaFiltradaItem: ITEM[];

  listaMovimientoDet: IngresoEgreso[]=[];
  cantidad=0;
  serie: string='';
  tipoMov:string='Ingreso';

  @Input() movimientoNuevo = new FacturaIngreso();
  @Input() movimientoSeleccionado = new FacturaIngreso();
  @Input() itemNuevo = new ITEM();

  id=0;
  selected: number[]=[];
  //tipos = ['Elija tipo','ítem','kit'];
  //estados = ['Elija un estado...','disponible','no disponible'];
  tiposBusquedas = ['Ingreso', 'Egreso'];
  busqueda={tipoB: 'código', valor: ''};
  itemSeleccionado: boolean = false;

  constructor( private navController:NavController,private menu: MenuController,
    private personaService: PersonaService, private itemService: ItemService, private inventarioService: InventarioService,
    private usuarioService: UsuarioService,
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

    listar() {
      this.movimientos =[]
      this.inventarioService.getMovimientos(this.navController).then(movimientos => { this.movimientos = movimientos ; return movimientos}).then(result=>{
        console.log("listando movimientos");
        for(var movimiento of this.movimientos){
          console.log(movimiento.Proveedor)
          if (movimiento.Proveedor!=null){
            console.log('no es null')
            this.inventarioService.llenarProveedor(movimiento,this.navController)
          }
          //for (var )
        }
      })
    }

    goIngresarMovimiento(){
      this.template='ingresar_movimiento';
    }

    crearMovimiento(){
      console.log('voy a crear mov');
      let validator = new Validator();
      console.log(JSON.stringify(this.movimientoNuevo));
      console.log(validator.validate(this.movimientoNuevo));
      //console.log(JSON.stringify(validator.validate(this.movimientoNuevo)));
      if (this.validarMovimiento()){
        this.inventarioService.createMovimiento(this.movimientoNuevo, this.listaMovimientoDet, this.navController)
        this.template='null';
        this.movimientoNuevo = new FacturaIngreso();
        this.proveedorSeleccionado = new Persona();
        this.descripcionProveedor ='';
        this.listaMovimientoDet=[];
        this.listar();
      }
    }

    validarMovimiento() {
      let validator = new Validator();
      console.log('voy a valirdar movimiento');
      console.log(JSON.stringify(this.movimientoNuevo));
      if (!validator.isValid(this.movimientoNuevo)) this.presentToast('ERROR!');
      else if (this.movimientoNuevo.Fecha=='') this.presentToast ('Seleccione la fecha del movimiento');
      else return true
      return false
    }


    goVerMovimiento(movimiento: FacturaIngreso){
      for(var key in movimiento){
        console.log(key);
        this.movimientoSeleccionado[key]= movimiento[key]
      }
      this.movimientoSeleccionado.IngresoEgreso=[];
      let listaMovDet= movimiento.IngresoEgreso;
      for (var movimientodet in listaMovDet){
        console.log('listando items')
        this.inventarioService.llenarMovimientoDet(listaMovDet[movimientodet], this.navController).then(result=>{
          this.inventarioService.llenarItem(result.Item, this.navController).then(item =>{
            this.tipoMov = result.Tipo;
            if (this.tipoMov=='Egreso'){this.templateMovimiento='salida_inventario'}
            result.Item=item;
            this.movimientoSeleccionado.IngresoEgreso.push(result);
          })
        })
      }
      console.log(this.movimientoSeleccionado)
      this.template='ver_movimiento';
    }

    goIngreso(){
      this.templateMovimiento = 'ingreso_inventario'
      this.tipoMov='Ingreso'
    }

    goSalida(){
      this.templateMovimiento = 'salida_inventario'
      this.tipoMov='Egreso'
    }


    cancelar(){
      this.listaMovimientoDet=[];
      this.listar();
      this.template='null';
    }

    buscarProveedor(){
      console.log('buscar persona');
      if (this.descripcionProveedor!==''){
        console.log('buscar persona1');
        this.personaService.getBuscar(this.descripcionProveedor, this.navController).then(personas => {this.listaFiltradaProveedor=personas; return personas})
      }else{
        this.listaFiltradaProveedor=[];
      }
    }

    seleccionarProveedor(persona: Persona){
      this.proveedorSeleccionado = JSON.parse(JSON.stringify(persona));
      this.descripcionProveedor = this.proveedorSeleccionado.Nombre + ' ' +this.proveedorSeleccionado.Apellido;
      this.estaSeleccionadoProveedor=true;
      this.listaFiltradaProveedor=[];
    }

    buscarItem(){
      console.log('buscar item');
      if (this.descripcionItem!==''){
        console.log('buscar item1');
        this.itemService.getBuscarItem(this.descripcionItem,this.navController).then(items => { this.listaFiltradaItem = items; return items })
      }else{
        this.listaFiltradaItem=[];
      }
    }

    seleccionarItem(item: ITEM){
      console.log('estoy en seleccionar item');
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
        let cant=0;
        if(Number(this.itemNuevo.Stock_Disponible) < Number(this.cantidad) && this.tipoMov =='Egreso'){
          console.log('egreso y mayor que stock disponible');
          this.presentToast('El item no puede ser agregado. El Stock Disponible es menor que la cantidad.');
        }else{
          console.log ('verificar si existe')
          for (var movdet of this.listaMovimientoDet){
            if (movdet.Item.url = this.itemNuevo.url){
              cant+=Number(movdet.Cantidad);
            }
          }
          if(Number(this.itemNuevo.Stock_Disponible) < (Number(this.cantidad) +cant)
          && this.tipoMov =='Egreso'){
            console.log('egreso es mayor que stock disponible');
            this.presentToast('El item no puede ser agregado. El Stock Disponible es menor que la cantidad.');
          }else{
            if (this.itemNuevo.Es_Dispositivo){
              console.log('es dispositivo');
              for(var _i = 0; _i < this.cantidad; _i++){
                this.listaMovimientoDet.push({url:'', Fecha:'', Cantidad: 1, Detalle:'', Tipo: this.tipoMov, Item: this.itemNuevo});

              }
            }else{
              console.log('es elemento');
              this.listaMovimientoDet.push({url:'', Fecha:'', Cantidad: this.cantidad, Detalle:'N/A', Tipo: this.tipoMov, Item: this.itemNuevo});
            }
            //this.movimientoNuevo.IngresoEgreso=this.listaMovimientoDet;
            this.itemNuevo = new ITEM();
            this.cantidad=0;
            this.itemSeleccionado = false;
            this.descripcionItem='';
          }
        }
      }
    }

    eliminarMovimientoDet(movimientoDet: IngresoEgreso){
      let index=this.listaMovimientoDet.indexOf(movimientoDet)
      this.listaMovimientoDet.splice(index,1)
    }

    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
      window.setTimeout(()=>{
      },100);
      this.listar();
    }
  }
