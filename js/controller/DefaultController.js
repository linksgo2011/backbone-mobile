
/**
 * The Default controller if there is no controller matching by the router.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'controller/MobileController',
        'view/DefaultView'
    ],
    function($, _, Backbone, MobileController, DefaultView) {
        return MobileController.extend({
            initialize: function() {
                this.defaultView = new DefaultView({
                    $container: $('body'),
                    appendable: true,
                    controller: this,
                });
            },
            index: function(params) {
                this.defaultView.render();
            }
        });

    }
);