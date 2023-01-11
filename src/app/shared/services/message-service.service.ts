import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class MessageServiceService {
  constructor(private firestore: AngularFirestore) {}

  createItem(data) {
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
    return this.firestore.collection('messages').snapshotChanges();
  }
}
