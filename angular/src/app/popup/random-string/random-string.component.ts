import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ToastService } from './../../service/toast.service';
import { CopyService } from './../../service/copy.service';
import { StorageService } from './../../service/storage.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

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
  _length = 10
  _customCandidate = ''
  generateBtnIcon: IconProp = ['fas', 'plus']
  generateBtnName = '生成'
  candidates = [
    new Candidate("大写字母", true, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
    new Candidate("小写字母", true, "abcdefghijklmnopqrstuvwxyz"),
    new Candidate("数字", false, "1234567890"),
    new Candidate("特殊符号", false, "!#%&"),
  ]
  constructor(private storageService: StorageService, private copyService: CopyService, private toastService: ToastService) { }

  ngOnInit(): void {
    this._customCandidate = this.storageService.computeIfAbsent(this.customStorageKey, () => '')
    this._length = +this.storageService.computeIfAbsent(this.lengthStorageKey, () => 10)
    const content = this.storageService.computeIfAbsent(this.storageKey, () => {
      return JSON.stringify(this.candidates)
    })
    this.candidates = JSON.parse(content)

    this.generate()
  }
  get length(): number {
    return this._length;
  }
  set length(length: number) {
    this._length = length
    this.storageService.set(this.lengthStorageKey, this._length + '')
  }
  get customCandidate(): string {
    return this._customCandidate;
  }
  set customCandidate(customCandidate: string) {
    this._customCandidate = [...new Set(customCandidate.split(''))].join('')
    this.storageService.set(this.customStorageKey, this._customCandidate)
  }
  generate(): void {
    let content = this.candidates.filter(val => val.enabled).map(val => val.content).join('') + this.customCandidate
    content = [...new Set(content.split(''))].join('')
    let n = "";
    for (let i = 0; i < this.length; i++) {
      n += content.charAt(Math.floor(Math.random() * content.length));
    }
    this.value = n

    this.storageService.set(this.storageKey, JSON.stringify(this.candidates))

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
    this.customCandidate = '';
    this.storageService.clear(this.customStorageKey)
  }
}

class Candidate {
  constructor(public name: string, public enabled: boolean, public content: string) { }

}
