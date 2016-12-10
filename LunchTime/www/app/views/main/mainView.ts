/// <reference path="../../models/order.ts" />
/// <reference path="../../models/item.ts" />
/// <reference path="../../services/printer/printer.ts" />
/// <reference path="../../services/printer/printerservice.ts" />
/// <reference path="../../appmain/app.ts" />
/// <reference path="../../authorization/services/authservice.ts" />
/// <reference path="../../services/orders/ordersservice.ts" />


class MainViewController {

    static $inject = ["$scope", "$state", "PrinterService", "AuthService", "$injector", "OrdersService"]

    constructor($scope, $state, printerService: Printer.PrinterService, authService: Authorization.AuthService, $injector, private ordersService: Orders.OrdersService) {
        $scope.txt = "EEEE";
        $scope.logged = "none";
        $scope.signal = 0;
        $scope.status = Printer.Printer.Status;
        $scope.printerStatus = printerService.PrinterStatus;
        var orders: Models.Order[] = new Array<Models.Order>();
        $scope.orders = orders;

        $scope.login = function () {
            authService.Login().then(function (val) {
                $scope.logged = val ? "zalogowany!" : "blad";
            });
        }

        $scope.test = function () {
            ordersService.GetNewOrders().then((orders: Models.Order[]) => {
                orders.forEach((o) => {               
                    $scope.orders.push(o);
                });
            });
        }

        $scope.acceptOrder = function (order) {
            ordersService.AcceptOrder(order.Id).then((resp) => {
                if (resp) {
                    order.accepted = true;
                    printerService.PrintOrder(order);
                } else {
                    alert("ODRZUCONE");
                }
            });
        }

        setInterval(() => { $scope.status = Printer.Printer.Status; }, 500);


        $scope.GetStatus = function () {
            printerService.RefreshStatus();
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

        $scope.settings = function () {
            $state.go("settings");
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