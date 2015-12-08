/**
 * The sample controller
 */
define(
  [
    'jquery',
    'underscore',
    'backbone',
    'controller/MobileController',
    'view/ToolbarsView'
  ],
  function($, _, Backbone, MobileController, View) {

    return MobileController.extend({

      initialize: function() {

        this.transition = 'slide';

        this.view = new View({
          $container: $('body'),
          appendable: true,
          controller: this
        });

      },

      index: function() {
        this.view.render();
      }
    });
  }
);