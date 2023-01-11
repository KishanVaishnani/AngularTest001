import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageServiceService {
  constructor(private firestore: AngularFirestore) {}

  createItem(data) {
    return this.firestore
      .collection('messages')
      .add(data)
      .then(
        (res) => {
          return res;
        },
        (err) => {
          return err;
        }
      );
  }

  getItem() {
    return this.firestore
      .collection('messages')
      .snapshotChanges()
      .pipe(map((actions) => actions.map((a: any) => a.payload.doc.data())));
  }
}
