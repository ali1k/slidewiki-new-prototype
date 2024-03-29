'use strict'
var async = require('async');
var TreeStore = require('../stores/TreeStore');

exports.deleteFrom = function(context, payload, done){
    context.dispatch('DELETE_FROM', payload);
    done();
};

exports.addEmptySlide = function(context, payload, done){
    context.dispatch('ADD_EMPTY_SLIDE', payload);
    done();
};

exports._onDragStart = function(context, payload, done){
    context.dispatch('ON_DRAG_START', payload);
    done();
};

exports.checkDropPossible = function(context, payload, done){
    context.dispatch('CHECK_DROP_POSSIBLE', payload);
    //context.dispatch('MOVE_ITEM', payload);
    done();
};

exports._onDrop = function(context, payload, done){
    context.dispatch('ON_DROP', payload);
    done();
};
exports._updateSelector = function(context, payload, done){
    context.dispatch('UPDATE_TREE_NODE_SELECTOR', payload);
    done();
};
exports._onDragEnd = function(context){
    context.dispatch('ON_DRAG_END');
};
exports.setNewTitle = function(context, payload, done){
    context.dispatch('SET_NEW_TITLE', payload);
    done();
};





