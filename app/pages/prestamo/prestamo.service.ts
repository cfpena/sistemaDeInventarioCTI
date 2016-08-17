import { Injectable }     from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Prestamo } from './prestamo.model';
import {Url} from '../../url';
import {UsuarioAuthService} from '../usuario/usuario.auth.service';

@Injectable()
export class PrestamoService {
    url = new Url();

    constructor(private http: Http,
        private usuarioAuthService: UsuarioAuthService) { }

    getPrestamos() {
      //HEADERS OBLIGATORIOS PARA EL REQUEST DEFINIDOS POR EL ESTANDAR
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");
        //FUNCION ASINCRONICA QUE OBTIENE EL TOKEN DE LAS COOKIE
        // token => {} token es el valor obtenido y es pasado por referencia a la funncion por definir dentro de {}
        return this.usuarioAuthService.getToken().then(token => {
          //se agrega el header Authorization con el token respectivo para la autenticacion
            headers.append('Authorization', 'JWT ' + token);
            //se envia el request http de tipo get con la url, y los headers y se la convierte en una promesa
            //si no se hace return, no se puede hacer un then
            return this.http.get(this.url.base + this.url.prestamo, { headers: headers }).toPromise();
            //cuando la funcion haya terminado de traer los datos pasa a la seccion then()
        }).then(result => {
          //convertimos el resultado que es un json con las prestamos a un arreglo del modelo prestamos
          //this.http.get(this.url.base + result.Persona, { headers: headers }).toPromise();

          let prestamos = result.json() as Prestamo[];
          console.log(prestamos);
          return prestamos;

          //si existe un error, no pasa por then, sino por catch
        }).catch(error=>{
          console.log(error)
        });;
    }


    getBuscar(cadena: String) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.get(this.url.base + this.url.prestamo + this.url.buscar + cadena , { headers: headers }).toPromise();
        }).then(result => {

          let prestamos = result.json() as Prestamo[];
          console.log(result.json());
          return prestamos;

        }).catch(error=>{
          console.log(error)
        });
    }


    createPrestamo(prestamo: Prestamo) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.post(this.url.base + this.url.prestamo, JSON.stringify(prestamo),{ headers: headers }).toPromise();

        }).then(result => {
          //para el metodo post se debe pasar los parametros con formato JSON pero de tipo string
          return this.http.post(this.url.base + this.url.password, JSON.stringify({

            Persona: prestamo.Persona,
            Item: prestamo.Item,
            Cantidad: prestamo.Cantidad,
            Fecha: prestamo.Fecha,
            Fecha_devolucion: prestamo.Fecha_devolucion,
            Fecha_vencimiento: prestamo.Fecha_vencimiento,
            Detalle: prestamo.Detalle

            }),{ headers: headers }).toPromise();
        }).then(result=> console.log(result)).catch(error => console.log(error));
    }

    updatePrestamo(prestamo: Prestamo) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append('Accept','application/json');
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return this.http.patch(String(prestamo.url), JSON.stringify({

              Persona: prestamo.Persona,
              Item: prestamo.Item,
              Cantidad: prestamo.Cantidad,
              Fecha: prestamo.Fecha,
              Fecha_devolucion: prestamo.Fecha_devolucion,
              Fecha_vencimiento: prestamo.Fecha_vencimiento,
              Detalle: prestamo.Detalle

            }),{ headers: headers }).toPromise();

        }).then(result => {return result});
    }



    eliminarPrestamo(prestamo: Prestamo) {

      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept","application/json");
        return this.usuarioAuthService.getToken().then(token => {
            headers.append('Authorization', 'JWT ' + token);
            //request del tipo delete para eliminar, se envia la url que ya la contiene el mismo modelo
            return this.http.delete(prestamo.url.toString(), { headers: headers }).toPromise();
        }).then(result => {
          return result;
        }).catch(error=> console.log(error));
    }


}
