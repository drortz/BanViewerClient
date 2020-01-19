import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderSpinnerService {

  constructor() { }

  private isToShowLoadingObs: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public isDisplayLoading(isToLoad: boolean) {
    this.isToShowLoadingObs.next(isToLoad);
  }

  getIsToShowLoadingObs() {
    return this.isToShowLoadingObs;
  }

}
