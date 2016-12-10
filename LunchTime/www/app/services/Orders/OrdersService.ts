/// <reference path="../../models/order.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../appmain/app.ts" />


namespace Orders {

    export class OrdersService {

        static $inject = ['$q', 'toastr', '$http'];

        constructor(private $q: angular.IQService, private toastr: Toastr, private $http: angular.IHttpService) {
        }


        GetNewOrders(): angular.IPromise<Models.Order[]> {
            var _this = this;
            return this.$http.get(Configuration.ServiceLocation + "orders/new").then((res: any) => {
                // utworzenie tokenu                
                return res.data.orders;
            });
        }

        AcceptOrder(id): angular.IPromise<boolean> {
            var _this = this;
            return this.$http.get(Configuration.ServiceLocation + "orders/accept/" + id).then((res: any) => {
                // utworzenie tokenu                
                return res.status == 200;
            }).catch((reason) => {              
                return false;
            });
        }
    }
}

app.service('OrdersService', Orders.OrdersService);