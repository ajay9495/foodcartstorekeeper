import {useEffect, useState} from "react";
import useOrderDetailsApi from "./useOrderDetailsApi"
import useSharedLibrary from "../../SharedModules/SharedLibrary/useSharedLibrary";
import {useLocation} from 'react-router-dom';
import useSharedConfig from "../../SharedModules/SharedConfig/SharedConfig";

export default function useOrderDetailsLogic(){

    const INITIAL_STATE = {
        data:[]
    }

    const [state,setState] = useState(INITIAL_STATE);
    const {api} = useOrderDetailsApi();
    const {sharedLibrary} = useSharedLibrary();
    let location = useLocation();
    let {config} = useSharedConfig();


    const ORDER_ID = location.state.order_id;


    function processApiData(data){

 
        if(data.status == "success"){

            setState((prevState)=>{
                return {
                    ...prevState,
                    data: data.payload
                };
            });
        }
        else{
            sharedLibrary.openDialogue("Could not fetch data from the server.")
        }


    }
 
    useEffect(()=>{

        api.getOrderPlacedDetails(ORDER_ID)
        .then((data)=>{     processApiData(data)   })
        .catch((err)=>{     api.processApiError(err)        });

    },[]);



    return{state,config};
}



















