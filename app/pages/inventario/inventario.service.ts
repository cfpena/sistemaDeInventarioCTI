import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { IngresoEgreso } from './inventario.model';
import { FacturaIngreso } from './inventario.model';
import {Url} from '../../url';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';
import {NavController} from 'ionic-angular';
import {HttpRequest} from '../../httprequest';
import {Persona} from '../persona/persona.model';
import {ITEM} from '../item/item.model';

@Injectable()
export class InventarioService {
  url = new Url();
  httprequest:HttpRequest;

  constructor(private http: Http,
    private usuarioAuthService: UsuarioAuthService) {
      this.httprequest = new HttpRequest(http);
    }

    //Obtiene todos los movimientos de inventario
    getMovimientos(nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.movimiento, nav).then(result => {
        let movimientos = result.json() as FacturaIngreso[];
        return movimientos;
      })
    }

    createMovimiento (movimiento: FacturaIngreso, listaMovimientoDet: IngresoEgreso[], nav: NavController){
      //movimiento.IngresoEgreso=['http://162.243.83.72/api/ingresosegresos/46/']//quitar este elemento cuando ya acepte listas vacias
     movimiento.IngresoEgreso=[];
      console.log(JSON.stringify(movimiento));
      return this.httprequest.post(this.url.base + this.url.movimiento, JSON.stringify(movimiento),nav).then(result=>{
        console.log('cree movimiento')
        movimiento = result.json() as FacturaIngreso
        for(let movimientodet of listaMovimientoDet){
          movimientodet.Cantidad = Number(movimientodet.Cantidad)
          movimientodet.Item = movimientodet.Item.url
          //console.log(JSON.stringify(movimientodet))
          this.httprequest.post(this.url.base + this.url.movimientoDetalle,JSON.stringify(movimientodet),nav).then (result=>{
            let movdet = result.json() as IngresoEgreso
        //    console.log(JSON.stringify(movdet))
            movimiento.IngresoEgreso.push(movdet.url)
          //  console.log(JSON.stringify(movimiento));
            return this.httprequest.patch(String(movimiento.url), JSON.stringify(movimiento),nav)
            .then(result => {return result});
          })

        }
      })
    }


    llenarProveedor(movimiento: FacturaIngreso,nav: NavController){
      //console.log('llenar proveedor')
      return this.httprequest.get(String(movimiento.Proveedor),nav).then(proveedor=>{
        movimiento.Proveedor =  proveedor.json() as Persona;
      });
    }


    llenarMovimientoDet(movimientodet: any,nav: NavController){
      //console.log('llenar movimientodet')
      return this.httprequest.get(String(movimientodet),nav).then(movdet=>{
        return movimientodet =  movdet.json() as IngresoEgreso;
      });
    }

    llenarItem(item: any,nav: NavController){
      //console.log('llenar item')
      return this.httprequest.get(String(item),nav).then(movdet=>{
        return item =  movdet.json() as ITEM;
      });
    }

    getBuscar(cadena: String, nav: NavController) {
      return this.httprequest.get(this.url.base + this.url.movimiento + this.url.buscar + cadena,nav)
      .then(result => {
        let movmiientos = result.json() as FacturaIngreso[];
        return movmiientos;

      }).catch(error=>{
        console.log(error)
      });
    }

  }
