/// <reference path="../../models/order.ts" />
/// <reference path="printer.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../appmain/app.ts" />
var Printer;
(function (Printer) {
    var PrinterService = (function () {
        function PrinterService($q, toastr) {
            this.$q = $q;
            this.PrinterStatus = "Disconnected";
            this._printer = new Printer.Printer();
            this.toastr = toastr;
        }
        PrinterService.prototype.RefreshStatus = function () {
            var _self = this;
            var print = this._printer;
            return this.$q(function (resolve, reject) {
                print.RefreshStatus().done(function () { })
                    .fail(function (msg) { return _self.toastr.success(msg, "Błąd statusu"); });
            });
        };
        PrinterService.prototype.PrintOrder = function (order) {
            var _self = this;
            var print = this._printer;
            return this.$q(function (resolve, reject) {
                print.PrintLogo().done(function () {
                    return print.SetAlignment(Printer.TextAlignment.Center).done(function () {
                        return print.SetFont(Printer.FontStyle.Width2).done(function () {
                            return print.PrintText("ZAMÓWIENIE\r\n").done(function () {
                                return print.SetFont(Printer.FontStyle.Normal).done(function () {
                                    return print.PrintText("NR ").done(function () {
                                        return print.SetFont(Printer.FontStyle.Width2).done(function () {
                                            return print.PrintText(order.Id + "\r\n").done(function () {
                                                return print.SetFont(Printer.FontStyle.Normal).done(function () {
                                                    return print.SetUnderline(Printer.Underline.Thick).done(function () {
                                                        return print.PrintText("DATA                     GODZINA\r\n").done(function () {
                                                            return print.SetUnderline(Printer.Underline.None).done(function () {
                                                                return print.SetFont(Printer.FontStyle.Height2).done(function () {
                                                                    return print.PrintText(order.Date + "            ").done(function () {
                                                                        return print.SetFont(Printer.FontStyle.Height2 | Printer.FontStyle.Width2 | Printer.FontStyle.Bold).done(function () {
                                                                            return print.PrintText(order.Hour + "\r\n").done(function () {
                                                                                return print.SetFont(Printer.FontStyle.Small).done(function () {
                                                                                    return print.SetAlignment(Printer.TextAlignment.Left).done(function () {
                                                                                        return print.PrintText("ZAMÓWIONE PRODUKTY:\r\n").done(function () {
                                                                                            return _self.printItems(print, order, 0).done(function () {
                                                                                                return _self.printSummary(print, order).done(function () {
                                                                                                    return _self.toastr.success("Pomyślnie wydrukowano zamówienie", "Zakończono wydruk");
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }).fail(function (msg) { return _self.toastr.success(msg, "Błąd wydruku raportu"); });
            });
        };
        PrinterService.prototype.printItems = function (print, order, id, deffer) {
            if (deffer === void 0) { deffer = null; }
            if (deffer == null)
                deffer = $.Deferred();
            var _self = this;
            if (id >= order.Items.length) {
                deffer.resolve();
            }
            else {
                var item = order.Items[id];
                print.SetFont(Printer.FontStyle.Bold | Printer.FontStyle.Height2 | Printer.FontStyle.Width2).done(function () {
                    return print.PrintText(item.Quantity + "x  ").done(function () {
                        return print.SetFont(Printer.FontStyle.Height2).done(function () {
                            return print.PrintText(item.Name + "\r\n").done(function () { return _self.printItems(print, order, id + 1, deffer); });
                        });
                    });
                }).fail(function (msg) { return deffer.reject(msg); });
            }
            if (id == 0)
                return deffer.promise(); // zwroc promise tylko dla pierwszego wywolania
            return null;
        };
        PrinterService.prototype.printSummary = function (print, order) {
            var deffer = $.Deferred();
            var _self = this;
            print.SetFont(Printer.FontStyle.Small).done(function () {
                return print.PrintText("++++++++++++++++++++++++++++++++++++++++++\r\n").done(function () {
                    return print.SetFont(Printer.FontStyle.Width2).done(function () {
                        return print.PrintText("SUMA:   123,00zl\r\n").done(function () {
                            return print.SetFont(Printer.FontStyle.Small).done(function () {
                                return print.PrintText("++++++++++++++++++++++++++++++++++++++++++\r\n").done(function () {
                                    return print.SetFont(Printer.FontStyle.Small).done(function () {
                                        return print.SetAlignment(Printer.TextAlignment.Center).done(function () {
                                            return print.PrintText("ADRES ZAMÓWIENIA:\r\n").done(function () {
                                                return print.SetFont(Printer.FontStyle.Height2).done(function () {
                                                    return print.PrintText(order.Client.Name + "\r\n" + order.Client.Address + "\r\n").done(function () {
                                                        return print.SetFont(Printer.FontStyle.Small).done(function () {
                                                            return print.PrintText("NUMER TELEFONU:\r\n").done(function () {
                                                                return print.SetFont(Printer.FontStyle.Height2 | Printer.FontStyle.Bold).done(function () {
                                                                    return print.PrintText(order.Client.Phone + "\r\n\r\n\r\n\r\n\r\n").done(function () {
                                                                        return deffer.resolve();
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }).fail(function (msg) { return deffer.reject(msg); });
            return deffer.promise();
        };
        //_.reduce(order.Items, (memo, itm) => { return memo + (itm.Price * itm.Quantity); }, 0))
        PrinterService.prototype.blad = function (msg) {
        };
        PrinterService.prototype.PrintReport = function (order) {
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
        PrinterService.$inject = ['$q', 'toastr'];
        return PrinterService;
    })();
    Printer.PrinterService = PrinterService;
})(Printer || (Printer = {}));
app.service('PrinterService', Printer.PrinterService);
//# sourceMappingURL=printerService.js.map