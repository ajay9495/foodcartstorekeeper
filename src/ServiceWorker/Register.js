import useSharedConfig from "../SharedModules/SharedConfig/SharedConfig";

export default function TestRegister(){

    const {config} = useSharedConfig();

    window.addEventListener('load',()=>{   
        

        if('serviceWorker' in navigator){

            navigator.serviceWorker
            .register(config.PUBLIC_PATH+'/ServiceWorker.js')
            .then( reg=>    console.log("sw registered")    )
            .catch(err =>   console.log(`error ${err}`)     );
            


        }
    
    });

}

