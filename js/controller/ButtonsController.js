/**
 * The sample controller
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'controller/MobileController',
        'view/ButtonsView'
    ],
    function($, _, Backbone, MobileController, View) {

        return MobileController.extend({

            initialize: function() {

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