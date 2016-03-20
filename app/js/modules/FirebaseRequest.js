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
          if(dataSnapshot){
            resolve(dataSnapshot.val());
          } else {
            reject('Getting all the lists failed :(');
          }
        });
      }
    );
  }

  listChildCount(key){
    var listRef = new Firebase(`${FIREBASE_REFS.tasksRef}/${key}`);
    return new Promise(
      (resolve, reject) => {
        listRef.once('value', (dataSnapshot) => {
          if(dataSnapshot){
            resolve(dataSnapshot.numChildren());
          } else {
            reject(`Getting children for list: ${key} failed.`);
          }
        });
      }
    )
  }

  genericGetRequest(){
    return new Promise(
      (resolve, reject) => {
        // async op goes here
      }
    )
  }
}
