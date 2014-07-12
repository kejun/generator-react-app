/** @jsx React.DOM */
var React = require('react');
var Router = require('react-touch/lib/routing/Router');

module.exports = React.createClass({
  componentDidMount: function() {
    setTimeout(function() {
      Router.trigger('/home');
    }, 2000);
  },
  render: function() {
    return (
      <div className="app-page app-launch">
        {this.props.children}
      </div>
    );
  }
});
