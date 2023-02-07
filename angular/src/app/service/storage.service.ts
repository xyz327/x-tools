
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private keyPrefix = 'x-tools:'
  constructor() { }


  get(key: string): string {
    return localStorage.getItem(this.wrapKey(key))
  }
  clear(key:string):void{
    localStorage.removeItem(this.wrapKey(key))
  }
  computeIfAbsent(key: string, callback: Function): string {
    const val = this.get(key);
    return !!val ? val : callback()
  }
  set(key: string, val: string): void {
    localStorage.setItem(this.wrapKey(key), val)
  }
  private wrapKey(key: string): string {
    return this.keyPrefix + key
  }
}
