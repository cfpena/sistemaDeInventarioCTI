import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController, MenuController, Toast} from 'ionic-angular';
import {Usuario,Group,User} from './usuario.model';

import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import { Http, Headers } from '@angular/http';
import {UsuarioService} from './usuario.service';
import {Url} from '../../url';


@Component({
    templateUrl: 'build/pages/usuario/usuario.html',
    directives: [MaterializeDirective],
    providers: [UsuarioService],
})

export class UsuarioPage implements OnInit {
    url = new Url();

    title: string = 'Usuarios';
    usuarios: Usuario[];
    template: string = 'null';
    usuariosTemporal: Usuario[] = [];
    Tipo= '';
    count = 10;
    id = 0;
    selected: number[] = [];
    tipos: Group[];

    tiposBusquedas = ['email', 'nombre'];
    busqueda = { tipoB: 'email', valor: '' };

    @Input()
    usuarioNuevo = new Usuario();

    @Input()
    credenciales = {
        clave: '', clave2: ''
    }
    @Input()
    usuarioModificar = new Usuario();



    constructor(private navController: NavController,
        private menu: MenuController,
        private usuarioService: UsuarioService,
        private http: Http) {
//this.usuariosTemporal = this.usuarios;

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
        this.usuarioService.getUsuarios().then(usuarios => {this.usuarios= usuarios; return usuarios}).then(usuarios =>{
        for(var usuario of this.usuarios){
          this.usuarioService.llenarTipo(usuario);
        }
        return usuarios
      })
    }
    crear() {

            let validator = new Validator();

            if(!validator.isValid(this.usuarioNuevo)) this.presentToast('Corrija el formulario');
            else if(this.credenciales.clave=='') this.presentToast('Clave vacia');
            else if(this.credenciales.clave.length< 6) this.presentToast('Clave menor a 6 caracteres');
            else if(this.credenciales.clave!=this.credenciales.clave2) this.presentToast('Claves no coinciden');
            else if(this.Tipo=='')this.presentToast('Tipo no definido');
            else{

              this.usuarioNuevo.Usuario =  new User();
              this.usuarioNuevo.Usuario.username=this.usuarioNuevo.Email;

            let tipo = this.tipos.find(tipo=> this.Tipo==tipo.name);
            let usuario = JSON.parse(JSON.stringify(this.usuarioNuevo))
            usuario['Usuario']['groups'] = [tipo.url]
            this.usuarioService.createUsuario(usuario,this.credenciales).then(result=>this.listar());
            this.template='null';
            this.usuarioNuevo = new Usuario();

            
          }
    }
    goModificar(id: string) {
        /*
                this.template='modificar'
                this.id=parseInt(id);
                let user = this.usuarios.find(usuario => usuario.id == this.id);
                for(var i in this.usuarioModificar){
                  this.usuarioModificar[i]=user[i];
                }
                */
    }
    modificar() {
        /*
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
            return this.usuarios[index];*/
    }
    eliminar() {
        /*
              for(var i in this.selected){
                console.log(this.selected[i]);
                let index =this.usuarios.findIndex(usuario => usuario.id==this.selected[i]);
                console.log(index);
                this.usuarios.splice(index,1);
              }
              this.selected=[];*/
    }

    select(id: any) {
        let index: number;
        index = this.selected.findIndex(num => num == parseInt(id));

        if (index == -1) {
            this.selected.push(parseInt(id));
        }
        else { this.selected.splice(index, 1) };
        console.log(this.selected);

    }

    goCrearUsuario() {
        this.template = 'crear';
    }
    cancelar() {
        this.template = 'null';
    }

    buscar() {
/*
        let busquedaTemp = this.busqueda;
        if(busquedaTemp.valor=='') this.usuarios=this.usuariosTemporal;
        this.usuarios=this.usuariosTemporal.filter(function(usuario){
          if(busquedaTemp.tipoB=='email') {
            console.log("email");
            return usuario.Email.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
          }
          else return usuario.Nombre.toLowerCase().indexOf(busquedaTemp.valor.toLowerCase())>=0;
        })
*/
    }

    public ngOnInit() {
        this.listar();
        this.usuarioService.getTipos().then(tipos =>{
          this.tipos=tipos
        });
        }
}
