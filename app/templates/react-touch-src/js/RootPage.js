/** @jsx React.DOM */
var React      = require('react');
var Layout     = require('./Layout');
var HomePage   = require('./HomePage');
var LaunchPage = require('./LaunchPage');
var ErrorPage  = require('./ErrorPage');

module.exports = React.createClass({
  render: function() {
    switch(this.props.routeName) {
      case 'home':
        return <Layout><HomePage /></Layout>
      case '':
      case 'launch':
        return <LaunchPage>加载中...</LaunchPage>
      default:
        return <Layout routeName="no_found"><ErrorPage /></Layout>
    }
  }
});
