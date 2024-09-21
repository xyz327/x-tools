import { DOCUMENT } from "@angular/common";
import { Injectable, ErrorHandler, Inject } from "@angular/core";
import { ErrorMsgEmiter } from "./service/emit";


@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  constructor(@Inject(DOCUMENT) private doc: any, private errorEmiter:ErrorMsgEmiter) {
    super();
  }
  override handleError(error:any):void{
    try {
      super.handleError(error);
    } catch (e) {
      this.reportError(e);
    }
    this.reportError(error);
  }
  reportError(e: any) {
    this.errorEmiter.next(e==null?'':e.message)
  }
}
