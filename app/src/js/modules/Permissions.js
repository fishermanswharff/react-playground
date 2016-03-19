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

  getAuth(){}
  authorized(){}
  getProjects(){}
  getTasks(projectId){}
  getMembers(projectId){}
  getUsers(){}
  getUser(userId){}
}

const refs = {
  firebaseRef: 'https://jwtodoapp.firebaseio.com/',
  projectsRef: 'https://jwtodoapp.firebaseio.com/projects',
  tasksRef: 'https://jwtodoapp.firebaseio.com/tasks',
  notesRef: 'https://jwtodoapp.firebaseio.com/notes',
  membersRef: 'https://jwtodoapp.firebaseio.com/members',
  usersRef: 'https://jwtodoapp.firebaseio.com/users'
}
