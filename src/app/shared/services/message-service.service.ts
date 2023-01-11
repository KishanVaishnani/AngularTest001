import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageServiceService {
  constructor(private firestore: AngularFirestore) {}

  createItem(data) {
    debugger
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('messages')
        .add(data)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  getItem() {
    return this.firestore.collection('messages').snapshotChanges().pipe(
      map(actions => actions.map((a:any) => (a.payload.doc.data())))
    );
  }
}
