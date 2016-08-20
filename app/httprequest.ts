
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';
import { NavController, MenuController, Toast } from 'ionic-angular';
import { Url } from './url';
import {Load} from './loading';

export class HttpRequest {
    url = new Url();
    local: Storage = new Storage(LocalStorage);
    load= new Load();
    constructor(private http: Http) {}
    presentToast(text: string, nav: NavController) {
        let toast = Toast.create({
            message: text,
            duration: 3000
        });
        nav.present(toast);
    }
    getToken(nav: NavController) {
        return this.local.get('auth').then(res => {
            return JSON.parse(res).token;
        }, err => {
            this.presentToast('Ocurrio un error en el requerimiento', nav)
        });
    }
    getHeaders(nav: NavController) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept", "application/json");
        return this.getToken(nav).then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return headers
        }).catch(error => this.presentToast('Ocurrio un error en el requerimiento', nav))

    }

    get(url: string, nav: NavController) {
      this.load.present(nav)
        return this.getHeaders(nav).then(headers => {
          console.log(headers)
            return this.http.get(url, { headers: headers }).toPromise().catch(error => { this.presentToast('Ocurrio un error en el requerimiento', nav) });
        }).then(result=>{this.load.dismiss();return result}).catch(error => { this.presentToast('Ocurrio un error en el requerimiento', nav) })
    }
    post(url: string, params: string, nav: NavController) {
      this.load.present(nav)
        return this.getHeaders(nav).then(headers => {
          console.log(headers)
            return this.http.post(url, params, { headers: headers }).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{this.load.dismiss()}).catch(error => { this.presentToast('Ocurrio un error en el requerimiento', nav) })

    }
    patch(url: string, params: string, nav: NavController) {
      this.load.present(nav)
        return this.getHeaders(nav).then(headers => {
            return this.http.patch(url, params, { headers: headers }).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{this.load.dismiss()}).catch(error => { this.presentToast('Ocurrio un error en el requerimiento', nav) })

    }
    delete(url: string, nav: NavController) {
      this.load.present(nav)
        return this.getHeaders(nav).then(headers => {
            return this.http.delete(url, { headers: headers }).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{this.load.dismiss()}).catch(error => { this.presentToast('Ocurrio un error en el requerimiento', nav) })

    }


}
