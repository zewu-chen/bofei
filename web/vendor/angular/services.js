var app = angular.module('myApp');

app.service('indexService', ["$q", "webApi", "config", function ($q, webApi, config) {

    this.loginIn = function (params) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Manager/Login",
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.getData = function () {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Badword/Count",
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.addBadWord = function (params) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Badword/AddRange",
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.getBadWord = function () {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Badword/GetAll",
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.searchBadWord = function (params, pageIndex, pageSize) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Badword/QueryPaged?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.deleteBadWord = function (param) {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Badword/Delete/" + param,
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.getMenu = function () {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Menu/GetAll",
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    // 礼物产品管理

    this.searchGift = function (pageIndex, pageSize) {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Gift/PagedQuery?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.deleteGift = function (param) {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Gift/Delete/" + param,
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.addGift = function (params) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Gift/Add",
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };


    this.editGift = function (params) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Gift/Update",
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    // 霸屏产品管理

    this.searchScreen = function (pageIndex, pageSize) {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Screen/PagedQuery?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.deleteScreen = function (param) {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Screen/Delete/" + param,
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.addScreen = function (params) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Screen/Add",
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };


    this.editScreen = function (params) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Screen/Update",
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    // 表白产品管理

    this.searchExpress = function (pageIndex, pageSize) {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Express/PagedQuery?pageIndex=" + pageIndex + "&pageSize=" + pageSize,
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.deleteExpress = function (param) {
        var deferred = $q.defer();
        var data = {};
        var postData = {
            url: config.DOMAIN + "/uat/api/Express/Delete/" + param,
            params: data
        }
        webApi.get(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };

    this.addExpress = function (params) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Express/Add",
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };


    this.editExpress = function (params) {
        var deferred = $q.defer();
        var data = params;
        var postData = {
            url: config.DOMAIN + "/uat/api/Express/Update",
            params: data
        }
        webApi.post(postData).then(function (result) {
            deferred.resolve(result);
        }, function (error) {
            deferred.reject(error.responseText);
        });
        return deferred.promise;
    };
}]);