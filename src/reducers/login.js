const INITIAL_STATE ={
  isLogin:false,
};

function login (state = INITIAL_STATE , action){
  switch(action.type){
    case 'LOG_IN':
      return {...state , isLogin: action.DataObj};
    default:
      return state;
  }
}
export default login;
