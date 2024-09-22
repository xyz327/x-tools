import { StorageService } from 'src/app/service/storage.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { StringStorageValue } from 'src/app/service/storage-value';
import { DiffMatchPatch } from 'diff-match-patch-ts';
import Diff from 'text-different/lib/dom/html'

@Component({
  selector: 'app-diff',
  templateUrl: './diff.component.html',
  styleUrl: './diff.component.scss'
})
export class DiffComponent implements OnInit {
  private readonly dmp = new DiffMatchPatch();

  public leftValue: StringStorageValue
  public rightValue: StringStorageValue
  rows = 4
  html = ''
  diffContainer: HTMLElement
  differ: Differ
  constructor(private storageService: StorageService, private elementRef: ElementRef) {
    this.leftValue = new StringStorageValue(storageService, "diff.leftValue", "")
    this.rightValue = new StringStorageValue(storageService, "diff.rightValue", "")

    this.leftValue.subscribe((v) => {
      this.update()
    })
    this.rightValue.subscribe((v) => {
      this.update()
    })
  }
  ngOnInit(): void {
    this.diffContainer = this.elementRef.nativeElement.querySelector('#diff-container')
    this.differ = new Diff(this.diffContainer, 'json')
    this.update()
  }
  update() {
    this.differ.render({
      oldCode: this.leftValue.value,   // Old code
      newCode: this.rightValue.value,  // New code
      hasLineNumber: true
    })
  }
}

interface Differ {
  render({ oldCode, newCode, hasLineNumber })
}
