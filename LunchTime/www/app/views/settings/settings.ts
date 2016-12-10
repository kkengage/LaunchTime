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
            $state.go("mainView");
        }

        $scope.cancel = function () {
            $state.go("mainView");
        }


    }
}

app.controller('settingsViewController', SettingsViewController);


app.config(function ($stateProvider) {
    $stateProvider
        .state('settingsView', {
            url: '/settings',
            templateUrl: 'app/views/settings/settings.html',
            controller: 'settingsViewController'
        });
});