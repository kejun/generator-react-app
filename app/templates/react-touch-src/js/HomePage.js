/** @jsx React.DOM */
var React  = require('react');
// 注释部分示范用Flux
// var appStores = require('../stores/AppStores');
// var appActions = require('../actions/AppActions');

module.exports = React.createClass({
  // getInitialState: function() {
  //   return {
  //     data: null
  //   }
  // },
  componentWillMount: function() {
    // appStores.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    // appStores.removeChangeListener(this._onChange);
  },
  // _onChange: function() {
  //   this.setState({
  //     data: appStores.get('db_field')
  //   });
  // },
  render: function() {
    return (
      <div className="app-page app-home-page">
       这是首页
      </div>
    );
  }
});
