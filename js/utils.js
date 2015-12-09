/**
 * 工具类
 * @author ln
 */

define(['jquery'], function($) {

    $.extend({
        alert: function(str, option) {
            var $el = $("#alert-modal");
            $el.find(".am-modal-bd").html(str);
            $("#alert-modal").modal(option);
        },
        loadingShow: function(str) {
            var $el = $("#loadding-modal");
            $("#loadding-modal").modal({
                closeViaDimmer:false
            });
        },
        loadingHide: function() {
            var $el = $("#loadding-modal");
            $("#loadding-modal").modal('close');
        },
        actionSheet:function(option){
            var $el = $("#actionsheet-modal");
            $el.modal(option);
            return $el;
        }
    });
});