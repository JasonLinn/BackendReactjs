const INITIAL_STATE ={
  isLogin:false,
};

function login (state = INITIAL_STATE , action){
  switch(action.type){
    case 'LOG_IN':
      !__RELEASE__ && console.log("reduce",action.DataObj);
      return {...state , isLogin: action.DataObj};
    default:
      return state;
  }
}
export default login;
