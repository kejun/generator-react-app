var AppDispatcher = require('../dispatcher/AppDispatcher');
var actionType    = require('./ActionType');

module.exports = {
  doSomeThing: function(params) {
    AppDispatcher.handleViewAction({
      actionType: actionType.ACTION_NAME,
      params: params
    });
  }
};
