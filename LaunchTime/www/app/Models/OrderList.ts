/// <reference path="client.ts" />
/// <reference path="item.ts" />

namespace Models {

    export class OrderList {
        public count: number;                
        public date: string;
        public orders: Models.Order[];                
    }
}