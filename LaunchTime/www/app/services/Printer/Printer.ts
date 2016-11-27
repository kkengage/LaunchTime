/// <reference path="../../models/order.ts" />
/// <reference path="../../helpers/using.ts" />
/// <reference path="../../../../typings/serial/serial.d.ts" />

namespace Printer {
    declare var serial;

    // Rozszerza funckjonalność cache'a angularowego o expiry time
    export class Printer implements D.IDisposable {

        constructor() { }

        private static HasPremission: boolean;
        private static IsOpen: boolean;

        private printer(): JQueryPromise<Serial> {
            var deffered = $.Deferred<Serial>();
            var _self = this;

            if (!Printer.IsOpen) {
                (<Serial>serial).requestPermission({}, function () {
                    Printer.HasPremission = true;
                    serial.open({}, function () { Printer.IsOpen = true; deffered.resolve(serial); }, function (msg) { alert("nie udało sie połączyć do drukarki: " + msg); deffered.reject(); });
                }, function () {
                    deffered.reject();
                });

                alert("pozniej");
            } else {
                deffered.resolve(serial);
            }

            return deffered.promise();
        }

        Close(): JQueryPromise<boolean> {
            var deffered = $.Deferred<boolean>();
            var _self = this;

            if (Printer.HasPremission) {
                if (Printer.IsOpen) {
                    try {
                        (<Serial>serial).close(function () { Printer.IsOpen = false; deffered.resolve(true); }, function () { deffered.reject(); });
                    } catch (ex) { deffered.reject(); }
                } else {
                    deffered.resolve(true);

                }
            } else {
                deffered.resolve(true);
            }
            return deffered.promise();
        }

        Restart(): JQueryPromise<Serial> {
            var deffered = $.Deferred<Serial>();
            var _self = this;
            this.Close()
                .done(function () {
                    return this.printer();
                })
                .fail(function () { deffered.reject(); });
            return deffered.promise();
        }


        PrintText(msg: string) {
            try {
                this.printer()
                    .done(function (printer) {                                                   
                            printer.write(msg, function () { }, function () { alert("dupa"); });                       
                    })
                    .fail(function () { alert("permision failed"); });
            } catch (ex) {
                alert("ERRR: " + ex);
            }
        }

        dispose() {

        }
    }
}