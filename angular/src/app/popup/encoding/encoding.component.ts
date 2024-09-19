import { StorageService } from 'src/app/service/storage.service';
import { Component } from '@angular/core';
import { StringStorageValue } from 'src/app/service/storage-value';

@Component({
  selector: 'app-encoding',
  templateUrl: './encoding.component.html',
  styleUrl: './encoding.component.scss'
})
export class EncodingComponent {


  codecList: Codec[] = [
    {
      name: "Base64",
      desc: "Base64 encoding and decoding",
      encode: (text: string) => btoa(text),
      decode: (text: string) => atob(text)
    },
    // URL with component
    {
      name: "URI(Component)",
      desc: "URI encoding and decoding with component",
      encode: (text: string) => encodeURIComponent(text),
      decode: (text: string) => decodeURIComponent(text)
    },
    // URL without component
    {
      name: "URI",
      desc: "URI encoding and decoding ",
      encode: (text: string) => encodeURI(text),
      decode: (text: string) => decodeURI(text)
    },
    // Unicode
    {
      name: "Unicode",
      desc: "Unicode encoding and decoding",
      encode: (text: string) => text.split("").map(c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")).join(""),
      decode: (text: string) => text.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    },
    //ascii
    {
      name: "ASCII",
      desc: "ASCII encoding and decoding",
      encode: (text: string) => text.split("").map(c => c.charCodeAt(0).toString(10)).join("#"),
      decode: (text: string) => text.split("#").map(c => String.fromCharCode(parseInt(c, 10))).join("")
    },
  ]
  selectedCodec: StringStorageValue
  codec: Codec
  inputValue: StringStorageValue
  outputValue: string = ""
  constructor(private storageService: StorageService) {
    this.selectedCodec = new StringStorageValue(this.storageService, "encoding.selectedCodec", "Base64")
    this.selectedCodec.subscribe(name => {
      this.setCodec(name)
    })
    this.setCodec(this.selectedCodec.value)

    this.inputValue = new StringStorageValue(this.storageService, "encoding.inputValue", "")
    if (this.inputValue.value != "") {
      this.encode()
    }
  }

  setCodec(name: string) {
    this.codec = this.codecList.find(c => c.name == name)!
  }
  decode() {
    this.outputValue = this.codec.decode(this.inputValue.value)
  }
  encode() {
    this.outputValue = this.codec.encode(this.inputValue.value)
  }
  switchValue() {
    const tmp = this.inputValue.value
    this.inputValue.value = this.outputValue
    this.outputValue = tmp
  }
}


export interface Codec {
  name: string;
  desc: string
  encode(text: string): string;
  decode(text: string): string;
}
