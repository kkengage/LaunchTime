/// <reference path="../../models/order.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../appmain/app.ts" />
var Orders;
(function (Orders) {
    var OrdersService = (function () {
        function OrdersService($q, toastr, $http) {
            this.$q = $q;
            this.toastr = toastr;
            this.$http = $http;
        }
        OrdersService.prototype.GetNewOrders = function () {
            var _this = this;
            return this.$http.get(Configuration.ServiceLocation + "orders/new").then(function (res) {
                // utworzenie tokenu                
                return res.data.orders;
            });
        };
        OrdersService.prototype.AcceptOrder = function (id) {
            var _this = this;
            return this.$http.get(Configuration.ServiceLocation + "orders/accept/" + id).then(function (res) {
                // utworzenie tokenu                
                return res.status == 200;
            }).catch(function (reason) {
                return false;
            });
        };
        OrdersService.$inject = ['$q', 'toastr', '$http'];
        return OrdersService;
    })();
    Orders.OrdersService = OrdersService;
})(Orders || (Orders = {}));
app.service('OrdersService', Orders.OrdersService);
//# sourceMappingURL=OrdersService.js.map