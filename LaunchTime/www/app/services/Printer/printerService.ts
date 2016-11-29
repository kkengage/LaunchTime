/// <reference path="../../models/order.ts" />
/// <reference path="printer.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />


namespace Printer {
    // Rozszerza funckjonalność cache'a angularowego o expiry time
    export class PrinterService {

        static $inject = ['$q', 'toastr'];
        private _printer: Printer;
        private toastr: Toastr;

        constructor(private $q: angular.IQService, toastr: Toastr) {
            this._printer = new Printer();
            this.toastr = toastr;
        }

        PrinterStatus: string = "Disconnected";


        PrintOrder(order: Models.Order): angular.IPromise<string> {
            var _self = this;
            return this.$q(function (resolve, reject) {
                /// drukuj dlugo....
                try {
                    _self._printer.PrintLogo().done(() => { _self.toastr.success("Pomyślnie wydrukowano zamówienie" , "Zakończono wydruk") }).fail((msg) => { _self.toastr.error(msg, "Błąd wydruku"); });
                    //alert("PRINTINTG ORDER");
                    //resolve(true);
                } catch (ex) {
                    reject("Blad wydruku zamówienia!\r\n" + ex.toString());
                }
            });
        }

        PrintReport(order: Models.Order): angular.IPromise<string> {
            var _self = this;
            return this.$q(function (resolve, reject) {
                /// drukuj dlugo....
                try {
                    _self._printer.PrintLogo().done(() => { alert("wydrukowano") }).fail((msg) => { alert("blad wydruku logo\r\n" + msg); });
                    //alert("PRINTINTG ORDER");
                    //resolve(true);
                } catch (ex) {
                    reject("Blad wydruku zamówienia!\r\n" + ex.toString());
                }
            });
        }



    }

}

app.service('PrinterService', Printer.PrinterService);