import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public loaderMessage = '';

  public authObject: {
    token: string,
    tokenExpiration: number,
    userId: string,
  };

  constructor(public _spinner: NgxSpinnerService) { }

  /**
    * To show spinner with Message
    */
  showSpinner() {
    this._spinner.show();
  }

  /**
  * To show spinner with Message
  */
  hideSpinner() {
    this._spinner.hide();
  }
}
