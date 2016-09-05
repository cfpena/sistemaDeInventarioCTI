import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { NavController, MenuController , Toast } from 'ionic-angular';
import {ITEM} from '../item/item.model';
import {Kit} from '../kit/kit.model';
import {Persona} from '../persona/persona.model';
import {PersonaPage} from '../persona/persona';
import {Prestamo} from '../prestamo/prestamo.model';
import {MaterializeDirective} from "../../materialize-directive";
import {DatePicker} from 'ionic-native';
import {PrestamoService} from './prestamo.service';
import {Url} from '../../url';
import { Http, Headers } from '@angular/http';
import {ItemService} from '../item/item.service';
import {PersonaService} from '../persona/persona.service';
import {UsuarioService} from '../usuario/usuario.service';
import { Validator } from "validator.ts/Validator";
import { Acta } from './acta.model';
import { Devolucion } from './devolucion.model';

@Component({
templateUrl: 'build/pages/prestamo/prestamo.html',
directives: [MaterializeDirective],
providers: [PrestamoService, ,ItemService, PersonaService, UsuarioService],

})
export class PrestamoPage implements OnInit{
title: string ='Prestamos';

template: string = 'null';
actas:  Array<Acta> =[]

tiposBusquedas = ['Nombre', 'Fecha'];
busqueda={tipo: 'Nombre', valor: ''};

estaSeleccionadaPersona=false;
descripcionPersona: string ='';
personaSeleccionada=new Persona();
listaFiltradaPersona:Persona[]=[];

descripcionItem: string ='';
itemSeleccionado= new ITEM();
estaSeleccionadoItem: boolean=false;
listaFiltradaItem: ITEM[]=[];
cantidad=0;

listaPrestamos: Prestamo[]=[];

@Input() actaNuevo = new Acta();

@Input() actaModificar= new Acta();

constructor( private navController:NavController,private menu: MenuController,
  private prestamoService: PrestamoService, private itemService: ItemService,
  private personaService: PersonaService, private usuarioService: UsuarioService,
  private http: Http) {
  }

  openMenu(){
    this.menu.open();
  }

  goCrearPersona(){
    //this._navController.push(PersonaPage,{});
    this.template='crear';
  }

  goNuevoPrestamo(){
    this.template='nuevo_prestamo';
  }

  goModificarPrestamo(acta: Acta) {
    console.log(acta)
    this.actaModificar=JSON.parse(JSON.stringify(acta))
    this.descripcionPersona = this.actaModificar.Prestador.Nombre + ' ' + this.actaModificar.Prestador.Apellido
    this.prestamoService.getPrestamos(this.navController).then(prestamos =>{
      console.log('prestamos')
      console.log(prestamos)
      for (var prestamo of prestamos){
        this.prestamoService.llenarItem(prestamo, this.navController).then(result =>{
          //prestamo.Item=item;
          console.log('prestamo acta')
          console.log(result)
          console.log('acta')
          console.log(acta)
          if (result.Acta==acta.url){
            this.listaPrestamos.push(result);
          }
        })
      }
    })
    this.template='modificar_prestamo'
  }

  cancelar(){
    this.listaPrestamos =[];
    this.descripcionItem='';
    this.descripcionPersona='';
    this.template='null';
  }

  crear(){
    console.log('crear')
    console.log (this.actaNuevo)
    let validator = new Validator();
    if (!validator.isValid(this.actaNuevo)){ this.presentToast('Corrija el formulario');console.log(validator.validate(this.actaNuevo));}
    //  else if (this.itemNuevo.Codigo == '' || this.itemNuevo.Codigo.length < 10) this.presentToast('Código debe tener 10 dígitos');
    //else if (this.kitNuevo.Nombre == '') this.presentToast('Nombre vacio');
    //  else if (this.itemNuevo.Descripcion == '') this.presentToast('Descripción vacio');
    //else if (this.kitNuevo.Stock < 1 || this.kitNuevo.Stock > 50 || this.kitNuevo.Stock == 0) this.presentToast('Cantidad mínima 1 máximo 50');
    else {
      this.actaNuevo.Prestador=this.personaSeleccionada.url;
      this.prestamoService.createActa(this.actaNuevo, this.listaPrestamos,this.navController).then(result => {this.listar_actas()});
      this.template='null';
      this.actaNuevo= new Acta();
      this.listaPrestamos =[];
      this.descripcionItem='';
      this.descripcionPersona='';
    }
  }

  //funcion listar que lista todos los kits creados
  listar_actas() {
    this.actas =[]
    this.prestamoService.getActas(this.navController).then(actas => { this.actas = actas ; return actas}).then(result=>{
      for(var acta of this.actas){
        this.prestamoService.llenarPrestador(acta,this.navController)
      }
    })
  }

  devolver(){
    this.prestamoService.createDevolucion(this.listaPrestamos, this.navController)
    this.presentToast('Prestamo devuelto')
    this.listaPrestamos =[];
    this.descripcionItem='';
    this.descripcionPersona='';
    this.template = 'null';
  }

  buscarItem(){
    if (this.descripcionItem!==''){
      this.itemService.getBuscarItem(this.descripcionItem,this.navController).then(items => {
        this.listaFiltradaItem = items;
        return items; }).then(items => {
        if (this.listaFiltradaItem.length==0){
          this.presentToast('El item debe existir en el sistema.');
          this.descripcionItem='';
        }
      })
    }else{
      this.listaFiltradaItem=[];
    }
  }

  seleccionarItem(item: ITEM){
    this.itemSeleccionado=JSON.parse(JSON.stringify(item));
    this.descripcionItem = this.itemSeleccionado.Codigo +' - '+ this.itemSeleccionado.Nombre;
    this.listaFiltradaItem=[];
    this.estaSeleccionadoItem =true;
  }

  agregarItem(){
    if (this.itemSeleccionado){
      let cant=0;
      if(Number(this.itemSeleccionado.Stock_Disponible) < Number(this.cantidad)){
        console.log('egreso y mayor que stock disponible');
        this.presentToast('El item no puede ser agregado. El Stock Disponible es menor que la cantidad.');
      }else{
        for (var prestamo of this.listaPrestamos){
          if (prestamo.Item.url = this.itemSeleccionado.url){
            cant+=Number(prestamo.Cantidad);
          }
        }
        if(Number(this.itemSeleccionado.Stock_Disponible) < (Number(this.cantidad) +cant)){
          console.log('egreso y mayor que stock disponible');
          this.presentToast('El item no puede ser agregado. El Stock Disponible es menor que la cantidad.');
        }else{
          if (this.itemSeleccionado.Es_Dispositivo){
            for(var _i = 0; _i < this.cantidad; _i++){
              this.listaPrestamos.push({url:'', Cantidad: 1, Fecha:'',  Detalle: '', Item: this.itemSeleccionado, Acta: this.actaNuevo});
            }
          }else{
            this.listaPrestamos.push({url:'', Cantidad: this.cantidad, Fecha:'',  Detalle: '', Item: this.itemSeleccionado, Acta: this.actaNuevo});
          }
          this.descripcionItem = '';
          this.itemSeleccionado = new ITEM();
          this.cantidad=0;
          this.estaSeleccionadoItem = false;
        }
      }
    }
  }

  eliminarPrestamo(prestamo: Prestamo){
    let index=this.listaPrestamos.indexOf(prestamo)
    this.listaPrestamos.splice(index,1)
  }

  buscarPersona(){
    if (this.descripcionPersona!==''){
      this.personaService.getBuscar(this.descripcionPersona, this.navController).then(personas => {this.listaFiltradaPersona=personas; return personas}).then(kits => {
        if (this.listaFiltradaPersona.length==0){
          this.presentToast('No existen datos que coincidan con la busqueda. La persona debe estar creada en el sistema.');
          this.descripcionPersona='';
        }
      })

    }else{
      this.listaFiltradaPersona=[];
    }
  }

  seleccionarPersona(persona: Persona){
    this.personaSeleccionada = JSON.parse(JSON.stringify(persona));
    this.descripcionPersona = this.personaSeleccionada.Nombre + ' ' +this.personaSeleccionada.Apellido;
    this.estaSeleccionadaPersona=true;
    this.listaFiltradaPersona=[];
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

  //FUNCION BUSCAR para filtrar en tabla de prestamos principal
  buscar() {
    if(this.busqueda.valor.trim() != ""){
      this.personaService.getBuscar(this.busqueda.valor,this.navController).then(personas => {
        this.listaFiltradaPersona = personas
      });}
      else{this.listar_actas()}
    }

    public ngOnInit() {
      this.listar_actas();
    }



  }
