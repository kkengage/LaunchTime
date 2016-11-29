﻿/// <reference path="../../models/order.ts" />
/// <reference path="../../models/item.ts" />
/// <reference path="../../services/printer/printer.ts" />
/// <reference path="../../services/printer/printerservice.ts" />
/// <reference path="../../appmain/app.ts" />
/// <reference path="../../authorization/services/authservice.ts" />


class MainViewController {

    static $inject = ["$scope", "PrinterService", "AuthService", "$injector"]

    constructor($scope, printerService: Printer.PrinterService, authService: Authorization.AuthService, $injector) {
        $scope.txt = "EEEE";
        $scope.logged = "none";
        $scope.signal = 0;

        $scope.printerStatus = printerService.PrinterStatus;

        $scope.login = function () {
            authService.Login().then(function (val) {
                $scope.logged = val ? "zalogowany!" : "blad";
            });
        }

        $scope.test = function () {            
            var http: angular.IHttpService = $injector.get("$http");
            return http.get(Configuration.ServiceLocation + "orders/new").success((res: any) => {
                // utworzenie tokenu               
                alert(res);
                return true;
            }).error((msg) => alert("blad http: " + msg));
        }

       
        $scope.print = function () {
            printerService.PrintOrder(<Models.Order>{
                Id: "1",
                Date: "2016-01-01",
                Hour: "14:00",
                Accepted: true,
                Client: <Models.Client>{
                    Address: "Tarnów, Brodzińskiego 17",
                    Name: "Krzysztof K",
                    Phone: "790-882-385"
                },
                Items: [
                    <Models.Item>{
                        Id: "111",
                        Name: "CocaCola",
                        Price: 4,
                        Quantity: 2
                    },
                    <Models.Item>{
                        Id: "222",
                        Name: "Pizza margerita",
                        Price: 25,
                        Quantity: 1
                    }
                ]
            });
        }


    }
}

app.controller('mainViewController', MainViewController);


app.config(function ($stateProvider) {
    $stateProvider
        .state('mainView', {
            url: '/main',
            templateUrl: 'app/views/main/mainView.html',
            controller: 'mainViewController'
        });
});