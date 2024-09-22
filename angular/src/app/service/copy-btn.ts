import { CopyService } from './copy.service';


export interface ButtonConfig {
  icon: string;
  text: string;
}
export class CopyButton {
  icon: string;
  text: string;
  loading = false
  constructor(private copyService: CopyService, private copyBtn: ButtonConfig, private copiedBtn: ButtonConfig) {
    this.icon = copyBtn.icon
    this.text = copyBtn.text
  }

  copy(text: string) {
    this.loading = true
    this.icon = 'spinner'
    this.copyService.copy2Clipboard(text).then(() => {
      this.text = this.copiedBtn.text
      this.icon = this.copiedBtn.icon
      setTimeout(() => {
        this.icon = this.copyBtn.icon
        this.text = this.copyBtn.text
      }, 1000);
    }).finally(() => {
      this.loading = false
    })
  }
}
