import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {MaterializeDirective} from "../../materialize-directive";

import {Kit} from '../kit/kit.model';
import {CrearKitPage} from '../crear_kit/crear_kit';

@Component({
  templateUrl: 'build/pages/kit/kit.html',
  directives: [MaterializeDirective],
})
export class KitPage implements OnInit{
  /*
  items = ITEMS;
  kits = KITS;
    title: string ='Kits';
*/
title: string ='Kits';

  constructor(private _navController:NavController,private menu: MenuController) {}
  openMenu(){
    this.menu.open();
  }

  goCrearKit(){
      this._navController.push(CrearKitPage,{});
      this._navController.setRoot(CrearKitPage);
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
