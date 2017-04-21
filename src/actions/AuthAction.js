import CryptoJS from 'crypto-js';
import {browserHistory} from 'react-router';
import Decrypt from '../services/decrypt';
import * as COMMON from '../common/common';
import AuthFetchService from '../services/AuthService';

// 交給 dispatch 用的函式 區段===================================================
export function action_LogIn(isLogIn){
  return{type:'LOG_IN',DataObj:isLogIn};
}

// ~============================================================================
export function loginUser(mid, username, password ,endTo = COMMON.ROOT_PATH+'/indexbo.html') {
	return function (dispatch) {
    AuthFetchService.login(mid, username, password, function(result){
			if (result != false){
				dispatch(action_LogIn(true));

				// 判斷 回傳的結果的帳號種類
				dispatch(addToStorageBO(result.userProfile));
				dispatch(addToStorageMember(result.userProfile));

				if(/html/.test(endTo)){
					window.location = endTo;
				} else{
          browserHistory.push(endTo);
				}
			} else {
				!__RELEASE__ && console.log("loginUser",2,result);
				dispatch(action_LogIn(result));
			}
    });
  };
}

export function logout(uuid,token,endTo = COMMON.ROOT_PATH+'/loginbo.html'){
  return function(dispatch){
		AuthFetchService.logout(uuid, token, function(result){
			if (result.ok === true){
				!__RELEASE__ && console.log("w remove Store");
				localStorage.clear();
        if(/html/.test(endTo)){
					window.location = endTo;
				}else{
          browserHistory.push(endTo);
				}
			}else{
        return;
      }
		});
  };
}

// 將帳號資料放到 localStorage 後端管理帳號
function addToStorageBO(newState){
	return function (dispatch){
		var newObj=CryptoJS.AES.encrypt(JSON.stringify(newState), 'bousers');
		localStorage.setItem('bouser', newObj);
	};
}

// 將帳號資料放到 localStorage 會員
function addToStorageMember(newState){
	return function (dispatch){
		var newObj=CryptoJS.AES.encrypt(JSON.stringify(newState), 'memberusers');
		localStorage.setItem('memberuser', newObj);
	};
}
