/**
 * The BaseView to be extended by concrete views.
 *
 * @author hoatle
 */

define(
    [
        'jquery',
        'underscore',
        'backbone'
    ],
    function($, _, Backbone) {

        return Backbone.View.extend({

            /**
             * The pre-initialize phase for override
             *
             * @param options
             * @return {*}
             */
            beforeInitialize: function(options) {
                return this;
            },

            /**
             * Initializes the view.
             *
             * @param options the options literal object, usually have: $container, model and appendable attribute.
             */
            initialize: function(options) {

                //hold the initial options for subclass's reference
                this.options = options || {};

                this.controller = this.options.controller;

                //the global pubSub channel for all views to share common triggers and event handlers.
                //this is useful when there are many nested views and we want to communicate with top most views.
                //very useful for views' communication.
                //@api experimental
                this.pubSubChannel = Backbone.Events;

                //indicates if the view is rendered or not
                this.rendered = false;

                //the modelBinder instance of Backbone.ModelBinder plugin
                this.modelBinder = new Backbone.ModelBinder();

                this.beforeInitialize.apply(this, arguments);

                _.bind(_ensureValid, this);

                this.$container = this.$container || options.$container;
                this.model = this.model || options.model || new Backbone.Model();
                this.appendable = this.appendable || options.appendable;

                // use Underscore
                this.textTemplate = this.textTemplate || options.textTemplate || "";
                if (this.textTemplate && !this.template) {
                    this.template = _.template(this.textTemplate);
                }
                
                this.afterInitialize.apply(this, arguments);
            },

            /**
             * The after-initialize phase for override
             *
             * @param options
             * @return {*}
             */
            afterInitialize: function(options) {
                return this;
            },

            /**
             * The pre render phase for override
             *
             * @return {*}
             */
            beforeRender: function() {
                return this;
            },

            container: function() {
                return _.isString(this.$container) ? this.$(this.$container) : this.$container;
            },

            /**
             * Renders the view
             *
             * @return {*}
             */
            render: function() {
                this.beforeRender();

                if (_ensureValid()) {
                    var c = this.container();
                    if (this.appendable) {
                        c.append(this.$el);
                    } else {
                        c.html(this.$el);
                    }
                    this.delegateEvents();
                }

                this.afterRender();

                this.rendered = true;

                return this;
            },

            /**
             * The after render phase for override
             *
             * @return {*}
             */
            afterRender: function() {
                return this;
            },

            update: function(model) {
                this.model = model;
                this.destroy();
                this.initialize();
                this.render();
            },

            /**
             * Destroy this view
             * //TODO make sure no memory leak for event handling
             */
            destroy: function() {
                this.$el.remove();
            }

        });

        function _ensureValid() {
            if (_.isNull(this.$container) || _.isNull(this.el)) {
                $.log('this.$container or this.el is null, invalid state');
                return false;
            }
            return true;
        }

    }
);