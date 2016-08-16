import {Component,  OnInit, Input, ViewChild } from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {Inventario} from './inventario.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";

@Component({
  templateUrl: 'build/pages/inventario/inventario.html',
  directives: [MaterializeDirective],
})
export class InventarioPage implements OnInit{
    title: string ='Inventario';

    inventarios: Inventario[]=[
      {id: 1, fecha:'05/07/16', codigo: '0204567890', tipo:'item', nombre: 'resistencia',  marca: 'Marca 1',  modelo: 'Modelo 1',  detalle: 'Ingreso nuevo', estado:'disponible' ,cantidad:20},
      {id: 2, fecha:'08/07/16', codigo: '1234456891', tipo:'kit', nombre: 'arduino',  marca: 'Marca 2',  modelo: 'Modelo 2',  detalle: 'Ingreso nuevo',estado:'disponible' ,  cantidad:40},
      {id: 3, fecha:'10/07/16', codigo: '0956787892', tipo:'item',  nombre: 'capacitor',  marca: 'Marca 3',  modelo: 'Modelo 3',  detalle: 'Ingreso nuevo', estado:'no disponible' , cantidad:20}
    ];

    inventarioTemporal: Inventario[]=[];
    template: string = 'null';

    @Input()
    inventarioNuevo = new Inventario();

    @Input()
    inventarioSalida = new Inventario();

    count=10;
    id=0;
    selected: number[]=[];
    tipos = ['Elija tipo','ítem','kit'];
    estados = ['Elija un estado...','disponible','no disponible'];
    tiposBusquedas = ['código', 'nombre'];
    busqueda={tipoB: 'código', valor: ''};

    constructor( private navController:NavController,private menu: MenuController){
        this.inventarioTemporal=this.inventarios;
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

    //ingreso a inventario
    crear(){
      let validator = new Validator();
      console.log(JSON.stringify(validator.validate(this.inventarioNuevo)));
        console.log(this.inventarioNuevo.tipo);
        console.log(this.inventarioNuevo.estado);
      if(!validator.isValid(this.inventarioNuevo)) this.presentToast('Corrija el formulario');
     else if (this.inventarioNuevo.codigo=='' || this.inventarioNuevo.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
     //else if(this.inventarioNuevo.nombre=='') this.presentToast('Nombre vacio');
     else if(this.inventarioNuevo.estado=='') this.presentToast('Elija un estado');
     else if(this.inventarioNuevo.detalle=='') this.presentToast('Detalle vacio');
     else if(this.inventarioNuevo.cantidad < 1 || this.inventarioNuevo.cantidad > 50 || this.inventarioNuevo.cantidad==0) this.presentToast('Cantidad mínima 1 máximo 50');
     else if(this.inventarioNuevo.estado=='' || this.inventarioNuevo.estado==this.estados[0])this.presentToast('Estado no definido');
     else if(this.inventarioNuevo.tipo=='' || this.inventarioNuevo.tipo==this.tipos[0])this.presentToast('Tipo no definido');

     else{
       this.inventarios.push(this.inventarioNuevo);
       this.template='null';
       this.count++;
       this.inventarioNuevo = new Inventario();
      }
    }

    goIngresoInventario(){
      this.template='ingresar';
    }

    //crea un item
    salida(){
      let validator = new Validator();
      console.log(JSON.stringify(validator.validate(this.inventarioSalida)));
        console.log(this.inventarioSalida.estado);
      if(!validator.isValid(this.inventarioSalida)) this.presentToast('Corrija el formulario');
     else if(this.inventarioSalida.cantidad < 1 || this.inventarioSalida.cantidad > 50 || this.inventarioSalida.cantidad==0) this.presentToast('Cantidad mínima 1 máximo 50');
     //else if(this.inventarioSalida.estado=='' || this.inventarioSalida.estado==this.estados[0])this.presentToast('Estado no definido');
     //else if(this.inventarioSalida.tipo=='' || this.inventarioSalida.tipo==this.tipos[0])this.presentToast('Tipo no definido');
     else{
       let index =this.inventarios.findIndex(inventario => inventario.id == this.id);
       this.inventarios[index] =JSON.parse(JSON.stringify(this.inventarioSalida));
       this.template='null';
       //this.eliminar();

     }

    }

    goSalida(id: string){
          this.template='salida_inventario'
      this.id=parseInt(id);
      let inv = this.inventarios.find(inventario => inventario.id == this.id);
      for(var i in this.inventarioSalida){
        this.inventarioSalida[i]=inv[i];
      }
    }

    eliminar(){
          for(var i in this.selected){
            console.log(this.selected[i]);
            let index =this.inventarios.findIndex(inventario => inventario.id==this.selected[i]);
            console.log(index);
            this.inventarios.splice(index,1);
          }
          this.selected=[];
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

    buscar(){
      let busquedaTemp = this.busqueda;
      if(busquedaTemp.valor=='') this.inventarios=this.inventarioTemporal;
      this.inventarios=this.inventarioTemporal.filter(function(inventario){
        if(busquedaTemp.tipoB=='código') {
          console.log("codigo");
          return inventario.codigo.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
        }
        else return inventario.nombre.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
      })
    }
    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
      window.setTimeout(()=>{
      },100);
    }
}
