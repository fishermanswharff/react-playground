var React = require('react');

export default class Stub extends React.Component {

  getChildContext() {
    return {
      router: {
        makePath(pathname, query) { },
        makeHref(pathname, query) { },
        createHref() {},
        transitionTo(pathname, query, state=null) { },
        replaceWith(pathname, query, state=null) { },
        go(n) { },
        goBack() { },
        goForward() { },
        isActive(pathname, query) { },
        push(){}
      }
    };
  }

  render() {
    return this.props.children();
  }
}

Stub.childContextTypes = {
  router: React.PropTypes.object.isRequired
}
