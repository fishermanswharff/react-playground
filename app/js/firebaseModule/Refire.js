import Firebase from 'Firebase';

export default class Refire {
  constructor(options){
    for(let key in options){
      if(options.hasOwnProperty(key)){
        this[key] = options[key];
      }
    }

    this.firebase = new Firebase(this.baseUrl);
  }


  /**
  */
  fetch(options){
    for(var k in options)
      this[k] = options[k];
    let refstring = `${this.baseUrl}${this.key}`;
    this.firebase = new Firebase(refstring);
    let promise = new Promise(
      (resolve, reject) => {
        this.firebase.on('value', (dataSnapshot) => {
          resolve(dataSnapshot);
        });
      }
    )
    promise.then((dataSnapshot) => {
      this.success.call(this.context, dataSnapshot.val());
    }).catch((reason) => {
      if(typeof this.fail === 'function'){
        this.fail.call(this.context, reason);
      }
    });
  }

  fetchChildCount(options){
    for(var k in options)
      this[k] = options[k];
    let refstring = `${this.baseUrl}${this.key}`;

    this.firebase = new Firebase(refstring);

    let promise = new Promise(
      (resolve, reject) => {
        this.firebase.once('value', function(dataSnapshot){
          resolve(dataSnapshot);
        });
      }
    )

    promise.then((dataSnapshot) => {
      this.success.call(this.context, dataSnapshot.numChildren());
    });
  }

  getAllLists(){
    let listsRef = new Firebase(this.baseUrl);
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
    let listRef = new Firebase(`${this.baseUrl}/${key}`);
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
