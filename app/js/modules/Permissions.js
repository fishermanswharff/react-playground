import { FIREBASE_REFS } from '../constants/FirebaseRefs';

export default class Permissions {
  constructor(options){
    for(var key in options){
      this[key] = options[key];
    }
    this.getAuth = this.getAuth.bind(this);
  }

  getRefs(){
    return refs;
  }

  getAuth(){
    return new Firebase(FIREBASE_REFS.rootRef).getAuth();
  }
  authorized(){}
  getProjects(){}
  getTasks(projectId){}
  getMembers(projectId){}
  getUsers(){}
  getUser(userId){}
}
