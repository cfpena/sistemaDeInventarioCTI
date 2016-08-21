import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import {Kit} from '../kit/kit.model';
import {Url} from '../../url'
import {Http, Headers} from '@angular/http';
import {KitService} from './kit.service';

@Component({
  templateUrl: 'build/pages/kit/kit.html',
  directives: [MaterializeDirective],
  providers: [KitService],
})
export class KitPage implements OnInit{

title: string ='Kits';
template: string = 'null';
kits: Array<Kit>=[]
kitsTemporal: Kit[] = [];
kitsEliminar: Kit[] = [];
count=10;
id=0;
selected: number[]=[];
tiposBusquedas = ['código', 'nombre'];
busqueda={tipo: 'código', valor: ''};
itemsBusquedas = ['código', 'nombre'];
busquedaItem={tipo: 'código', valor: ''};

@Input()
kitNuevo = new Kit();
@Input()
kitModificar= new Kit;

  constructor(private navController:NavController,private menu: MenuController,
    private kitService: KitService,
    private http: Http) {
    this.kitsTemporal=this.kits;
  }

  openMenu(){
    this.menu.open();
  }

  presentToast(text: string) {
  let toast = Toast.create({
    message: text,
    duration: 3000
  });

  toast.onDismiss(() => {
    console.log('Dismissed toast');
  });
    this.navController.present(toast);
  }


    //funcion listar que lista todos los kits creados

    listar() {
      console.log("listando");
      this.kits =[]
        this.kitService.getKits().then(kits => { this.kits = kits; return kits }).then(result=>{
          console.log("listando2");

        })
    }

  //crea un kit

  crear() {
      let validator = new Validator();
      if (!validator.isValid(this.kitNuevo)) this.presentToast('Corrija el formulario');
    //  else if (this.itemNuevo.Codigo == '' || this.itemNuevo.Codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
      //else if (this.kitNuevo.Nombre == '') this.presentToast('Nombre vacio');
    //  else if (this.itemNuevo.Descripcion == '') this.presentToast('Descripción vacio');
      //else if (this.kitNuevo.Stock < 1 || this.kitNuevo.Stock > 50 || this.kitNuevo.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
      else {
          let kit = JSON.parse(JSON.stringify(this.kitNuevo))
          this.kitService.createKit(kit).then(result => this.listar());
          this.template = 'null';
          this.kitNuevo = new Kit();
      }

  }

  //abre el html de modificar
  goModificar(kit: Kit) {
          this.kitModificar=JSON.parse(JSON.stringify(kit))
          this.template='modificar'

  }

  //modifica el usario
  modificar(){

    let validator = new Validator();
    console.log(this.kitModificar);
  //  if(!validator.isValid(this.kitModificar)) this.presentToast('Corrija el formulario');
    //else if (this.kitModificar.Codigo=='' || this.kitModificar.Codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
  //else if(this.kitModificar.Nombre=='') this.presentToast('Nombre vacio');
//  else if(this.kitModificar.Descripcion=='') this.presentToast('Descripción vacio');
  //else if(this.kitModificar.Marca=='') this.presentToast('Marca vacio');
  //else if(this.kitModificar.Modelo=='') this.presentToast('Modelo vacio');
  //else{
    this.kitService.updateKit(this.kitModificar).then(result => this.listar());
    this.template='null';
  //}
  }

  eliminar(){
    for(var kit of this.kitsEliminar){
      this.kitService.eliminarKit(kit).then(result =>
        {this.listar() }).catch(error=> console.log(error))
    }
    //se deja en blanco la lista a eliminar
    this.kitsEliminar= Array<Kit>();
    //se refrescan los datos del servidor

  }

  select(kit: Kit){
    if (!this.kitsEliminar.some(kit => kit == kit)) {
        this.kitsEliminar.push(kit);
    }else {
        let index = this.kitsEliminar.findIndex(x => x == kit)
        this.kitsEliminar.splice(index, 1)
    };
  }

  goCrearKit(){
    this.template='crear';
  }

  cancelar(){
    this.template='null';
  }

  buscar(){
    if(this.busqueda.valor.trim() != ""){
    this.kitService.getBuscar(this.busqueda.valor).then(kits => { this.kits = kits; return kits }).then(kits => {
    })}
    else{this.listar()}
    return this.kits
  }

  buscarItem(){
    if(this.busqueda.valor.trim() != ""){
    this.kitService.getBuscarItem(this.busqueda.valor).then(kits => { this.kits = kits; return kits }).then(kits => {
    })}
    else{this.listar()}
    return this.kits
  }

   removeItem(kit: Kit) {
    var index = this.kits.indexOf(kit);
    if (index === -1) {
      return;
    }

    console.log(`Index about to remove: ${index} this.items length: ${this.kits.length}`);
    this.kits.slice(index, 1);
    console.log(`this.items length: ${this.kits.length}`);

    this.kits=  this.kits.splice(index, 1);
}



    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
          this.listar();
  }



}
