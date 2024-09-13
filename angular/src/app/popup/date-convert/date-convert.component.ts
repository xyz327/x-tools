import { CopyService } from './../../service/copy.service';
import duration from 'dayjs/plugin/duration';
import customParseFormat from "dayjs/plugin/customParseFormat";
import { StorageService } from '../../service/storage.service';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import _ from "lodash";
import { Timezoneable, TodayRemain } from './today-remain';
import timezones, { Timezone } from "timezones.json"
import { Observable } from 'rxjs';
import { AutoCopyValue, TimestampTypeValue, TimezoneValue } from 'src/app/service/storage-value';

const defaultTz = "Asia/Hong_Kong"
dayjs.extend(duration)
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(defaultTz)
@Component({
  selector: 'app-date-convert',
  templateUrl: './date-convert.component.html',
  styleUrls: ['./date-convert.component.scss']
})
export class DateConvertComponent implements OnInit, OnDestroy,Timezoneable {


  timezone: TimezoneValue
  // 输入框的值
  inputVal: string = ''
  // 输出框的值
  outputVal: string = ''
  // 自动复制
  autoCopy: AutoCopyValue
  // 支持的时间戳格式
  allTimestampType: TimestampType[] = [new SecondType(), new MillisecondType()]
  allTimezone: Timezone[] = timezones
  timestampTypeMap: Map<string, TimestampType> = new Map()
  timestampType: TimestampTypeValue
  // 复制按钮
  copyBtnMap: Map<string, CopyBtnInfo> = new Map([
    ['inputVal', new CopyBtnInfo()],
    ['outputVal', new CopyBtnInfo()]
  ])
  storageKey = 'lastDateConvertTime'
  // 今天剩余时间
  todayRemain: TodayRemain = new TodayRemain(this)
  // 额外的时间格式
  extDateFormats = ["YYYY年MM月DD日", "YYYY年MM月DD日 HH时mm分ss秒"]
  constructor(private storageService: StorageService, private copyService: CopyService) {
    this.allTimestampType.forEach((val: TimestampType) => {
      this.timestampTypeMap.set(val.key, val)
    })
    this.autoCopy = new AutoCopyValue(this.storageService)
    this.timestampType = new TimestampTypeValue(this.storageService)
    this.timestampType.subscribe((val)=>{
      this.showDate()
    })
    this.timezone = new TimezoneValue(this.storageService)
    this.timezone.subscribe((val)=>{
      dayjs.tz.setDefault(val)
      this.showDate()
    })
  }
  getTimezone(): string {
    return this.timezone.value
  }

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.showDate(true)
    })
  }
  ngOnDestroy(): void {
    this.todayRemain.destroy()
  }
  swapValue() {
    [this.inputVal, this.outputVal] = [this.outputVal, this.inputVal]
  }

  showNowDate(): void {
    const now = dayjs();
    const timestampType = this.timestampTypeMap.get(this.timestampType.value)
    this.inputVal = timestampType.toTimestamp(now)
    this.showDate()
  }
  getInitInputVal(): string {
    return this.storageService.computeIfAbsent(this.storageKey, () => {
      const now = dayjs();
      const timestampType = this.timestampTypeMap.get(this.timestampType.value)
      return timestampType.toTimestamp(now)
    });
  }
  showDate(first: boolean = false) {
    const timestampType = this.timestampTypeMap.get(this.timestampType.value)
    if (this.inputVal == '') {
      this.inputVal = this.getInitInputVal()
    }

    let timestamp = _.toNumber(this.inputVal);
    let date;
    const isTimestamp = !_.isNaN(timestamp);
    if (isTimestamp) {
      const isUnix = this.inputVal.length == 10;
      date = isUnix ? dayjs.unix(timestamp) : dayjs(timestamp);
      date = date.tz(this.timezone.value)
      this.outputVal = timestampType.toDate(date);
    } else {
      date = dayjs(this.inputVal);
      if (!date.isValid()) {
        // 不是标准格式的时间字符串，尝试使用额外的 format 解析
        date = this.parseDateWithExtFormte(this.inputVal)
      }
      if (!date.isValid()) {
        this.outputVal = "时间格式不正确"
        return
      }
      this.outputVal = timestampType.toTimestamp(date)
    }
    this.storageService.set(this.storageKey, this.inputVal)
    // 不是初始化时 才自动 copy
    if (!first && this.autoCopy) {
      this.copy('outputVal')
    }
  }
  parseDateWithExtFormte(inputVal: string): any {
    return dayjs(inputVal, this.extDateFormats)
  }
  timezoneChange() {
    
  }
  timestampTypeChange() {
    this.showDate()
  }
  copy(type: string) {
    const content = this[type]
    if (content === '') {
      this.showDate()
    }
    const copyBtn = this.copyBtnMap.get(type);
    copyBtn.onCopy()
    this.copyService.copy2Clipboard(content)
      .then(() => copyBtn.success())
  }
  clearDate(): void {
    this.inputVal = ''
    this.outputVal = ''
  }
}

class CopyBtnInfo {
  loading: boolean = false
  text: string = '复制'
  onCopy(): void {
    this.loading = true
  }
  success(): void {
    this.text = '复制成功'
    this.loading = false
    setTimeout(() => {
      this.text = '复制'
    }, 1000)
  }
}
abstract class TimestampType {
  key: string
  desc: string
  dateFormate: string
  constructor(_key: string, _desc: string, _dateFormate: string) {
    this.key = _key
    this.desc = _desc
    this.dateFormate = _dateFormate
  }
  abstract toTimestamp(date: dayjs.Dayjs): string
  toDate(date: dayjs.Dayjs): string {
    return date.format(this.dateFormate)
  }
}
class SecondType extends TimestampType {
  constructor() {
    super('Second', '秒', 'YYYY-MM-DD HH:mm:ss')
  }
  toTimestamp(date: dayjs.Dayjs): string {
    return date.unix().toString()
  }
}
class MillisecondType extends TimestampType {
  constructor() {
    super('Millisecond', '毫秒', 'YYYY-MM-DD HH:mm:ss:SSS')
  }
  toTimestamp(date: dayjs.Dayjs): string {
    return date.valueOf().toString()
  }
}


