import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOrdersApi from "./useOrderApi";
import useSharedConfig from '../../SharedModules/SharedConfig/SharedConfig'
import useSharedLibrary from "../../SharedModules/SharedLibrary/useSharedLibrary";
import useLocalStorage from "../../SharedModules/LocalStorage/useLocalStorage"
import {UserStore} from "../../Redux/UserSlice";
import { useSelector,useDispatch } from "react-redux";

export default function useOrdersLogic(){

    let INITIAL_STATE = {
        data:[],
        error:"initial error"
    }; 

    const [state,setState] = useState(INITIAL_STATE);
    const {api} = useOrdersApi();
    const navigateTo = useNavigate();
    const {config} = useSharedConfig();
    let {sharedLibrary} = useSharedLibrary();
    const [dialogueState, setDialogueState] = useState({isVisible:false,order_id:""});
    const {setLocalUserData,getLocalUserData} = useLocalStorage();
    const dispatch = useDispatch();

    let USER_DATA = getLocalUserData();

    useEffect(()=>{

        api.getOrderPlacedData()
        .then((data)=>{     processOrderPlacedData(data)    })
        .catch((err)=>{     api.processApiError(err)                });
        
    },[]);


    function changeStatus(orderId){

        setDialogueState({isVisible: true,order_id: orderId});
    }

    function onDialogueOkay(orderId){

        setDialogueState({isVisible: false,order_id: "" });

        api.changeOrderState({"order_id":orderId, "store_id": USER_DATA.store_id})
        .then((data)=>{     processChangeOrderStatusResponse(data)  })
        .catch((err)=>{     api.processApiError(err)                });

    }

    function onDialogueClose(){

        setDialogueState({isVisible: false,order_id: "" });
    }


    function processOrderPlacedData(data){

        if(data.status == "success"){

            setState((prevState)=>{
                return {...prevState, data: data.payload}
            });
        }
        else{

            sharedLibrary.openDialogue("Could not get data from the server.");
        }


    }

    function processChangeOrderStatusResponse(data){

        if(data.status == "success"){

            sharedLibrary.refreshPage();
        }
        else{
            sharedLibrary.openDialogue("Could not change order state in the server.");
        }

    }

    let l_currentLocalUserData = {};
    let userData = {};
    function logout(){

        l_currentLocalUserData = getLocalUserData();
        userData = {
            ...l_currentLocalUserData,
            status:'loggedOut'
        }; 


        setLocalUserData(userData);
        dispatch(UserStore.getAction_setUserData(userData));     
    }

    const change = {
        navigateTo: navigateTo,
        changeStatus: changeStatus,
        onDialogueOkay : onDialogueOkay,
        onDialogueClose: onDialogueClose,
        logout: logout
    }

    return {    state, change, config, dialogueState    }


}

