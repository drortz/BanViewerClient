import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderSpinnerService } from '../services/loader-spinner.service';

declare var $: any;

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.css']
})
export class LoaderSpinnerComponent implements OnInit {

  constructor(private loaderSpinnerService: LoaderSpinnerService) {
    loaderSpinnerService.getIsToShowLoadingObs().subscribe(
      (isToShowLoading) => {
        if(isToShowLoading) {
          this.show();
        }
        else {
          this.hide();
        }
      }
    );
  }

  ngOnInit() {
  }

  show() {
    $("#load-modal").modal('show');
  }

  hide() {
    $("#load-modal").modal('hide');
  }
}

