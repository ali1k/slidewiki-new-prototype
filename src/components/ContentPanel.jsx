'use strict';
var React = require('react');
var StoreMixin = require('fluxible-app').StoreMixin;
//stores
var ContentStore = require('../stores/ContentStore');
//SlideWiki components
var DeckPanel=require('./DeckPanel.jsx');
var SlidePanel=require('./SlidePanel.jsx');

var ContentPanel = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: {
      _onChange: [ContentStore]
    }
  },
  getInitialState: function () {
    return this.getStateFromStores();
  },
  getStateFromStores: function () {
    return {
      content_type: this.getStore(ContentStore).getContentType(),
      content_id: this.getStore(ContentStore).getContentID(),
    };
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
    render: function() {
        var content='';
        switch(this.state.content_type){
          case 'deck':
            content=<DeckPanel id={this.state.content_type} context={this.props.context} />;
            break;
          case 'slide':
            content=<SlidePanel id={this.state.content_id} context={this.props.context} />;
            break;
        }
        return (
          <div >
          <h2> ContentPanel </h2>
          {content}
          </div>
        );
    }
});

module.exports = ContentPanel;