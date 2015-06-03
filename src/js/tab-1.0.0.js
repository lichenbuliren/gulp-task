/**
 * tab切换插件
 * @author Heaven
 * @email weirufeng@meizu.com
 * @version 1.0.0
 */
(function($){

    //默认配置对象
    var _o = {
        items: '>ul',
        item: '>li',
        item_active: 'active',
        contents: '.content',
        content_active: 'active'
    };

    var methods = {
        init: function(o){
            _o = $.extend(o, _o);
            return this.each(function (index, el) {
                var me = $(this),
                    $ul = me.find(_o.items),
                    $li = $ul.find(_o.item);
                $li.on('click',function (event) {
                    var $this = $(this),
                        index = $this.index();
                    $this.addClass(_o.item_active).siblings().removeClass(_o.item_active);
                    me.find(_o.contents).removeClass(_o.content_active).eq(index).addClass(_o.content_active);
                });
            });
        }
    };

    $.fn.tab = function(method){
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.tooltip');
        }
    }
})(jQuery);