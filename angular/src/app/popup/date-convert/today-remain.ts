import dayjs from "dayjs"

export class TodayRemain {
  private taskId: any
  hours: number = 0
  minutes: number = 0
  seconds: number = 0
  constructor() {
    requestAnimationFrame(() => {
      this.taskId = setInterval(() => {
        this.calculateTodayRemain()
      }, 1000)
    })
  }


  private calculateTodayRemain() {
    const now = dayjs()
    const todayEnd = now.endOf('day')
    const duration = dayjs.duration(todayEnd.diff(now))

    this.hours = duration.get('hour')
    this.minutes = duration.get('minute')
    this.seconds = duration.get('second')
  }

  destroy() {
    clearInterval(this.taskId)
  }
}

