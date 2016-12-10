/// <reference path="../../models/order.ts" />
/// <reference path="../../models/item.ts" />
/// <reference path="../../services/printer/printer.ts" />
/// <reference path="../../services/printer/printerservice.ts" />
/// <reference path="../../appmain/app.ts" />
/// <reference path="../../authorization/services/authservice.ts" />
/// <reference path="../../services/orders/ordersservice.ts" />


class SettingsViewController {

    static $inject = ["$scope", "$state"]

    constructor($scope, $state) {
       
        $scope.save = function () {
            $state.go("main");
        }

        $scope.cancel = function () {
            $state.go("main");
        }


    }
}

app.controller('settingsViewController', MainViewController);


app.config(function ($stateProvider) {
    $stateProvider
        .state('settingsView', {
            url: '/settings',
            templateUrl: 'app/views/main/settings.html',
            controller: 'settingsViewController'
        });
});