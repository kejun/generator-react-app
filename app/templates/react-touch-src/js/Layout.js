/** @jsx React.DOM */
var React   = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="app-layout">
        <div className="app-layout-container">
          {this.props.children}
        </div>
      </div>
    );
  }
});
