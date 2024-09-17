import { BehaviorSubject, Observable } from "rxjs";
import { StorageService } from "./storage.service";
import { get } from "lodash";
import dayjs from "dayjs";

class ObservableValue<T> {
  value: T
  observers: Array<(value: T) => void> = []
  constructor(private key: string, defVal: T) {
    this.value = defVal
  }
  subscribe(observer: (value: T) => void): void {
    this.observers.push(observer)
  }
}
const cacheMap: Map<string, ObservableValue<any>> = new Map()
function getObservableValue<T>(key: string, defVal: T): ObservableValue<T> {
  let v = cacheMap.get(key)
  if (!v) {
    v = new ObservableValue<T>(key, defVal)
    cacheMap.set(key, v)
  }
  return v
}
const toString = function <T>(t: T): string {
  return t.toString()
}
export class StorageValue<T> {
  storageService: StorageService
  private _value: ObservableValue<T>
  private serialize: (T) => string
  constructor(storageService: StorageService, private key: string, defVal: T, convert: (string) => T, serialize: (T) => string = toString) {
    this.serialize = serialize
    let val = storageService.get(key)
    let v = defVal
    if (!!val) {
      v = convert(val)
    }
    this._value = getObservableValue(key, v)
  }
  get value(): T {
    return this._value.value
  }
  set value(value: T) {
    this._value.value = value
    this.storageService.set(this.key, this.serialize(value))
    this._value.observers.forEach(o => o(value))
  }
  subscribe(observer: (value: T) => void): void {
    this._value.observers.push(observer)
  }
}

export class StringStorageValue extends StorageValue<string> {
  constructor(override storageService: StorageService, key: string, defVal: string) {
    super(storageService, key, defVal, (s) => s)
  }
}
export class IntStorageValue extends StorageValue<number> {
  constructor(override storageService: StorageService, key: string, defVal: number) {
    super(storageService, key, defVal, (s) => +s)
  }
}

export class BooleanStorageValue extends StorageValue<boolean> {
  constructor(override storageService: StorageService, key: string, defVal: boolean) {
    super(storageService, key, defVal, (s) => s == 'true')
  }
}

export class DateStorageValue extends StorageValue<Date> {
  constructor(override storageService: StorageService, key: string, format: string, defVal: Date) {
    super(storageService, key + ':' + format, defVal, (s) => {
      return dayjs(s, format).toDate()
    }, (d)=>{
      return dayjs(d).format(format)
    })
  }
}
export class AutoCopyValue extends StorageValue<boolean> {
  constructor(override storageService: StorageService) {
    super(storageService, "autoCopy", false, (s) => s == 'true')
  }
}

export class TimezoneValue extends StorageValue<string> {
  constructor(override storageService: StorageService) {
    super(storageService, "timezone", "Asia/Hong_Kong", (s) => s)
  }
}

export class TimestampTypeValue extends StorageValue<string> {
  constructor(override storageService: StorageService) {
    super(storageService, "timestampType", "Millisecond", (s) => s)
  }
}
