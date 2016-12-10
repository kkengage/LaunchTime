// Type definitions for Toastr 2.0.1
// Project: https://github.com/CodeSeven/toastr
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


/// <reference path="../jquery/jquery.d.ts" />


interface SerialOptions {

    baudRate?: number;
    dataBits?: number;
    stopBits?: number;
    parity?: number;
    dtr?: boolean;
    sleepOnPause?: boolean;
}

interface Serial {

    requestPermission(opts: SerialOptions, successCallback: (message: string) => void, errorCallback: (msg: string) => void);
    open(opts: SerialOptions, successCallback: () => void, errorCallback: (msg: string) => void);
    write(data, successCallback: () => void, errorCallback: (msg: string) => void);
    writeHex(hexString: string, successCallback: () => void, errorCallback: (msg: string) => void);
    read(successCallback: (data: Uint8Array) => void, errorCallback: (msg: string) => void);
    close(successCallback: () => void, errorCallback: (msg: string) => void);
    registerReadCallback(successCalback: (data: Uint8Array) => void, errorCallback: (msg: string) => void);
}

declare module "serial" {
    export = Serial;
}
