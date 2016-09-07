import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, MenuController, Toast, Modal } from 'ionic-angular';
import { ITEM } from './item.model';
import { MaterializeDirective } from "../../materialize-directive";
import { Validator } from "validator.ts/Validator";
import { Url } from '../../url'
import { Http, Headers } from '@angular/http';
import { ItemService } from './item.service';


/*
  Generated class for the ItemPage page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

@Component({
    templateUrl: 'build/pages/item/item.html',
    directives: [MaterializeDirective],
    providers: [ItemService],
})

export class ItemPage implements OnInit {
    title: string = 'Ítems';
    items:  Array<ITEM> =[]
    template: string = 'null';
    itemsTemporal: ITEM[] = [];
    itemsEliminar: ITEM[] = [];
    @Input()
    itemNuevo = new ITEM();
    @Input()
    itemModificar = new ITEM;
    selected: number[] = [];
    tiposBusquedas = ['código', 'Nombre'];
    busqueda = { tipo: 'codigo', valor: '' };
    tiposFotos = ['archivo', 'cámara'];
    foto = { name: '', data: '' };
    constructor(private navController: NavController, private menu: MenuController,
        private itemService: ItemService,
        private http: Http) {
        this.itemsTemporal = this.items;


    }

    openMenu() {
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

    listar() {
      this.items =[]
      return  this.itemService.getItems(this.navController).then(items => { this.items = items; return items })
    }

    crear() {
        let validator = new Validator();
        console.log(validator.validate(this.itemNuevo))
        this.itemNuevo.Stock=0;
        if (!validator.isValid(this.itemNuevo)){ this.presentToast('Corrija el formulario');}
      //  else if (this.itemNuevo.Stock < 1 || this.itemNuevo.Stock > 50 || this.itemNuevo.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
        else {

            //let item = JSON.parse(JSON.stringify(this.itemNuevo))
            console.log(this.foto)
            this.itemNuevo.Imagen = this.foto
            console.log(JSON.stringify(this.itemNuevo))

            this.itemService.createItem(this.itemNuevo,this.navController).then(result => {
              let r = result.json() as ITEM
              console.log('guarde item')
              //this.itemService.uploadImagen(r.url,this.itemNuevo.Imagen,this.navController)
              this.listar();
              this.presentToast('item creado correctamente');
            });
            this.template = 'null';
            this.itemNuevo = new ITEM();
        }
    }

    fileChange(input: any){
          // Create an img element and add the image file data to it
          var img = document.createElement("img");
          img.src = window.URL.createObjectURL(input.files[0]);

          // Create a FileReader
          // Create a FileReader
           var reader: any, target: EventTarget;
           reader = new FileReader();

          // Add an event listener to deal with the file when the reader is complete
          reader.addEventListener("load", (event) => {
              // Get the event.target.result from the reader (base64 of the image)
              img.src = event.target.result;

              // Resize the image
              var resized_img = this.resize(img);

              // Push the img src (base64 string) into our array that we display in our html template
              this.foto.name=input.files[0].name
              this.foto.data=resized_img

          }, false);

          reader.readAsDataURL(input.files[0]);
    }
    resize (img, MAX_WIDTH:number = 300, MAX_HEIGHT:number = 300){
        var canvas = document.createElement("canvas");

        console.log("Size Before: " + img.src.length + " bytes");

        var width = img.width;
        var height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, width, height);

        var dataUrl = canvas.toDataURL('image/jpeg');
        // IMPORTANT: 'jpeg' NOT 'jpg'
        console.log("Size After:  " + dataUrl.length  + " bytes");
        return dataUrl
    }

    //abre el html de modificar
    goModificar(item: ITEM) {
      for(var key in item){
        this.itemModificar[key]= item[key]
      }
        this.itemModificar = JSON.parse(JSON.stringify(item))
        this.template = 'modificar'
    }

    modificar() {
        let validator = new Validator();
        if (!validator.isValid(this.itemModificar)) this.presentToast('Corrija el formulario');
      //  else if (this.itemModificar.Stock < 1 || this.itemModificar.Stock > 50 || this.itemModificar.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
        else {
            this.presentToast('Datos modificados correctamente');
            this.itemService.updateItem(this.itemModificar,this.navController).then(result => this.listar());
            this.template = 'null';
        }
    }

    eliminar() {
        for (var item of this.itemsEliminar) {
            this.itemService.eliminarItem(item,this.navController).then(result =>
            { this.listar();
              this.presentToast('Se ha eliminado con éxito');
            }).catch(error => console.log(error))
        }
        //se deja en blanco la lista a eliminar
        this.itemsEliminar = Array<ITEM>();
        console.log(this.itemsEliminar);

        //se refrescan los datos del servidor
        this.listar();
    }


    select(item: ITEM) {
        if (!this.itemsEliminar.some(it => it == item)) {
            this.itemsEliminar.push(item);
        } else {
            let index = this.itemsEliminar.findIndex(x => x == item)
            this.itemsEliminar.splice(index, 1)
        };
    }

    goCrearItem() {
        this.template = 'crear';
    }

    cancelar() {
        this.itemNuevo = new ITEM();
        this.template = 'null';
    }


    buscar() {
        if (this.busqueda.valor.trim() != "") {
            this.itemService.getBuscarItem(this.busqueda.valor,this.navController).then(items => { this.items = items; return items })
        }
        else { this.listar() }
    }

    //retrasa la carga de la pagina 100 ms
    public ngOnInit() {
        this.listar();
    }
}
