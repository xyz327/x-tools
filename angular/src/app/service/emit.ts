import { Injectable } from "@angular/core";
import { Subject } from "rxjs";



export class Emiter<T> {
  private _value: Subject<T>;
  constructor() {
    this._value = new Subject<T>();
  }
  subscribe(observer: (value: T) => void): void {
    this._value.subscribe(observer)
  }
  next(value: T) {
    this._value.next(value)
  }
}

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgEmiter extends Emiter<string> {
  constructor() {
    super()
  }
}
