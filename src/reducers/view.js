const initialState ={
	show1:true,
	show2:false,
	show3:false
}
function view (state=initialState, action){
	switch (action.type){
		case "CHANGE_SHOW1":{
			return {...state, show1: true, show2: false, show3: false}
			break;
		}
		case "CHANGE_SHOW2":{
			return {...state, show1: false, show2: true, show3: false}
			break;
		}
		case "CHANGE_SHOW3":{
			return {...state, show1: false, show2: false, show3: true}
			break;
		}
	}
	return state;
}
export default view;
