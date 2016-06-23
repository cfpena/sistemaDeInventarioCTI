import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PrincipalPage} from '../principal/principal';
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',

})
export class LoginPage {
  constructor(private nav: NavController) {}

  goPrincipal() {

        this.nav.push(PrincipalPage,{});
        this.nav.setRoot(PrincipalPage);
}
}
