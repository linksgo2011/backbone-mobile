/**
 * The application router
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'controller/IndexController',
        'controller/DefaultController'
    ],
    function($, _, Backbone, IndexController, DefaultController) {

        var indexController,
            defaultController;

        /**
         * Holds controller instance for caching purpose.
         *
         * @type {Object}
         */
        var cachedControllers = {

        };

        /**
         * Holds previous and current controller instance for detecting back/forward button
         */
        var navigationStack = [];

        function addToNavigationStack(controllerInstance) {
            if (navigationStack.length < (this.options.maxNavigationStackLength || 10)) {
                navigationStack.push(controllerInstance);
            } else {
                navigationStack.shift(controllerInstance);
                navigationStack.push(controllerInstance);
            }

            if (navigationStack.length > 1) {
                //set isBackNavigated
                var controllerName = controllerInstance.name,
                    controllerFlowInfo = this.findControllerFlowInfo(controllerName);

                $.debug('router::addNavigationStack | controllerFlowInfo', controllerFlowInfo);

                var previousNavigationStackName = navigationStack[navigationStack.length - 2].name;

                if (controllerFlowInfo.previous.name === previousNavigationStackName) {
                    $.debug('router::addNavigationStack | controllerFlowInfo.previous.name matched', controllerFlowInfo.previous);
                    controllerInstance.isBackNavigated = false;
                } else {
                    controllerInstance.isBackNavigated = true;
                }
            }
        }

        return Backbone.Router.extend({
            /**
             * Controller mapping from controller name on url to controller name on 'controller' folder.
             *
             * For example: 'user' : 'User' => router will try to find module under: controller/UserController.
             */
            controllers: {

            },

            controllerFlow: {
                name: 'IndexController'
            },

            findControllerFlowInfo: function(controllerName) {

                var previousElement = {},
                    foundElement = {};

                function searchTree(element, matchingName) {
                    if (element.name === matchingName) {
                        foundElement = element;
                    } else if (element.children) {
                        var result;
                        for (var i = 0, len = element.children.length; i < len; i++) {
                            previousElement = element;
                            result = searchTree(element.children[i], matchingName);
                            if (result.found.name) {
                                break;
                            }
                        }
                        return result;
                    }

                    return {
                        'previous': previousElement,
                        'found': foundElement
                    };
                }

                return searchTree(this.controllerFlow, controllerName);
            },

            /**
             * Dynamically configures controller mapping.
             *
             * This will override any previously defined controller.
             *
             * @param urlController the url controller name
             * @param controllerName the accordingly controller name
             */
            setController: function(urlController, controllerName) {
                if (this.controllers[urlController]) {
                    $.warn('Router#setController: override ' + this.controllers[urlController]);
                }
                this.controllers[urlController] = controllerName;
            },

            /**
             * Dispatches to another controller by specifying urlController, optional action and optional params.
             *
             * @param urlController the url controller
             * @param options optional options which is the same as for router#route(fragment, opts) with 2 optional more params:
             *                action, params for constructing url fragment.
             */
            dispatch: function(urlController, options) {
                if (!urlController) {
                    $.warn('Router#dispatch: not valid urlController', urlController);
                    return;
                }
                options = options || {};
                var fragment = _getRouteFragment.call(this, urlController, options.action, options.params);
                this.navigate(fragment, options);
            },

            routes: {
                //TODO should have optional mapping like this instead of 3 mappings
                //':controller?/:action??/:params?' : 'dispatchController'
                //or
                //':controller[/:action][/:params]' : 'dispatchController'
                ':controller': 'dispatchController',
                ':controller/:action': 'dispatchController',
                ':controller/:action/*params': 'dispatchController',
                '*actions': 'indexController'
            },

            initialize: function(options) {
                this.options = options || {};

                /**
                 * 初始化预加载部分控制器
                 */
                var self = this;
                require(this.preLoadControllers,
                    function() {
                        $.each(arguments,function(index,Controller) {
                            var controllerName = self.preLoadControllers[index].split("/").pop();
                            var controllerInstance = new Controller({
                                name: controllerName,
                                router: self
                            });
                            cachedControllers[controllerName] = controllerInstance;
                            $.log(controllerName+" preload",controllerName);
                        });
                    },
                    function(err) {
                        $.warn('AppRouter#dispatchController: Error for loading controller: ' + controller, err);
                    }
                );
            },

            dispatchController: function(controller, action, params) {

                var controllerName = this.controllers[controller];

                if (!controllerName) {
                    controllerName = controller;
                }
                controllerName += 'Controller';

                //if controllerName is not configured, try to find it with url controller
                //this is useful to introduce convention over configuration
                var self = this;

                var cachedControllerInstance = cachedControllers[controllerName];

                if (cachedControllerInstance) {

                    processController.call(this, cachedControllerInstance);

                } else {
                     // start dispatch 
                    $.loadingShow();
                    
                    require(
                        [
                            'controller/' + controllerName
                        ],
                        function(Controller) {
                            var controllerInstance = new Controller({
                                name: controllerName,
                                router: self
                            });
                            cachedControllers[controllerName] = controllerInstance;

                            processController.call(self, controllerInstance);

                        },
                        function(err) { //not found matching controller
                            $.warn('AppRouter#dispatchController: Error for loading controller: ' + controller, err);
                            self.defaultController(_getRouteFragment.call(self, controller, action, params));
                        }
                    );

                }

                function processController(controllerInstance) {
                    addToNavigationStack.call(this, controllerInstance);

                    controllerInstance.trigger('actionStart');

                    if (action) {
                        var methodAction = controllerInstance.actions[action];
                        if (methodAction && $.isFunction(controllerInstance[methodAction])) {
                            controllerInstance[methodAction](params);
                        } else if ($.isFunction(methodAction)) {
                            methodAction.call(controllerInstance, params);
                        } else if ($.isFunction(controllerInstance[action])) { //convention over configuration
                            controllerInstance[action](params);
                        } else { //there is no-matched action, call default action
                            params = params ? action + '/' + params : action;
                            controllerInstance.index(params);
                        }
                    } else {
                        //default action
                        controllerInstance.index();
                    }

                    controllerInstance.trigger('actionFinish');
                }
            },

            defaultController: function(params) {
                if (!defaultController) {
                    defaultController = new DefaultController({
                        name: 'DefaultController',
                        router: this
                    });
                }
                addToNavigationStack.call(this, defaultController);
                defaultController.trigger('actionStart');
                defaultController.index(params);
                defaultController.trigger('actionFinish');
            },

            indexController: function(params) {
                if (!indexController) {
                    indexController = new IndexController({
                        name: 'IndexController',
                        router: this
                    });
                }
                addToNavigationStack.call(this, indexController);
                indexController.trigger('actionStart');
                indexController.index(params);
                indexController.trigger('actionFinish');
            },

            /**
             * Gets the navigation route stack.
             * This could be used for work flow determination
             *
             * @return {Array}
             */
            getNavigationRouteStack: function() {
                return navigationStack;
            },

            //start the application
            start: function() {
                Backbone.history.start();
            }
        });

        function _getRouteFragment(controller, action, params) {
            var routeFragment = controller;
            if (action) {
                routeFragment += '/' + action;
            }
            if (params) {
                routeFragment += '/' + params;
            }
            return routeFragment;
        }

    });