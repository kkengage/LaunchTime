/// <reference path="../../models/order.ts" />
/// <reference path="../../helpers/using.ts" />
/// <reference path="../../../../typings/serial/serial.d.ts" />
var Printer;
(function (Printer_1) {
    // Rozszerza funckjonalność cache'a angularowego o expiry time
    var Printer = (function () {
        function Printer() {
        }
        Printer.prototype.printer = function () {
            var deffered = $.Deferred();
            var _self = this;
            if (!Printer.IsOpen) {
                serial.requestPermission({}, function () {
                    Printer.HasPremission = true;
                    serial.open({}, function () { Printer.IsOpen = true; deffered.resolve(serial); }, function (msg) { alert("nie udało sie połączyć do drukarki: " + msg); deffered.reject(); });
                }, function () {
                    deffered.reject();
                });
                alert("pozniej");
            }
            else {
                deffered.resolve(serial);
            }
            return deffered.promise();
        };
        Printer.prototype.Close = function () {
            var deffered = $.Deferred();
            var _self = this;
            if (Printer.HasPremission) {
                if (Printer.IsOpen) {
                    try {
                        serial.close(function () { Printer.IsOpen = false; deffered.resolve(true); }, function () { deffered.reject(); });
                    }
                    catch (ex) {
                        deffered.reject();
                    }
                }
                else {
                    deffered.resolve(true);
                }
            }
            else {
                deffered.resolve(true);
            }
            return deffered.promise();
        };
        Printer.prototype.Restart = function () {
            var deffered = $.Deferred();
            var _self = this;
            this.Close()
                .done(function () {
                return this.printer();
            })
                .fail(function () { deffered.reject(); });
            return deffered.promise();
        };
        Printer.prototype.PrintText = function (msg) {
            try {
                this.printer()
                    .done(function (printer) {
                    printer.write(msg, function () { }, function () { alert("dupa"); });
                })
                    .fail(function () { alert("permision failed"); });
            }
            catch (ex) {
                alert("ERRR: " + ex);
            }
        };
        Printer.prototype.dispose = function () {
        };
        return Printer;
    })();
    Printer_1.Printer = Printer;
})(Printer || (Printer = {}));
//# sourceMappingURL=Printer.js.map