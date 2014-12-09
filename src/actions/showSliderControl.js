'use strict';
//this action will load a list of slides for the slider based on the root deck
module.exports = function (context, payload, done) {
  context.dispatch('SHOW_SLIDER_CONTROL_START', payload);
  context.service.read('deck.slideslist', payload, {}, function (err, res) {
    if (err) {
      context.dispatch('SHOW_SLIDER_CONTROL_FAILURE', payload);
      done(err);
      return;
    }
    context.dispatch('SHOW_SLIDER_CONTROL_SUCCESS', res);
    done(null);
  });

};