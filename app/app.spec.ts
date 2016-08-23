import { setBaseTestProviders , describe, beforeEach, it,expect,inject} from '@angular/core/testing';
import { MyApp } from './app';
import {UsuarioAuthService} from './pages/usuario/usuario.auth.service';
import {UsuarioService} from './pages/usuario/usuario.service';
import {ItemService} from './pages/item/item.service';
import {KitService} from './pages/kit/kit.service';
import {Http, Headers} from '@angular/http';
import {NavController,MenuController} from 'ionic-angular';
import {LoginPage} from './pages/login/login';
import {UsuarioPage} from './pages/usuario/usuario';
import {PersonaPage} from './pages/persona/persona';
import {PersonaService} from './pages/persona/persona.service';
import {InventarioPage} from './pages/inventario/inventario';
//import {InventarioService} from './pages/inventario/inventario.service';
import {KitPage} from './pages/kit/kit';
import {ItemPage} from './pages/item/item';

// this needs doing _once_ for the entire test suite, hence it's here

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
let personaPage = null;
let inventarioPage = null;
let kitPage = null;
let itemPage = null;

describe('Aplicacion principal', () => {

  beforeEach(function() {
    let platform = (<any>new MockClass());
    let usuarioServ: UsuarioAuthService;

    myApp = new MyApp(platform,usuarioServ);
  });

  it('inicializacion de app', () => {
    expect(myApp).not.toBeNull();
  });
});

/*
describe('logg in', () => {

  beforeEach(function() {
    var usuarioServ: UsuarioAuthService;
    var http: Http;
    var nav: NavController;

    loginPage = new LoginPage(http,nav,usuarioServ);
  });

  it('iniciar sesion', () => {
    loginPage.setUsuario('admin','001122admin');
  //  login.login();
    loginPage.login();
    expect(loginPage.isAuthenticated()).toBe(true);
  });
});
*/

describe('Usuarios', () => {
  let http: Http;
  let nav: NavController;
  let menu: MenuController;
  let usuarioAuth= new UsuarioAuthService(http)
  let usuarioServ= new UsuarioService(http,usuarioAuth)

  beforeEach(function() {
    usuarioPage = new UsuarioPage(nav,menu,usuarioServ,http);
  });

  it('listar usuarios', () => {
    expect(usuarioPage.usuarios).toBeTruthy();
  });


  it('crear usuarios', () => {

    let usuariosAntes=0
    usuarioPage.listar().then(()=>{//se lo trata de manera asincronica
      return usuariosAntes=usuarioPage.usuarios.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let usuarioNuevo =
          {Email: 'apinargo@espol.edu.ec',
          Nombre:'Adriano',
          Apellido: 'Pinargote',
          Tipo: 'Ayudante',
      }; //se crea el usuario
      usuarioPage.usuarioNuevo = usuarioNuevo //se le agrega el usuario nuevo a la pagina
      return usuarioPage.crear() //se ejecuta la funcion crear

    }).then(()=>{
      expect(usuarioPage.usuarios.length -1 ).toBe(usuariosAntes) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

  it('eliminar usuarios', () => {
    let usuariosAntes=0
    usuarioPage.listar().then(()=>{//se lo trata de manera asincronica
      return usuariosAntes=usuarioPage.usuarios.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let usuarioNuevo =
          {
      }; 
      return usuarioPage.eliminar() //se ejecuta la funcion eliminar

    }).then(()=>{
      expect(usuarioPage.usuarios.length -1 ).toBe(0) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

  it('modificar usuarios', () => {
    let usuarios = usuarioPage.usuarios;
    usuarioPage.Nombre='Adriano';
    usuarioPage.usuarioModificar.Nombre = 'Adriano';
    expect(usuarioPage.usuarioModificar.Nombre).toBe('Adriano');
  });
});

describe('Personas', () => {

  beforeEach(function() {
    var personaServ: PersonaService;
    var http: Http;
    var nav: NavController;
    var menu: MenuController;
    personaPage = new PersonaPage(nav,menu,personaServ,http);
  });

  it('listar personas', () => {
    expect(personaPage.personas).toBeTruthy();
  });

  it('crear personas', () => {

    let personasAntes=0
    personaPage.listar().then(()=>{//se lo trata de manera asincronica
      return personasAntes=personaPage.personas.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let personaNueva =
          {CI:'0924268915',
          Nombre: 'Xavier',  Apellido: 'Vera',
          Email: 'x@prueba.com', Telefono: '0986009274',
          celular: '0987654321', Genero: 'Masculino',
          Direccion: 'General Villamil', Matricula: '201345612' ,
          Tipo:'Estudiante'
      }; //se crea la persona
      personaPage.personaNueva = personaNueva //se le agrega el usuario nuevo a la pagina
      return personaPage.crear() //se ejecuta la funcion crear

    }).then(()=>{
      expect(personaPage.personas.length -1 ).toBe(personasAntes) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });


  it('eliminar personas', () => {
    let personasAntes=0
    personaPage.listar().then(()=>{//se lo trata de manera asincronica
      return personasAntes=personaPage.personas.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let personaNuevo =
          {
      };
      return personaPage.eliminar() //se ejecuta la funcion eliminar

    }).then(()=>{
      expect(personaPage.personas.length -1 ).toBe(0) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

  it('modificar personas', () => {
    let personas = personaPage.personas;
    personaPage.CI='0924268915';
    personaPage.personaModificar.Nombre = 'Xavier';
    expect(personaPage.personaModificar.Nombre).toBe('Xavier');
  });
});

/*
describe('Inventarios', () => {

  beforeEach(function() {
    var inventarioServ: InventarioService;
    var personaServ: PersonaService;
    var http: Http;
    var nav: NavController;
    var menu: MenuController;
    inventarioPage = new InventarioPage(nav,menu);
  });

  it('listar inventarios', () => {
    expect(inventarioPage.inventarios).toBeTruthy();
  });

  it('ingresar inventario', () => {
    let inventarios = inventarioPage.inventarios;
    let inventarioNuevo = inventarioPage.inventarioNuevo;
    inventarioNuevo =
        {
            id: 10,  fecha: '15/07/2016',
            codigo:'0924268915', tipo:'Kit',
            nombre: 'Arduino',  marca: 'Marca1',
            modelo: 'Modelo1', detalle:'Ingreso por compra',
            cantidad: 20, estado: 'disponible'

          };
    inventarios.push(inventarioNuevo);
    let index = inventarios.length -1;
    let inventario= inventarios[index];

    expect(inventario.id).toBe(10);
  });

});
*/
describe('Kits', () => {

  beforeEach(function() {
    var kitServ: KitService;
    var itemServ: ItemService;
    var http: Http;
    var nav: NavController;
    var menu: MenuController;
    kitPage = new KitPage(nav,menu,kitServ,itemServ,http);
  });

  it('listar kits', () => {

      expect(kitPage.kits).toBeTruthy();
  });
/*
  it('crear kits', () => {
    let kits = kitPage.KITS;
    let kitNuevo = kitPage.kitNuevo;
    kitNuevo =
        {id: 10,  codigo: 'Kit0000004',
        nombre: 'Kit 4',  marca: 'Marca 4',
        modelo: 'Modelo 4',  descripcion: 'kit 4 de marca 4 modelo 4',
        cantidad:10, items: this.ITEMS=[
          {id: 1,  codigo: '1234567890',  nombre: 'Resistencia',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: 'Resistencia100 ', cantidad:20, esDispositivo:true, image:''},
          {id: 2,  codigo: '1234456891',  nombre: 'Capacitor',  marca: 'Marca 2',  modelo: 'Modelo 2',  descripcion: 'Capacitor100 ', cantidad:70, esDispositivo:true, image:''},
          {id: 3,  codigo: '0956787892',  nombre: 'Ítem',  marca: 'Marca 3',  modelo: 'Modelo 3',  descripcion: 'Resistencia50 ', cantidad:16, esDispositivo:true, image:''}

        ]
          };
    kits.push(kitNuevo);
    let index = kits.length -1;
    let kit= kits[index];

    expect(kit.id).toBe(10);
  });

  it('eliminar kits', () => {
    let kits = kitPage.KITS;
    for (var index in kits){
      kitPage.selected.push(index);
    }
    kitPage.eliminar();
    expect(kits.length).toBe(0);
  });*/
  it('modificar kits', () => {
    let kits = kitPage.KITS;
    kitPage.id=10;
    kitPage.kitModificar.codigo = 'Kit0000003';
    expect(kitPage.kitModificar.codigo).toBe('Kit0000003');
  });

});



describe('Items', () => {

  beforeEach(function() {

    var itemServ: ItemService;
    var http: Http;
    var nav: NavController;
    var menu: MenuController;
    itemPage = new ItemPage(nav,menu,itemServ,http);
  });

  it('listar items', () => {

      expect(itemPage.items).toBeTruthy();
  });
/*
  it('crear kits', () => {
    let kits = kitPage.KITS;
    let kitNuevo = kitPage.kitNuevo;
    kitNuevo =
        {id: 10,  codigo: 'Kit0000004',
        nombre: 'Kit 4',  marca: 'Marca 4',
        modelo: 'Modelo 4',  descripcion: 'kit 4 de marca 4 modelo 4',
        cantidad:10, items: this.ITEMS=[
          {id: 1,  codigo: '1234567890',  nombre: 'Resistencia',  marca: 'Marca 1',  modelo: 'Modelo 1',  descripcion: 'Resistencia100 ', cantidad:20, esDispositivo:true, image:''},
          {id: 2,  codigo: '1234456891',  nombre: 'Capacitor',  marca: 'Marca 2',  modelo: 'Modelo 2',  descripcion: 'Capacitor100 ', cantidad:70, esDispositivo:true, image:''},
          {id: 3,  codigo: '0956787892',  nombre: 'Ítem',  marca: 'Marca 3',  modelo: 'Modelo 3',  descripcion: 'Resistencia50 ', cantidad:16, esDispositivo:true, image:''}

        ]
          };
    kits.push(kitNuevo);
    let index = kits.length -1;
    let kit= kits[index];

    expect(kit.id).toBe(10);
  });

  it('eliminar kits', () => {
    let kits = kitPage.KITS;
    for (var index in kits){
      kitPage.selected.push(index);
    }
    kitPage.eliminar();
    expect(kits.length).toBe(0);
  });*/
  it('modificar items', () => {
    let items = kitPage.ITEMS;
    itemPage.id=10;
    itemPage.itemModificar.codigo = 'Item000003';
    expect(itemPage.itemModificar.codigo).toBe('Item000003');
  });

});
