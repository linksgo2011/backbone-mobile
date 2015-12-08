/**
 * 门店控制器 
 */
define(
    [
        'jquery',
        'underscore',
        'backbone',
        'controller/MobileController',
        'view/BaseMobileView',
        'ui',
        'text!../template/Stores/privateList.html',
        'text!../template/Stores/publicList.html',
        'text!../template/Stores/detail.html',
        'text!../template/Stores/edit.html'
    ],
    function($, _, Backbone, MobileController, BaseMobileView, ui, privateList, publicList, detail, edit) {
        return MobileController.extend({
            // 批量初始化
            initialize: function() {
                var views = {
                    privateListView: privateList,
                    publicListView: publicList,
                    detailView: detail,
                    editView: edit
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
                this.privateListView.render({});
            },
            /**
             * 私海门店
             */
            privateList: function() {
                this.privateListView.render({});

                this.privateListView.$el.on("click", ".search", function(event) {
                    $.alert("你点击了搜索!");
                });
            },
            /**
             * 公海门店列表
             */
            publicList: function() {
                this.publicListView.render({});
            },

            /**
             * 门店详情
             * @param  int store_id 门店id
             */
            detail: function(store_id) {
                this.detailView.render({});
            },

            /**
             * 编辑本店
             * @param  int store_id 门店id
             */
            edit: function(store_id) {
                this.editView.render({});
            }
        });
    }
);