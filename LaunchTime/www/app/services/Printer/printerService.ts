/// <reference path="../../models/order.ts" />
/// <reference path="printer.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />


namespace Printer {
    // Rozszerza funckjonalność cache'a angularowego o expiry time
    export class PrinterService {

        static $inject = ['$q'];
        private _printer: Printer;

        constructor(private $q: angular.IQService) {
            alert("CONSTRUCT");
            this._printer = new Printer();
        }

        PrinterStatus: string = "Disconnected";


        PrintOrder(order: Models.Order): angular.IPromise<boolean> {            
            var _self = this;
            return this.$q(function (resolve, reject) {
                /// drukuj dlugo....
                try {
                    _self._printer.PrintText("test dzialania \r\n\n\r");
                    alert("PRINTINTG ORDER");
                    resolve(true);
                } catch (ex) {
                    alert("ZLAPANO EX: " + ex);
                    reject(false);
                }
            });
        }

    }

}

app.service('PrinterService', Printer.PrinterService);