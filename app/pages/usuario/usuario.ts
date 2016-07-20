import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController, MenuController , Toast} from 'ionic-angular';
import {Usuario} from './usuario.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import { Http, Headers } from '@angular/http';
import {UsuarioService} from '../usuario/usuario.auth.service';

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
  usuarioNuevo = new Usuario();

  @Input()
  credenciales = {
    clave: '', clave2:''
  }
  @Input()
  usuarioModificar= new Usuario();
  count=10;
  id=0;
  selected: number[]=[];
  tipos = ['Elija un tipo...','ayudante','administrador'];

  constructor( private navController:NavController,
    private menu: MenuController,
  private usuarioService: UsuarioService,
private http: Http) {

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
        let validator = new Validator();
        this.usuarioNuevo.uid=this.usuarioNuevo.email;
        console.log(JSON.stringify(validator.validate(this.usuarioNuevo)));
          console.log(this.usuarioNuevo.type);
        if(!validator.isValid(this.usuarioNuevo)) this.presentToast('Corrija el formulario');
        else if(this.credenciales.clave=='') this.presentToast('Clave vacia');
        else if(this.credenciales.clave.length< 6) this.presentToast('Clave menor a 6 caracteres');
        else if(this.credenciales.clave!=this.credenciales.clave2) this.presentToast('Claves no coinciden');
        else if(this.usuarioNuevo.type=='' || this.usuarioNuevo.type==this.tipos[0])this.presentToast('Tipo no definido');
        else{

        this.usuarios.push(this.usuarioNuevo);
        this.template='null';
        this.count++;
        this.usuarioNuevo = new Usuario();
        this.credenciales.clave='';
        this.credenciales.clave2='';
      }
  }
  goModificar(id: string){

        this.template='modificar'
        this.id=parseInt(id);
        let user = this.usuarios.find(usuario => usuario.id == this.id);
        for(var i in this.usuarioModificar){
          this.usuarioModificar[i]=user[i];
        }
  }
  modificar(){

        let index =this.usuarios.findIndex(usuario => usuario.id == this.id);
        this.usuarioModificar.uid=this.usuarioModificar.email;
        let validator = new Validator();

        if(validator.isValid(this.usuarioModificar)
          && this.usuarioModificar.type!=''
          && this.usuarioModificar.type!=this.tipos[0]){
              let user = this.usuarios[index];
              for(var i in this.usuarioModificar){
                user[i]=this.usuarioModificar[i]
              }
              this.template='null';
        }else{
              this.presentToast('Corrija errores en formulario');
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
    this.usuarioService.getHeaders().then(headers => {
    return this.http.get('http://162.243.83.72:8080/items',{headers: headers}).toPromise();

}).then(result => {
  console.log(JSON.stringify(result.json()));
  // handle result
});


  }
}
