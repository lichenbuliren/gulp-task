/**
 * 静态资源全局JS
 * @author heaven
 * @email weirufeng@meizu.com
 * @return {[type]}   [description]
 */
(function($, Util) {
    var GLOBAL = {
        version: '1.0.0',
        loginUrl: 'test',
        // 判断是否登录
        checkLogin: function() {
            // TODO 具体判断sessionid
            var user = Util.Cookie.get('MEIZUSESSIONVAL');
            if (user == undefined || user == "") {
                return false;
            }
            var user_arr = $.parseJSON(user);
            return user != '' && parseInt(user_arr['uid']) > 0 ? true : false;
        },
        // 获取URL参数
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) return unescape(r[2]);
            return null;
        },
        // 图片等比例缩放
        imgResize: function(objImg, maxWidth, maxHeight) {
            var img = new Image(),
                hRatio, wRatio, Ratio = 1,
                w, h;
            img.onload = function() {
                w = img.width;
                h = img.height;
                wRatio = maxWidth / w;
                hRatio = maxHeight / h;
                if (maxWidth == 0 && maxHeight == 0) {
                    Ratio = 1;
                } else if (maxWidth == 0) { //
                    if (hRatio < 1) Ratio = hRatio;
                } else if (maxHeight == 0) {
                    if (wRatio < 1) Ratio = wRatio;
                } else if (wRatio < 1 || hRatio < 1) {
                    Ratio = (wRatio <= hRatio ? wRatio : hRatio);
                }
                if (Ratio < 1) {
                    w = w * Ratio;
                    h = h * Ratio;
                }
                $(objImg).css({
                    height: h + 'px',
                    width: w + 'px',
                    margin: '-' + (h / 2) + 'px 0 0 -' + (w / 2) + 'px'
                }).fadeIn(100);
            }
            img.src = objImg.src;
        },
        // 编译模版
        compile: (function() {
            var delimiter = ['<%', '%>'];
            return function(template, data) {
                var fn = new Function("data", "var p=[];p.push('" + template.replace(/[\r\t\n]/gm, " ")
                    .split("<%")
                    .join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t")
                    .join("');")
                    .split("%>")
                    .join("p.push('")
                    .split("\r")
                    .join("\\'") + "');return p.join('');");
                return data ? fn(data) : '';
            }
        })(),
        // 渲染模版
        render: function(option) {
            var html = '',
                containerId = option.containerId,
                templateId = option.templateId,
                beforeFn = option.beforeFn,
                afterFn = option.afterFn,
                autoResize = option.autoResize || '1',
                data = option.data || {},
                container = document.getElementById(containerId),
                template = document.getElementById(templateId).innerHTML;
            // 开始渲染之前
            beforeFn && beforeFn(data);
            if (!container) {
                console.error('模板容器不能为空，请检查containerId是否有效');
                return false;
            }

            if (!template) {
                console.error('模板内容为空，请检查templateId是否有效！');
                return false;
            }

            if (Util.isEmptyObj(data)) {
                console.log('数据为空，请重试！');
                return false;
            }

            html += this.compile(template, data);
            // 渲染商品列表
            container.innerHTML = html;
            if (autoResize === '1') {
                // var imgs = container.getElementsByTagName('img');
                var imgs = $('#' + containerId + ' li.list-item img');
                for (var i = 0, len = imgs.length; i < len; i++) {
                    var img = imgs[i],
                        w = $(img).attr('width'),
                        h = $(img).attr('height');
                    this.imgResize(img, w, h);
                    $(img).removeAttr('width').removeAttr('height');
                }
            }
            // 结束回调
            afterFn && afterFn(data);
        }
    }

    window.GLOBAL = GLOBAL;
})(jQuery, Util);