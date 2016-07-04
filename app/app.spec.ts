import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS, TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
}                               from '@angular/platform-browser-dynamic/testing';
import { setBaseTestProviders , describe, beforeEach, it,expect,inject} from '@angular/core/testing';
import { MyApp } from './app';
import {UsuarioService} from './pages/usuario/usuario.auth.service';
import {Http, Headers} from '@angular/http';
import {NavController,MenuController} from 'ionic-angular';
import {LoginPage} from './pages/login/login';
import {UsuarioPage} from './pages/usuario/usuario';

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
let loginPage = null
let usuarioPage = null;

describe('Aplicacion principal', () => {

  beforeEach(function() {
    let platform = (<any>new MockClass());
    let usuarioServ: UsuarioService;
    myApp = new MyApp(platform,usuarioServ);
  });

  it('inicializacion de app', () => {
    expect(myApp).not.toBeNull();
  });
});


describe('logg in', () => {

  beforeEach(function() {
    var usuarioServ: UsuarioService;
    var http: Http;
    var nav: NavController;

    loginPage = new LoginPage(http,nav,usuarioServ);
  });

  it('iniciar sesion', () => {
    loginPage.setUsuario('prueba@prueba.com','prueba1234');
  //  login.login();
    let isLogin = loginPage.isLoggedIn();
    expect(loginPage.isLoggedIn()).toBe(false);
  });
});


describe('Usuarios', () => {

  beforeEach(function() {
    var usuarioServ: UsuarioService;
    var http: Http;
    var nav: NavController;
    var menu: MenuController;
    usuarioPage = new UsuarioPage(nav,menu);
  });

  it('listar usuarios', () => {
    expect(usuarioPage.usuarios).toBeTruthy();
  });

  it('crear usuarios', () => {
    let usuarios = usuarioPage.usuarios;
    let usuarioNuevo = usuarioPage.usuarioNuevo;
    usuarioNuevo =
        {id: 10, email: 'mail@info.com',
        provider:"", uid:'mail@info.com',
        name:'mail',nickname:"",image:'',
        type:'admin'};
    usuarios.push(usuarioNuevo);
    let index = usuarios.length -1;
    let usuario= usuarios[index];

    expect(usuario.id).toBe(10);
  });

  it('eliminar usuarios', () => {
    let usuarios = usuarioPage.usuarios;
    for (var index in usuarios){
      usuarioPage.selected.push(index);
    }
    usuarioPage.eliminar();
    expect(usuarios.length).toBe(0);
  });
  it('modificar usuarios', () => {
    let usuarios = usuarioPage.usuarios;
    usuarioPage.id=10;
    usuarioPage.usuarioModificar.name = 'Jose';
    expect(usuarioPage.usuarioModificar.name).toBe('Jose');
  });
});
