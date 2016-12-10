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
    export interface IPrinter {      
     
        /**
        * Funckja drukuje logo Lunchtime        
        * @returns {string} jeśli wystąpił błąd
        */
        PrintLogo(): JQueryPromise<string>;      

        /**
        * Ustawia wyrównanie tekstu
        * @returns {string} jeśli wystąpił błąd
        */
        SetAlignment(alignment: TextAlignment): JQueryPromise<string>;

        /**
        * Ustawia podkreślenie tekstu
        * @returns {string} jeśli wystąpił błąd
        */
        SetUnderline(style: Underline): JQueryPromise<string>;

        /**
        * Ustawaia pozycje od lewej w ilosci znakow w aktualnie wybranej czcionce
        * @returns {string} jeśli wystąpił błąd
        */
        SetHPosition(charCount: number): JQueryPromise<string>;

        /**
        * Ustawaia czcionke (zeruje poprzednie ustawienia tej funckji poza podkresleniem)
        * @returns {string} jeśli wystąpił błąd
        */
        SetFont(style: FontStyle): JQueryPromise<string>;

        /**
        * Ustawa odwrocenie kolorów (czarne na bialym czy biale na czarnym)
        * @returns {string} jeśli wystąpił błąd
        */
        SetInvertedColors(inverted: boolean): JQueryPromise<string>;

        /**
        * Drukuje tekst
        * @returns {string} jeśli wystąpił błąd
        */
        PrintText(msg: string): JQueryPromise<string>;


        /**
         * Odswieza status
         * @returns {string} jeśli wystąpił błąd
         */
        RefreshStatus(): JQueryPromise<string>;


    }
}