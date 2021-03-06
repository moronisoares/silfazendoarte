import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  app: any;
  db: any;
  constructor() {
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(environment.firebase);
    } else {
      this.app = firebase.app(); // if already initialized, use that one
    }
    this.db = firebase.firestore(this.app)
  }

  salvar(obj, collection) {
    const doc = this.CreateGuid();
    if (obj.Id == null) {
      obj.Id = doc;
    }
    return this.db.collection(collection).doc(doc).set(obj);
  }

  editar(obj, collection, id) {
    return this.db.collection(collection).doc(id).set(obj);
  }

  listarTodos(collection) {
    const refCollection = this.db.collection(collection);
    return refCollection.orderBy("Nome").get();
  }

  deletar(collection, id) {
    return this.db.collection(collection).doc(id).delete();
  }

  consultarPeloValor(collection, campo, valor) {
    return this.db.collection(collection).where(campo, "==", valor).get();
  }

  CreateGuid() {
    return this._p8() + this._p8(true) + this._p8(true) + this._p8();
  }

  _p8(s = null) {
    var p = (Math.random().toString(16) + "000000000").substr(2, 8);
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }
}

