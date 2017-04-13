import auth from '../utils/auth';
import { browserHistory } from 'react-router';
import CryptoJS from 'crypto-js';
import register from '../utils/register';
import forgetpassword from '../utils/forgetpassword';
import Decrypt from '../utils/decrypt';
import * as COMMON from '../common/common';
import {savePolicy,getPolicyList} from './PolicyAction';

export function forgetPassword(email){
	return function (dispatch){
		forgetpassword.forget(email, function(result){
			if (result !=false){
				dispatch(changeForgotModal(true));
				// forwardTo("/login");
			} else {
				dispatch(changeLoginModal(true));
			}
		})
	};
}

export function signUpUsers(obj, endTo = COMMON.ROOT_PATH+'/dashboard'){
	return function (dispatch){
		!__RELEASE__ && console.log("signining user",1,obj);
		var userObj = obj;
		register.registerUser(obj, function(result){
			if (result != false){
				!__RELEASE__ && console.log(result);
				!__RELEASE__ && console.log("signining user this is userobj",2,userObj);
				!__RELEASE__ && console.log("signining user cleared form",3);
				!__RELEASE__ && console.log("signining user in",4);
				// dispatch(clearSignUpForm());
				const userP = {
					email:result.userProfile.email,
					id:userObj.fb_id,
					token:userObj.fb_token,
				}

				if (result.userProfile.loginProvider === "fitobe"){
					!__RELEASE__ && console.log("signining user in",5,result.userProfile.email, userObj.password,endTo);
					dispatch(loginUser(result.userProfile.email, userObj.password,endTo));
					!__RELEASE__ && console.log("signining user in",6,result.userProfile.email, userObj.password,endTo);
				}
				if (result.userProfile.loginProvider === "google"){
					!__RELEASE__ && console.log("signining user in",7,result.userProfile.email, userObj.password,endTo);
					dispatch(loginGoogleUser(userP,endTo));
					!__RELEASE__ && console.log("signining user in",8,result.userProfile.email, userObj.password,endTo);
				}
				if (result.userProfile.loginProvider === "facebook"){
					!__RELEASE__ && console.log("signining user in",9,result.userProfile.email, userObj.password,endTo);
					dispatch(loginFbUser(userP,endTo));
					!__RELEASE__ && console.log("signining user in",10,result.userProfile.email, userObj.password,endTo);
				}

				// 註冊成功代表同時同意兩個授權
				!__RELEASE__ && console.log("signining user in",11,userP,result.userProfile.uuid);
				!__RELEASE__ && console.log("signining user in",12,userP,result.userProfile);
				dispatch(savePolicy(result.userProfile.uuid,{user_id:result.userProfile.uuid,agree_item:"TK1"},result.userProfile));
				dispatch(savePolicy(result.userProfile.uuid,{user_id:result.userProfile.uuid,agree_item:"TK2"},result.userProfile));
				!__RELEASE__ && console.log("signining user in2",13);

			} else {
				var auth2 = gapi.auth2.getAuthInstance();
				auth2.signOut().then(function () {
					!__RELEASE__ && console.log('signining user out.',8);
				});
				!__RELEASE__ && console.log("signining user",9,result);
				dispatch(changeLoginModal2(true));

				if(/pbx/.test(endTo)){
					if(/html/.test(endTo)){
						window.location = endTo;
					} else{
						forwardTo(COMMON.ROOT_PATH+'/pbx/login');
					}
				}else{
					if(/html/.test(endTo)){
						window.location = endTo;
					} else{
						forwardTo(COMMON.ROOT_PATH+'/login');
					}
				}
			}
		});
	}
}

export function addGoalweight(state){
	return {type: "ADD_GOALWEIGHT",payload: state};
}

export function clearSignUpForm(){
	return {type: "CLEAR_FORM", payload: null};
}

export function loginUser(username, password ,endTo = COMMON.ROOT_PATH+'/dashboard') {
	return function (dispatch) {
		var provider = "fitobe";
		var token = null;
		var id = null;
    auth.login(username, password,provider,token, id, function(result){
			if (result != false){
	    	dispatch(addLoginProfile(result.userProfile));
				dispatch(isLoggedIn(true));
				dispatch(addToStorage(result.userProfile));
				!__RELEASE__ && console.log("loginUser",1,result);
				dispatch(addToStoragePro(result.professionalData));
				dispatch(clearSignUpForm());

				dispatch(getPolicyList(result.userProfile.uuid,result.userProfile));
				// 等待getPolicyList處理完，否則Decrypt.decryptPolicy()會拿到NULL導致app-bex無法直接進入使用條款提示頁
				COMMON.wait(1000).then(function(){
					if(/html/.test(endTo)){
						window.location = endTo;
					} else{
						forwardTo(endTo);
					}
				});
				// window.location = COMMON.ROOT_PATH+'/dashboard';

				// window.location = endTo;
			} else {
				!__RELEASE__ && console.log("loginUser",2,result);
				dispatch(isLoggedIn(result));
				dispatch(changeLoginModal(true));
			}
    });
  };
};

export function loginFbUser(userProf,endTo = COMMON.ROOT_PATH+'/dashboard'){
	return function (dispatch){
		var provider = "facebook";
		var password = null;
		// !__RELEASE__ && console.log(email, token, id);
		auth.login(userProf.email,password,provider,userProf.token, userProf.id, function(result){
			if (result != false){
				dispatch(addLoginProfile(result.userProfile));
				dispatch(isLoggedIn(true));
				dispatch(addToStorage(result.userProfile));
				// !__RELEASE__ && console.log(result);
				dispatch(addToStoragePro(result.professionalData));
				dispatch(clearSignUpForm());

				dispatch(getPolicyList(result.userProfile.uuid,result.userProfile));
				if(/html/.test(endTo)){
					window.location = endTo;
				} else{
					forwardTo(endTo);
				}
				// window.location = endTo;
			} else {
				dispatch(isLoggedIn(result));
				dispatch(clearSignUpForm());
				dispatch(addFacebookuser(userProf));

				if(/pbx/.test(endTo)){
					//forwardTo(COMMON.ROOT_PATH+'/xbp/joinus');
					window.location = COMMON.ROOT_PATH+'/xbpjoinus.html';
				}else{
					//forwardTo(COMMON.ROOT_PATH+'/joinus');
					window.location = COMMON.ROOT_PATH+'/joinus.html';
				}

				dispatch(changeSetup(true));

				// dispatch(changeLoginModal(true));
			}
		});
	};
};

export function loginGoogleUser(userProf,endTo = COMMON.ROOT_PATH+'/dashboard'){
	return function (dispatch){
		var provider = "google";
		var password = null;
		// !__RELEASE__ && console.log(email, token, id);
		if(userProf.email == "k.chang@watics.com")
			console.log('email: ',userProf.email,', id: ', userProf.id,' , token: ',userProf.token);
		auth.login(userProf.email,password,provider,userProf.token, userProf.id, function(result){
			if (result != false){
				dispatch(addLoginProfile(result.userProfile));
				dispatch(isLoggedIn(true));
				dispatch(addToStorage(result.userProfile));
				// !__RELEASE__ && console.log(result);
				dispatch(addToStoragePro(result.professionalData));
				dispatch(clearSignUpForm());

				dispatch(getPolicyList(result.userProfile.uuid,result.userProfile));

				if(/html/.test(endTo)){
					window.location = endTo;
				} else{
					forwardTo(endTo);
				}
				// window.location = endTo;
			} else {
				dispatch(isLoggedIn(result));
				// Instantly Sign the user out because they are not registered
				var auth2 = gapi.auth2.getAuthInstance();
		    auth2.signOut().then(function () {
		      // !__RELEASE__ && console.log('User signed out.');
		    });
				// dispatch(changeLoginModal(true));
				dispatch(clearSignUpForm());
				dispatch(addGoogleuser(userProf));

				if(/pbx/.test(endTo)){
					//forwardTo(COMMON.ROOT_PATH+'/xbp/joinus');
					window.location = COMMON.ROOT_PATH+'/xbpjoinus.html';
				}else{
					//forwardTo(COMMON.ROOT_PATH+'/joinus');
					window.location = COMMON.ROOT_PATH+'/joinus.html';
				}

				dispatch(changeSetup(true));
			}
		});
	};
};

function forwardTo(location) {
	!__RELEASE__ && console.log('forwardTo(' + location + ')');
  browserHistory.push(location);
};

export function checkUserAuth(token, uuid, location,endTo = COMMON.ROOT_PATH+'/login'){
  return function (dispatch){
		if (token != null){
	    auth.checkStatus(token, uuid, function(result){
				!__RELEASE__ && console.log("checkUserAuth", result);
	      if (result.ok === true) {
					var loc = location;
					var res = loc.toLowerCase();
	        dispatch(isLoggedIn(true));

					const ignores = Object.freeze([/^\/$/, /\/user\/login$/, /\.(html|jpg|png|gif|ico|js|css|mp4|eot|svg|ttf|woff|mp3|json|woff2)$/i]);

					// 如果当前请求的接口url在ignores数组中，或者当前用户已经存在session.user，则通过
					const some = ignores.some(item => item.test(res));
					!__RELEASE__ && console.log("checkUserAuth", 1, res);

					if (some || result.ok === true) {
						!__RELEASE__ && console.log("checkUserAuth",2,result);
						result.json().then(function (data){
							!__RELEASE__ && console.log("checkUserAuth", 3,data);

							if (data.newToken != null){
								var x = Decrypt.decryptData();
								x.token = result.newToken.newToken;
								dispatch(addToStorage(x));
							}
						});

							// forwardTo('/dashboard');
					} else {
						!__RELEASE__ && console.log("checkUserAuth", 4);
						localStorage.removeItem('fitobeuser');
						localStorage.removeItem('fitobep');
						dispatch(forwardTo(res));
					}
					//
					// if(res != "/login" && res != "/joinus" && res != "/" && res != "/home"){
					// 	//[/^\/$/, /\/user\/login$/, /\.(html|jpg|png|gif|ico|js|css|mp4|eot|svg|ttf|woff|mp3|json|woff2)$/i]
					// 	!__RELEASE__ && console.log(typeof res);
					// 	!__RELEASE__ && console.log(res !="/login");
					// 	!__RELEASE__ && console.log("path for user input location", res);
					// 	forwardTo(res);
					// } else {
					// 	forwardTo('/dashboard');
					// }
					return true;
	      } else {
					!__RELEASE__ && console.log("checkUserAuth",5);
	        dispatch(isLoggedIn(false));
					var loc = location;
					var res = loc.toLowerCase();
					!__RELEASE__ && console.log("checkUserAuth",6);
					if (res != COMMON.ROOT_PATH+"/login" && res != COMMON.ROOT_PATH+"/joinus" &&
					res !=COMMON.ROOT_PATH+"/"){
						!__RELEASE__ && console.log("checkUserAuth",7);
						localStorage.removeItem('fitobeuser');
						localStorage.removeItem('fitobep');
						forwardTo(endTo);
					}

					return false;
	      }
	    });
		}
		// if (location.toLowerCase() != '/joinus'){
		// 	!__RELEASE__ && console.log("this is token aaaaaaaaaa", token);
		//
		// 	!__RELEASE__ && console.log("did not pass token false");
		// 	forwardTo('/login');
		// };
  };
}

export function logoutUser(token,uuid,provider,endTo = COMMON.ROOT_PATH+'/login'){
  return function(dispatch){
		auth.logout(token, uuid, function(result){
			if (result.ok === true){
				if (provider === "google"){
					dispatch(logoutGoogleUser(true,endTo));
				}
				action_fbLogOut();
				// localStorage.removeItem('fitobeuser');
				// localStorage.removeItem('fitobep');
				// localStorage.removeItem('ply');
				!__RELEASE__ && console.log("w remove WebFitobeStore WebBexStore");
				localStorage.clear();
				if( !(provider === "google") && endTo != ''){ forwardTo(endTo) };
			//	if(endTo != ''){window.location = endTo;}
			}
			if (result.status === 403){
				dispatch(logoutGoogleUser(true,endTo));
				action_fbLogOut();
				// localStorage.removeItem('fitobeuser');
				// localStorage.removeItem('fitobep');
				// localStorage.removeItem('ply');
				!__RELEASE__ && console.log("403 remove WebFitobeStore WebBexStore");
				localStorage.clear();
				// forwardTo(endTo);
				// if(endTo != ''){window.location = endTo;}
				if(endTo != ''){forwardTo(endTo);}
			}
			if(result.status === 422){
				dispatch(logoutGoogleUser(true));
				action_fbLogOut();
				// localStorage.removeItem('fitobeuser');
				// localStorage.removeItem('fitobep');
				// localStorage.removeItem('ply');
				!__RELEASE__ && console.log("422 remove WebFitobeStore WebBexStore");
				localStorage.clear();
				// forwardTo(endTo);
				// if(endTo != ''){window.location = endTo;}
				if(endTo != ''){forwardTo(endTo);}
			}
		});
  };
}
export function logoutGoogleUser(a,endTo = COMMON.ROOT_PATH+'/login'){
	return function (dispatch){
		// !__RELEASE__ && console.log(gapi);
		// if (gapi.auth2 != undefined){
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			action_fbLogOut();
			localStorage.removeItem('fitobeuser');
			localStorage.removeItem('fitobep');
			forwardTo(endTo);
		});
		// var auth2 = gapi.auth2.getAuthInstance();
		// !__RELEASE__ && console.log(gapi.auth2);
		// gapi.auth2.getAuthInstance().then(function (res){
		// 	res.signOut().then(function(){
		// 		action_fbLogOut();
		// 		localStorage.clear('fitobeuser');
		// 		forwardTo('/login');
		//
		// 		// window.location = '/login';
		// 	});
		// });
		// } else {
		// 	action_fbLogOut();
		// 	localStorage.clear('fitobeuser');
		// 	forwardTo('/login');
		// 	// window.location = '/login';
		// }
	};
}

export function isLoggedIn(newState){
  return {type: "IS_LOGGEDIN", payload: newState};
}

function addToStorage(newState){
	return function (dispatch){
		// !__RELEASE__ && console.log("this is state passed into crypto", newState);
		var newObj=CryptoJS.AES.encrypt(JSON.stringify(newState), 'fitobeusers');
		localStorage.setItem('fitobeuser', newObj);
	};
}

export function addToStoragePro(newState){
	return function (dispatch){
		// !__RELEASE__ && console.log("this is state passed into crypto 1111111", newState);
		var newObj=CryptoJS.AES.encrypt(JSON.stringify(newState), 'professionalData');
		localStorage.setItem('fitobep', newObj);

    // // 4 第一次使用 , 畫面會改為 ９
		// var profst = localStorage.getItem('profst') || '4';
		// if(profst == '4'){
		// 	localStorage.setItem('profst', '4');
		// }
	};
}
export function addLoginProfile(newState){
	return {type: "ADD_USERPROFILE", payload: newState};
}
// UI change for Register
export function changeJoinus(newState){
	return {type: "CHANGE_JOINUS", newState };
}
export function changeSetup(newState){
	return {type: "CHANGE_SETUP", newState };
}
export function changeSetup2(newState){
	return {type: "CHANGE_SETUP2", newState };
}

export function addFitobeuser(newState){
	return {type: "ADD_FITOBEUSER", payload: newState };
}
export function addGoogleuser(newState){
	return {type: "ADD_GOOGLEUSER", payload: newState };
}
export function addFacebookuser(newState){
	return {type: "ADD_FACEBOOKUSER", payload: newState };
}

export function addSetup(newState){
	return {type: "ADD_SETUP", payload: newState };
}
export function changeLoginModal(data){
	return {type: "CHANGE_LOGIN_POP_UP", payload: data};
}
export function changeLoginModal2(data){
	return {type: "CHANGE_LOGIN_POP_UP2", payload: data};
}
export function changeForgotModal(data){
	return {type: "CHANGE_FORGOT_POP_UP", payload: data};
}
export function dspChangeLoginModal2(data){
	dispatch(changeLoginModal2(data));
}
export function changeToLogin(endTo = COMMON.ROOT_PATH+'/login'){
	return function(dispatch){
		dispatch(changeForgotModal(false));
		forwardTo(endTo);
	};
}
// Fb login actions

export function action_fbLogIn (isLogIn){
  if(isLogIn){
    return{
      type:'FB_LOG_IN',
      payload:'true'
    };
  }else{
    return{
      type:'FB_LOG_IN',
      payload:'false'
    };
  }
}
export function action_getFbName (name){
  return{
    type:'FB_NAME',
    payload:name
  };
}
export function action_fbLogOut(){
  return{
    type:'FB_LOG_OUT',
    payload:null
  }
}
export function action_getFbEmail(email){
  return{
    type:'FB_EMAIL',
    payload:email
  }
}
export function action_getFbPicture(picture){
  return{
    type:'FB_PICTURE',
    payload:picture
  }
}

export function changeGender(newState) {
	return {type: "CHANGE_GENDER", payload: newState};
}

export function setPcy1(d) {
	return {type: "JOINUS_PCY1", data: d};
}
export function setPcy2(d) {
	return {type: "JOINUS_PCY2", data: d};
}
