// GLOBAL CONSTANTS
// -----------------------------------
import { browserHistory } from 'react-router';

var FTH_URL1 = "https://dev.fitobe.com/fitobe/api";
if (__RELEASE__) {
  FTH_URL1 = "https://api.fitobe.com/fitobe/api";
}
export var FTH_URL = FTH_URL1;

// -----------------------------------
export function FETCH_HEADERS(t) {
    return{
      'Accept':'application/json',
      'Application_Key':'13524932',
      'Authorization': t,
      'lang':'zh',
      'timezone':'Asia/Taipei',
      'OS_type':'web',
      'device_model':'web',
      'OS_version':'web',
      'api_version':'1.0.0',
      'Content-Type':'application/x-www-form-urlencoded'
  };
}

export function FETCH_GET_HEADERS(t) {
    return{
      'Accept':'application/json',
      'Application_Key':'13524932',
      'Authorization': t,
      'lang':'zh',
      'timezone':'Asia/Taipei',
      'OS_type':'web',
      'device_model':'web',
      'OS_version':'web',
      'api_version':'1.0.0'
  };
}

export function toQueryString(obj){
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}
// -----------------------------------
export function wait(duration){
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
