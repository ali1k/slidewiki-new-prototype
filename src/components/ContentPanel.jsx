'use strict';
var React = require('react');
var cx = require('react/lib/cx');
var navigateAction = require('flux-router-component/actions/navigate');
var StoreMixin = require('fluxible').Mixin;
//stores
var ContentStore = require('../stores/ContentStore');
//SlideWiki components
var DeckPanel=require('./DeckPanel.jsx');
var SlidePanel=require('./SlidePanel.jsx');
var SlideEditor = require('./SlideEditor.jsx');
var deckActions = require('../actions/DeckActions');

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
      mode: this.getStore(ContentStore).getMode(),
      theme_name: 'night'
    };
  },
  _onChange: function() {
    this.setState(this.getStateFromStores());
  },
  _onTabClick: function(mode, e) {
    this.props.context.executeAction(navigateAction, {type: 'click', url: this._getTabPath(mode)});
    e.preventDefault();
  },
  _getTabPath: function(mode) {
    return '/deck/'+this.props.rootDeckID+'/'+this.state.content_type + '/' + this.state.content_id + '/'+ mode;
  },
  startShow : function(){
      this.props.context.executeAction(navigateAction, {type: 'click', url : '/play/'+this.props.rootDeckID+'/' + this.state.theme_name});
  },
    render: function() {
      var viewTabPath=this._getTabPath('view');
      var viewTabClasses = cx({
        'item': true,
        'active': this.state.mode=='view'
      });
      var viewContentClasses= cx({
        'bottom': true,
        'attached': true,
        'panel': true,
        'sw-hidden': this.state.mode!='view'
      });
      var viewContent, editContent;
      switch(this.state.content_type){
      case 'deck':
        viewContent=<DeckPanel id={this.state.content_id} context={this.props.context} />;
        editContent=<SlideEditor id={this.state.content_id} context={this.props.context} />;
        break;
      case 'slide':
        viewContent=<SlidePanel id={this.state.content_id} context={this.props.context} />;
        editContent=<SlideEditor id={this.state.content_id} context={this.props.context} />;
        break;
      }

      var editTabPath=this._getTabPath('edit');
      var editTabClasses = cx({
        'item': true,
        'active': this.state.mode=='edit'
      });
      var editContentClasses= cx({
        'bottom': true,
        'attached': true,
        'panel': true,
        'sw-hidden': this.state.mode!='edit'
      });
      
      
        return (
          <div className="sw-content-panel">
            <div className="ui top attached tabular menu">
              <a href={viewTabPath} className={viewTabClasses} onClick={this._onTabClick.bind(this, 'view')}>
                View
              </a>
              <a href={editTabPath} className={editTabClasses} onClick={this._onTabClick.bind(this, 'edit')}>
                Edit
              </a>
              <a className="item">
              Questions<span className="ui tiny label">12</span>
              </a>
              <div className="item">
                <a title="Comments">
                    <i className="comments red large icon"></i><span>5</span>
                </a>
              </div>
              <div className="item">
                <a title="download">
                  <i className="download icon"></i>
                </a>
                <a title="print">
                  <i className="print icon"></i>
                </a>
                <a title="export">
                  <i className="share external icon"></i>
                </a>
                <a title="share">
                  <i className="share alternate icon"></i>
                </a>
              </div>
              <div className="ui right labeled compact icon button green" onClick={this.startShow}>
                <i className="right play icon"></i>
                Play
              </div>
            </div>
            <div className={viewContentClasses}>
              <div className="ui segment">
                {viewContent}
              </div>
            </div>
            <div className={editContentClasses}>
              <div className="ui segment">
                <div className="ui segment color green">
                    <SlideEditor id={this.state.content_id} context={this.props.context}/>
                </div>
              </div>
            </div>
          </div>
        );
    },
    //componentDidMount: function() {
    //    var payload = {deck:this.props.rootDeckID, mode: 'view', selector : {id :this.props.rootDeckID, type: 'deck'}};
    //    this.props.context.executeAction(deckActions.loadContainer, payload);
    //}
});

module.exports = ContentPanel;
