// GLOBAL CONSTANTS
// -----------------------------------
//
import { browserHistory } from 'react-router';

var FTH_URL1 = "https://dev.fitobe.com/fitobe/api";
if (__RELEASE__) {
  FTH_URL1 = "https://api.fitobe.com/fitobe/api";
}
// export var FTH_URL = FTH_URL1;
export var FTH_URL = "http://localhost:8888/api";

var PRO_FTH_URL1 = "https://dev.fitobe.com/profitobe/api";
if (__RELEASE__) {
  PRO_FTH_URL1 = "https://api.fitobe.com/profitobe/api";
}
// export var PRO_FTH_URL = PRO_FTH_URL1;
export var PRO_FTH_URL = "http://localhost:8889/api";

//ROOT_PATH1 都會是 /wapp
var ROOT_PATH1 = "";
if (__PRERELEASE__) {
  ROOT_PATH1 = "/wapp";
}
export var ROOT_PATH = ROOT_PATH1;

//SITE_PATH 沒作用了
var SITE_PATH1 = "";
if (__PRERELEASE__) {
  SITE_PATH1 = "http://www.fitobe.com";
}
export var SITE_PATH = SITE_PATH1;

var _FB_CONFIG = {
  apiKey: "AIzaSyCB_NVfJmAhiyOm5vTh3VJMVRCCAPT_6Mo",
  authDomain: "fitobe-1125.firebaseapp.com",
  databaseURL: "https://fitobe-1125.firebaseio.com",
  storageBucket: "fitobe-1125.appspot.com",
  messagingSenderId: "834482908105"
};

if (__RELEASE__) {
  _FB_CONFIG = {
    apiKey: "AIzaSyCB_NVfJmAhiyOm5vTh3VJMVRCCAPT_6Mo",
    authDomain: "fitobe-1125.firebaseapp.com",
    databaseURL: "https://fitobe-1125.firebaseio.com",
    storageBucket: "fitobe-1125.appspot.com",
    messagingSenderId: "834482908105"
  };
}
export var FB_CONFIG = _FB_CONFIG;

var _FITOR = "0ab67eb0-bf7c-4fd7-b67e-b0bf7cbfd7c0"; //k.tseng@watics.com account
if (__RELEASE__) {
  _FITOR = "1655fb2b-e79d-4d39-95fb-2be79d6d3993"; //fitor@fitobe.com account
}
export var FITOR_ID = _FITOR;

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
      'api_version':'1.1.0',
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
      'api_version':'1.1.0'
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

export function wait(duration){
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}

import { checkUserAuth } from '../actions/index';
export function CheckUserAuth(x, pathname, endTo=ROOT_PATH+"/login") {
  if (x != null){
    checkUserAuth(x.token, x.uuid, pathname,endTo);
  } else{
    localStorage.clear();
    // !__RELEASE__ && console.log("wln",1);
    // window.location=endTo;
    browserHistory.push(endTo);
  }
}

export function codeToName(countryCode) {
  let chName = null;
  switch (countryCode) {
    case "TW":
      chName = "台灣";
    break;
    case "JP":
      chName = "日本";
    break;
    case "HK":
      chName = "香港";
    break;
    case "KR":
      chName = "南韓";
    break;
    case "US":
      chName = "美國";
    break;
    case "AU":
      chName = "澳洲";
    break;
    case "SG":
      chName = "新加坡";
    break;
    case "TH":
      chName = "泰國";
    break;
    case "CA":
      chName = "加拿大";
    break;
    case "CN":
      chName = "中國";
    break;
    case "VN":
      chName = "越南";
    break;
    case "MY":
      chName = "馬來西亞";
    break;
    case "DE":
      chName = "德國";
    break;
    case "GB":
      chName = "英國";
    break;
    default:
    break;
  }
  return chName;
}

export function CheckProFinishProfile(xp) {
  if (typeof xp !== 'undefined' && xp != null){
    if(xp.descript.trim() != '' && xp.keyWords.trim() != '' && xp.local.trim() != '' &&
        xp.name.trim() != '' && xp.photoSrc.trim() != '' &&
        xp.program != "{}"){ // && xp.paymentAccount.trim() != ''
      return true;
    }else{
      return false;
    }
  } else{
    return false;
  }
}

export function CheckProExpire(xp) {
  // TODO 先讓沒過期作測試
  if (typeof xp !== 'undefined' && xp != null){
    if(xp.expireTime == 0){
      return true;
    }else if(Number(xp.expireTime) > 0){
      var nn = Math.round(Date.parse(new Date().toISOString())/1000);
      if(nn > Number(xp.expireTime)){
        return true;
      }
      return false;
    }
  }
  return true;
}

export function GetProLocal(xp) {
  if (typeof xp !== 'undefined' && xp != null){
    var l = xp.local || "{}";
    var addr_1 = JSON.parse(l).addr1 || "";
    return addr_1;
  }else{
    return "";
  }
}

export function isAfterToday(fDate,ndy = 3) {
  var dtToday = new Date();
  // !__RELEASE__ && console.log("isafd",1,dtToday);

  var result = Math.floor(dtToday / 1000);
  result = new Date((result - (Number(ndy) * 24 * 60 * 60))*1000);
  dtToday = new Date(result);
  // !__RELEASE__ && console.log("isafd",2,dtToday);

  var dtAfter = new Date(fDate);
  // 取消 專家只能新增未來計畫的判斷
  // var dt1 = dtAfter.getFullYear();
  // var dt2 = dtAfter.getMonth() + 1;
  // var dt3 = dtAfter.getDate();
  // var dtAfter2 = new Date(dt1 + "/" + dt2 + "/" +dt3);
  // if (dtAfter2 <= dtToday){
  //   return false;
	// }else{
	// 	return true;
	// }

  if (dtAfter <= dtToday){
    return false;
	}else{
		return true;
	}

  return false;
}

export function userGoal(g) {
  switch (g){
    case 0:{
      return "減重";
      break;
    }
    case 1:{
      return "減脂";
      break;
    }
    case 2:{
      return "增重";
      break;
    }
    case 3:{
      return "增肌";
      break;
    }
    case 4:{
      return "生活健康";
      break;
    }
    case 5:{
      return "變美麗";
      break;
    }
    default:
      return "";
  }
}

export function addDays(days) {
    var ret = '';
    var result = Math.floor(Date.now() / 1000);
    days = Number(days) + 1;
    result = new Date((result + (days * 24 * 60 * 60))*1000);
    ret = (result.getMonth()+1) + '/' + result.getDate() + '/' + result.getFullYear();
    return ret
}


export function getPrice(l1) {

  var mtype = "US";
  var bsm_1 = 15;
  var bsm_2 = 15;
  var bsm_3 = 466;
  var bsy_1 = 130;
  var bsy_2 = 11;
  var bsy_3 = 4039;

  var psm_1 = 50;
  var psm_2 = 50;
  var psm_3 = 1554;
  var psy_1 = 490;
  var psy_2 = 41;
  var psy_3 = 15224;

  var np_1 = 36;
  var np_2 = 125;
  var np_3 = 520;
  var np_1_nt = 1119;
  var np_2_nt = 3884;
  var np_3_nt = 16156;

  var bk_1 = 18;
  var bk_2 = 36;
  var bk_3 = 60;
  var bk_1_nt = 559;
  var bk_2_nt = 1119;
  var bk_3_nt = 1864;
  switch (l1) {
    case "TW":
      mtype = "NT";
      bsm_1 = 405;
      bsm_2 = 405;
      bsm_3 = 405;
      bsy_1 = 3900;
      bsy_2 = 325;
      bsy_3 = 3900;

      psm_1 = 1605;
      psm_2 = 1605;
      psm_3 = 1605;
      psy_1 = 15500;
      psy_2 = 1298;
      psy_3 = 15500;

      np_1 = 990;
      np_2 = 3400;
      np_3 = 14000;
      np_1_nt = 990;
      np_2_nt = 3400;
      np_3_nt = 14000;

      bk_1 = 480;
      bk_2 = 990;
      bk_3 = 1680;
      bk_1_nt = 480;
      bk_2_nt = 990;
      bk_3_nt = 1680;

      break;
    case "HK":
      mtype = "HK";
      bsm_1 = 108;//港幣總
      bsm_2 = 108;
      bsm_3 = 427;//台幣總
      bsy_1 = 990;
      bsy_2 = 83;
      bsy_3 = 3911;

      psm_1 = 399;
      psm_2 = 399;
      psm_3 = 1576;
      psy_1 = 3990;
      psy_2 = 333;
      psy_3 = 15761;

      np_1 = 270;
      np_2 = 925;
      np_3 = 3795;
      np_1_nt = 1067;
      np_2_nt = 3654;
      np_3_nt = 14990;

      bk_1 = 130;
      bk_2 = 270;
      bk_3 = 450;
      bk_1_nt = 514;
      bk_2_nt = 1067;
      bk_3_nt = 1778;
      break;
    default:
      break;
  }

  return {
    mtype : mtype,
    bsm_1 : bsm_1,
    bsm_2 : bsm_2,
    bsm_3 : bsm_3,
    bsy_1 : bsy_1,
    bsy_2 : bsy_2,
    bsy_3 : bsy_3,

    psm_1 : psm_1,
    psm_2 : psm_2,
    psm_3 : psm_3,
    psy_1 : psy_1,
    psy_2 : psy_2,
    psy_3 : psy_3,

    np_1 : np_1,
    np_2 : np_2,
    np_3 : np_3,
    np_1_nt : np_1_nt,
    np_2_nt : np_2_nt,
    np_3_nt : np_3_nt,

    bk_1 : bk_1,
    bk_2 : bk_2,
    bk_3 : bk_3,
    bk_1_nt : bk_1_nt,
    bk_2_nt : bk_2_nt,
    bk_3_nt : bk_3_nt,
  };
}

export function desc1() {
  return "<span style='text-align:left;font-size:12px'>創業者計劃 - 個人用戶之基本計劃 跨出健康事業成功的首步<br/>拓展者計畫 - 個人用戶之進階計劃 擴展健康事業版圖零負擔<br/>可管理客戶 - 透過ProFiToBeX 您可以同時管理的客戶<br/>新FiToR客戶 - 透過FiToBe 您可以開發並連結的新客戶<br/>原有客戶 - 透過「邀請碼」您可以連結既有客戶<br/>備份客戶 - 您可以保留暫時無服務不需管理之舊客戶<br/>邀請碼 - 提供尚未成為「管理客戶」之既有客戶進行連結的專屬代碼</span>";
}

export function buyLevelName(l) {
  var buyLevel = "";
  if(l == "0"){buyLevel = "創業者月費計劃";}
  if(l == "2"){buyLevel = "拓展者月費計劃";}
  if(l == "1"){buyLevel = "創業者年費計劃";}
  if(l == "3"){buyLevel = "拓展者年費計劃";}
  return buyLevel;
}

// 傳入props的customerList計算過期客戶數量
export function getExpireCustomerCount(customerList){
  var expired_customer_count = 0;
  for(let i=0; i<customerList.length; i++){
    if(customerList[i].expired){
      expired_customer_count++;
    }
  }
  return expired_customer_count;
}
