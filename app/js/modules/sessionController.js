export default class SessionController {
  constructor(options){
    if(!options.context){
      throw new Error('must have a context to create a session around');
    }
    this.context = options.context;
    this.key = 'jwtodoapp:reactstyle';
  }

  setLocalStorage(data){
    let storageObj = JSON.parse(window.localStorage.getItem(this.key)) || {};
    for(let key in data)
      Object.defineProperty(storageObj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: data[key]
      })
    window.localStorage.setItem(this.key, JSON.stringify(storageObj));
  }

  getLocalStorage(){
    return JSON.parse(window.localStorage.getItem(this.key));
  }
}
