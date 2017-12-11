import React from 'react'
import { connect } from 'react-redux';
import axios from "axios";


@connect((store)=>{
  //  console.log(store);
    return{
        dataRec:store.data,
        loadRec:store.load
    };
})

export default class App extends React.Component{

constructor(){
 super();
 this.handleClick=this.handleClick.bind(this);
}

handleClick(e){
    console.log("hello button clicked");

 /* this.props.dispatch(

    (dispatch) =>{
    dispatch({type: "loading"});
    axios.get("http://localhost:8000")
      .then((response) => {
          console.log(response.data)
        dispatch({"type":"data",payload:response.data,date:Date.now()});
        dispatch({type: "loaded"});
    
      })
      .catch((err) => {
        dispatch({type: "FETCH_TWEETS_REJECTED", payload: err})
      })
  }

  )*/
  this.props.dispatch({type: "getData"})
  ////setTimeout(()=>this.props.dispatch({type: "cancelData"}),3000)

}




render(){
 //   console.log("Props passed here "+ JSON.stringify(this.props.loadRec));
//console.log("coming for render")
    const createData=this.props.dataRec.map((rec,key)=>{
           return <li key={rec.point}>{rec.data}</li>
    })

    //console.log(createData)


    return(
        <div>
           <h2>{this.props.loadRec.loading}</h2>
            <button onClick={this.handleClick}>Click me </button>
            <div>
                <ul>
                { createData}
                </ul>
            </div>  
        </div>
    )
}



}