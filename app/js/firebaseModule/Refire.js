import { FIREBASE_REFS } from '../constants/FirebaseRefs';
import Firebase from 'Firebase';

export default class Refire {
  constructor(options){
    for(let key in options){
      if(options.hasOwnProperty(key)){
        this[key] = options[key];
      }
    }
  }

  fetch(){}


  getAllLists(){
    let listsRef = new Firebase(FIREBASE_REFS.projectsRef);
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
    let listRef = new Firebase(`${FIREBASE_REFS.tasksRef}/${key}`);
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
    );
  }

  genericGetRequest(){
    let success = true;
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if(success){
            resolve('hello world');
          } else {
            reject('async failed');
          }
        }, 1000);
        // async op goes here
      }
    );
  }


}
