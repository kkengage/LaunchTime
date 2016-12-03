/// <reference path="../../models/order.ts" />
/// <reference path="printer.ts" />
/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../appmain/app.ts" />


namespace Printer {

    export class PrinterService {

        static $inject = ['$q', 'toastr'];
        private _printer: Printer;
        private toastr: Toastr;

        constructor(private $q: angular.IQService, toastr: Toastr) {
            this._printer = new Printer();
            this.toastr = toastr;
        }

        PrinterStatus: string = "Disconnected";


        RefreshStatus(): angular.IPromise<string> {
            var _self = this;
            var print = this._printer;
            return this.$q(function (resolve, reject) {
                print.RefreshStatus().done(() => { })
                    .fail((msg) => _self.toastr.success(msg, "Błąd statusu"));
            });
        }


        PrintOrder(order: Models.Order): angular.IPromise<string> {
            var _self = this;
            var print = this._printer;
            return this.$q(function (resolve, reject) {
                print.PrintLogo().done(() =>
                    print.SetAlignment(TextAlignment.Center).done(() =>
                        print.SetFont(FontStyle.Width2).done(() =>
                            print.PrintText("ZAMÓWIENIE\r\n").done(() =>
                                print.SetFont(FontStyle.Normal).done(() =>
                                    print.PrintText("NR ").done(() =>
                                        print.SetFont(FontStyle.Width2).done(() =>
                                            print.PrintText(order.Id + "\r\n").done(() =>
                                                print.SetFont(FontStyle.Normal).done(() =>
                                                    print.SetUnderline(Underline.Thick).done(() =>
                                                        print.PrintText("DATA                     GODZINA\r\n").done(() =>
                                                            print.SetUnderline(Underline.None).done(() =>
                                                                print.SetFont(FontStyle.Height2).done(() =>
                                                                    print.PrintText(order.Date + "            ").done(() => // 10 znakow data + 12 znakow przerwy
                                                                        print.SetFont(FontStyle.Height2 | FontStyle.Width2 | FontStyle.Bold).done(() =>
                                                                            print.PrintText(order.Hour + "\r\n").done(() => // 5znakow godzin * 2x szerokośc = 10 znaków
                                                                                print.SetFont(FontStyle.Small).done(() =>
                                                                                    print.SetAlignment(TextAlignment.Left).done(() =>
                                                                                        print.PrintText("ZAMÓWIONE PRODUKTY:\r\n").done(() =>
                                                                                            _self.printItems(print, order, 0).done(() =>
                                                                                                _self.printSummary(print, order).done(() =>
                                                                                                    _self.toastr.success("Pomyślnie wydrukowano zamówienie", "Zakończono wydruk")
                                                                                                ))))))))))))))))))))).fail((msg) => _self.toastr.success(msg, "Błąd wydruku raportu"));
            });
        }

        printItems(print: Printer, order: Models.Order, id: number, deffer: JQueryDeferred<string> = null): JQueryPromise<string> {
            if (deffer == null) deffer = $.Deferred<string>();
            var _self = this;

            if (id >= order.Items.length) { deffer.resolve(); }
            else {
                var item = order.Items[id];
                print.SetFont(FontStyle.Bold | FontStyle.Height2 | FontStyle.Width2).done(() =>
                    print.PrintText(item.Quantity + "x  ").done(() =>
                        print.SetFont(FontStyle.Height2).done(() =>
                            print.PrintText(item.Name + "\r\n").done(() => _self.printItems(print, order, id + 1, deffer))
                        ))).fail((msg) => deffer.reject(msg));
            }
            if (id == 0) return deffer.promise(); // zwroc promise tylko dla pierwszego wywolania
            return null;
        }

        printSummary(print: Printer, order: Models.Order): JQueryPromise<string> {
            var deffer = $.Deferred<string>();
            var _self = this;
            print.SetFont(FontStyle.Small).done(() =>
                print.PrintText("++++++++++++++++++++++++++++++++++++++++++\r\n").done(() =>
                    print.SetFont(FontStyle.Width2).done(() =>
                        print.PrintText("SUMA:   123,00zl\r\n").done(() =>
                            print.SetFont(FontStyle.Small).done(() =>
                                print.PrintText("++++++++++++++++++++++++++++++++++++++++++\r\n").done(() =>
                                    print.SetFont(FontStyle.Small).done(() =>
                                        print.SetAlignment(TextAlignment.Center).done(() =>
                                            print.PrintText("ADRES ZAMÓWIENIA:\r\n").done(() =>
                                                print.SetFont(FontStyle.Height2).done(() =>
                                                    print.PrintText(order.Client.Name + "\r\n" + order.Client.Address + "\r\n").done(() =>
                                                        print.SetFont(FontStyle.Small).done(() =>
                                                            print.PrintText("NUMER TELEFONU:\r\n").done(() =>
                                                                print.SetFont(FontStyle.Height2 | FontStyle.Bold).done(() =>
                                                                    print.PrintText(order.Client.Phone + "\r\n\r\n\r\n\r\n\r\n").done(() =>
                                                                        deffer.resolve()
                                                                    ))))))))))))))).fail((msg) => deffer.reject(msg));
            return deffer.promise();
        }


        //_.reduce(order.Items, (memo, itm) => { return memo + (itm.Price * itm.Quantity); }, 0))

        private blad(msg: string) {

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