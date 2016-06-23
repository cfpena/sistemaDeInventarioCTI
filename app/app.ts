import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ListPage} from './pages/list/list';
import {LoginPage} from './pages/login/login';
import {PersonaPage} from './pages/persona/persona';
import {ItemPage} from './pages/item/item';
import {InventarioPage} from './pages/inventario/inventario';
import {KitPage} from './pages/kit/kit';
import {PrestamoPage} from './pages/prestamo/prestamo';
import {ReportesPage} from './pages/reportes/reportes';
import {UsuarioPage} from './pages/usuario/usuario';



@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, icon: string,component: any}>

  constructor(private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inventario',icon: 'import_contacts', component: InventarioPage },
      { title: 'Personas',icon: 'person', component: PersonaPage },
      { title: 'Items',icon: 'local_offer', component: ItemPage },
      { title: 'Kits',icon: 'shopping_cart', component: KitPage },
      { title: 'Prestamos',icon: 'swap_horiz', component: PrestamoPage },
      { title: 'Reportes',icon: 'library_books', component: ReportesPage },
      { title: 'login',icon: 'person', component: LoginPage },


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
    
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
