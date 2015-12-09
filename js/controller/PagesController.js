/**
 * 页面控制器
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
        'text!../template/Pages/index.html',
        'text!../template/Pages/add.html',
        'text!../template/Pages/bindEvent.html',
        'text!../template/Pages/loadding.html',
        'text!../template/Pages/alert.html',
        'text!../template/Pages/actionsheet.html',
        'text!../template/Pages/modal.html',
        'text!../template/Pages/iScroll.html'
    ],
    function($, _, Backbone, MobileController, BaseMobileView, ui, index, add, bindEvent, loadding,alert,actionsheet,modal,iScroll) {
        return MobileController.extend({
            // 批量初始化
            initialize: function() {
                var views = {
                    indexView: index,
                    addView: add,
                    bindEventView: bindEvent,
                    loaddingView: loadding,
                    alertView: alert,
                    actionsheetView: actionsheet,
                    modalView: modal,
                    iScrollView: iScroll
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
            },
            add: function() {
                this.addView.render({});
            },
            bindEvent: function() {
                this.bindEventView.render({});

                this.bindEventView.$el.on("click", ".am-btn-block", function(event) {
                    $.alert("你点击了按钮!");
                });
            },
            loadding: function() {
                this.loaddingView.render({});

                this.loaddingView.$el.on("click", ".am-btn-block", function(event) {
                    $.loadingShow();
                });
            },
            alert: function() {
                this.alertView.render({});

                this.alertView.$el.on("click", ".am-btn-block", function(event) {
                    $.alert("快去github加star吧");
                });
            },
            actionsheet: function() {
                this.actionsheetView.render({});

                this.actionsheetView.$el.on("click", ".am-btn-block", function(event) {
                    $.actionSheet();
                });
            },
            modal: function() {
                this.modalView.render({});
                this.modalView.$el.on("click", ".am-btn-block", function(event) {
                    $("#no-button-modal").modal();
                });
            },
            iScroll: function() {
                this.iScrollView.render({});

                var IScroll = $.AMUI.iScroll;
                var myScroll = new IScroll('#wrapper');
            }
        });
    }
);