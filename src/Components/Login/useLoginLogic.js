import { useState, useEffect } from "react";
import {UserStore} from "../../Redux/UserSlice";
import { useSelector,useDispatch } from "react-redux";
import useLocalStorage from "../../SharedModules/LocalStorage/useLocalStorage";
import useLoginApi from "./useLoginApi";
import useSharedLibrary from "../../SharedModules/SharedLibrary/useSharedLibrary";
import useSharedConfig from "../../SharedModules/SharedConfig/SharedConfig";

export default function useRegisterLogic(){

    const {config} = useSharedConfig();

    let INITITAL_STATE = [
            {id:'password',value:'',error:''},
            {id:'phone',value:'',error:''},
            {id:'store_id',value: config.STORE_ID,error:''}
    ];

    const [state,setState] = useState(INITITAL_STATE);
    const { sendLoginData, processApiError } = useLoginApi();
    const dispatch = useDispatch();
    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    const [dialogueState, setDialogueState] = useState({isOpen:false, message: ""});
    const {sharedLibrary} = useSharedLibrary();


    function phoneNumberChange(e){
        setState((prevState)=>{
            return prevState.map((item)=>{
                if(item.id == 'phone'){
                    return {...item,value: e.target.value, error:''}
                }
                else{
                    return {...item}
                }
            })
        })
    }

    function passwordChange(e){
        setState((prevState)=>{
            return prevState.map((item)=>{
                if(item.id == 'password'){
                    return {...item,value: e.target.value, error:''}
                }
                else{
                    return {...item}
                }
            })
        })
    }


    let v_isValid = true;
    function validate(){
        
        v_isValid = true;
        setState((prevState)=>{

            return prevState.map((item)=>{

                if(item.id == 'password'){
                    return validatePassword(item);
                }   
                else if(item.id == 'phone'){
                    return validatePhone(item)
                }
                else{
                    return {...item};
                }

            })
        });

        submit(v_isValid);
    }


    let ipi_phoneStr;
    let ipi_regularExpression;
    function validatePhone(item){

        ipi_regularExpression = /^[0-9]{10}$/;

        if(ipi_regularExpression.test(item.value)){

            return {...item,error:""};
        }
        else{
            v_isValid = false;
            return {...item,error:"Phone number not valid"};
        }
    
    }

    let ipsi_regularExpression = '';
    function validatePassword(item){

        if(item.value == ""){
            
            v_isValid = false;
            return {...item,error:"Password not valid"};            

        }
        else{
            return {...item,error:""};
        }
    }

    
    function submit(isValid){

        if(isValid == true){
            
            sendLoginData(state)
            .then((data)=>{ processPostResult(data) })
            .catch((err)=>{ processApiError(err); })

        }

    }

    let userData = {};
    function processPostResult(data){

        if(data.status == "success"){

            userData = {
                status:'loggedIn',
                store_id: data.payload.store_id, 
                user_id: data.payload.id
            }; 

            setLocalUserData(userData);
            
            setTimeout(()=>{
                dispatch(UserStore.getAction_setUserData(userData)); 
            },3000);

            //open new app activity
            window.open("sample://activity?user_id="+payload.id+"&store_id="+payload.store_id);
        
            
        }
        else if(data.status == "failed"){
            
            sharedLibrary.openDialogue(data.message);
        }
        else{
            sharedLibrary.openDialogue("Could not fetch data from the server.");
        }

    }







    const change = {
        phoneNumberChange: phoneNumberChange,
        passwordChange: passwordChange,
        validate: validate
    }

    return{
        change,
        state,
        dialogueState
    }


}
