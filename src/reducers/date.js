const INITIAL_STATE ={
  date:new Date().toISOString()
};

function date (state = INITIAL_STATE , action){
  switch(action.type){
    case 'CHANGE_DATE':
      return {...state , date: action.DataObj};
    default:
      return state;
  }
}
export default date;
