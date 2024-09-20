import { StorageService } from 'src/app/service/storage.service';
import { Component } from '@angular/core';
import { StringStorageValue } from 'src/app/service/storage-value';
import CryptoJS from "crypto-js";
import MD5 from "crypto-js/md5";

console.log('CryptoJS', CryptoJS, MD5)
@Component({
  selector: 'app-encoding',
  templateUrl: './encoding.component.html',
  styleUrl: './encoding.component.scss'
})
export class EncodingComponent {


  codecList: Codec[] = [
    {
      group: "Encode",
      name: "Base64",
      desc: "Base64 encoding and decoding",
      encode: (text: string) => btoa(text),
      decode: (text: string) => atob(text)
    },
    // URL with component
    {
      group: "Encode",
      name: "URI(Component)",
      desc: "URI encoding and decoding with component",
      encode: (text: string) => encodeURIComponent(text),
      decode: (text: string) => decodeURIComponent(text)
    },
    // URL without component
    {
      group: "Encode",
      name: "URI",
      desc: "URI encoding and decoding ",
      encode: (text: string) => encodeURI(text),
      decode: (text: string) => decodeURI(text)
    },
    // Unicode
    {
      group: "Encode",
      name: "Unicode",
      desc: "Unicode encoding and decoding",
      encode: (text: string) => text.split("").map(c => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0")).join(""),
      decode: (text: string) => text.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)))
    },
    //ascii
    {
      group: "Encode",
      name: "ASCII",
      desc: "ASCII encoding and decoding",
      encode: (text: string) => text.split("").map(c => c.charCodeAt(0).toString(10)).join("#"),
      decode: (text: string) => text.split("#").map(c => String.fromCharCode(parseInt(c, 10))).join("")
    },
    // Hashing
    // MD5
    {
      group: "Hashing",
      name: "MD5",
      desc: "MD5 hashing",
      encode: (text: string) => CryptoJS.MD5(text).toString(),
      decode: null
    },
    // SHA1
    {
      group: "Hashing",
      name: "SHA1",
      desc: "SHA1 hashing",
      encode: (text: string) => CryptoJS.SHA1(text).toString(),
      decode: null
    },
    // SHA256
    {
      group: "Hashing",
      name: "SHA256",
      desc: "SHA256 hashing",
      encode: (text: string) => CryptoJS.SHA256(text).toString(),
      decode: null
    },
    // SHA512
    {
      group: "Hashing",
      name: "SHA512",
      desc: "SHA512 hashing",
      encode: (text: string) => CryptoJS.SHA512(text).toString(),
      decode: null
    }
  ]

  groupedCodecMap: Map<string, Codec[]> = new Map()
  selectedCodec: StringStorageValue
  codec: Codec
  inputValue: StringStorageValue
  decodeDisabled: boolean
  outputValue: string = ""
  rows = 2
  constructor(private storageService: StorageService) {
    this.codecList.forEach(codec => {
      const group = this.groupedCodecMap.get(codec.group) || []
      group.push(codec)
      this.groupedCodecMap.set(codec.group, group)
    })
    this.selectedCodec = new StringStorageValue(this.storageService, "encoding.selectedCodec", "Base64")
    this.selectedCodec.subscribe(name => {
      this.setCodec(name)
    })
    this.setCodec(this.selectedCodec.value)

    this.inputValue = new StringStorageValue(this.storageService, "encoding.inputValue", "")
    if (this.inputValue.value != "") {
      this.encode()
    }
    this.inputValue.subscribe(value => {
      const rows= value.length / 20
      this.rows = Math.max(rows, 2)
    })
  }

  setCodec(name: string) {
    this.codec = this.codecList.find(c => c.name == name)!
    if (this.codec.decode == null) {
      this.decodeDisabled = true
    } else {
      this.decodeDisabled = false
    }
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
  group: string
  name: string
  desc: string
  encode(text: string): string;
  decode(text: string): string;
}
