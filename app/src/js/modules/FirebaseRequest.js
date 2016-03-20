import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class FirebaseRequest {
  constructor(options){
    for(var key in options){
      this[key] = options[key];
    }
  }

  getAllLists(){
    var listsRef = new Firebase(FIREBASE_REFS.projectsRef);
    return new Promise(
      (resolve, reject) => {
        listsRef.on('value', (dataSnapshot) => {
          resolve(dataSnapshot.val());
        });
      }
    );
  }

  childCount(key){
    var listRef = new Firebase(`${FIREBASE_REFS.tasksRef}/${key}`);
    return new Promise(
      (resolve, reject) => {
        listRef.once('value', (dataSnapshot) => {
          resolve(dataSnapshot.numChildren());
        });
      }
    )

  }
}
