import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {NavController,MenuController, Toast} from 'ionic-angular';
import {Usuario, Group} from './usuario.model';
import {MaterializeDirective} from "../../materialize-directive";
import {Validator} from "validator.ts/Validator";
import { Http, Headers } from '@angular/http';
import {UsuarioService} from './usuario.service';
import {Url} from '../../url';
import {Load} from '../../loading';



@Component({
    templateUrl: 'build/pages/usuario/usuario.html',
    directives: [MaterializeDirective],
    providers: [UsuarioService],
})

export class UsuarioPage implements OnInit {
    url = new Url();
    title: string = 'Usuarios';
    usuarios: Usuario[]=[];
    template: string = 'null';

    //usuario temporal para mantener los datos para modificar
    @Input()
    usuarioModificar= new Usuario();
    Tipo = '';
    //lista de usuarios seleccionados por el checkbox para eliminar
    usuariosEliminar: Usuario[] = [];
    tipos: Group[];
    //valor del campo de busqueda
    busqueda = {valor: '' };
    //usuario temporal para crear un usuario
    @Input()
    usuarioNuevo = new Usuario();
    //variable que guarda las claves para el nuevo usuario
    @Input()
    credenciales = {
        clave: '', clave2: ''
    }





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
      //las promesas retornan promesas por lo tanto el resultado se debe tratar como una promesa, con el then y catch
      let load= new Load() //se instancia un load por cada llamada a la funcion
    //  load.present(this.navController) //se presenta el loading al usuario
      return  this.usuarioService.getUsuarios(this.navController).then(usuarios => { this.usuarios = usuarios; return usuarios }).then(usuarios => {
          for(var usuario of this.usuarios){
            this.usuarioService.llenarTipo(usuario,this.navController)
          }
      //    load.dismiss() //cuando termina el request, se elimina el loading
        })

    }
    crear() {
        if( this.Tipo=='') this.Tipo = this.tipos[0].name.toString()
        let validator = new Validator();

        if (!validator.isValid(this.usuarioNuevo))
        {   console.log(validator.validate(this.usuarioNuevo));
            this.presentToast('Corrija el formulario');}
        else if (this.credenciales.clave == '') this.presentToast('Clave vacia');
        else if (this.credenciales.clave.length < 6) this.presentToast('Clave menor a 6 caracteres');
        else if (this.credenciales.clave != this.credenciales.clave2) this.presentToast('Claves no coinciden');
        else {

          let load= new Load()
        //  load.present(this.navController)
            //se busca el tipo dentro de la lista de tipos por el nombre dado en el select de tipos al crear
            let tipo = this.tipos.find(tipo => this.Tipo == tipo.name);
            //se hace un doble parse para obtener el valor de la variable y no la referencia
            //si no se hace esto al moficiar el usuario nuevo, tambien se modifica el usuario viejo
            let usuario = JSON.parse(JSON.stringify(this.usuarioNuevo))
            usuario['groups'] = [tipo.url]
            let result=this.usuarioService.createUsuario(usuario, this.credenciales,this.navController).then(result => {this.listar();
            this.presentToast('Usuario creado correctamente');}).catch(err=> {return false});
            this.template = 'null';

            //se vuelve a dejar en blanco el usuarioNuevo para volverlo  a usar luego
            this.usuarioNuevo = new Usuario();



        }

    }

    goModificar(usuario: Usuario) {
      for(var key in usuario){
        this.usuarioModificar[key]= usuario[key]
      }
            this.template='modificar'

    }
    modificar() {
      let load= new Load()
    //  load.present(this.navController)

      let validator = new Validator();
      if (!validator.isValid(this.usuarioModificar)
      || this.usuarioModificar.Nombre=='' || this.usuarioModificar.Apellido==''){
          this.presentToast('Corrija el formulario');


  }
      else{
      this.presentToast('Datos modificados correctamente');
      this.usuarioModificar.groups = [this.usuarioModificar.groups[0].url]
      console.log(JSON.stringify(this.usuarioModificar))
      this.usuarioService.updateUsuario(this.usuarioModificar,this.navController).then(result => {this.listar();});
      this.template='null'
      this.usuarioModificar = new Usuario();


      }
    }
    eliminar() {
      let load= new Load()
      //load.present(this.navController)
              for(var usuario of this.usuariosEliminar){
                this.usuarioService.eliminarUsuario(usuario,this.navController).then(result =>
                  { this.listar();
                    this.presentToast('Se ha eliminado con éxito');
                  }).catch(error=> console.log(error))
              }
              //se deja en blanco la lista a eliminar
              this.usuariosEliminar= Array<Usuario>();
              //se refrescan los datos del servidor

    }

    //funcion que agrega los usuarios a la lista para eliminarlos luego
    select(usuario: Usuario) {
        if (!this.usuariosEliminar.some(user => user == usuario)) {
            this.usuariosEliminar.push(usuario);
        }else {
            let index = this.usuariosEliminar.findIndex(x => x == usuario)
            this.usuariosEliminar.splice(index, 1)
        };

    }

    goCrearUsuario() {
        this.template = 'crear';
    }
    cancelar() {
        this.usuarioNuevo = new Usuario();
        this.template = 'null';
    }
    //funcion para realizar la busqueda
    buscar() {
      //si el valor es diferente de vacio entonces se manda a buscar, sino se listan los datos sin filtros

      if(this.busqueda.valor.trim() != ""){
      this.usuarioService.getBuscar(this.busqueda.valor,this.navController).then(usuarios => {
        this.usuarios = usuarios
        for(var usuario of this.usuarios){
          this.usuarioService.llenarTipo(usuario,this.navController)
        }
      });}
      else{this.listar()}

    }


    //funcion que se ejecuta al cargar la pagina
    public ngOnInit() {
      //se obtienen los usuarios para llenar la tabla y se obtienen los tipos de usuarioss
        this.listar();
        this.usuarioService.getTipos(this.navController).then(tipos => {
            this.tipos = tipos
        });
    }
}
