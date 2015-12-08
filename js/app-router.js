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
 * The router for application defining, should define on router.controllers attributes
 *
 * and can override default behavior on router#defaultController and router#indexController
 */

define(
    [
        'underscore',
        'backbone',
        'router'
    ],
    function(_, Backbone, Router) {
        return Router.extend({

            //别名映射
            controllers: {
                'pages-and-dialogs': 'PagesAndDialogs',
                'toolbars': 'Toolbars',
                'buttons': 'Buttons'
            },

            controllerFlow: {
                name: 'IndexController',
                children: [{
                    name: 'PagesAndDialogsController'
                }, {
                    name: 'ToolbarsController'
                }, {
                    name: 'ButtonsController'
                }]
            }
        });
    }
);