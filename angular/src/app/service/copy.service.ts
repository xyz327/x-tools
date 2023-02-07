import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CopyService {

  constructor() { }

  copy2Clipboard(content: String): Promise<void> {
    return new Promise((resolve, reject) => {
      let copy = (e: any) => {
        try {
          e.preventDefault()
          e.clipboardData.setData('text/plain', content)
          document.removeEventListener('copy', copy)
          resolve()
        } catch (e) {
          reject(e)
        }
      }
      document.addEventListener('copy', copy)
      document.execCommand("Copy");
    })
  }
}
