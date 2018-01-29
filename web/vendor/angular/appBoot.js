var app = angular.module('myApp', []);

app.service("config", function () {
    // API 地址 Host
    var host = "http://" + window.location.host;
    this.DOMAIN = host;
});

app.service("mask", function () {
    this.loadingBackground = $('<div class="tiny-framework-mask"></div>');
    this.loading = $('<div class="icon-spinner6 tiny-framework-loading"></div>');
    this.show = function () {
        $('body').append(this.loadingBackground);
        $('body').append(this.loading);
    };
    this.hide = function () {
        this.loadingBackground.remove();
        this.loading.remove();
    }
});

var subRegRex = /\{\s*([^\|\}]+?)\s*(?:\|([^\}]*))?\s*\}/g;
/**
 * Restful 参数过滤
 * 如：/api/kkk/{id} 
 */
var sub = function (target, option) {
    return ((target.replace) ? target.replace(subRegRex, function (match, key) {
        return (!angular.isUndefined(option[key])) ? option[key] : match;
    }) : target);
};
var TIME_OUT = 10 * 60 * 1000;
app.service("webApi", ["$q", "$timeout", function ($q) {
    this.get = function (option) {
        var deferred = $q.defer();
        var url = !angular.isString(option.url) ? sub(option.url.target, option.url.option) : option.url;
        var $ajax = $.ajax({
            "type": "GET",
            "contentType": "application/json;charset=UTF-8",
            "timeout": option.timeout || TIME_OUT,
            "url": encodeURI(url),
            "data": JSON.stringify(option.params) || {},
            "async": option.async || true,
            "headers": {},
            "beforeSend": function (request, setting) {
                if (option.headers) {
                    for (var key in option.headers) {
                        if (option.headers.hasOwnProperty(key)) {
                            var value = option.headers[key];
                            request.setRequestHeader(key, value);
                        }
                    }
                }
                option.beforeSend && option.beforeSend(request, setting);
            },
            "complete": function () {

            }
        });
        $ajax.done(function () {
            deferred.resolve.apply(deferred, arguments);
        }).fail(function () {
            if (arguments[0].status == 403) {
                return history.go(0);
            }
            deferred.reject.apply(deferred, arguments);
        });
        return deferred.promise;
    };
    this.post = function (option) {
        var deferred = $q.defer();
        var url = !angular.isString(option.url) ? sub(option.url.target, option.url.option) : option.url;
        var $ajax = $.ajax({
            "type": "POST",
            "contentType": "application/json;charset=UTF-8",
            "timeout": option.timeout || TIME_OUT,
            "url": encodeURI(url),
            "data": JSON.stringify(option.params) || {},
            "async": option.async || true,
            "headers": {},
            "dataType": "json",
            "processData": false,
            "beforeSend": function (request, setting) {
                if (option.headers) {
                    for (var key in option.headers) {
                        if (option.headers.hasOwnProperty(key)) {
                            var value = option.headers[key];
                            request.setRequestHeader(key, value);
                        }
                    }
                }
                option.beforeSend && option.beforeSend(request, setting);
            },
            "complete": function () {

            }
        });
        $ajax.done(function () {
            deferred.resolve.apply(deferred, arguments);
        }).fail(function () {
            if (arguments[0].status == 403) {
                return history.go(0);
            }
            deferred.reject.apply(deferred, arguments);
        });
        return deferred.promise;
    };
    this.put = function (option) {
        var deferred = $q.defer();
        var url = !angular.isString(option.url) ? sub(option.url.target, option.url.option) : option.url;
        var $ajax = $.ajax({
            "type": "PUT",
            "contentType": "application/json;charset=UTF-8",
            "timeout": option.timeout || TIME_OUT,
            "url": encodeURI(url),
            "data": JSON.stringify(option.params) || {},
            "async": option.async || true,
            "headers": {},
            "beforeSend": function (request, setting) {
                if (option.headers) {
                    for (var key in option.headers) {
                        if (option.headers.hasOwnProperty(key)) {
                            var value = option.headers[key];
                            request.setRequestHeader(key, value);
                        }
                    }
                }
                option.beforeSend && option.beforeSend(request, setting);
            },
            "complete": function () {

            }
        });
        $ajax.done(function () {
            deferred.resolve.apply(deferred, arguments);
        }).fail(function () {
            if (arguments[0].status == 403) {
                return history.go(0);
            }
            deferred.reject.apply(deferred, arguments);
        });
        return deferred.promise;
    };
    this.deleter = function (option) {
        var deferred = $q.defer();
        var url = !angular.isString(option.url) ? sub(option.url.target, option.url.option) : option.url;
        var $ajax = $.ajax({
            "type": "DELETE",
            "contentType": "application/json;charset=UTF-8",
            "timeout": option.timeout || TIME_OUT,
            "url": encodeURI(url),
            "data": JSON.stringify(option.params) || {},
            "async": option.async || true,
            "headers": {},
            "beforeSend": function (request, setting) {
                if (option.headers) {
                    for (var key in option.headers) {
                        if (option.headers.hasOwnProperty(key)) {
                            var value = option.headers[key];
                            request.setRequestHeader(key, value);
                        }
                    }
                }
                option.beforeSend && option.beforeSend(request, setting);
            },
            "complete": function () {

            }
        });
        $ajax.done(function () {
            deferred.resolve.apply(deferred, arguments);
        }).fail(function () {
            if (arguments[0].status == 403) {
                return history.go(0);
            }
            deferred.reject.apply(deferred, arguments);
        });
        return deferred.promise;
    };
}]);


/**
 * 设置浏览器 cookie
 */
function setCookie(key, value) {
    document.cookie = key + '=' + encodeURIComponent(value) + ';path=/';
}

/**
 * 从浏览器 cookie 中获取指定 cookie
 */
function getCookie(key) {
    if (!document.cookie) {
        document.cookie = '';
    }
    var cookies = document.cookie.split(';');
    var cookie;
    for (var i = 0, cookieLen = cookies.length; i < cookieLen; i++) {
        cookie = cookies[i].trim().split('=');
        if (!cookie || (cookie.length < 2)) {
            continue;
        }
        if (key === cookie[0]) {
            return decodeURIComponent(cookie[1]);
        }
    }
    return undefined;
}