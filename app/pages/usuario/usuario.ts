import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController, MenuController , Toast} from 'ionic-angular';
import {Usuario} from './usuario.model';
import {MaterializeDirective} from "../../materialize-directive";


/*
  Generated class for the UsuarioPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/usuario/usuario.html',
  directives: [MaterializeDirective],
})
export class UsuarioPage implements OnInit {
  title: string ='Usuarios';
  usuarios: Usuario[] = [
    {id: 1, email: 'prueba@prueba.com', provider:"", uid:'prueba@prueba.com', name:'Prueba',nickname:"",image:'',type:'admin'},
    {id: 2, email: 'cristian@prueba.com', provider:"", uid:'cristian@prueba.com', name:'Cristian',nickname:"",image:'',type:'custom'},
  ];
  template: string = 'null';
  @Input()
  usuarioNuevo = {
    id:10, email: '', provider: "", uid:'', name:'',nickname:"",image:'',type:''
  }
  @Input()
  credenciales = {
    clave: '', clave2:''
  }
  @Input()
  usuarioModificar= {
    id:10, email: '', provider: "", uid:'', name:'',nickname:"",image:'',type:''
  }
  count=10;
  id=0;
  selected: number[]=[];
  tipos = ['Elija un tipo...','ayudante','administrador'];

  constructor( private navController:NavController,private menu: MenuController) {

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
  crear(){
    if(this.usuarioNuevo.name=='') this.presentToast('Nombre vacio');
    else if(this.usuarioNuevo.email=='') this.presentToast('Email vacio');
    else if(this.credenciales.clave=='') this.presentToast('Clave vacia');
    else if(this.credenciales.clave.length< 6) this.presentToast('Clave menor a 6 caracteres');
    else if(this.credenciales.clave!=this.credenciales.clave2) this.presentToast('Claves no coinciden');
    else if(this.usuarioNuevo.type=='' || this.usuarioNuevo.type==this.tipos[0])this.presentToast('Tipo no definido');
    else{
    this.usuarios.push(this.usuarioNuevo);
    this.template='null';
    this.count++;
    this.usuarioNuevo = {
      id:this.count, email: '', provider: "", uid:'', name:'',nickname:"",image:'',type:''
    }
    this.credenciales.clave='';
    this.credenciales.clave2='';
  }
  }
  goModificar(id: string){

    this.template='modificar'
    this.id=parseInt(id);
    this.usuarioModificar = JSON.parse(JSON.stringify(this.usuarios.find(usuario => usuario.id == this.id)));
  }
  modificar(){
    let index =this.usuarios.findIndex(usuario => usuario.id == this.id);
    if(this.usuarioModificar.name=='') this.presentToast('Nombre vacio');
    else if(this.usuarioModificar.email=='') this.presentToast('Email vacio');
    else if(this.usuarioModificar.type=='' || this.usuarioModificar.type==this.tipos[0])this.presentToast('Tipo no definido');
    else{

  this.usuarios[index] =JSON.parse(JSON.stringify(this.usuarioModificar));
  this.template='null';
  }
  return this.usuarios[index];
  }
  eliminar(){

    for(var i in this.selected){
      console.log(this.selected[i]);
      let index =this.usuarios.findIndex(usuario => usuario.id==this.selected[i]);
      console.log(index);
      this.usuarios.splice(index,1);
    }
    this.selected=[];
  }

  select(id: any){
    let index: number;
    index = this.selected.findIndex(num => num == parseInt(id));

    if(index==-1){
    this.selected.push(parseInt(id));}
    else{this.selected.splice(index,1)};
    console.log(this.selected);

  }

  goCrearUsuario(){
    this.template='crear';
  }
  cancelar(){
    this.template='null';
  }
  public ngOnInit() {
    window.setTimeout(()=>{
    },100);
}
}
