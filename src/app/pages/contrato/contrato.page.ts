import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.page.html',
  styleUrls: ['./contrato.page.scss'],
})
export class ContratoPage implements OnInit {

  idProveedor: string;
  constructor(private servicSvc: ServiciosService,
              private activateRoute: ActivatedRoute,
              private ctrlNav: NavController) { }

  ngOnInit() {
    this.idProveedor = this.activateRoute.snapshot.paramMap.get('id');
  }

}
