/** @jsx React.DOM */
var React      = require('react');
var ReactTouch = require('react-touch');
var RootPage   = require('./pages/RootPage');

var routeOptions = {
  '/home$':  'home',
  '/error':  'error',
  '/$':      'launch'
}

window.app = {
  start: function(mountNode) {
    ReactTouch.start(RootPage, mountNode, routeOptions);
  }
};

