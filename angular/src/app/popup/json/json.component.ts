import { StorageService } from 'src/app/service/storage.service';
import { Component } from '@angular/core';
import { StringStorageValue } from 'src/app/service/storage-value';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrl: './json.component.scss'
})
export class JsonComponent {

  inputValue: StringStorageValue
  outputValue = ''
  rows = 10
  constructor(private storageService: StorageService) {
    this.inputValue = new StringStorageValue(storageService, 'json.input', '')
    this.inputValue.subscribe(value => {
     //this.onInputChange(value)
    })
  }

  onInputChange(value: string) {
    if (value == '') {
      this.outputValue = ''
      return
    }
    try {
      this.outputValue = JSON.stringify(JSON.parse(value), null, 2)
    } catch (e) {

    }
  }
  format(){
    try {
      this.outputValue = JSON.stringify(JSON.parse(this.inputValue.value), null, 2)
    } catch (e) {

    }
  }
}
