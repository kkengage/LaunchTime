/// <reference path="../../models/order.ts" />
/// <reference path="../../models/item.ts" />
/// <reference path="../../services/printer/printer.ts" />
/// <reference path="../../services/printer/printerservice.ts" />
/// <reference path="../../appmain/app.ts" />
/// <reference path="../../authorization/services/authservice.ts" />
/// <reference path="../../services/orders/ordersservice.ts" />
var MainViewController = (function () {
    function MainViewController($scope, $state, printerService, authService, $injector, ordersService) {
        this.ordersService = ordersService;
        $scope.serverStatus = "nie połączono";
        $scope.signal = 0;
        $scope.status = Printer.Printer.Status;
        $scope.printerStatus = printerService.PrinterStatus;
        var orders = new Array();
        $scope.orders = orders;
        $scope.login = function () {
            authService.Login().then(function (val) {
                $scope.logged = val ? "zalogowany!" : "blad";
            });
        };
        $scope.getOrders = function () {
            $scope.serverStatus = "Łączenie...";
            ordersService.GetNewOrders().then(function (orders) {
                $scope.serverStatus = "OK";
                orders.forEach(function (o) {
                    $scope.orders.push(o);
                });
            });
        };
        $scope.acceptOrder = function (order) {
            ordersService.AcceptOrder(order.Id).then(function (resp) {
                if (resp) {
                    order.accepted = true;
                    printerService.PrintOrder(order);
                }
                else {
                    alert("Nie zaakceptowano");
                }
            });
        };
        setInterval(function () { $scope.getOrders(); }, 15000); // 15 sekund
        $scope.getOrders();
        $scope.GetStatus = function () {
            printerService.RefreshStatus();
        };
        //$scope.print = function () {
        //    printerService.PrintOrder(<Models.Order>{
        //        Id: "1",
        //        Date: "2016-01-01",
        //        Hour: "14:00",
        //        Accepted: true,
        //        Client: <Models.Client>{
        //            Address: "Tarnów, Brodzińskiego 17",
        //            Name: "Krzysztof K",
        //            Phone: "790-882-385"
        //        },
        //        Items: [
        //            <Models.Item>{
        //                Id: "111",
        //                Name: "CocaCola",
        //                Price: 4,
        //                Quantity: 2
        //            },
        //            <Models.Item>{
        //                Id: "222",
        //                Name: "Pizza margerita",
        //                Price: 25,
        //                Quantity: 1
        //            }
        //        ]
        //    });
        //}
        $scope.settings = function () {
            $state.go("settingsView");
        };
    }
    MainViewController.$inject = ["$scope", "$state", "PrinterService", "AuthService", "$injector", "OrdersService"];
    return MainViewController;
})();
app.controller('mainViewController', MainViewController);
app.config(function ($stateProvider) {
    $stateProvider
        .state('mainView', {
        url: '/main',
        templateUrl: 'app/views/main/mainView.html',
        controller: 'mainViewController'
    });
});
//# sourceMappingURL=mainView.js.map