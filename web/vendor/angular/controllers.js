var app = angular.module('myApp');

app.controller('indexCtrl', ["$scope", "indexService",
    function ($scope, service) {

        $scope.login = {
            flag: false,
            userName: "",
            password: "",
            showInfo: false,
            check: function () {
                if (getCookie("token")) {
                    $scope.login.flag = true;
                }
            },
            loginIn: function () {
                var params = {
                    "account": $scope.login.userName,
                    "password": $scope.login.password,
                };
                service.loginIn(params).then(function (result) {
                    if (!result.code && result.data.manager && result.data.token) {
                        $scope.menuList.items = result.data.menuList;
                        $scope.login.flag = true;
                        $scope.login.showInfo = false;
                    } else {
                        $scope.login.showInfo = true;
                    }
                });
            },
            loginOut: function () {
                setCookie("token", "");
                $scope.login.flag = false;
            },
        };


        $scope.menuList = {
            items: [],
            title: "首页",
            url: "include/index.html",
            onClick: function (id) {
                var _this = this;
                var temp = _this.items.filter(function (e) {
                    return e.id == id;
                });
                if (temp && temp.length) {
                    _this.title = temp[0].name;
                    _this.url = "include/" + temp[0].url;
                }
            },
            init: function () {
                service.getMenu().then(function (result) {
                    $scope.menuList.items = result.data;
                });
            },
        };
    }
]);

app.controller('badWordCtrl', ["$scope", "indexService",
    function ($scope, service) {
        $scope.badWord = {
            data: [],
            searchWord: "",
            checkedId: "",
            update: function () {
                var param = $scope.badWord.searchWord ? {
                        "keyword": $scope.badWord.searchWord
                    } : "",
                    pageIndex = $scope.paginationConf.currentPage,
                    pageSize = $scope.paginationConf.itemsPerPage;;
                service.searchBadWord(param, pageIndex, pageSize).then(function (result) {
                    for (var key in result.data.list) {
                        result.data.list[key].check = false;
                    }
                    $scope.badWord.data = result.data.list;
                    $scope.paginationConf.totalItems = result.data.total;
                });
            },
            itemCheck: function (id) {
                var _this = this;
                _this.checkedId = id;
            },
            newBadWord: "",
            addBadWord: function () {
                var _this = this;
                if (_this.newBadWord) {
                    var params = [],
                        data = _this.newBadWord.split(",");
                    for (var key in data) {
                        params.push({
                            "word": data[key]
                        });
                    }
                    service.addBadWord(params).then(function (result) {
                        if (!result.code) {
                            $scope.badWord.newBadWord = "";
                            $scope.badWord.update();
                            $('#addBadWord').modal('hide')
                        }
                    });
                }
            },
            deleteBadWord: function () {
                var _this = this;
                service.deleteBadWord(_this.checkedId).then(function (result) {
                    if (!result.code) {
                        $scope.badWord.update();
                    }
                });
            },
        };

        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 30,
        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function () {
            $scope.badWord.update()
        });
    }
]);

app.controller('screenCtrl', ["$scope", "indexService",
    function ($scope, service) {
        $scope.screen = {
            isEdit: false,
            data: [],
            checkedId: "",
            itemCheck: function (id) {
                var _this = this;
                if (_this.checkedId == id) {
                    _this.checkedId = "";
                    return
                }
                _this.checkedId = id;
            },
            update: function () {
                var pageIndex = $scope.paginationConf.currentPage,
                    pageSize = $scope.paginationConf.itemsPerPage;
                service.searchScreen(pageIndex, pageSize).then(function (result) {
                    $scope.screen.data = result.data.list;
                    $scope.paginationConf.totalItems = result.data.total;
                });
            },
            add: function () {
                var _this = this;
                _this.isEdit = false;
                $scope.form = {};
                $('#addScreen').modal('show');
            },
            edit: function () {
                var _this = this;
                _this.isEdit = true;
                if (_this.checkedId) {
                    var temp = _this.data.filter(function (e) {
                        return e.id == _this.checkedId;
                    });
                    if (temp && temp.length) {
                        $scope.form = temp[0];
                        $('#addScreen').modal('show');
                    }
                }
            },
            delete: function () {
                var _this = this;
                if (_this.checkedId) {
                    service.deleteScreen(_this.checkedId).then(function (result) {
                        if (!result.code) {
                            $scope.screen.update();
                        }
                    });
                }
            },
            addOrEdit: function () {
                var _this = this;
                var func = _this.isEdit ? "editScreen" : "addScreen";
                service[func]($scope.form).then(function (result) {
                    if (!result.code) {
                        $scope.screen.update();
                        $('#addScreen').modal('hide');
                    }
                });
            },
        };

        $scope.form = {
            // "id": "907d0146-f67a-49dc-b534-64dfaa403802",
            // "editor": "sa",
            // "editDate": "2017-11-27 00:37:00",
            // "name": "元旦快乐",
            // "sort": 1,
            // "imageCount": 3,
            // "icon": "http://bpfiles.oss-cn-shenzhen.aliyuncs.com/screen/newyear/logo.png",
            // "startMovie": "http://bpfiles.oss-cn-shenzhen.aliyuncs.com/screen/newyear/start.webm",
            // "bgMovie": "http://bpfiles.oss-cn-shenzhen.aliyuncs.com/screen/newyear/bg.webm"
        };

        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 5,
            totalItems: 0,
        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function () {
            $scope.screen.update()
        });
    }
]);

app.controller('giftCtrl', ["$scope", "indexService",
    function ($scope, service) {
        $scope.gift = {
            isEdit: false,
            data: [],
            checkedId: "",
            itemCheck: function (id) {
                var _this = this;
                if (_this.checkedId == id) {
                    _this.checkedId = "";
                    return
                }
                _this.checkedId = id;
            },
            update: function () {
                var pageIndex = $scope.paginationConf.currentPage,
                    pageSize = $scope.paginationConf.itemsPerPage;
                service.searchGift(pageIndex, pageSize).then(function (result) {
                    $scope.gift.data = result.data.list;
                    $scope.paginationConf.totalItems = result.data.total;
                });
            },
            add: function () {
                var _this = this;
                _this.isEdit = false;
                $scope.form = {};
                $('#addGift').modal('show');
            },
            edit: function () {
                var _this = this;
                _this.isEdit = true;
                if (_this.checkedId) {
                    var temp = _this.data.filter(function (e) {
                        return e.id == _this.checkedId;
                    });
                    if (temp && temp.length) {
                        $scope.form = temp[0];
                        $('#addGift').modal('show');
                    }
                }
            },
            delete: function () {
                var _this = this;
                if (_this.checkedId) {
                    service.deleteGift(_this.checkedId).then(function (result) {
                        if (!result.code) {
                            $scope.gift.update();
                        }
                    });
                }
            },
            addOrEdit: function () {
                var _this = this;
                var func = _this.isEdit ? "editGift" : "addGift";
                service[func]($scope.form).then(function (result) {
                    if (!result.code) {
                        $scope.gift.update();
                        $('#addGift').modal('hide');
                    }
                });
            },
        };

        $scope.form = {
            // "name": "",
            // "icon": "",
            // "price": null,
            // "sort": null,
            // "defaultText": ""
        };

        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 5,
            totalItems: 0,
        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function () {
            $scope.gift.update()
        });
    }
]);

app.controller('expressCtrl', ["$scope", "indexService",
    function ($scope, service) {
        $scope.express = {
            isEdit: false,
            data: [],
            checkedId: "",
            itemCheck: function (id) {
                var _this = this;
                if (_this.checkedId == id) {
                    _this.checkedId = "";
                    return
                }
                _this.checkedId = id;
            },
            update: function () {
                var pageIndex = $scope.paginationConf.currentPage,
                    pageSize = $scope.paginationConf.itemsPerPage;
                service.searchExpress(pageIndex, pageSize).then(function (result) {
                    $scope.express.data = result.data.list;
                    $scope.paginationConf.totalItems = result.data.total;
                });
            },
            add: function () {
                var _this = this;
                _this.isEdit = false;
                $scope.form = {};
                $('#addExpress').modal('show');
            },
            edit: function () {
                var _this = this;
                _this.isEdit = true;
                if (_this.checkedId) {
                    var temp = _this.data.filter(function (e) {
                        return e.id == _this.checkedId;
                    });
                    if (temp && temp.length) {
                        $scope.form = temp[0];
                        $('#addExpress').modal('show');
                    }
                }
            },
            delete: function () {
                var _this = this;
                if (_this.checkedId) {
                    service.deleteExpress(_this.checkedId).then(function (result) {
                        if (!result.code) {
                            $scope.express.update();
                        }
                    });
                }
            },
            addOrEdit: function () {
                var _this = this;
                var func = _this.isEdit ? "editExpress" : "addExpress";
                service[func]($scope.form).then(function (result) {
                    if (!result.code) {
                        $scope.express.update();
                        $('#addExpress').modal('hide');
                    }
                });
            },
        };

        $scope.form = {
            // "name": "",
            // "icon": "",
            // "price": null,
            // "sort": null,
            // "defaultText": ""
        };

        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 5,
            totalItems: 0,
        };

        /***************************************************************
        当页码和页面记录数发生变化时监控后台查询
        如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
        ***************************************************************/
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', function () {
            $scope.express.update()
        });
    }
]);