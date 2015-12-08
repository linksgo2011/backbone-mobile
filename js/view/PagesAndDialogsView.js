/**
 * The sample view
 */
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'view/BaseMobileView',
    'text!template/PagesAndDialogsTemplate.html'
  ],
  function($, _, Backbone, BaseMobileView, textTemplate) {

    return BaseMobileView.extend({
      textTemplate: textTemplate
    });
  }
);