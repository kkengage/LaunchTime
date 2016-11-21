/// <reference path="client.ts" />
/// <reference path="item.ts" />

namespace Models {

    export class Order {
        public Id: string;                
        public Date: string;
        public Client: Client;
        public Accepted: boolean;
        public Items: Item[];        
    }
}