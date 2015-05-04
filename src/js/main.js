(function($, GLOBAL, Util) {
    var SKUResult = {};
    var Main = {
        init: function() {
            if (GLOBAL.checkLogin && GLOBAL.checkLogin()) {
                window.location = GLOBAL.loginUrl;
            }
        },

        bindEvent: function() {

            // 点击切换验证码
            $('body').on('click', '.captcha', function() {
                var $img = $(this).children('img'),
                    phref = $img.attr('src');
                $img.attr('src', phref + '?' + new Date().getTime());
            });

            // M码输入验证
            $('[name="mcodeid"]').focusout(function(event) {
                var $tips = $(this).next('.tips');
                Util.isNullOrEmpty($(this).val()) ? $tips.text('请输入M码') : $tips.text('');
            });

            // 验证码输入验证
            $('[name="captcha"]').focusout(function(event) {
                var $tips = $(this).next('.tips');
                Util.isNullOrEmpty($(this).val()) ? $tips.text('请输入验证码！') : $tips.text('');
            });

            // 表单提交
            $('[rel="mcode"]').submit(function() {
                // TODO 简单验证表单数据是否正确
                var $this = $(this),
                    api = $this.data('api'),
                    mcode = $this.find('[name="mcodeid"]').val(),
                    captcha = $this.find('[name="captcha"]').val(),
                    formdata;

                if (Util.isNullOrEmpty(mcode)) {
                    // 提示文案
                    $('[name="mcodeid"]').next('.tips').text('请输入M码！');
                    return false;
                }

                if (Util.isNullOrEmpty(captcha)) {
                    $('[name="captcha"]').next('.tips').text('请输入验证码！');
                    // 提示文案
                    return false;
                }

                // TODO 序列化表表单，异步提交代码
                formdata = $this.serialize();
                $.ajax({
                    type: 'POST',
                    url: api,
                    data: formdata,
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    success: function(resp) {
                        Main.handlerResult(resp);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        // 调试时用的代码
                        $("body").append(XMLHttpRequest.responseText).css("padding", 10);
                        alert("调用远程方法时出错！");
                        return false;
                    }
                });
                return false;
            });
        },

        /**
         * 处理M码返回数据
         * @param  {[type]} resp [description]
         * @return {[type]}      [description]
         */
        handlerResult: function(resp) {
            var result = {
                "status": 200,
                "error": "验证失败",
                "mcode": {},
                "data": {
                    "goods_list": [{
                        "gid": "1170010001",
                        "name": "MX4 Pro",
                        "img_url": "http://placehold.it/278x426",
                        "acid": 1,
                        "key": "mx4-pro"
                    }, {
                        "gid": "1170010002",
                        "name": "魅蓝note",
                        "img_url": "http://placehold.it/278x426",
                        "acid": 1,
                        "key": "m1-note"
                    }],

                    "ext_list": [{
                        "eid": "1",
                        "gid": "1170010001",
                        "ext_name": "MX4 Pro联通灰色16G",
                        "market_price": "2399",
                        "price": "2199",
                        "vids": ",5,13,18,",
                        "aids": ",1,2,3,",
                        "av_data": [{
                            "aid": "1",
                            "aname": "颜色",
                            "vid": "5",
                            "value": "灰色"
                        }, {
                            "aid": "2",
                            "aname": "容量",
                            "vid": "13",
                            "value": "16G"
                        }, {
                            "aid": "3",
                            "aname": "网络制式",
                            "vid": "18",
                            "value": "联通"
                        }]
                    }, {
                        "eid": "2",
                        "gid": "1170010001",
                        "ext_name": "MX4 Pro联通灰色32G",
                        "market_price": "2399",
                        "price": "2299",
                        "vids": ",5,14,18,",
                        "aids": ",1,2,3,",
                        "av_data": [{
                            "aid": "1",
                            "aname": "颜色",
                            "vid": "5",
                            "value": "灰色"
                        }, {
                            "aid": "2",
                            "aname": "容量",
                            "vid": "14",
                            "value": "32G"
                        }, {
                            "aid": "3",
                            "aname": "网络制式",
                            "vid": "18",
                            "value": "联通"
                        }]
                    }, {
                        "eid": "3",
                        "gid": "1170010001",
                        "ext_name": "MX4 Pro联通白色16G",
                        "market_price": "2399",
                        "price": "2399",
                        "vids": ",4,13,18,",
                        "aids": ",1,2,3,",
                        "av_data": [{
                            "aid": "1",
                            "aname": "颜色",
                            "vid": "4",
                            "value": "白色"
                        }, {
                            "aid": "2",
                            "aname": "容量",
                            "vid": "13",
                            "value": "16G"
                        }, {
                            "aid": "3",
                            "aname": "网络制式",
                            "vid": "18",
                            "value": "联通"
                        }]
                    }, {
                        "eid": "4",
                        "gid": "1170010001",
                        "ext_name": "MX4 Pro联通白色32G",
                        "market_price": "2399",
                        "price": "2499",
                        "vids": ",4,14,18,",
                        "aids": ",1,2,3,",
                        "av_data": [{
                            "aid": "1",
                            "aname": "颜色",
                            "vid": "4",
                            "value": "白色"
                        }, {
                            "aid": "2",
                            "aname": "容量",
                            "vid": "14",
                            "value": "32G"
                        }, {
                            "aid": "3",
                            "aname": "网络制式",
                            "vid": "18",
                            "value": "联通"
                        }]
                    }, {
                        "eid": "5",
                        "gid": "1170010001",
                        "ext_name": "MX4 Pro电信白色32G",
                        "market_price": "2399",
                        "price": "2599",
                        "vids": ",4,14,19,",
                        "aids": ",1,2,3,",
                        "av_data": [{
                            "aid": "1",
                            "aname": "颜色",
                            "vid": "4",
                            "value": "白色"
                        }, {
                            "aid": "2",
                            "aname": "容量",
                            "vid": "14",
                            "value": "32G"
                        }, {
                            "aid": "3",
                            "aname": "网络制式",
                            "vid": "19",
                            "value": "电信"
                        }]
                    }, {
                        "eid": "1170170001",
                        "gid": "1170010002",
                        "ext_name": "魅蓝note电信白色32G",
                        "market_price": "2399",
                        "price": "2199",
                        "vids": ",4,14,19,",
                        "aids": ",1,2,3,",
                        "av_data": [{
                            "aid": "1",
                            "aname": "颜色",
                            "vid": "4",
                            "value": "白色"
                        }, {
                            "aid": "2",
                            "aname": "容量",
                            "vid": "14",
                            "value": "32G"
                        }, {
                            "aid": "3",
                            "aname": "网络制式",
                            "vid": "19",
                            "value": "电信"
                        }]
                    }, {
                        "eid": "1170170001",
                        "gid": "1170010002",
                        "ext_name": "魅蓝note电信灰色32G",
                        "market_price": "2399",
                        "price": "2199",
                        "vids": ",5,14,19,",
                        "aids": ",1,2,3,",
                        "av_data": [{
                            "aid": "1",
                            "aname": "颜色",
                            "vid": "5",
                            "value": "灰色"
                        }, {
                            "aid": "2",
                            "aname": "容量",
                            "vid": "14",
                            "value": "32G"
                        }, {
                            "aid": "3",
                            "aname": "网络制式",
                            "vid": "19",
                            "value": "电信"
                        }]
                    }]
                }
            }

            SKUResult = Main.caulateGoodsInfo(result.data);
            if (result.status == 200) {
                // TODO 移除登录界面；渲染商品列表页面
                GLOBAL.render({
                    containerId: 'goods-list',
                    templateId: 'tpl-goods-list',
                    data: SKUResult,
                    afterFn: function() {
                        // TODO隐藏登录表单，显示商品列表信息
                        $('.login-wrap').hide();
                        // 初始化默认规格属性
                        Main.bindChooseEvent();
                    }
                });
            } else if (result.status == 10010) {
                window.location = GLOBAL.loginUrl;
            } else {
                // 报错提示！
                alert(result.error);
                return false;
            }
        },

        /**
         * 规格属性选择规则
         * @return {[type]} [description]
         */
        bindChooseEvent: function() {
            // tab切换
            $('#goods-list').tab({
                item_active: 'active',
                content_active: 'active'
            });

            $('.content').on('click', '.property', function() {
                var $this = $(this),
                    $parentContent = $this.parents('.content'),
                    gid = $parentContent.data('gid'),
                    curContentIndex = $this.closest('.container').find('.content').index($parentContent),
                    sku = SKUResult[curContentIndex];

                var data = sku['data'],
                    keys = Util.getObjKeys(data),
                    curVid = $this.data('vid'),
                    curAid = $this.closest('dl').data('aid');
                var isDisabled = $this.parents('dl').hasClass('disabled');
                if (!isDisabled) {
                    $this.addClass('selected')
                        .siblings('.property')
                        .removeClass('selected');
                }
                $this.parents('dl').nextAll('dl').addClass('disabled').find('.property').removeClass('selected');
                var $nextDls = $this.parents('dl').next('dl');
                if ($nextDls.length > 0 && !isDisabled) {
                    $nextDls.removeClass('disabled');
                    // TODO 重新渲染当前属性值列表
                    // 根据当前的属性值id:curVid计算出下一级的vid数组
                    //
                    /////
                    // 点击事件，获取所有选中的vid值，用逗号','拼接，
                    // 遍历所有的keys，计算出下一级可能的组合，
                    // 如果组合大于一，渲染dom
                    // 如果等于一，选中它，同时触发它的click事件
                    /////
                    var $selectedObjs = $this.parents('dl').prevAll('dl'),
                        selectVids = sortSelectVids($selectedObjs, 'selected', [curVid]);
                    var nextVids = {};
                    for (var i = 0, keyLen = keys.length; i < keyLen; i++) {
                        var curVids = keys[i],
                            curVidArr = curVids.split(','),
                            nextVid, nextVidVal;
                        var vidStr = selectVids.join(',');
                        if (curVids.indexOf(vidStr) > 0) {
                            nextVid = curVidArr[curAid - 2];
                            nextVidVal = sku['attrList'][curAid - 1]['extList'][nextVid];
                            nextVids[nextVid] = nextVidVal;
                        }
                    }

                    var nextVidsKeys = Util.getObjKeys(nextVids);
                    var nextHtml = '';
                    // 重新渲染
                    for (vid in nextVids) {
                        nextHtml += '<div class="property" data-vid="' + vid + '">' + nextVids[vid] + '</div>';
                    }
                    $nextDls.children('dd').empty().append(nextHtml);
                }


                // 计算价格
                var selectAllVids = sortSelectVids($parentContent, 'selected');
                if (selectAllVids.length == sku.aids.length) {
                    $parentContent.find('.price').text(data[selectAllVids.join(',')].price);
                } else {
                    $parentContent.find('.price').text('');
                }
            });

            var $propParents = $('.content dl').not('.disabled');
            $propParents.on('mouseover mouseout', '.property', function(event) {
                if (event.type == 'mouseover') {
                    $(this).addClass('hover');
                } else if (event.type == 'mouseout') {
                    $(this).removeClass('hover');
                }
            });

            /**
             * 获取选定规格的价格
             * @param  {Object} data   [当前类目的规格属性数据]
             * @param  {Dom} parent [父节点]
             * @param  {String} clazz  [选择器类]
             * @param  {Array} arr [需要拼接的数组]
             * @return {[type]}        [description]
             */
            function sortSelectVids(parent, clazz, arr) {
                var $selectedObjs = parent.find('.' + clazz),
                    selectedIds = [],
                    result;
                $selectedObjs.each(function(index, el) {
                    selectedIds.push($(this).data('vid'));
                });
                if (arr) {
                    result = selectedIds.concat(arr);
                } else {
                    result = selectedIds;
                }
                result.sort(function(val1, val2) {
                    return parseInt(val1) - parseInt(val2);
                });
                return result;
            }
        },

        /**
         * 组装数据格式
         * @return {[type]} [description]
         */
        caulateGoodsInfo: function(data) {
            var result = [],
                extList = data.ext_list;
            result = data.goods_list;
            var goodsList = {};
            for (var i = 0, extLen = extList.length; i < extLen; i++) {
                var curExt = extList[i],
                    curExtGid = curExt.gid,
                    aids = Main.trimPrefixAndSuffix(curExt.aids, ','),
                    price = curExt.price,
                    vids = Main.trimPrefixAndSuffix(curExt.vids, ','),
                    props = curExt.av_data;
                goodsList[curExtGid] = goodsList[curExtGid] || {};
                goodsList[curExtGid]['aids'] = goodsList[curExtGid]['aids'] || aids.split(',').reverse();
                // 原始数据子商品组合
                goodsList[curExtGid]['data'] = goodsList[curExtGid]['data'] || {};
                goodsList[curExtGid]['data'][vids] = {
                    // TODO可能需要库存
                    'price': price
                }
                for (var j = 0, attLen = curExt.av_data.length; j < attLen; j++) {
                    var curAvdata = curExt.av_data[j],
                        curAid = curAvdata.aid,
                        curAname = curAvdata.aname,
                        curVid = curAvdata.vid,
                        curVal = curAvdata['value'];
                    goodsList[curExtGid]['attrList'] = goodsList[curExtGid]['attrList'] || {};
                    goodsList[curExtGid]['attrList'][curAid] = goodsList[curExtGid]['attrList'][curAid] || {};
                    goodsList[curExtGid]['attrList'][curAid]['aid'] = curAid;
                    goodsList[curExtGid]['attrList'][curAid]['aname'] = curAname;
                    goodsList[curExtGid]['attrList'][curAid]['extList'] = goodsList[curExtGid]['attrList'][curAid]['extList'] || {};
                    goodsList[curExtGid]['attrList'][curAid]['extList'][curVid] = curVal;
                }
            }
            for (var i = 0, goodsListLen = result.length; i < goodsListLen; i++) {
                var curGoods = result[i],
                    curGid = curGoods.gid;
                result[i]['attrList'] = goodsList[curGid]['attrList'];
                result[i]['aids'] = goodsList[curGid]['aids'];
                result[i]['data'] = goodsList[curGid]['data'];
            }
            return result;
        },

        /**
         * 清楚字符串前后缀
         * @param  {String} sourceStr [原始字符串]
         * @param  {String} str       [前后锥字符串]
         * @return {[type]}           [description]
         */
        trimPrefixAndSuffix: function(sourceStr, str) {
            return sourceStr.substring(sourceStr.indexOf(str) + 1).substring(0, sourceStr.lastIndexOf(str) - 1);
        }
    }

    $(document).ready(function() {
        Main.init();
        Main.bindEvent();
    });

})(jQuery, GLOBAL, Util);