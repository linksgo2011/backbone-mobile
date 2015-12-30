/**
 * The Base jQuery Mobile view
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'view/BaseView'
    ],
    function($, _, Backbone, BaseView) {

        var appBooted = false;

        // this will exclude external links (starting with http://) or hash link (starting with #)
        // the link href will be used for router's dispatching.
        function attachRouterToLinks() {

            this.$('a:not([href^="http"])').off('click').on('click', $.proxy(function(e) {
                var link = $(e.currentTarget).attr('href');
                if (link.indexOf('#') === 0) {
                    return;
                }
                //if the link start with hash '#' => ignore
                e.preventDefault();
                this.controller.router.dispatch(link, {
                    trigger: true
                });

            }, this));

            this.$('[data-role="back"]').off('click').on('click', $.proxy(function(e){
                window.history.back();
                Backbone.history.isBack = true;
            },this));

            this.controller.on("actionFinish",function(event){
                Backbone.history.isBack = false;
            });
        }

        return BaseView.extend({
            render: function(build_data) {
                $.debug('BaseMobileView::this.options', this.options);

                // mix data to tpl
                if (this.template) {
                    var build_data = $.extend(build_data, {});
                    if (this.$el) {
                        this.$el.remove();
                    }
                    this.setElement(this.template(build_data));
                }

                var c = this.container();
                if (this.appendable) {
                    c.append(this.$el);
                } else {
                    c.html(this.$el);
                }

                attachRouterToLinks.call(this);

                var transition = this.controller.transition,
                    reverseTransition = this.controller.getReverseTransition();
                //TODO this is weird to avoid: Uncaught TypeError: Cannot call method 'trigger' of undefined
                //this could be the problem of: jquery mobile is not fully initialized
                this.beforeRender();
                // transition is here

                var opts = {
                    changeHash: false,
                    transition: transition
                };

                if (reverseTransition) {
                    opts.reverse = true;
                    opts.transition = reverseTransition;
                }

                var that = this;
                var current_page = transitions.curPage || "index-page";

                setTimeout($.loadingHide,1200);

                if (appBooted) {
                    var transitioner = !Backbone.history.isBack?"next":"back";
                    transitions[transitioner](current_page, this.$el.attr("id"), function() {
                        that.delegateEvents();
                        that.afterRender();
                        that.rendered = true;
                    });
                } else {
                    // app-boot 
                    $('#app-boot').hide();
                    appBooted = true;

                    transitions.skip(current_page, this.$el.attr("id"), function() {
                        that.delegateEvents();
                        that.afterRender();
                        that.rendered = true;
                    });
                }
                return this;
            }
        });
    }
);