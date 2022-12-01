import useSharedConfig from "../../SharedModules/SharedConfig/SharedConfig"
import useSharedLibrary from "../../SharedModules/SharedLibrary/useSharedLibrary";
 
export default function useOrdersApi(){

    
    let {config} = useSharedConfig();
    let {sharedLibrary} = useSharedLibrary();

    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;


    function changeOrderState(payload){

        END_POINT = BASE_URL+'setOrderFulfilled';

        REQUEST_OPTIONS = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());

    }

    function getOrderPlacedData(){

        END_POINT = BASE_URL+'getOrderPlacedData';

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());

    }

    function processApiError(err){

        sharedLibrary.openDialogue("Could not connect to the server. ");
    }

    const api = {
        getOrderPlacedData: getOrderPlacedData,
        changeOrderState: changeOrderState,
        processApiError: processApiError
    }

    return {api}


}