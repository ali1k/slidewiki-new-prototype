
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');
var ActionTypes = Constants.ActionTypes;


module.exports = {
  loadDeck: function(content) {

    AppDispatcher.handleServerAction({
      actionType: ActionTypes.LOAD_DECK,
      content: content
    });
  }

};