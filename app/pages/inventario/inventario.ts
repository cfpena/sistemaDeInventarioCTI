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
      {id: 1, fecha:'05/07/16', codigo: '1234567890', tipo:'item', nombre: 'Resistencia',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: '', estado:'disponible' ,cantidad:20},
      {id: 2, fecha:'08/07/16', codigo: '1234456891', tipo:'kit', nombre: 'Arduino',  marca: 'Marca 2',  modelo: 'Modelo 2',  descripcion: '',estado:'disponible' ,  cantidad:40},
      {id: 3, fecha:'10/07/16', codigo: '0956787892', tipo:'item',  nombre: 'Capacitor',  marca: 'Marca 3',  modelo: 'Modelo 3',  descripcion: '', estado:'no disponible' , cantidad:20}
    ];

    template: string = 'null';

    @Input()
    inventarioNuevo = new Inventario();

    @Input()
    inventarioModificar = new Inventario();

    count=10;
    id=0;
    selected: number[]=[];
    estado = ['Elija un estado...','disponible','no disponible'];

    constructor( private navController:NavController,private menu: MenuController){
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

    //crea un item
    crear(){
      let validator = new Validator();
      console.log(JSON.stringify(validator.validate(this.inventarioNuevo)));
      if(!validator.isValid(this.inventarioNuevo)) this.presentToast('Corrija el formulario');
     else if (this.inventarioNuevo.codigo=='' || this.inventarioNuevo.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
     else if(this.inventarioNuevo.nombre=='') this.presentToast('Nombre vacio');
     else if(this.inventarioNuevo.descripcion=='') this.presentToast('Descripción vacio');
     else if(this.inventarioNuevo.marca=='') this.presentToast('Marca vacio');
     else if(this.inventarioNuevo.modelo=='') this.presentToast('Modelo vacio');
     else if(this.inventarioNuevo.cantidad < 1 || this.inventarioNuevo.cantidad > 50 || this.inventarioNuevo.cantidad==0) this.presentToast('Cantidad mínima 1 máximo 50');

     else{
      this.inventarios.push(this.inventarioNuevo);
      this.template='null';
      this.count++;
      this.inventarioNuevo = new Inventario();
      }
    }


    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
      window.setTimeout(()=>{
      },100);
    }
}
