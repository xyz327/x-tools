import { DOCUMENT } from "@angular/common";
import { Injectable, ErrorHandler, Inject } from "@angular/core";
import { StorageService } from "./service/storage.service";
import { ErrorEmiter } from "./service/emit";


@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  constructor(@Inject(DOCUMENT) private doc: any, private errorEmiter:ErrorEmiter) {
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
    this.errorEmiter.next(e)
  }
}
