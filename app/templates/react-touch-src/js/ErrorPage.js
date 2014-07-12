/** @jsx React.DOM */
var React = require('react');
var RoutedLink = require('react-touch/lib/routing/RoutedLink');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="app-page app-fail">
        <h1>404</h1>
       <RoutedLink href="/home">返回</RoutedLink> 
      </div>
    );
  }
});
