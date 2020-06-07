import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CloudOSAAppService } from './app.service';
import * as CanvasJS from '../assets/canvasjs.min';

@Component({
  selector: 'cloud-osa-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class CloudOSAAppComponent implements OnInit {
  title = 'Cloud OSA - Coding challenge';
  commandIp: any;
  queryResult;
  poller;
  persistDataOption = 'N';
  graphData = [];
  numberOfLayers = 0;
  maxNumberOfLayers = 2;
  logsContent: any = '';
  isPollerActive = false;
  lineColors = ['green', 'red'];
  isAppLoading = true;
  loadingData = false;
  constructor(private _cloudOSAppService: CloudOSAAppService) {}

  ngOnInit(): void {
    this.addContentToLog('Initializing....');
    this.getTraceData('NOT_POLLER');
  }

  onClickSingleTrace() {
    this.loadingData = true;
    this.getTraceData('NOT_POLLER');
  }

  getTraceData(requestFrom) {
    this._cloudOSAppService
      .getDataForSingleInstance()
      .subscribe((resdata: {}) => {
        this.loadingData = false;
        this.isAppLoading = false;
        if (typeof resdata['data'] != 'string' && resdata['code'] == 200) {
          if (requestFrom == 'POLLER' && !this.isPollerActive) return;
          this.addContentToLog('Fetching data using command SINGLE....');
          let xData = resdata['data']['xdata'];
          let yData = resdata['data']['ydata'];
          let lineColor = this.lineColors[0];
          if (xData.length != 0 && yData.length != 0) {
            this.addContentToLog(
              'Data received xAxisData:[' +
                xData.length +
                '], yAxisData:[' +
                yData.length +
                ']'
            );
            this.renderChart(xData, yData, lineColor);
          } else if (this.persistDataOption == 'Y') {
            this.addContentToLog(
              'Data persistance is enabled and no data received.. pulling data again using SINGLE....'
            );
            this.getTraceData('NOT_POLLER');
          } else {
            this.addContentToLog(
              'Data persistance is disabled and no data received....'
            );
          }
        } else {
          this.addContentToLog('Invalid response received....');
        }
      });
  }

  onClickRadioBtn(option?) {
    this.persistDataOption = option;
  }

  onClickGetData() {
    let payload = {
      query: this.commandIp,
    };
    this.queryResult = 'Fetching data for command: ' + this.commandIp;
    this.addContentToLog('User queried for command: ' + this.commandIp);
    this._cloudOSAppService
      .getDataForQuery(payload)
      .subscribe((resdata: {}) => {
        if (resdata['code'] == 200) {
          this.queryResult = resdata['data'];
          if (this.isTextJSON(this.queryResult)) {
            this.queryResult = JSON.parse(this.queryResult);
          }
        }
      });
  }

  isTextJSON(text) {
    return /^[\],:{}\s]*$/.test(
      text
        .replace(/\\["\\\/bfnrtu]/g, '@')
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          ']'
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
    );
  }

  renderChart(xData, yData, lineColor) {
    var dataSeries = { type: 'line' };
    var dataPoints = [];
    for (let i = 0; i < xData.length; i++) {
      dataPoints.push({ x: xData[i], y: yData[i] });
    }
    dataSeries['lineColor'] = lineColor;
    dataSeries['dataPoints'] = dataPoints;
    if (this.persistDataOption == 'N') {
      this.graphData = [];
      this.graphData.push(dataSeries);
    } else {
      dataSeries['lineColor'] = this.lineColors[this.numberOfLayers];
      this.graphData.push(dataSeries);
      this.numberOfLayers++;
      debugger;
      if (this.numberOfLayers > this.maxNumberOfLayers) {
        let color = this.graphData[0]['lineColor'];
        this.graphData.shift();
        this.graphData[this.graphData.length - 1]['lineColor'] = color;
      }
    }

    let chart = new CanvasJS.Chart('chartContainer', {
      axisX: {
        title: 'THz',
      },
      zoomEnabled: true,
      exportEnabled:true,
      theme: 'dark1',
      axisY: {
        title: 'dBm',
      },
      data: this.graphData,
    });
    chart.render();
  }

  onClickStartStop(clickType?) {
    this.graphData = [];
    if (clickType == 'START') {
      this.isPollerActive = true;
      this.addContentToLog('Command START executed....');
      this.poller = setInterval((_) => {
        this.getTraceData('POLLER');
      }, 1000);
    } else {
      this.isPollerActive = false;
      clearInterval(this.poller);
      this.addContentToLog('Command STOP executed....');
    }
  }

  addContentToLog(text) {
    let date = '' + new Date();
    this.logsContent += '[' + date.substring(0, 24) + '] ' + text + '\n';
  }
}
