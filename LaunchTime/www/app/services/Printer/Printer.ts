/// <reference path="../../models/order.ts" />
/// <reference path="../../helpers/using.ts" />
/// <reference path="../../../../typings/serial/serial.d.ts" />

namespace Printer {
    declare var serial;

    //#region Style Enums
    export enum TextAlignment {
        Left = 0,
        Center = 1,
        Right = 2
    }

    export enum Underline {
        None = 48,
        Thin = 49,
        Thick = 50
    }

    export enum FontStyle {
        Normal = 0,
        // Czcionka 9x17 zamiast 12x24 domyslnej
        Small = 1,
        Bold = 8,
        // Poszerzona x 2
        Height2 = 16,
        // Podwyzszona x 2
        Width2 = 32
    }
    //#endregion

    // Rozszerza funckjonalność cache'a angularowego o expiry time
    export class Printer implements D.IDisposable {

        public static Status: string = "NOT INITIALIZED";

        // wymiary logo X - wielokrotnosc 52, Y - dowolna (jeden Y to byte czylu 8 pikseli pionowych)
        // string logo mozna wygenerować za pomocą LogoConvertera (oddzielny projekt w tej solucji)
        private logo: string = "1B42081D2A0D0100000000000000000000000000000000000000000000000001030307070F0F1F1F1F3F3F3F3F7F7F7F7E7EFEFEFEFEFEFEFCFCFEFEFEFEFEFE7E7E7F7F7F3F3F3F3F1F1F1F0F0F0707030301000000000000000000000000000000000000000000000000000000001D2F031D2A0D0100000000000000000000000000000103070F1F3F7F7FFFFEFEFCF8F8F0F0E0E0C0C08080800000000000000000000000000000000000000000010101030202868484C4C6E2E2F3F1F8F8FCFEFEFF7F7F3F1F0F0703010000000000000000000000000000000000001D2F031D2A0D010000000000000001030F1F3F7FFFFFFEFCF8F0E0C08000000000000000010101030202020404040C08080810101030202060404040808080800000000000000000000000010300008060381F070180C0E0F0F8FCFEFFFF7F3F1F0F030000000000000000000000001D2F031D2A0D0100000001071F7FFFFFFFFFFCF0C3860C181010202020604040C08080800000000000000001010000010303010000040F0F0000010F1F1C3830381C1C0000F0FF3F0F0C1CFCF8FF1F03000000E0FE3F07000000000080C0F0FCFFFFFFFF7F1F0701000000000000001D2F031D2A0D0100033FFFFFFFFFFFF8C0001CE3000000000000040F0F000000000000203E3F0F010000C0F8FF7F00E0FEFFFFF078389CFEFF1FC2F0F8381C0C0C1CF8F8E00080E0E02000000000C0800000000000E0FC7F070000000000000000C0F0FFFFFFFFFF3F0700000000001D2F031D2A0D011FFFFFFFFFFFFF8000000000C03C070000000000C0F8FE1F06060E0C0C0CC0F0F078383979F0E1030303C1C080030F0F0F0F0300383F3F736363E347070000000000000000000000000000000000000080F8FF1F010000000000000080FFFFFFFFFFFF1F000000001D2F031D2A0D01FFFFFFFFFFFF1F0000000000000080F00F010000000018183838383F7F6360600000E0FCFF1F01F0FEFFF7F0F8F8F0C0C0FEFE3E0080F8FC1C181818383031030307070707070F3E7F7EF8F0F0E0E0C0C0C0C0E0E03000000000000000FFFFFFFFFFFFFF000000001D2F031D2A0D0100F8FFFFFFFFFF3F030000000000000000F01E030000000000000080F8FC380001010100C0E0E00303C0C080000000000000000000000000000000017FFFFFF0E0C080000000000000000000000000000000000000000000000000013FFFFFFFFFFFFC00000000001D2F031D2A0D01000080F0FCFFFFFFFF7F1F0701000000000000C03C070000000000000060FCFFFFCFCEECFC780080F0FF1F03030306060600000000071F3F7FFCF0E0E0C0C000000000000000000000000000000000000000000000000001071F7FFFFFFFFFFCF0800000000000001D2F031D2A0D01000000000000C0F0F8FEFFFFFF7F3F0F070301000080F00E01000000303000C0F0F070000000000000008000000000000000010101C3F3FF0F0301000000000000000000000000000000000000000000000103070F3F7FFFFFFFFEF8E0C0000000000000000000001D2F031D2A0D01000000000000000000000080C0E0F0F8FCFEFFFF7F3F1F0F8F4723331109080C0C0E0E0E1E1E1C3C3C383878787070F0F0E0E0E0C0C0C080808080000000000000000000000001010303070F0F1F3F7FFFFFFEFCF8F0E0C0800000000000000000000000000000001D2F031D2A0D01000000000000000000000000000000000000008080C0E0F0F0F8F8FCFCFEFEFF7F7F3F3F3F1F1F1F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F0F1F1F1F3F3F3F7F7FFFFEFEFCFCF8F8F0F0E0C0808000000000000000000000000000000000000000000000001D2F031D2A0D010000000000000000000000000000000000000000000000000000000000000000000000808080C0C0C0C0E0E0E0E0E0E0E0E0E0E0E0E0E0E0E0E0C0C0C0C08080800000000000000000000000000000000000000000000000000000000000000000000000000000001D2F03";

        /**
        * Funckja drukuje logo Launchtime        
        * @returns {string} jeśli wystąpił błąd
        */
        PrintLogo(): JQueryPromise<string> { return this.printLogotype(); }
        //#region PrintLogo - drukowanie LOGO Launchtime
        private printLogotype(): JQueryPromise<string> {
            this.qDef = $.Deferred<string>();
            this.nr = 0;
            try {
                var _self = this;
                this.printer()
                    .done((printer) => {
                        _self.prnt = printer;
                        _self.SetAlignment(TextAlignment.Left).done(() =>
                            _self.printLogo());
                    })
                    .fail((msg) => { Printer._error = true; _self.qDef.reject("Nie połączono z drukarką!\r\n"); });
            } catch (ex) {
                Printer._error = true;
                this.qDef.reject("Błąd połączenia z drukarką!\r\n" + ex.toString());
            }
            return this.qDef;
        }

        private nr = 0;
        private prnt: Serial;
        private qDef: JQueryDeferred<string>;
        private printLogo() {
            var t = this.logo.substring(this.nr, this.nr + 52);
            this.nr = this.nr + 52;
            this.prnt.writeHex(t, () => this.writeHexSuccess(this), (msg) => this.error(msg, this));
        }

        private error(msg: string, self: Printer) {
            Printer._error = true;
            self.qDef.reject("Błąd komunikacji z drukarką!\r\n" + msg);
        }

        private writeHexSuccess(self: Printer) {
            try {
                if (self.nr < self.logo.length - 1) {
                    self.printLogo();
                }
                else { self.SetHPosition(0).done(() => self.qDef.resolve()); }
            } catch (ex) {
                Printer._error = true;
                self.qDef.reject("Błąd podczas drukowania!\r\n" + ex.toString());
            }
        }
        //#endregion    

        /**
        * Ustawia wyrównanie tekstu
        * @returns {string} jeśli wystąpił błąd
        */
        SetAlignment(alignment: TextAlignment): JQueryPromise<string> {
            var q = $.Deferred<string>();
            // ESC a n
            this.printer().done((printer: Serial) => {
                printer.writeHex("1B61" + Printer.numToHex(alignment), () => q.resolve(), (msg) => Printer.blad(q, "Błąd 'alignment'\r\n" + msg));
            }).fail((msg) => Printer.blad(q, msg));
            return q.promise();
        }

        /**
        * Ustawia podkreślenie tekstu
        * @returns {string} jeśli wystąpił błąd
        */
        SetUnderline(style: Underline): JQueryPromise<string> {
            var q = $.Deferred<string>();
            // ESC - n
            this.printer().done((printer: Serial) => {
                printer.writeHex("1B2D" + Printer.numToHex(<number>style), () => q.resolve(), (msg) => Printer.blad(q, "Błąd 'underscore'\r\n" + msg));
            }).fail((msg) => Printer.blad(q, msg));
            return q.promise();
        }

        /**
        * Ustawaia pozycje od lewej w ilosci znakow w aktualnie wybranej czcionce
        * @returns {string} jeśli wystąpił błąd
        */
        SetHPosition(charCount: number): JQueryPromise<string> {
            var q = $.Deferred<string>();
            // ESC B n
            this.printer().done((printer: Serial) => {
                printer.writeHex("1B42" + Printer.numToHex(charCount), () => q.resolve(), (msg) => Printer.blad(q, "Błąd 'position'\r\n" + msg));
            }).fail((msg) => Printer.blad(q, msg));
            return q.promise();
        }

        /**
        * Ustawaia czcionke (zeruje poprzednie ustawienia tej funckji poza podkresleniem)
        * @returns {string} jeśli wystąpił błąd
        */
        SetFont(style: FontStyle): JQueryPromise<string> {
            var q = $.Deferred<string>();
            // ESC ! n
            this.printer().done((printer: Serial) => {
                printer.writeHex("1B21" + Printer.numToHex(style), () => q.resolve(), (msg) => Printer.blad(q, "Błąd 'font'\r\n" + msg));
            }).fail((msg) => Printer.blad(q, msg));
            return q.promise();
        }


        /**
        * Ustawa odwrocenie kolorów (czarne na bialym czy biale na czarnym)
        * @returns {string} jeśli wystąpił błąd
        */
        SetInvertedColors(inverted: boolean): JQueryPromise<string> {
            var q = $.Deferred<string>();
            // GS B n
            this.printer().done((printer: Serial) => {
                printer.writeHex("1D42" + (inverted ? "01" : "00"), () => q.resolve(), (msg) => Printer.blad(q, "Błąd 'inverse'\r\n" + msg));
            }).fail((msg) => Printer.blad(q, msg));
            return q.promise();
        }

        /**
        * Drukuje tekst
        * @returns {string} jeśli wystąpił błąd
        */
        PrintText(msg: string): JQueryPromise<string> {
            var q = $.Deferred<string>();
            var _self = this;
            this.printer().done((printer: Serial) => {
                printer.write(_self.ConvertToCodePage(msg), () => q.resolve(), (msg) => Printer.blad(q, "Błąd 'write'\r\n" + msg));
            }).fail((msg) => Printer.blad(q, msg));
            return q.promise();
        }


        /**
         * Odswieza status
         * @returns {string} jeśli wystąpił błąd
         */
        RefreshStatus(): JQueryPromise<string> {
            var q = $.Deferred<string>();
            var _self = this;
            this.printer().done((printer: Serial) => {
                printer.writeHex("", () => q.resolve(), (msg) => Printer.blad(q, "Błąd 'status'\r\n" + msg));
            }).fail((msg) => Printer.blad(q, msg));
            return q.promise();
        }

        private ConvertToCodePage(msg: string): string {
            return msg;
            //var c = this.h2a;
            //return msg
            //    .replace("A", c("A1")).replace("a", c("B1"))
            //    .replace("Ć", c("C6")).replace("Ć", c("E6"))
            //    .replace("Ę", c("CA")).replace("ę", c("EA"))
            //    .replace("Ł", c("A3")).replace("ł", c("B3"))
            //    .replace("Ń", c("D1")).replace("ń", c("F1"))
            //    .replace("Ó", c("D3")).replace("ó", c("F3"))
            //    .replace("Ś", c("A6")).replace("ś", c("B6"))
            //    .replace("Ż", c("AF")).replace("ż", c("BF"))
            //    .replace("Ź", c("AC")).replace("ź", c("BC"))
        }

        /**
        * Konwersja hex do ASCII
        * @returns {string} jeśli wystąpił błąd
        */
        private h2a(hexx) {
            var hex = hexx.toString();//force conversion
            var str = '';
            for (var i = 0; i < hex.length; i += 2)
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            return str;
        }

        private static numToHex(num: number): string {
            var t = num.toString(16);
            if (t.length == 1) t = "0" + t;
            return t;
        }

        //#region Prywatne zmienne i metody do zarządzania drukarką i portem (open, close..) i stylami czcionki
        constructor() { }
        private static _hasPremission: boolean;
        private static _isOpen: boolean;
        private static _error: boolean = false;
        private opts = {
            rts: true
        }

        /**
        * Pobiera objekt drukarki i probuje otworzyć port
        * @returns {JQueryPromise<any>} - string jesli blad, Serial jesli ok
        */
        private printer(): JQueryPromise<any> {
            var deffered = $.Deferred<any>();
            var _self = this;
            if (Printer._error) {
                Printer._error = false;
                Printer._hasPremission = false;
                Printer._isOpen = false;
                this.close().always(() => {
                    _self.printer().done((p) => deffered.resolve(p)).fail((msg) => deffered.reject(msg))
                });
            } else if (!Printer._isOpen) {
                (<Serial>serial).requestPermission(_self.opts, () => {
                    Printer._hasPremission = true;
                    serial.open(_self.opts, () => {
                        _self.resetPrinter(serial).done(() => {
                            _self.registerCallback(serial);
                            Printer._isOpen = true;
                            deffered.resolve(serial);
                        }).fail((msg) => Printer.blad(deffered, "Nie można zainicjować drukarki.\r\n" + msg));
                    }, (msg) => Printer.blad(deffered, "Nie można otworzyć portu.\r\n" + msg));
                }, (msg) => Printer.blad(deffered, "Brak uprawnień do połączenia z drukarką\r\n" + msg));
            } else {
                deffered.resolve(serial);
            }
            return deffered.promise();
        }

        private liczI = 0;
        private static isPrinting = true;

        private registerCallback(serial: Serial) {
            var _self = this;
            //setInterval(() => {
            //    alert("interval " + serial);
            //    if (Printer.isPrinting) return;
            //    try {
            //        serial.read((data) => {
            //            alert('a');
            //            Printer.Status = "pobrany status: " + data.toString();
            //        }, () => Printer.Status = "err status ");
            //    } catch (ex) { alert("ex: " + ex) };
            //}, 3000);

            //serial.registerReadCallback(
            //    function success(data) {
            //        // decode the received message
            //        var view = new Uint8Array(data);
            //        if (view.length >= 1) {
            //            alert('e');
            //            Printer.Status = "pobrano status " + view.length;
            //        }
            //    }, (msg) => alert("error " + msg));
        }




        /**
        * Zamyka polaczenie z dukarka
        * @returns {JQueryPromise<string>} jesli blad lub null jesli ok
        */
        private close(): JQueryPromise<string> {
            var deffered = $.Deferred<string>();
            var _self = this;

            if (Printer._hasPremission) {
                if (Printer._isOpen) {
                    try {
                        (<Serial>serial).close(() => { Printer._isOpen = false; deffered.resolve(); }, () => { deffered.reject("Błąd podczas zamykania portu\r\n"); });
                    } catch (ex) { deffered.reject("Nie można zamknac portu\r\n" + ex); }
                } else {
                    deffered.resolve();
                }
            } else {
                deffered.resolve();
            }
            return deffered.promise();
        }

        /**
        * Funckjarestartuje połączenie z drukarką
        * @returns {JQueryPromise<Serial>} - jesli OK, null jesli blad
        */
        private restart(): JQueryPromise<Serial> {
            var deffered = $.Deferred<Serial>();
            var _self = this;
            this.close()
                .always(function () {
                    deffered.resolve(this.printer());
                });
            return deffered.promise();
        }

        /**
        * Obsluga bledow dla wszystich funkcji drukujacych        
        */
        private static blad(q: JQueryDeferred<any>, msg: string = null) {
            q.reject(msg);
            Printer._error = true;
        }

        /**
        * Inicjalizowanie drukarki    
        */
        private resetPrinter(printer: Serial): JQueryPromise<string> {
            var q = $.Deferred<string>();
            printer.writeHex("1B40", () => { // ESC @   - inicjalizacja drukarki
                printer.writeHex("1D61FF", () => { // GS a 255  - automatyczne aktualizowanie statusu i RTS
                    printer.writeHex("1B7424", () => { // GS a 255  - ustawienie CODEPAGE'a na ISO-8859-2
                        //printer.writeHex("1B370A7A0A", () => { // ESC 7 n1 n2 n3  - ustawienia czasu nagrzawania   
                        Printer.isPrinting = false;
                        q.resolve();
                        //}, (msg) => Printer.blad(q, "Nie mozna ustawić jakosci druku\r\n" + msg));
                    }, (msg) => Printer.blad(q, "Nie mozna ustawić strony kodowej\r\n" + msg));
                }, (msg) => Printer.blad(q, "Drukarka nie odpowiada\r\n" + msg));
            }, (msg) => Printer.blad(q, "Nie można zainicjować drukarki\r\n" + msg));
            return q.promise();
        }

        dispose() {
        }

        //#endregion


    }
}