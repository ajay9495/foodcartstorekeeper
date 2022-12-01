import './App.css';
import './Theme/AppTheme.css'
import MainRouter from './Components/MainRouter/MainRouter';
import Login from './Components/Login/Login';

import { Component } from 'react';
import { connect } from 'react-redux';



class App extends  Component{

  constructor(props) {
    super(props);

    props.setUserData(getLocalUserData());

  }

  render(){
    return (

      <div className=" a-wrapper">
          {
            (this.props.user.data.status =="loggedIn")? 
              <MainRouter />
            :(this.props.user.data.status =="loggedOut")? 
              <Login />
            :(this.props.user.data.status =="toRegister")? 
              <Login />
            :
            <div></div>

          }
      </div>
    )

  }

}


let userDataStr = "";
function getLocalUserData(){
    userDataStr = window.localStorage.getItem("userData");

    if(userDataStr){
        return JSON.parse(userDataStr);
    }
    else{
        return {status:"toRegister",user_id:"",store_id:""};
    }
}

function mapStateToProps(state){

  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){

  return {
    setUserData: (data) => dispatch({
        type:"user/setUserData",
        payload:{data:data}
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
