import { Injectable } from '@angular/core';


@Injectable()
export class SharedDataService {

  store:Object = {};

  constructor() { }

  storage(type?:string){
    if(type == "sessionStorage"){
      return sessionStorage
    }
    return localStorage
  }

  save(key, data, setToStorage?:boolean, storageType?:string){
    if(setToStorage){
      let dataToSave = typeof(data) == "string" ? data :JSON.stringify(data)
      this.storage(storageType).setItem(key, dataToSave);
    }
    else{
      this.store[key] = data
    }
  }

  get(key){
    let data = this.store[key]
    if(!data){
        try {
          data = JSON.parse(this.storage().getItem(key) || this.storage("sessionStorage").getItem(key))
        } catch(e) {
          data = this.storage().getItem(key) || this.storage("sessionStorage").getItem(key)
        }
    }
    
    return data
  }

  remove(key){
    if(sessionStorage.getItem(key)){
      sessionStorage.removeItem(key)
    }
    else{
      localStorage.removeItem(key);
      this.store[key] = null;
    }
  }

}
