import React, { useState,useContext, useEffect} from 'react'
import { Typography,Button } from '@mui/material'
import Row from '../../BaseComponents/Row/Row'
import Col from '../../BaseComponents/Col/Col'

import './ListItem.css'


export default function ListItem({item,change,config}) {


    return (

        <Row classList={'o-sub py-4 px-4'}  >
            
            <Col classList={'bo c-expand'}>
                
                <Row classList={'bo py-2 r-x-start'}>
                    <Col classList={'bo c-collapse  c-x-center'}>
                        <Col>
                            <Typography sx={{color:'#457848', fontSize:'1rem', fontWeight:1000,marginLeft:'10px'}} >
                                Order ID
                            </Typography>  
                        </Col>
                        <Col>
                            <Typography sx={{color:'#457848', fontSize:'.75rem', fontWeight:100,marginLeft:'10px'}} >
                                {item.order_id+config.ORDER_ID_MASK}
                            </Typography>  
                        </Col>
                    </Col>
                </Row>

                <Row classList={'bo py-2 r-x-start'}>
                    <Col classList={'bo c-collapse  c-x-center'}>
                        <Col>
                            <Typography sx={{color:'#457848', fontSize:'1rem', fontWeight:1000,marginLeft:'10px'}} >
                                Status
                            </Typography>  
                        </Col>
                        <Col>
                            <Typography sx={{color:'#457848', fontSize:'.75rem', fontWeight:100,marginLeft:'10px'}} >
                                Order Placed
                            </Typography>  
                        </Col>
                    </Col>
                </Row>

                <Row classList={'bo py-2 r-x-start'}>
                    <Col classList={'bo c-collapse  c-x-center'}>
                        <Col>
                            <Typography sx={{color:'#457848', fontSize:'1rem', fontWeight:1000,marginLeft:'10px'}} >
                                Date
                            </Typography>  
                        </Col>
                        <Col>
                            <Typography sx={{color:'#457848', fontSize:'.75rem', fontWeight:100,marginLeft:'10px'}} >
                                {item.date}
                            </Typography>  
                        </Col>
                    </Col>
                </Row>

            </Col>
            <Col classList={'bo c-expand c-x-center '}>
                <Row classList={'bo r-x-center'}>
                    <Col classList={'bo c-collapse p-3 c-x-center'}>
                        <Col>
                            <Typography sx={{color:'#457848', fontSize:'1rem', fontWeight:100,marginLeft:'10px'}} >
                                Price
                            </Typography>  
                        </Col>
                        <Col>
                            <Typography sx={{color:'#457848', fontSize:'1.5rem', fontWeight:1000,marginLeft:'10px'}} >
                                Rs {item.price}
                            </Typography>  
                        </Col>
                    </Col>
                </Row>
                <div className='bo pull-bottom'>
                    <Col classList={'gy-4'}>
                        <Button onClick={(e)=>{ change.changeStatus(item.order_id) }}  color='success' variant={'contained'}>Fulfilled</Button>
                        <Button onClick={(e)=>{ change.navigateTo(config.ROOT_PATH+'/OrderDetails', {state:{order_id: item.order_id }}) }}  color='success' variant={'outlined'}>Details</Button>
                    </Col>
                </div>
            </Col>
        </Row>

    )

}
