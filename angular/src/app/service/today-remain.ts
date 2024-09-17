import dayjs from "dayjs"
import { BooleanStorageValue, DateStorageValue, TimezoneValue } from './storage-value';
import { StorageService } from './storage.service';


export class TodayRemain {
  private taskId: any
  hours: number = 0
  minutes: number = 0
  seconds: number = 0
  timezone: TimezoneValue
  showValue: BooleanStorageValue
  constructor(private storageService: StorageService) {
    this.timezone = new TimezoneValue(this.storageService)
    this.showValue = new BooleanStorageValue(this.storageService, "showTodayRemain", true)
    requestAnimationFrame(() => {
      this.taskId = setInterval(() => {
        this.calculateTodayRemain()
      }, 1000)
    })
  }
  get show(): boolean {
    return this.showValue.value
  }

  private calculateTodayRemain() {
    const now = dayjs().tz(this.timezone.value)

    let workEnd = now.endOf('day')
    const duration = dayjs.duration(workEnd.diff(now))

    this.hours = duration.get('hour')
    this.minutes = duration.get('minute')
    this.seconds = duration.get('second')
  }

  destroy() {
    clearInterval(this.taskId)
  }
}

