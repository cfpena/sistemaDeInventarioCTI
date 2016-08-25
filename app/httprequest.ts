
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Storage, LocalStorage } from 'ionic-angular';
import { NavController, Loading, Toast } from 'ionic-angular';
import { Url } from './url';
import {Load} from './loading';

export class HttpRequest {

    url = new Url();
    local: Storage = new Storage(LocalStorage);
    constructor(private http: Http) {}
    presentToast(text: any, nav: NavController) {
        let toast = Toast.create({


            message: text.json()['detail'],
            duration: 3000
        });
        nav.present(toast);
    }
    getToken(nav: NavController) {
        return this.local.get('auth').then(res => {
            return JSON.parse(res).token;
        }, error => {
            this.presentToast(error, nav)
        });
    }
    getHeaders(nav: NavController) {
      let headers = new Headers({ "Content-Type": "application/json" });
      headers.append("Accept", "application/json");
        return this.getToken(nav).then(token => {
            headers.append('Authorization', 'JWT ' + token);
            return headers
        }).catch(error => this.presentToast(error, nav))

    }

    get(url: string, nav: NavController) {
        return this.getHeaders(nav).then(headers => {

            return this.http.get(url.toString(), { headers: headers }).toPromise().catch(error => {this.presentToast(error, nav) });
        }).then(result=>{return result}).catch(error => { this.presentToast(JSON.stringify(error), nav) })
    }
    post(url: string, params: string, nav: NavController) {

        return this.getHeaders(nav).then(headers => {
          console.log(headers)
            return this.http.post(url, params, { headers: headers }).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{return result}).catch(error => { this.presentToast(error, nav) })

    }
    patch(url: string, params: string, nav: NavController) {

        return this.getHeaders(nav).then(headers => {
            return this.http.patch(url, params, { headers: headers }).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{}).catch(error => { this.presentToast(error, nav) })

    }
    delete(url: string, nav: NavController) {

        return this.getHeaders(nav).then(headers => {
            return this.http.delete(url, { headers: headers }).toPromise().catch(error => { this.presentToast(error, nav) });
        }).then(result=>{}).catch(error => { this.presentToast(error, nav) })

    }


}
