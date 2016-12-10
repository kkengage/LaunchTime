/// <reference path="../../models/order.ts" />
/// <reference path="../../helpers/using.ts" />
/// <reference path="../../../../typings/serial/serial.d.ts" />
var Printer;
(function (Printer) {
    //#region Style Enums
    (function (TextAlignment) {
        TextAlignment[TextAlignment["Left"] = 0] = "Left";
        TextAlignment[TextAlignment["Center"] = 1] = "Center";
        TextAlignment[TextAlignment["Right"] = 2] = "Right";
    })(Printer.TextAlignment || (Printer.TextAlignment = {}));
    var TextAlignment = Printer.TextAlignment;
    (function (Underline) {
        Underline[Underline["None"] = 48] = "None";
        Underline[Underline["Thin"] = 49] = "Thin";
        Underline[Underline["Thick"] = 50] = "Thick";
    })(Printer.Underline || (Printer.Underline = {}));
    var Underline = Printer.Underline;
    (function (FontStyle) {
        FontStyle[FontStyle["Normal"] = 0] = "Normal";
        // Czcionka 9x17 zamiast 12x24 domyslnej
        FontStyle[FontStyle["Small"] = 1] = "Small";
        FontStyle[FontStyle["Bold"] = 8] = "Bold";
        // Poszerzona x 2
        FontStyle[FontStyle["Height2"] = 16] = "Height2";
        // Podwyzszona x 2
        FontStyle[FontStyle["Width2"] = 32] = "Width2";
    })(Printer.FontStyle || (Printer.FontStyle = {}));
    var FontStyle = Printer.FontStyle;
})(Printer || (Printer = {}));
//# sourceMappingURL=IPrinter.js.map