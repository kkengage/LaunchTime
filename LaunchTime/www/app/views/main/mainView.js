var MainViewController = (function () {
    function MainViewController($scope, printerService) {
        alert("CREATING SERVICE");
        $scope.txt = "EEEE";
        $scope.printerStatus = printerService.PrinterStatus;
        $scope.print = function () {
            printerService.PrintOrder({
                Id: "1",
                Date: "2016-01-10",
                Accepted: true,
                Client: {
                    Address: "Tarnów, Brodzińskiego 17",
                    Name: "Krzysztof K",
                    Phone: "790-882-385"
                },
                Items: [
                    {
                        Id: "111",
                        Name: "CocaCola",
                        Price: 4,
                        Quantity: 2
                    },
                    {
                        Id: "222",
                        Name: "Pizza margerita",
                        Price: 25,
                        Quantity: 1
                    }
                ]
            });
        };
    }
    MainViewController.$inject = ["$scope", "PrinterService"];
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