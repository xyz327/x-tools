import { Component } from '@angular/core';
import { BooleanStorageValue } from './service/storage-value';
import { StorageService } from './service/storage.service';
import { ErrorMsgEmiter } from './service/emit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  theme = 'light'
  autoDarkMode: BooleanStorageValue
  errorMsg = ''
  constructor(private storageService: StorageService, private errorMsgEmiter: ErrorMsgEmiter) {
    // 晚上切换暗黑模式
    this.autoDarkMode = new BooleanStorageValue(this.storageService, "autoDarkMode", false)
    this.autoDarkMode.subscribe(autoDarkMode => {
      if (autoDarkMode) {
        this.checkDarkMode()
      } else {
        this.theme = 'light'
      }
    })
    if (this.autoDarkMode.value) {
      this.checkDarkMode()
    }
    errorMsgEmiter.subscribe((msg) => {
      console.log('e:',msg)
      this.errorMsg = msg
    })
  }
  checkDarkMode() {
    const hour = new Date().getHours()
    if (hour >= 18 || hour <= 6) {
      this.theme = 'dark'
    }
  }
}
