import { combineReducers, createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Rx from 'rxjs/Rx';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/observable/dom/ajax'
import { mapTo } from 'rxjs/operator';


const fetchUserFulfilled = payload => ({ type: "data", payload, date:Date.now() });


 const userEpic = (action$,store) =>{
     
return action$.ofType('getData')
.switchMap(action =>{
    return ajax({
        method: "GET",
        responseType:"text",
        url: "http://localhost:8000"
    })
      .switchMap(x => {   
        console.log(store.getState());     
        return Rx.Observable.concat(
             Rx.Observable.of( fetchUserFulfilled(x.response)),
             Rx.Observable.of( {type: "loaded"}))
    })
    .takeUntil(action$.ofType('cancelData'))
    }
  );
}

const loaderEpic = action$ =>{
    //console.log("from here")
    return action$.ofType('getData')
    .mapTo({ type: "loading"})
}




const epicMiddleware = createEpicMiddleware(combineEpics(userEpic,loaderEpic));


const dataReducer=function(state=[],action){
if(action.type==="data"){
    //return state.push({data: action.payload,point:action.date});
    return [...state,{data: action.payload,point:action.date}]
}
return state;
}

const load={
    loading:0
}
const loadReducer=function(state={loading:"loaded"},action){
    if(action.type==="loading"){
        return Object.assign({},state,{loading:"loading...."})
    }
    else if(action.type==="loaded"){
        return Object.assign({},state,{loading:"loaded"})
    }
    return state;
}


const reducers=combineReducers({
    data:dataReducer,
    load:loadReducer
})

//const middleWare=applyMiddleware(thunk);

const middleWare=applyMiddleware(epicMiddleware);

export default createStore(reducers,middleWare);