import { Link, Route, Router, Routes, useLocation } from 'react-router-dom';
import OrderDetails from '../OrderDetails/OrderDetails'
import Orders from '../Orders/Orders';
import Dialogue from '../BaseComponents/Dialogue/Dialogue'
import useSharedConfig from '../../SharedModules/SharedConfig/SharedConfig';

export default function MainRouter(){

    const loc = useLocation();
    const {config} = useSharedConfig();

    return(

        <>

            <Dialogue />

            <Routes location={loc} key={loc.key} >
                <Route path={'/'} element={<Orders />} /> 
                <Route path={config.ROOT_PATH} element={<Orders />} />
                <Route path={config.ROOT_PATH+'/OrderDetails'} element={<OrderDetails />} />
            </Routes>             
        </>


    )
}