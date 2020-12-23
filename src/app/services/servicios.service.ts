import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private db: AngularFirestore) { }

  cargarCategorias(){
    return this.db.collection('categorias')
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                       const data = resp.payload.doc.data() as any;
                       const id = resp.payload.doc.id;
                       return {id, ...data};
                     }))
                  );
  }

  cargarProveedoresPorCategoria(categoria: string){
    return this.db.collection('proveedores', ref => ref
                  .where('categoria', '==', categoria))
                  .snapshotChanges()
                  .pipe(
                    map(actions =>
                     actions.map(resp => {
                       const data = resp.payload.doc.data() as any;
                       const id = resp.payload.doc.id;
                       return {id, ...data};
                     }))
                  );
  }

  cargarDatosProveedor(idProveedor: string){
    return this.db.collection('proveedores').doc(idProveedor).valueChanges();
  }
}
