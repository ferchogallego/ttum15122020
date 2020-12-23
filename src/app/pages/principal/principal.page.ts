import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiciosService } from '../../services/servicios.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  lista: any;
  constructor(private srvSvc: ServiciosService,
              private ctrlNav: NavController ) { }

  ngOnInit() {
    this.srvSvc.cargarCategorias()
               .subscribe(res => {
                 this.lista = res;
               });
  }

  openCategory(categoria: string){
    console.log(categoria);
    this.ctrlNav.navigateForward(`proveedores/${categoria}`);
  }

}
