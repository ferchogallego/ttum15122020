import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerPerson = new FormGroup ({
    name: new FormControl('', Validators.required),
    country: new FormControl('Colombia'),
    city: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    registrado: new FormControl(new Date().getTime()),
    rol: new FormControl('Cliente'),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get nameNoValido() {
    return this.registerPerson.get('name').invalid && this.registerPerson.get('name').touched;
  }
  get cityNoValido() {
    return this.registerPerson.get('city').invalid && this.registerPerson.get('city').touched;
  }
  get emailNoValido() {
    return this.registerPerson.get('email').invalid && this.registerPerson.get('email').touched;
  }
  get phoneNoValido() {
    return this.registerPerson.get('phone').invalid && this.registerPerson.get('phone').touched;
  }
  get passwordNoValido() {
    return this.registerPerson.get('password').invalid && this.registerPerson.get('password').touched;
  }


  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterPerson(datos: any){
    if (this.registerPerson.invalid){
      Swal.fire({
        title: 'Error...',
        text: 'Debe ingresar la información requerida',
        icon: 'error',
        allowOutsideClick: false,
        showCloseButton: true
      });
      return Object.values( this.registerPerson.controls ).forEach( control => {
        if ( control instanceof FormGroup ) {
          // tslint:disable-next-line: no-shadowed-variable
          Object.values( control.controls ).forEach( control => control.markAsTouched() );
        } else {
          control.markAsTouched();
        }
      });
    }
    const {email, password } = this.registerPerson.value;
    try {
      const user = this.authSvc.register(email, password);
      if (user) {
        user.then(userData => {
         const id = userData.user.uid;
         const tipo = 'buyerCompany';
         datos.uid = id;
         this.authSvc.dataUser(id, datos);
         Swal.fire({
           title: 'Cliente: ' + datos.name,
           text: 'Registrado satisfactoriamente',
           icon: 'success',
           showCloseButton: true,
         });
         this.router.navigate(['/login']);
       });
   }
    } catch (error) {
      Swal.fire({
        title: 'Algo salió mal',
        text: error,
        icon: 'error',
        showCloseButton: true,
      });
    }
  }

}
