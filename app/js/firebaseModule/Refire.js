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
   * @param  {object}
   *  key: [string],
   *  success: [function],
   *  array: boolean,
   *  context: reference to the caller (React Component)
   * @description
   *  fetch() looks for all the values at the
   *  location given in the options, and
   *  returns the Promise of that data.val()
   * @return {Promise}
   */
  fetch(options){
    this._validateOptions(options);
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
    return promise.then((dataSnapshot) => {
      this.firebase.off();
      this.success.call(this.context, dataSnapshot.val());
    }).catch((reason) => {
      if(typeof this.fail === 'function'){
        this.firebase.off();
        this.fail.call(this.context, reason);
      }
    });
  }

  /**
   * @param  {object}
   *  key: [string],
   *  success: [function],
   *  array: boolean,
   *  context: reference to the caller (React Component)
   * @description
   *  fetchChildCount exposes firebase's dataSnapshot
   *  methods, asking for the numChildren() utilizing
   *  the once() query method
   * @return {Promise}
   */
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
    return promise.then((dataSnapshot) => {
      this.success.call(this.context, dataSnapshot.numChildren());
    });
  }

  /**
   * @param  {object}
   *  key: [string],
   *  array: boolean,
   *  context: reference to the caller (React Component),
   *  contextKey: string (key for binding state)
   *  success: [function], ***OPTIONAL***
   * @description
   *  binds the data in the firebase location to
   *  the context's state
   * @return {undefined}
   */
  bindToState(options){
    for(var k in options)
      this[k] = options[k];
    let refstring = `${this.baseUrl}${this.key}`;
    this.firebase = new Firebase(refstring);
    this.reactSetState = this.context.setState;

    this.firebase.on('value', (dataSnapshot) => {
      if(this.array === true){
        let obj = dataSnapshot.val(),
            array = [];
        for(var j in obj)
          array.push({[j]: obj[j]});
        this.context.setState({[this.state]: array});
      } else {
        console.log(this.reactSetState);
        this.context.setState({[this.state]: dataSnapshot.val()});
      }
    });
  }

  push(options){
    for(var k in options)
      this[k] = options[k];
    let refstring = `${this.baseUrl}${this.key}`;
    this.firebase = new Firebase(refstring);
    let promise = this.firebase.push(this.data);
    return promise.then((value) => {
      this.success.call(this, value);
    })
  }

  post(options){
    for(var k in options)
      this[k] = options[k];
    let refstring = `${this.baseUrl}${this.key}`;
    this.firebase = new Firebase(refstring);
    let promise = this.firebase.set(this.data);
    return promise.then((value) => {
      this.success.call(this, value);
    });
  }

  update(options){
    for(var k in options)
      this[k] = options[k];
    let refstring = `${this.baseUrl}${this.key}`;
    this.firebase = new Firebase(refstring);
    let promise = this.firebase.update(this.data);
    return promise.then(value => {
      this.success.call(this,value);
    });
  }

  remove(options){
    for(var k in options)
      this[k] = options[k];
    let refstring = `${this.baseUrl}${this.key}`;
    this.firebase = new Firebase(refstring);
    let promise = this.firebase.remove();
    return promise.then(value => {
      this.success.call(this, value);
    });
  }

  /**
   * [syncToState description]
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  syncToState(options){
    for(var k in options)
      this[k] = options[k];
  }

  /** ——————————————————————————————————————
    Private Methods
  ——————————————————————————————————————————*/

  _validateOptions(object){
    // console.log(Object.keys(object));
  }

  _genericGetRequest(){
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
      }
    );
  }
}
