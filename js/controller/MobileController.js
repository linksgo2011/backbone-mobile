/**
 * The Category controller
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'controller/Controller'
    ],
    function($, _, Backbone, Controller) {

        return Controller.extend({

            getReverseTransition: function() {

                var reverseTransition;

                if (this.isBackNavigated) {
                    var navigationRouteStack = this.router.getNavigationRouteStack();
                    reverseTransition = navigationRouteStack[navigationRouteStack.length - 2].transition;
                }

                return reverseTransition;
            }

        });
    }
);