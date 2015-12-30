/**
 * The Default view
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'view/BaseMobileView',
        'text!../template/DefaultTemplate.html'
    ],
    function($, _, Backbone, BaseMobileView, textTemplate) {
        
        return BaseMobileView.extend({
            textTemplate: textTemplate,
            beforeRender: function() {
                if ($('#app-boot').length > 0) {
                    $('#app-boot').remove();
                }
            }
        });
    }
);