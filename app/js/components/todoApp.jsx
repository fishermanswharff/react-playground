// main libraries
import React from 'react';
import BaseComponent from './base.jsx';

// custom react components
import TodoLists from './todoLists.jsx';
import TodoListsForm from './todoListsForm.jsx'
import Navbar from './navbar.jsx';

// custom modules
import Refire from '../firebaseModule/Refire.js';
import Permissions from '../modules/Permissions.js';
import SessionController from '../modules/SessionController';

// constants
import { FIREBASE_REFS } from '../constants/FirebaseRefs';

// for dynamic classes
import classnames from 'classnames';

export default class TodoApp extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    this.context = context;
    this.permissions = new Permissions({props: this.props});
    this.refire = new Refire({baseUrl: FIREBASE_REFS.rootRef, props: this.props});
    this.sessionController = new SessionController({context: this});
    this.state = {
      authData: this.permissions.getAuth(),
      menuActive: false
    };
    // console.log(`\n———————————— routeParams: ${JSON.stringify(this.props.routeParams)}\n———————————— route: ${JSON.stringify(this.props.route)}\n———————————— params: ${JSON.stringify(this.props.params)}\n———————————— location: ${JSON.stringify(this.props.location)}\n———————————— history:  ${JSON.stringify(this.props.history)}`);
    this.bind('handleAuthEvent', 'handleMenuClick', 'handleListClicked', 'routeChange');
    this.context.router.listen(this.routeChange);
  }

  routeChange(routeObject){
    // save the routeObject to window storage
    // save the data for that location in localstorage as JSON
    // upon loading, check for local storage first, and load the data there first.
    this.sessionController.setLocalStorage({route: routeObject, data: {}});
  }

  componentDidMount() {
    // the component is all set, and you can access the component's props and initial state
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {}

  handleAuthEvent(authData){
    if(authData){
      this.setState({ authData: authData });
      this.forceUpdate();
      this._menu.bindData();
    } else {
      this.setState({ authData: null });
      this.context.router.push('/');
      this._menu.setState({lists: []});
    }
  }

  handleMenuClick(event, options) {
    this.setState({ menuActive: options.active });
  }

  handleListClicked(event, context) {
    this.setState({ menuActive: !this.state.menuActive });
  }

  render() {

    let menuClasses = classnames('list-and-form-container', {
      'active': this.state.menuActive,
    });

    return (
      <div id='todo-app' className='todo-app-main-container'>
        <Navbar
          authData={ this.state.authData }
          onAuthEvent={this.handleAuthEvent}
          onMenuClick={this.handleMenuClick}
          active={this.state.menuActive}
          {...this.props}
        />
        <section className={menuClasses}>
          <TodoLists ref={(menu) => this._menu = menu} authData={this.state.authData} onListClicked={this.handleListClicked} />
          <TodoListsForm authData={this.state.authData} />
        </section>
        <div className='todo-app-children'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

TodoApp.propTypes = {}
TodoApp.defaultProps = {}
TodoApp.contextTypes = {
  router: React.PropTypes.object.isRequired
}
