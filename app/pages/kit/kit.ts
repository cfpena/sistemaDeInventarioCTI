import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import {Kit} from '../kit/kit.model';

@Component({
  templateUrl: 'build/pages/kit/kit.html',
    directives: [MaterializeDirective],
})
export class KitPage implements OnInit{

title: string ='Kits';
ITEMS: ITEM[]=[];
KITS: Kit[]=[
  {id: 1,  codigo: '1239033567',  nombre: 'arduino',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: ' ', cantidad:20, items: this.ITEMS},
  {id: 2,  codigo: '9988444444',  nombre: 'kit2',  marca: 'Marca 1',  modelo: 'Modelo 2',  descripcion: ' ', cantidad:10, items: this.ITEMS}
  ]

template: string = 'null';
kitsTemporal: Kit[]=[];

@Input()
kitNuevo = new Kit();


@Input()
kitModificar= new Kit();
count=10;
id=0;
selected: number[]=[];
tiposBusquedas = ['código', 'nombre'];
busqueda={tipo: 'código', valor: ''};

  constructor(private navController:NavController,private menu: MenuController) {
    this.kitsTemporal=this.KITS;
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

  //crea un kit
  crear(){
    let validator = new Validator();
    console.log(JSON.stringify(validator.validate(this.kitNuevo)));
    if(!validator.isValid(this.kitNuevo)) this.presentToast('Corrija el formulario');
    else if (this.kitNuevo.codigo=='' || this.kitNuevo.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
   else if(this.kitNuevo.nombre=='') this.presentToast('Nombre vacio');
   else if(this.kitNuevo.descripcion=='') this.presentToast('Descripción vacio');
   else if(this.kitNuevo.marca=='') this.presentToast('Marca vacio');
   else if(this.kitNuevo.modelo=='') this.presentToast('Modelo vacio');
   else{
     this.kitNuevo.items = this.ITEMS;
    this.KITS.push(this.kitNuevo);
    this.template='null';
    this.count++;
    this.kitNuevo = new Kit();
  }
  }

  goModificar(id: string){
  this.template='modificar'
  this.id=parseInt(id);
  this.kitModificar = JSON.parse(JSON.stringify(this.KITS.find(kit => kit.id == this.id)));
  }

  //modifica el usario
  modificar(){

    let validator = new Validator();

    console.log(JSON.stringify(validator.validate(this.kitModificar)));
    if(!validator.isValid(this.kitModificar)) this.presentToast('Corrija el formulario');
    else if (this.kitModificar.codigo=='' || this.kitModificar.codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
  else if(this.kitModificar.nombre=='') this.presentToast('Nombre vacio');
  else if(this.kitModificar.descripcion=='') this.presentToast('Descripción vacio');
  else if(this.kitModificar.marca=='') this.presentToast('Marca vacio');
  else if(this.kitModificar.modelo=='') this.presentToast('Modelo vacio');
  else{
  let index =this.KITS.findIndex(kit => kit.id == this.id);
  this.KITS[index] =JSON.parse(JSON.stringify(this.kitModificar));
  this.template='null';
  }
  }

  eliminar(){
  for(var i in this.selected){
    console.log(this.selected[i]);
    let index =this.KITS.findIndex(kit => kit.id==this.selected[i]);
    console.log(index);
    this.KITS.splice(index,1);
  }
  this.selected=[];
  }

  select(id: any){
  let index: number;
  index = this.selected.findIndex(num => num == parseInt(id));
  if(index==-1){
  this.selected.push(parseInt(id));}
  else{this.selected.splice(index,1)};
    console.log(this.selected);
  }

  goCrearKit(){
    this.template='crear';
  }

  cancelar(){
    this.template='null';
  }

  buscar(){
    let busquedaTemp = this.busqueda;
    if(busquedaTemp.valor=='') this.KITS=this.kitsTemporal;
    this.KITS=this.kitsTemporal.filter(function(kit){
      if(busquedaTemp.tipo=='código') {
        console.log("codigo");
        return kit.codigo.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
      }
      else return kit.nombre.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
    })
  }


    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
      window.setTimeout(()=>{
      },100);
  }



}
/*
const listaItems1: ITEM[]=[
  {id: 1,  codigo: 'Item001',  nombre: 'Item 1',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: ' ', cantidad:20, esDispositivo: true},
  {id: 2,  codigo: 'Item002',  nombre: 'Item 2',  marca: 'Marca 1',  modelo: 'Modelo 2',  descripcion: ' ', cantidad:10, esDispositivo: true}

]

const listaItems2: ITEM[]=[
  {id: 3,  codigo: 'Item003',  nombre: 'Item 3',  marca: 'Marca 2',  modelo: 'Modelo 3',  descripcion: ' ', cantidad:15,esDispositivo: false}
]

const KITS: Kit[]=[
  {id: 1,  codigo: 'Kit001',  nombre: 'Kit 1',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: ' ', cantidad:20, items: listaItems1, observaciones:''},
  {id: 2,  codigo: 'Kit002',  nombre: 'Kit 2',  marca: 'Marca 1',  modelo: 'Modelo 2',  descripcion: ' ', cantidad:10, items: listaItems2, observaciones:''}
  ]

const ITEMS: ITEM[]=[
  {id: 1,  codigo: 'Item001',  nombre: 'Item 1',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: ' ', cantidad:20, esDispositivo: true},
  {id: 2,  codigo: 'Item002',  nombre: 'Item 2',  marca: 'Marca 1',  modelo: 'Modelo 2',  descripcion: ' ', cantidad:10, esDispositivo: true},
  {id: 3,  codigo: 'Item003',  nombre: 'Item 3',  marca: 'Marca 2',  modelo: 'Modelo 3',  descripcion: ' ', cantidad:15,esDispositivo: false}
]
*/
