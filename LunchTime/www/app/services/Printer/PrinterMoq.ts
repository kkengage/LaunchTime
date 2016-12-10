/// <reference path="../../models/order.ts" />
/// <reference path="../../helpers/using.ts" />
/// <reference path="../../../../typings/serial/serial.d.ts" />

namespace Printer {
    declare var serial;

   

    // Rozszerza funckjonalność cache'a angularowego o expiry time
    export class PrinterMoq implements IPrinter,D.IDisposable {

        public static Status: string = "NOT INITIALIZED";
        private logo: string = "";

        /**
        * Funckja drukuje logo Lunchtime        
        * @returns {string} jeśli wystąpił błąd
        */
        PrintLogo(): JQueryPromise<string> {
            var q = $.Deferred<string>();
            setTimeout(() => { q.resolve(); }, 30);
            return q.promise();
        }

        /**
        * Ustawia wyrównanie tekstu
        * @returns {string} jeśli wystąpił błąd
        */
        SetAlignment(alignment: TextAlignment): JQueryPromise<string> {
            var q = $.Deferred<string>();
            setTimeout(() => { q.resolve(); }, 30);
            return q.promise();
        }

        /**
        * Ustawia podkreślenie tekstu
        * @returns {string} jeśli wystąpił błąd
        */
        SetUnderline(style: Underline): JQueryPromise<string> {
            var q = $.Deferred<string>();
            setTimeout(() => { q.resolve(); }, 30);
            return q.promise();
        }

        /**
        * Ustawaia pozycje od lewej w ilosci znakow w aktualnie wybranej czcionce
        * @returns {string} jeśli wystąpił błąd
        */
        SetHPosition(charCount: number): JQueryPromise<string> {
            var q = $.Deferred<string>();
            setTimeout(() => { q.resolve(); }, 30);
            return q.promise();
        }

        /**
        * Ustawaia czcionke (zeruje poprzednie ustawienia tej funckji poza podkresleniem)
        * @returns {string} jeśli wystąpił błąd
        */
        SetFont(style: FontStyle): JQueryPromise<string> {
            var q = $.Deferred<string>();
            setTimeout(() => { q.resolve(); }, 30);
            return q.promise();
        }


        /**
        * Ustawa odwrocenie kolorów (czarne na bialym czy biale na czarnym)
        * @returns {string} jeśli wystąpił błąd
        */
        SetInvertedColors(inverted: boolean): JQueryPromise<string> {
            var q = $.Deferred<string>();
            setTimeout(() => { q.resolve(); }, 30);
            return q.promise();
        }

        /**
        * Drukuje tekst
        * @returns {string} jeśli wystąpił błąd
        */
        PrintText(msg: string): JQueryPromise<string> {
            var q = $.Deferred<string>();
            setTimeout(() => { q.resolve(); }, 30)
            var _self = this;
            return q.promise();
        }


        /**
         * Odswieza status
         * @returns {string} jeśli wystąpił błąd
         */
        RefreshStatus(): JQueryPromise<string> {
            var q = $.Deferred<string>();
            setTimeout(() => { q.resolve(); }, 100);
            return q.promise();
        }

        constructor() { }

        dispose() {
        }



    }
}