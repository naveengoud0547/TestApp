import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


//import 'rxjs/add/operator/map';




/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ServiceProvider {

    constructor(public http: Http) {
        this.http = http
    }
         public baseURL = "http://kountdwnapi.azaz.com/KountDwn.svc/";// (development url)
         //public baseURL = "http://api.kountdwn.com/KountDwn.svc/";// (production url)

         //stagingApiURL: string = "http://staginginfapi.findyourinfluence.com/fyiapi.svc/";
         productionApiURL: string = "http://infapi.findyourinfluence.com/fyiapi.svc/";

  public KDSaveMethod(formdata,method) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
     
      var url = this.baseURL + method;
      let options = new RequestOptions({ headers: headers });
      return this.http.post(url, formdata, options)
          .map(res => res.json())
          .catch(this.handleError);

  }

  public KDGetThemes(method) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      var url = this.baseURL + method;
      let options = new RequestOptions({ headers: headers });
      return this.http.post(url,options)
          .map(res => res.json())
          .catch(this.handleError);

  }

  public getJSONData() {
      return this.http.get("assets/timezone.json")
          .map(res => res.json())
          .catch(this.handleError);
  }

  deviceTokenSave(lToken, mobileToken, DeviceName, Status) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', lToken);
      let params: any = {};
      params.mobileToken = mobileToken;
      params.DeviceName = DeviceName;
      params.Status = Status;
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.productionApiURL + 'MobileTokenCheck', params, options)
          .map(res => res.json());

  }

  
  handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }

}
