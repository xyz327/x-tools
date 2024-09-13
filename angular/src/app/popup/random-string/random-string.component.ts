import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ToastService } from './../../service/toast.service';
import { CopyService } from './../../service/copy.service';
import { StorageService } from './../../service/storage.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AutoCopyValue, BooleanStorageValue, IntStorageValue, StringStorageValue } from 'src/app/service/storage-value';

@Component({
  selector: 'app-random-string',
  templateUrl: './random-string.component.html',
  styleUrls: ['./random-string.component.scss']
})
export class RandomStringComponent implements OnInit {

  storageKey = 'RandomStringContent'
  customStorageKey = 'RandomStringCustomContent'
  lengthStorageKey = 'RandomStringCustomLength'
  value: string
  generateBtnIcon: IconProp = ['fas', 'plus']
  generateBtnName = '生成'
  candidates = [
    new Candidate("大写字母", true, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    new Candidate("小写字母", true, "abcdefghijklmnopqrstuvwxyz"),
    new Candidate("数字", false, "1234567890"),
    new Candidate("特殊符号", false, "!#%&"),
  ]
  autoCopy: AutoCopyValue
  length: IntStorageValue
  customCandidate: StringStorageValue
  constructor(private storageService: StorageService, private copyService: CopyService, private toastService: ToastService) {
    this.autoCopy = new AutoCopyValue(this.storageService)
    this.length = new IntStorageValue(this.storageService, "RandomStringLength", 10)
    this.length.subscribe(val => {
      if (val <= 0) {
        this.length.value = 1
      }
    })
    this.customCandidate = new StringStorageValue(this.storageService, "RandomStringCustomContent", "")
    this.candidates.forEach(val => val.withStorageValue(this.storageService))
   }

  ngOnInit(): void {
    this.generate()
  }
  generate(): void {
    let content = this.candidates.filter(val => val.enabled).map(val => val.content).join('')
    content += this.customCandidate.value
    let n = "";
    for (let i = 0; i < this.length.value; i++) {
      n += content.charAt(Math.floor(Math.random() * content.length) % content.length);
    }
    this.value = n
//    if (this.autoCopy.value){
      this.copy()
//    }
  }
  copy(): void {
    this.copyService.copy2Clipboard(this.value)
    .then(() => {
      this.generateBtnName = "结果已复制"
      this.generateBtnIcon = ['fas', 'copy']
      setTimeout(() => {
        this.generateBtnIcon = ['fas', 'plus']
        this.generateBtnName = '生成'
      }, 1000);
    })
  }
  clearCustom(): void {
    this.customCandidate.value = '';
  }
}

class Candidate {
  private value: BooleanStorageValue
  constructor(public name: string, private _enabled: boolean, public content: string) { }

  get enabled(): boolean {
    return this._enabled
  }
  set enabled(value: boolean) {
    this._enabled = value
    this.value.value = value
  }
  withStorageValue(storageService: StorageService): Candidate {
    this.value = new BooleanStorageValue(storageService, this.name, this._enabled)
    this._enabled = this.value.value
    return this
  }
}
