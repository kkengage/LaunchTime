module Authorization {

    export class TokenData {

        token: string;
        expires_in: string;
        ExpireUTCSeconds: number; // Z serwera dostaje informacje o TimeSpan'ie, a sktypt musi sam wyznacznyc sobie kiedy uplywa czas. Nie moge uzywac czasu serwera bo klient moze miec róznie ustawiony zegar
    }

}