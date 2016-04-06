// main libraries
import BaseComponent from './base.jsx';

// custom react components
import TodoLists from './todoLists.jsx';
import TodoListsForm from './todoListsForm.jsx'
import Navbar from './navbar.jsx';

// custom vanilla modules
import Refire from '../firebaseModule/Refire.js';
import Permissions from '../modules/Permissions.js';

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
    this.state = {
      authData: this.permissions.getAuth(),
      menuActive: false
    };

    this.bind('handleAuthEvent', 'handleMenuClick', 'handleListClicked');
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

    React.Children.map(this.props.children,
      (child) => { console.log(child); }
    );

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
