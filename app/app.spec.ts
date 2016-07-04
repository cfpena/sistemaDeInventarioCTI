import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
}                               from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders , describe, beforeEach, it,expect,inject} from '@angular/core/testing';
import { MyApp } from './app';
import {UsuarioService} from './pages/usuario/usuario.auth.service';
import {LoginPage} from './pages/login/login';
import {Http, Headers} from '@angular/http';
import {NavController} from 'ionic-angular';

// this needs doing _once_ for the entire test suite, hence it's here
setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

// Mock out Ionic's platform class
class MockClass {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

let myApp = null;
let login = null

describe('MyApp', () => {

  beforeEach(function() {
    let platform = (<any>new MockClass());
    let usuarioServ: UsuarioService;
    myApp = new MyApp(platform,usuarioServ);
  });

  it('initialise app', () => {
    expect(myApp).not.toBeNull();
  });
});


describe('Login', () => {

  beforeEach(function() {
    var usuarioServ: UsuarioService;
    var http: Http;
    var nav: NavController;
    login = new LoginPage(http,nav,usuarioServ);
  });

  it('iniciar sesion', () => {
    login.setUsuario('prueba@prueba.com','prueba1234');
  //  login.login();
    let isLogin = login.isLoggedIn();
    expect(login.isLoggedIn()).toBe(true);
  });
});
