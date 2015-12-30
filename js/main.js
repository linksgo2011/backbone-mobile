
(function() {
    'use strict';

    var root = this,
        require = root.require;

    //fake 'has' if it's not available
    var has = root.has = root.has || function() {
        return false;
    };

    // Require.js allows us to configure shortcut alias
    require.config({
        paths: {
            'domReady': 'lib/require/plugins/domReady-2.0.1',
            'text': 'lib/require/plugins/text-2.0.3',
            'jquery': 'lib/jquery/jquery-2.1.4',
            'underscore': 'lib/underscore/underscore-1.4.2',
            'backbone': 'lib/backbone/backbone-0.9.2',
            'Backbone.ModelBinder': 'lib/backbone/plugins/Backbone.ModelBinder-0.1.5',
            'jquery.log': 'lib/jquery/plugins/jquery.log-0.1.0',
            'ui': 'lib/amazeui.min'
        },

        waitSeconds: has('prod') ? 2000 : 30, //2000 seconds for prod mode on bootstrap and 2 seconds for dev mode
        shim: {

            json2: {
                exports: 'JSON'
            },

            underscore: {
                exports: '_'
            },

            'jquery.log': {
                deps: [
                    'jquery'
                ],
                exports: 'jQuery.log'
            },

            backbone: {
                deps: [
                    'underscore',
                    'jquery'
                ],
                exports: 'Backbone'
            },

            'Backbone.ModelBinder': {
                deps: ['backbone'],
                exports: 'Backbone.ModelBinder'
            }
        }
    });

    //this requires dom ready to update on ui, so this function expression
    //will be implemented later when domReady.
    var updateModuleProgress = function(context, map, depMaps) {
        //when dom is not ready, do something more useful?
        var console = root.console;
        if (console && console.log) {
            console.log('loading: ' + map.name + ' at ' + map.url);
        }
    };

    require.onResourceLoad = function(context, map, depMaps) {
        updateModuleProgress(context, map, depMaps);
    };

    require(['domReady'], function(domReady) {
        domReady(function() {
            //re-implement updateModuleProgress here for domReady
            updateModuleProgress = function(context, map, depMaps) {
                var document = root.document;
                var loadingStatusEl = document.getElementById('loading-status');
            };
        });
    });

    require(
        [
            'jquery',
            'jquery.log',
            'transitions',
            'backbone',
            'Backbone.ModelBinder',
            'utils'
        ],
        function($) {

            //if it's prod mode, set log level to 'info'
            if (has('prod')) {
                $.log.setLevel($.log.LEVEL.INFO);
            }

            //boot the application
            require(['app'], function(app) {
                app.initialize();
            });
        }
    );

}).call(this);