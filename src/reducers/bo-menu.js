const INITIAL_STATE ={
  userMenu:[],
};

function userMenu (state = INITIAL_STATE , action){
  switch(action.type){
    case 'BO_USER_MENU':
      return {...state , userMenu: action.DataObj};
    default:
      return state;
  }
}
export default userMenu;
