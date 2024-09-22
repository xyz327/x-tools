import { CopyService } from './../../service/copy.service';
import { StorageService } from 'src/app/service/storage.service';
import { Component } from '@angular/core';
import { StringStorageValue } from 'src/app/service/storage-value';
import { CopyButton } from 'src/app/service/copy-btn';

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

  onInputChange(value: string) {
    if (value == '') {
      this.outputValue = ''
      return
    }
    try {
      this.outputValue = JSON.stringify(JSON.parse(value), null, 2)
    } catch (e) {
      this.outputValue = e.message
    }
  }
  format() {
    this.onInputChange(this.inputValue.value)
  }
  copy() {
    this.copyBtn.copy(this.outputValue)
  }
}
