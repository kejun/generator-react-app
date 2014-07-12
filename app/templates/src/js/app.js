/** @jsx React.DOM */
var React = require('react');

window.app = {
  start: function(mountNode) {
    React.renderComponent(<p>Here we go!</p>, mountNode);
  }
};

