/// <reference path="../../models/order.ts" />
/// <reference path="../../helpers/using.ts" />
/// <reference path="../../../../typings/serial/serial.d.ts" />
var Printer;
(function (Printer) {
    // Rozszerza funckjonalność cache'a angularowego o expiry time
    var PrinterMoq = (function () {
        function PrinterMoq() {
            this.logo = "";
        }
        /**
        * Funckja drukuje logo Lunchtime
        * @returns {string} jeśli wystąpił błąd
        */
        PrinterMoq.prototype.PrintLogo = function () {
            var q = $.Deferred();
            setTimeout(function () { q.resolve(); }, 30);
            return q.promise();
        };
        /**
        * Ustawia wyrównanie tekstu
        * @returns {string} jeśli wystąpił błąd
        */
        PrinterMoq.prototype.SetAlignment = function (alignment) {
            var q = $.Deferred();
            setTimeout(function () { q.resolve(); }, 30);
            return q.promise();
        };
        /**
        * Ustawia podkreślenie tekstu
        * @returns {string} jeśli wystąpił błąd
        */
        PrinterMoq.prototype.SetUnderline = function (style) {
            var q = $.Deferred();
            setTimeout(function () { q.resolve(); }, 30);
            return q.promise();
        };
        /**
        * Ustawaia pozycje od lewej w ilosci znakow w aktualnie wybranej czcionce
        * @returns {string} jeśli wystąpił błąd
        */
        PrinterMoq.prototype.SetHPosition = function (charCount) {
            var q = $.Deferred();
            setTimeout(function () { q.resolve(); }, 30);
            return q.promise();
        };
        /**
        * Ustawaia czcionke (zeruje poprzednie ustawienia tej funckji poza podkresleniem)
        * @returns {string} jeśli wystąpił błąd
        */
        PrinterMoq.prototype.SetFont = function (style) {
            var q = $.Deferred();
            setTimeout(function () { q.resolve(); }, 30);
            return q.promise();
        };
        /**
        * Ustawa odwrocenie kolorów (czarne na bialym czy biale na czarnym)
        * @returns {string} jeśli wystąpił błąd
        */
        PrinterMoq.prototype.SetInvertedColors = function (inverted) {
            var q = $.Deferred();
            setTimeout(function () { q.resolve(); }, 30);
            return q.promise();
        };
        /**
        * Drukuje tekst
        * @returns {string} jeśli wystąpił błąd
        */
        PrinterMoq.prototype.PrintText = function (msg) {
            var q = $.Deferred();
            setTimeout(function () { q.resolve(); }, 30);
            var _self = this;
            return q.promise();
        };
        /**
         * Odswieza status
         * @returns {string} jeśli wystąpił błąd
         */
        PrinterMoq.prototype.RefreshStatus = function () {
            var q = $.Deferred();
            setTimeout(function () { q.resolve(); }, 100);
            return q.promise();
        };
        PrinterMoq.prototype.dispose = function () {
        };
        PrinterMoq.Status = "NOT INITIALIZED";
        return PrinterMoq;
    })();
    Printer.PrinterMoq = PrinterMoq;
})(Printer || (Printer = {}));
//# sourceMappingURL=PrinterMoq.js.map