var EventEmitter  = require('events').EventEmitter;
var Promise       = require('es6-promise').Promise;
var merge         = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType    = require('../actions/ActionType');

var _db = {};

var EVENT_CHANGE = 'store::change';

var AppStores = merge(EventEmitter.prototype, {
  get: function(name) {
    return _db[name];
  },
  getAll: function(name) {
    return _db;
  },
  addChangeListener: function(callback) {
    this.on(EVENT_CHANGE, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(EVENT_CHANGE, callback);
  },
  emitChange: function() {
    this.emit(EVENT_CHANGE);
  },
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case actionType.ACTION_NAME:
      return doSomeThing(action.params);
    default:
      return true;
  }
});

function doSomeThing(params) {
  // fetch data & update
  AppStores.emitChange();
}
