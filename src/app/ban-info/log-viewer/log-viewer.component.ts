import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.css']
})
export class LogViewerComponent implements OnInit {

  logViewerURL = 'http://cltv0281.sldc.sbc.com:8080/cgi-bin/logSearchTool/searchMenu.sh?searchpattern=';
  @Input() banId: string;
  @Input() dbUserName: string;
  @Output() isLoaded = new EventEmitter<boolean>();
  loaded = false;
  response;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.buildLogURL();
    this.httpClient.get(this.logViewerURL).subscribe(
      val => {
        this.response = val;
        this.isLoaded.emit(true);
        this.loaded = true;
      }
    );
  }

  buildLogURL() {
    this.logViewerURL = this.logViewerURL + this.banId + '&mySelect=Testing&mySelect2='
     + this.dbUserName.replace('ro', '') + '&jvmtype=';
  }
}
