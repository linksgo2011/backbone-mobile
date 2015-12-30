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
            //别名映射，路由和真实JS文件
            controllers: {
                // 'buttons': 'Buttons' url 使用buttons 会调用ButtonsController 控制器
            },
            /**
             * 控制器预加载
             */
            preLoadControllers: ['controller/PreloadController'],
            controllerFlow: {
                name: 'IndexController',
                children: [{
                    name: 'PagesController'
                }]
            }
        });
    }
);