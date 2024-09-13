import { BehaviorSubject, Observable } from "rxjs";
import { StorageService } from "./storage.service";


export class StorageValue<T>{
    storageService:StorageService
    private _value:T 
    observers:Array<(value: T) => void> = []
    constructor(storageService:StorageService, private key: string, defVal: T, convert:(string)=>T) {
      let val=storageService.get(key)
      let v = defVal
      if (!!val) {
        v=convert(val)
      }
      this._value = v
    }
    get value():T{
      return this._value
    }
    set value(value: T) {
      this._value = value
      this.storageService.set(this.key, value.toString())
      this.observers.forEach(o => o(value))
    }
    subscribe(observer: (value: T) => void): void {
      this.observers.push(observer)
    }
  }

export class StringStorageValue extends StorageValue<string>{
    constructor(override storageService:StorageService, key:string, defVal:string){
        super(storageService, key, defVal, (s)=>s)
    }
}
export class IntStorageValue extends StorageValue<number>{
    constructor(override storageService:StorageService, key:string, defVal:number){
        super(storageService, key, defVal, (s)=>+s)
    }
}

export class BooleanStorageValue extends StorageValue<boolean>{
    constructor(override storageService:StorageService, key:string, defVal:boolean){
        super(storageService, key, defVal, (s)=>s=='true')
    }
}

export class AutoCopyValue extends StorageValue<boolean>{
    constructor(override storageService:StorageService){
        super(storageService, "autoCopy", false, (s)=>s=='true')
    }

}

export class TimezoneValue extends StorageValue<string>{
    constructor(override storageService:StorageService){
        super(storageService, "timezone", "Asia/Hong_Kong", (s)=>s)
    }
}

export class TimestampTypeValue extends StorageValue<string>{
    constructor(override storageService:StorageService){
        super(storageService, "timestampType", "Millisecond", (s)=>s)
    }
}