/// <reference path="../../models/order.ts" />
/// <reference path="printer.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />
var Printer;
(function (Printer) {
    // Rozszerza funckjonalność cache'a angularowego o expiry time
    var PrinterService = (function () {
        function PrinterService($q) {
            this.$q = $q;
            this.PrinterStatus = "Disconnected";
            this._printer = new Printer.Printer();
        }
        PrinterService.prototype.PrintOrder = function (order) {
            var _self = this;
            return this.$q(function (resolve, reject) {
                /// drukuj dlugo....
                try {
                    _self._printer.PrintLogo().done(function () { alert("wydrukowano"); }).fail(function (msg) { alert("blad wydruku logo\r\n" + msg); });
                }
                catch (ex) {
                    reject("Blad wydruku zamówienia!\r\n" + ex.toString());
                }
            });
        };
        PrinterService.$inject = ['$q'];
        return PrinterService;
    })();
    Printer.PrinterService = PrinterService;
})(Printer || (Printer = {}));
app.service('PrinterService', Printer.PrinterService);
//# sourceMappingURL=printerService.js.map