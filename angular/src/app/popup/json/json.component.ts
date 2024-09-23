import { CopyService } from './../../service/copy.service';
import { StorageService } from 'src/app/service/storage.service';
import { Component } from '@angular/core';
import { StringStorageValue } from 'src/app/service/storage-value';
import { CopyButton } from 'src/app/service/copy-btn';
import JSON5 from 'json5'

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss'
})
export class JsonComponent {

  inputValue: StringStorageValue
  outputValue = ''
  rows = 10
  copyBtn: CopyButton
  constructor(private storageService: StorageService, private copyService: CopyService) {
    this.inputValue = new StringStorageValue(storageService, 'json.input', '')
    this.inputValue.subscribe(value => {
      //this.onInputChange(value)
    })
    this.copyBtn = new CopyButton(copyService, { icon: 'copy', text: '复制' }, { icon: 'check', text: '已复制' })
  }

  onInputChange(value: string, space: number) {
    if (value == '') {
      this.outputValue = ''
      return
    }
    try {
      this.outputValue = JSON.stringify(JSON5.parse(value), null, space)
    } catch (e) {
      this.outputValue = e.message
    }
  }
  format() {
    this.onInputChange(this.inputValue.value, 2)
  }
  copy() {
    this.copyBtn.copy(this.outputValue)
  }
  zip() {
    try {
      this.outputValue = JSON.stringify(JSON5.parse(this.inputValue.value))
    } catch (e) {
      this.outputValue = e.message
    }
  }
  escape() {
    // json转义
    this.zip()
    this.outputValue = this.outputValue.replaceAll(/\\/g, '\\\\').replaceAll(/\"/g, '\\"')
  }
  unescape() {
    const val = this.inputValue.value.replaceAll(/\\"/g, '"').replaceAll(/\\\\/g, '\\')
    this.onInputChange(val, 0)
  }
}
