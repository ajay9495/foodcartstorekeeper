import useSharedConfig from "../../SharedModules/SharedConfig/SharedConfig"
import useSharedLibrary from "../../SharedModules/SharedLibrary/useSharedLibrary";
  
export default function useOrderDetailsApi(){

    let {config} = useSharedConfig();
    let {sharedLibrary} = useSharedLibrary();

    let request;
    let REQUEST_OPTIONS;
    let END_POINT;
    let BASE_URL = config.CURRENT_BASE_URL;

    function getOrderPlacedDetails(orderId){

        END_POINT = BASE_URL+'getOrderPlacedDetails?order_id='+orderId;

        REQUEST_OPTIONS = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        request = new Request(END_POINT,REQUEST_OPTIONS);

        return fetch(request)
        .then((response) => response.json());

    }

    function processApiError(err){
        sharedLibrary.openDialogue("Could not connect to the server.");
    }

    const api = {
        getOrderPlacedDetails: getOrderPlacedDetails,
        processApiError: processApiError
    }

    return{ api }


}