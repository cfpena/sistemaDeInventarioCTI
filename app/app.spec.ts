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
import {InventarioService} from './pages/inventario/inventario.service';
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


describe('Intregracion 1 logg in', () => {
  let http: Http;
  let nav: NavController;
  let menu: MenuController;
  let usuarioAuth= new UsuarioAuthService(http)
  let usuarioServ= new UsuarioService(http,usuarioAuth)
  beforeEach(function() {


    loginPage = new LoginPage(http,nav,usuarioAuth);
  });
/*
  it('iniciar sesion', () => {
    loginPage.setUsuario('admin','001122admin');
  //  login.login();
    loginPage.login();
    expect(loginPage.isAuthenticated()).toBe(true);
  });*/
});


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
  let http: Http;
  let usuarioAuth= new UsuarioAuthService(http) //antes var usuarioAuth: UsuarioAuthService
  let personaServ= new PersonaService(http,usuarioAuth) //antes var personaServ: PersonaService
  let nav: NavController;
  let menu: MenuController;

  beforeEach(function() {
    //antes las instancias estaban aqui

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

describe('Kits', () => {

  let http: Http;
  let usuarioAuth= new UsuarioAuthService(http) //antes var usuarioAuth: UsuarioAuthService
  let kitServ= new KitService(http,usuarioAuth)
  let itemServ= new ItemService(http,usuarioAuth)
  let nav: NavController;
  let menu: MenuController;
  beforeEach(function() {

    kitPage = new KitPage(nav,menu,kitServ,itemServ,http);
  });

  it('listar kits', () => {

      expect(kitPage.kits).toBeTruthy();
  });

  it('crear kits', () => {
    let kitsAntes=0
    kitPage.listar().then(()=>{//se lo trata de manera asincronica
      return kitsAntes=kitPage.kits.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let kitNuevo =
          {Codigo: 'KIT001',
          CodigoEspol: '09241235',
          CodigoSenecyt: '123456',
          Nombre: 'KITPRUEBA',
          Marca: 'POWERDUDE',
          Modelo: 'ACTIOM',
          Descripcion: 'KIT DE PRUEBA',
          Imagen: '',
          Elementos: [],
          Dispositivos: []
      }; //se crea el kit
      kitPage.kitNuevo = kitNuevo //se le agrega el kit nuevo a la pagina
      return kitPage.crear() //se ejecuta la funcion crear

    }).then(()=>{
      expect(kitPage.kits.length -1 ).toBe(kitsAntes) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

  it('eliminar kits', () => {
    let kitsAntes=0
    kitPage.listar().then(()=>{//se lo trata de manera asincronica
      return kitsAntes=kitPage.kits.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let kitNuevo =
          {
      };
      return kitPage.eliminar() //se ejecuta la funcion eliminar

    }).then(()=>{
      expect(kitPage.kits.length -1 ).toBe(0) //se verifica que la cantidad de antes es igual a la de ahora -1
    })
  });

    it('Integracion 3 crear item e ingresarlo en un kit', () => {
      let kitsAntes=0
      kitPage.listar().then(()=>{//se lo trata de manera asincronica
        return kitsAntes=kitPage.kits.length // se retorna para poder hacer otro theb
      }).then(()=>{
        let kitNuevo =
            {Codigo: 'KIT001',
            CodigoEspol: '09241235',
            CodigoSenecyt: '123456',
            Nombre: 'KITPRUEBA',
            Marca: 'POWERDUDE',
            Modelo: 'ACTIOM',
            Descripcion: 'KIT DE PRUEBA',
            Imagen: '',
            Elementos: [],
            Dispositivos: []
        }; //se crea el kit
        let itemNuevo =
            {Nombre: 'Resistencia 560 OHM' ,
            Marca: 'RoHS',
            Modelo: 'ModeloHS'
        }; //se crea el kit
        itemPage.itemNuevo = itemNuevo //se le agrega el kit nuevo a la pagina
        kitPage.kitNuevo = kitNuevo //se le agrega el kit nuevo a la pagina
        return kitPage.crear() //se ejecuta la funcion crear

      }).then(()=>{
        expect(kitPage.kits.length -1 ).toBe(kitsAntes) //se verifica que la cantidad de antes es igual a la de ahora -1
      })

    });



  it('modificar kits', () => {
    let kits = kitPage.KITS;
    kitPage.id=10;
    kitPage.kitModificar.codigo = 'Kit0000003';
    expect(kitPage.kitModificar.codigo).toBe('Kit0000003');
  });

});


describe('Items', () => {

  let http: Http;
  let usuarioAuth= new UsuarioAuthService(http) //antes var usuarioAuth: UsuarioAuthService
  let itemServ= new ItemService(http,usuarioAuth)
  let nav: NavController;
  let menu: MenuController;
  beforeEach(function() {

    itemPage = new ItemPage(nav,menu,itemServ,http);
  });

  it('listar items', () => {

      expect(itemPage.items).toBeTruthy();
  });

  it('crear items', () => {
    let itemsAntes=0
    itemPage.listar().then(()=>{//se lo trata de manera asincronica
      return itemsAntes=itemPage.items.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let itemNuevo =
          {Nombre: 'Resistencia 560 OHM' ,
          Marca: 'RoHS',
          Modelo: 'ModeloHS'
      }; //se crea el kit
      itemPage.itemNuevo = itemNuevo //se le agrega el kit nuevo a la pagina
      return itemPage.crear() //se ejecuta la funcion crear

    }).then(()=>{
      expect(itemPage.items.length -1 ).toBe(itemsAntes) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

  it('eliminar items', () => {
    let itemsAntes=0
    itemPage.listar().then(()=>{//se lo trata de manera asincronica
      return itemsAntes=itemPage.items.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let itemNuevo =
          {
      };
      return itemPage.eliminar() //se ejecuta la funcion eliminar

    }).then(()=>{
      expect(itemPage.items.length -1 ).toBe(0) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

  it('modificar items', () => {
    let items = itemPage.items;
    itemPage.id=10;
    itemPage.itemModificar.Codigo = 'RES001';
    expect(itemPage.itemModificar.Codigo).toBe('RES001');
  });

});



describe('Inventario', () => {

  let http: Http;
  let usuarioAuth= new UsuarioAuthService(http) //antes var usuarioAuth: UsuarioAuthService
  let itemServ= new ItemService(http,usuarioAuth)
  let personaServ= new PersonaService(http,usuarioAuth) //antes var personaServ: PersonaService
  let inventarioServ= new InventarioService(http,usuarioAuth)
  let nav: NavController;
  let menu: MenuController;
  beforeEach(function() {

    inventarioPage = new InventarioPage(nav,menu,personaServ,itemServ,inventarioServ,http);
  });

  it('listar inventario ingresos', () => {

      expect(inventarioPage.listaMovimientoDet).toBeTruthy();
  });

  it('listar inventario salidas', () => {

      expect(inventarioPage.listaMovimientoDet).toBeTruthy();
  });

  it('ingresar inventario', () => {
    let ingreso=0
    itemPage.listar().then(()=>{//se lo trata de manera asincronica
      return ingreso=inventarioPage.ingresos.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let ingreso =
          {id: 1,
            Acta_entrega: '2016-000123',
            movimiento: '',
            proveedor: ''
      }; //se crea el kit
      inventarioPage.ingreso = ingreso //se le agrega el kit nuevo a la pagina
      return inventarioPage.crearIngreso() //se ejecuta la funcion crear

    }).then(()=>{
      expect(inventarioPage.ingresos.length -1 ).toBe(ingreso) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

  it('salida inventario', () => {
    let salida=0
    itemPage.listar().then(()=>{//se lo trata de manera asincronica
      return salida=inventarioPage.salidas.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let salida =
          {id: 1,
            Acta_entrega: '2016-000123',
            movimiento: '',
            proveedor: ''
      }; //se crea el kit
      inventarioPage.salida = salida //se le agrega el kit nuevo a la pagina
      return inventarioPage.crearSalida() //se ejecuta la funcion crear

    }).then(()=>{
      expect(inventarioPage.salidas.length -1 ).toBe(salida) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

  it('Integracion 4 ingreso de inventario y creacion de item', () => {
    let ingreso=0
    itemPage.listar().then(()=>{//se lo trata de manera asincronica
      return ingreso=inventarioPage.ingresos.length // se retorna para poder hacer otro theb
    }).then(()=>{
      let ingreso =
          {id: 1,
            Acta_entrega: '2016-000123',
            movimiento: '',
            proveedor: ''
      }; //se crea el kit
      let itemNuevo =
          {Nombre: 'Resistencia 560 OHM' ,
          Marca: 'RoHS',
          Modelo: 'ModeloHS'
      }; //se crea el kit
      itemPage.itemNuevo = itemNuevo //se le agrega el kit nuevo a la pagina
      inventarioPage.ingreso = ingreso //se le agrega el kit nuevo a la pagina
      return inventarioPage.crearIngreso() //se ejecuta la funcion crear

    }).then(()=>{
      expect(inventarioPage.ingresos.length -1 ).toBe(ingreso) //se verifica que la cantidad de antes es igual a la de ahora -1
    })

  });

});
