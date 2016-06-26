import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ListPage} from './pages/list/list';
import {LoginPage} from './pages/login/login';
import {PrincipalPage} from './pages/principal/principal';
import {PersonaPage} from './pages/persona/persona';
import {ItemPage} from './pages/item/item';
import {InventarioPage} from './pages/inventario/inventario';
import {KitPage} from './pages/kit/kit';
import {PrestamoPage} from './pages/prestamo/prestamo';
import {ReportesPage} from './pages/reportes/reportes';
import {UsuarioPage} from './pages/usuario/usuario';
import {UsuarioService} from './pages/usuario/usuario.auth.service';
import {MaterializeDirective} from "./materialize-directive";
import {Storage, LocalStorage} from 'ionic-angular';





@Component({
  templateUrl: 'build/app.html',
  providers: [UsuarioService],
  directives: [MaterializeDirective],
})
class MyApp {
  @ViewChild(Nav) nav: Nav;
  local: Storage = new Storage(LocalStorage);
  rootPage: any = LoginPage;

  pages: Array<{title: string, icon: string,component: any}>

  constructor(private platform: Platform,
              private usuarioService: UsuarioService) {
    this.initializeApp();
        // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inventario',icon: 'import_contacts', component: InventarioPage },
      { title: 'Personas',icon: 'person', component: PersonaPage },
      { title: 'Items',icon: 'local_offer', component: ItemPage },
      { title: 'Kits',icon: 'shopping_cart', component: KitPage },
      { title: 'Prestamos',icon: 'swap_horiz', component: PrestamoPage },
      { title: 'Reportes',icon: 'library_books', component: ReportesPage },
      { title: 'Usuarios',icon: 'library_books', component: UsuarioPage },
      { title: 'Cerrar Sesion',icon: 'library_books', component: LoginPage },



    ];

    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.local.get('auth').then(auth => {
      if(auth=='true') this.nav.setRoot(page.component);
      else this.nav.setRoot(LoginPage);

    }).catch(error => {
      console.log(error);
    }) ;

    if(page.component == LoginPage) this.usuarioService.logout();
  }
}

ionicBootstrap(MyApp);
