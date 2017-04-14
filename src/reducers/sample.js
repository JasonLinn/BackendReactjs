
const initialState ={
  date: new Date().toISOString(),
  note:'',
  isFetching: false,
}

function sample (state=initialState, action){
	switch (action.type){
		case "SAMPLE_SEND_REQUEST":{
      return {...state, isFetching: true}
      break;
    }
    case "SAMPLE_RECEIVE_RESPONSE":{
			return {...state, isFetching: false}
  		break;
    }
	}
	return state;
}

export default sample;
