/// <reference path="../../models/order.ts" />
/// <reference path="../../helpers/using.ts" />
/// <reference path="../../../../typings/serial/serial.d.ts" />
var Printer;
(function (Printer_1) {
    // Rozszerza funckjonalność cache'a angularowego o expiry time
    var Printer = (function () {
        function Printer() {
            this._self = this;
            this.logo = "1D2A680100000000000000000000000000000103070F1F3F7F7FFFFEFEFCF8F8F0F0E0E0C0C08080800000000000000000000000000000000000000000010101030202868484C4C6E2E2F3F1F8F8FCFEFEFF7F7F3F1F0F0703010000000000000000000000000000000000001D2F03";
            this.nr = 0;
        }
        Printer.prototype.printer = function () {
            var deffered = $.Deferred();
            if (!Printer.IsOpen) {
                serial.requestPermission({}, function () {
                    Printer.HasPremission = true;
                    serial.open({}, function () { Printer.IsOpen = true; deffered.resolve(serial); }, function (msg) { alert("nie udało sie połączyć do drukarki: " + msg); deffered.reject(); });
                }, function (msg) {
                    alert("no premission: " + msg);
                    deffered.reject();
                });
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
            var deffered = $.Deferred();
            try {
                var _self = this;
                this.printer()
                    .done(function (printer) {
                    _self.printt(printer, deffered);
                })
                    .fail(function (msg) { alert("permision failed " + msg); });
            }
            catch (ex) {
                alert("ERRR: " + ex);
            }
            return deffered;
        };
        //function(printer) {
        //    printer.write("Testb \r\n", function () { }, function (msg) { alert("lipa: " + msg); });
        //}
        Printer.prototype.printt = function (printer, q) {
            var t = this.logo.substring(this.nr, this.nr + 2);
            this.nr = this.nr + 2;
            var _self = this;
            printer.write(this.hex2a(t), function () {
                if (_self.nr < _self.logo.length - 1) {
                    _self.printt(printer, q);
                }
                else {
                    q.resolve();
                    return;
                }
            }, function (msg) { alert("lipa: " + msg); });
        };
        Printer.prototype.hex2a = function (hexx) {
            var hex = hexx.toString(); //force conversion
            var str = '';
            for (var i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            return str;
        };
        Printer.prototype.dispose = function () {
        };
        return Printer;
    })();
    Printer_1.Printer = Printer;
})(Printer || (Printer = {}));
//# sourceMappingURL=Printer.js.map