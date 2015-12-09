/*
 * Copyright (C) hoatle
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The Controller to be extended for concrete controller.
 */
define(
    [
        'jquery',
        'underscore',
        'backbone'
    ],
    function($, _, Backbone) {

        var Controller = function(options) {
            this.options = options || {};
            this.router = this.options.router;
            this.name = this.options.name;
            this.trigger('beforeInitialize', arguments);
            this.initialize.apply(this, arguments);
            this.trigger('afterInitialize', arguments);
        };

        //inherits from backbond
        Controller.extend = Backbone.Router.extend;

        _.extend(Controller.prototype, Backbone.Events, {
            /**
             * Mappings properties of url action with method action of the router.
             *
             * This should be used only if url action is not the same with method action of router.
             * For example with url: /users/show/1 will try to match 'show' method of the controller to be called.
             * If you want to make that 'show' url action to map with 'showUser' controller method, use:
             * <pre>
             * actions: {
             *   'show': 'showUser'
             * }
             * </pre>
             */
            actions: {

            },
            /**
             * Initialize an empty function by default. Override it with
             * your own initialization logic.
             */
            initialize: function() {

            },

            /**
             * Defines url action to map with a string method a action function to be called.
             *
             * If methodAction is a string, framework will try to call: controllerInstance[methodAction](params).
             *
             * If the methodAction is a function, framework will try to call: methodAction.call(controllerInstance, params).
             *
             * @param urlAction
             * @param methodAction
             */
            action: function(urlAction, methodAction) {
                this.actions[urlAction] = methodAction;
            },

            //the default action, should be overridden by controllers if there is no action matched.
            index: function(params) {
                $.error('Controller#index is not overridden with params: ' + params);
            }

        });

        return Controller;
    }
);