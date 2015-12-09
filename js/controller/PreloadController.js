/**
 * 预加载控制器
 * @author ln 
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'controller/MobileController',
        'view/BaseMobileView',
        'ui',
        'text!../template/Preload/index.html'
    ],
    function($, _, Backbone, MobileController, BaseMobileView, ui, index) {
        return MobileController.extend({
            // 批量初始化
            initialize: function() {
                var views = {
                    indexView: index
                };
                $.each(views, $.proxy(function(key,tpl){
                    this[key] = new BaseMobileView({
                        $container: $('body'),
                        appendable: true,
                        controller: this,
                        textTemplate: tpl
                    });
                },this));
            },
            index: function() {
                this.indexView.render({});
            }
        });
    }
);