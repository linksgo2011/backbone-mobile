/**
 * 订单控制器
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
        'text!../template/Orders/list.html',
    ],
    function($, _, Backbone, MobileController, BaseMobileView, ui, list) {
        return MobileController.extend({
            // 批量初始化
            initialize: function() {
                var views = {
                    listView: list
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
                this.listView.render({});
            }
        });
    }
);