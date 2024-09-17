import dayjs from "dayjs"
import { BooleanStorageValue, DateStorageValue, TimezoneValue } from './storage-value';
import { StorageService } from './storage.service';


export class WorkRemain {
  private taskId: any
  hours: number = 0
  minutes: number = 0
  seconds: number = 0
  offworkTime: DateStorageValue
  timezone: TimezoneValue
  offWorkTimeValue: string
  showValue: BooleanStorageValue
  constructor(private storageService: StorageService) {
    this.offworkTime = new DateStorageValue(storageService, "offWorkTime", "HH:mm", new Date(0, 0, 0, 18, 30, 0))
    this.timezone = new TimezoneValue(this.storageService)
    this.showValue = new BooleanStorageValue(this.storageService, "showWorkRemain", false)
    this.offWorkTimeValue = dayjs(this.offworkTime.value).format("HH:mm")
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

    let workEnd = now.hour(this.offworkTime.value.getHours()).minute(this.offworkTime.value.getMinutes()).second(0)
    if (now.isAfter(workEnd)) {
      workEnd = workEnd.add(1, 'day')
    }
    const duration = dayjs.duration(workEnd.diff(now))

    this.hours = duration.get('hour')
    this.minutes = duration.get('minute')
    this.seconds = duration.get('second')
  }

  destroy() {
    clearInterval(this.taskId)
  }
}

