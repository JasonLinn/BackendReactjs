import CryptoJS from 'crypto-js';
import {browserHistory} from 'react-router';
import Decrypt from '../services/decrypt';
import * as COMMON from '../common/common';
import AuthFetchService from '../services/AuthService';

export function testGet(email){
	return function (dispatch){
		AuthFetchService.getBy(1,2,3, function(result){
			if (result != false){
				dispatch(action_LogIn(true));
			} else {
				dispatch(action_LogIn(false));
			}
		})
	};
}

export function action_LogIn(isLogIn){
  if(isLogIn){
    return{type:'LOG_IN',DataObj:'true'};
  }else{
    return{type:'LOG_IN',DataObj:'false'};
  }
}
