import { ErrorEmiter } from './../../service/emit';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import dayjs from 'dayjs';
import { BooleanStorageValue, DateStorageValue, StringStorageValue } from 'src/app/service/storage-value';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {

  offworkTime: DateStorageValue
  offworkTimeValue: StringStorageValue
  defaultOpenValue = new Date(0, 0, 0, 18, 30, 0);
  showWorkRemain: BooleanStorageValue
  showTodayRemain: BooleanStorageValue
  autoDarkMode: BooleanStorageValue
  constructor(private storageService: StorageService,
    private router: Router, private activatedRoute: ActivatedRoute, private errorEmiter: ErrorEmiter) {

    this.offworkTime = new DateStorageValue(storageService, "offWorkTime", "HH:mm", this.defaultOpenValue)
    this.showWorkRemain = new BooleanStorageValue(storageService, "showWorkRemain", false)
    this.showTodayRemain = new BooleanStorageValue(storageService, "showTodayRemain", true)
    this.autoDarkMode = new BooleanStorageValue(storageService, "autoDarkMode", false)

    this.offworkTimeValue = new StringStorageValue(storageService, "offWorkTimeValue", "18:30")
    this.offworkTimeValue.subscribe(v=>{
      this.offworkTime.value = dayjs(v, "HH:mm").toDate()
    })
  }

  clearData() {
    this.storageService.clearAll()
    this.errorEmiter.next(null)
  }

  backIndex(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }
  offWorkTimeChange() {
    console.log(this.offworkTime)
  }
}
