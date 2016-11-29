/// <reference path="../../models/order.ts" />
/// <reference path="../../helpers/using.ts" />
/// <reference path="../../../../typings/serial/serial.d.ts" />
var Printer;
(function (Printer_1) {
    // Rozszerza funckjonalność cache'a angularowego o expiry time
    var Printer = (function () {
        function Printer() {
            this._self = this;
            this.logo = "1D2A0D0100000000000000000000000000000000000000000000000001030307070F0F1F1F1F3F3F3F3F7F7F7F7E7EFEFEFEFEFEFEFCFCFEFEFEFEFEFE7E7E7F7F7F3F3F3F3F1F1F1F0F0F0707030301000000000000000000000000000000000000000000000000000000001D2F001D2A0D0100000000000000000000000000000103070F1F3F7F7FFFFEFEFCF8F8F0F0E0E0C0C08080800000000000000000000000000000000000000000010101030202868484C4C6E2E2F3F1F8F8FCFEFEFF7F7F3F1F0F0703010000000000000000000000000000000000001D2F001D2A0D010000000000000001030F1F3F7FFFFFFEFCF8F0E0C08000000000000000010101030202020404040C08080810101030202060404040808080800000000000000000000000010300008060381F070180C0E0F0F8FCFEFFFF7F3F1F0F030000000000000000000000001D2F001D2A0D0100000001071F7FFFFFFFFFFCF0C3860C181010202020604040C08080800000000000000001010000010303010000040F0F0000010F1F1C3830381C1C0000F0FF3F0F0C1CFCF8FF1F03000000E0FE3F07000000000080C0F0FCFFFFFFFF7F1F0701000000000000001D2F001D2A0D0100033FFFFFFFFFFFF8C0001CE3000000000000040F0F000000000000203E3F0F010000C0F8FF7F00E0FEFFFFF078389CFEFF1FC2F0F8381C0C0C1CF8F8E00080E0E02000000000C0800000000000E0FC7F070000000000000000C0F0FFFFFFFFFF3F0700000000001D2F001D2A0D011FFFFFFFFFFFFF8000000000C03C070000000000C0F8FE1F06060E0C0C0CC0F0F078383979F0E1030303C1C080030F0F0F0F0300383F3F736363E347070000000000000000000000000000000000000080F8FF1F010000000000000080FFFFFFFFFFFF1F000000001D2F001D2A0D01FFFFFFFFFFFF1F0000000000000080F00F010000000018183838383F7F6360600000E0FCFF1F01F0FEFFF7F0F8F8F0C0C0FEFE3E0080F8FC1C181818383031030307070707070F3E7F7EF8F0F0E0E0C0C0C0C0E0E03000000000000000FFFFFFFFFFFFFF000000001D2F001D2A0D0100F8FFFFFFFFFF3F030000000000000000F01E030000000000000080F8FC380001010100C0E0E00303C0C080000000000000000000000000000000017FFFFFF0E0C080000000000000000000000000000000000000000000000000013FFFFFFFFFFFFC00000000001D2F001D2A0D01000080F0FCFFFFFFFF7F1F0701000000000000C03C070000000000000060FCFFFFCFCEECFC780080F0FF1F03030306060600000000071F3F7FFCF0E0E0C0C000000000000000000000000000000000000000000000000001071F7FFFFFFFFFFCF0800000000000001D2F001D2A0D01000000000000C0F0F8FEFFFFFF7F3F0F070301000080F00E01000000303000C0F0F070000000000000008000000000000000010101C3F3FF0F0301000000000000000000000000000000000000000000000103070F3F7FFFFFFFFEF8E0C0000000000000000000001D2F001D2A0D01000000000000000000000080C0E0F0F8FCFEFFFF7F3F1F0F8F4723331109080C0C0E0E0E1E1E1C3C3C383878787070F0F0E0E0E0C0C0C080808080000000000000000000000001010303070F0F1F3F7FFFFFFEFCF8F0E0C0800000000000000000000000000000001D2F001D2A0D01000000000000000000000000000000000000008080C0E0F0F0F8F8FCFCFEFEFF7F7F3F3F3F1F1F1F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F1F1F1F3F3F3F7F7FFFFEFEFCFCF8F8F0F0E0C0808000000000000000000000000000000000000000000000001D2F001D2A0D010000000000000000000000000000000000000000000000000000000000000000000000808080C0C0C0C0E0E0E0E0E0E0E0E0E0E0E0E0E0E0E0E0C0C0C0C08080800000000000000000000000000000000000000000000000000000000000000000000000000000001D2F00";
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
            this.nr = 0;
            this.qDef = deffered;
            try {
                var _self = this;
                this.printer()
                    .done(function (printer) {
                    _self.prnt = printer;
                    _self.printt();
                })
                    .fail(function (msg) { alert("permision failed " + msg); });
            }
            catch (ex) {
                alert("ERRR: " + ex);
            }
            return deffered;
        };
        Printer.prototype.printt = function () {
            var _this = this;
            var t = this.logo.substring(this.nr, this.nr + 52);
            this.nr = this.nr + 52;
            var _self = this;
            this.prnt.writeHex(t, function () { return _this.writeHexSuccess(_self); }, this.error);
        };
        Printer.prototype.error = function (msg) {
            alert("lipa: " + msg);
        };
        Printer.prototype.writeHexSuccess = function (self) {
            try {
                if (self.nr < self.logo.length - 1) {
                    self.printt();
                }
                else {
                    self.qDef.resolve();
                    alert("koniec");
                }
            }
            catch (ex) {
                alert(ex);
            }
        };
        Printer.prototype.dispose = function () {
        };
        return Printer;
    })();
    Printer_1.Printer = Printer;
})(Printer || (Printer = {}));
//# sourceMappingURL=Printer.js.map