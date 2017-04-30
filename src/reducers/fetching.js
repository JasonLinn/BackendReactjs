
const initialState ={
  isFetching: false,
}

function fetching (state=initialState, action){
	switch (action.type){
		case "SEND_REQUEST":{
      return {...state, isFetching: true}
      break;
    }
    case "RECEIVE_RESPONSE":{
			return {...state, isFetching: false}
  		break;
    }
	}
	return state;
}

export default fetching;
