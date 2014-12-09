/**
 * Whosv奢圈 JSBridge
 * @author Megrez
 * @date 2014-11-26
 * @version 0.2.3
 */

// for compatible with Other Toolkits
;
(function(window, undefined) {
    var DEBUG = true;
    var UA = window.navigator.userAgent,
        // Mozilla/5.0 (Linux; U; Android 4.3; zh-cn; A0001 Build/JLS36C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
        _Android = UA.indexOf("Android") != -1,
        // Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53
        _IOS = UA.indexOf("iPhone OS") != -1,
        // WhosvBrowser
        _WHOSV_BROWSER = UA.indexOf("; WhosvBrowser/") != -1,
        Api = null,
        /**
         * 检测whosv浏览器
         * @function detectWhosvBrowserApi
         * @param  {Function} callback 真正的Api调用函数
         * @access public
         * @returns void
         * @example
         * // in anywhere after this file be loaded
         * detectWhosvBrowserApi(function(api){
         *     console.log(api.toString());
         * });
         */
        detectWhosvBrowserApi = function(callback) {
            if (typeof window.whosvBrowserInvoker === 'object' && typeof window.whosvBrowserInvoker.toString === 'function' && (DEBUG || ((_Android || _IOS) && _WHOSV_BROWSER))) {
                callback(Api);
            }
        };
    detectWhosvBrowserApi(function() {
        var invoker = window.whosvBrowserInvoker;
        /**
         * @function toString
         * @returns {String}
         */
        var toString = function() {
                return invoker.toString();
            },
            /**
             * 获取当前App的版本号
             * @function getVersionName
             * @returns {String}
             */
            getVersionName = function() {
                return invoker.getVersionName();
            },
            /**
             * 获取当前登录用户的Id
             * @function getUserId
             * @return {String}
             * @example
             * // returns 5444811777686f6e46140000
             * api.getUserId()
             */
            getUserId = function() {
                return invoker.getUserId();
            },
            /**
             * 获取当前登录用户的用户名
             * @function getUserName
             * @returns {String}
             * @example
             * //returns 小灰灰
             * api.getUserName()
             */
            getUserName = function() {
                return invoker.getUserName();
            },
            /**
             * 召唤神兽
             * @function invoke
             * @param  {String} action
             * @param  {String[]} option1
             * @param  {String[]} option2
             * @returns void
             * @example
             * // invoke native album components
             * api.invoke('album',["http://www.baidu.com/1.png"],['http://www.baidu.com/thumbnail.png'])
             */
            invoke = function(action, option1, option2) {
                return invoker.invoke(action, option1, option2);
            },
            /**
             * 从本地数据获取用户信息
             * @function getUserInfo
             * @param  {String} access_token 用户Token
             * @param {String} user_id 用户Id
             * @package {Function} callback 回调函数
             * @returns {User} 用户信息
             */
            getUserInfo = function(access_token, user_id, callback) {
                if (typeof invoker.getUserInfo === 'function') {
                    var data = invoker.getUserInfo(access_token, user_id);
                    if (typeof callback === "function") {
                        callback(data);
                    }
                }
            };
        Api = {
            toString: toString,
            getVersionName: getVersionName,
            getUserId: getUserId,
            getUserName: getUserName,
            invoke: invoke,
            getUserInfo: getUserInfo
        };
    });
    window.WhosvBrowserApi = {
        ready: detectWhosvBrowserApi
    };
})(window);