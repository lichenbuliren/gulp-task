/**
 * 全局的工具类
 * @type {Object}
 */
(function(window, document) {
    var Util = {
        // Cookie操作
        Cookie: {
            set: function(key, val, h) {
                var expires = '';
                if (h) {
                    var date = new Date();
                    date.setTime(date.getTime() + (h * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                } else {
                    expires = '';
                }
                document.cookie = key + "=" + val + expires + "; domain=.meizu.com;path=/";
            },
            get: function(key) {
                var n = key + '=';
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') {
                        c = c.substring(1, c.length);
                    }
                    if (c.indexOf(n) == 0) {
                        return c.substring(n.length, c.length);
                    }
                }
                return null;
            },
            remove: function(key) {
                this.set(key, '', -1);
            }
        },

        /**
         * 是否为空，为Null,""," "和多个空格时返回true
         * @param  {[type]}  str [description]
         * @return {Boolean}     [description]
         */
        isNullOrEmpty: function(str) {
            if (str == null || str == "undefined") return true;
            return /^\s*$/.test(str);

        },

        /**
         * 判断对象是否为空
         * @param  {[type]}  obj [description]
         * @return {Boolean}     [description]
         */
        isEmptyObj: function(obj) {
            for (var p in obj) {
                return false;
            }
            return true;
        },

        /**
         * 获取对象keys
         * @param  {Object} obj [js对象]
         * @return {[type]}     [description]
         */
        getObjKeys: function(obj) {
            if (obj !== Object(obj)) throw new TypeError('Invalid object');
            var keys = [];
            for (var key in obj)
                if (Object.prototype.hasOwnProperty.call(obj, key))
                    keys[keys.length] = key;
            return keys;
        },

        /**
         * 从数组中生成所有的数据组合
         * 例如：[1,2,3] => [1,2,3,12,13,23];
         * @param  {Array} aData [原始组合数组]
         * @return {[type]}       [description]
         */
        combInArray: function(aData) {
            if (!aData || !aData.length) {
                return [];
            }

            var len = aData.length;
            var aResult = [];

            for (var n = 1; n < len; n++) {
                var aaFlags = Util.getCombFlags(len, n);
                while (aaFlags.length) {
                    var aFlag = aaFlags.shift();
                    var aComb = [];
                    for (var i = 0; i < len; i++) {
                        aFlag[i] && aComb.push(aData[i]);
                    }
                    aResult.push(aComb);
                }
            }

            return aResult;
        },

        /**
         * 得到从 m 元素中取 n 元素的所有组合
         * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
         */
        getCombFlags: function(m, n) {
            if (!n || n < 1) {
                return [];
            }

            var aResult = [];
            var aFlag = [];
            var bNext = true;
            var i, j, iCnt1;

            for (i = 0; i < m; i++) {
                aFlag[i] = i < n ? 1 : 0;
            }

            aResult.push(aFlag.concat());

            while (bNext) {
                iCnt1 = 0;
                for (i = 0; i < m - 1; i++) {
                    if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
                        for (j = 0; j < i; j++) {
                            aFlag[j] = j < iCnt1 ? 1 : 0;
                        }
                        aFlag[i] = 0;
                        aFlag[i + 1] = 1;
                        var aTmp = aFlag.concat();
                        aResult.push(aTmp);
                        if (aTmp.slice(-n).join("").indexOf('0') == -1) {
                            bNext = false;
                        }
                        break;
                    }
                    aFlag[i] == 1 && iCnt1++;
                }
            }
            return aResult;
        }
    }
    window.Util = Util;
})(window, document);