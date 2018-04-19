export class MockSharedDataService {
    fakeMethod = { "type": "updatePaymentMethod", "method": { "id": "271", "type": "payment_systems", "attributes": { "last_4": "4242", "expiration": "12-2019", "token": "card_1BvWnbAvil4sbVRDBQCOo2OQ", "card_type": "Visa", "provider": "stripe" } } };

    store:Object = {};
  
    constructor() { }
  
    get(key){
      return this.fakeMethod;
    }
  
  }