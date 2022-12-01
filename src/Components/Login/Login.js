import Wrapper from '../BaseComponents/Wrapper/Wrapper'
import Grid from '../BaseComponents/Grid/Grid'
import GridItem from '../BaseComponents/GridItem/GridItem'
import Row from '../BaseComponents/Row/Row'
import Col from '../BaseComponents/Col/Col'
import Section from '../BaseComponents/Section/Section'
import { Typography,Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import './Login.css'

import Dialogue from '../BaseComponents/Dialogue/Dialogue'


import useRegisterLogic from './useLoginLogic'


export default function Login() {

    const {change,state,dialogueState} = useRegisterLogic();




  return (

    <Wrapper classList={'bo l-wrapper'}>

        <Dialogue />

        <Row classList={'bo l-wrapper r-x-center r-y-center'}>

            <Col classList={'bo p-3 c-x-center re-content'}>
                    <Col classList={'bo p-3 re-sub'}>
                        <TextField onChange={(e)=>{ change.phoneNumberChange(e) }}   label="Phone" variant="outlined" />
                    <Typography sx={{fontSize:'0.75rem', color:'red'}}> {state[1].error} </Typography>
                </Col>
                <Col classList={'bo p-3 re-sub'}>
                    <TextField onChange={(e)=>{ change.passwordChange(e) }}   label="Password" variant="outlined" />
                    <Typography sx={{fontSize:'0.75rem', color:'red'}}> {state[0].error} </Typography>
                </Col>
                <Col classList={'bo p-3 re-sub'}>
                    <Button onClick={()=>{ change.validate() }} sx={{padding:'1rem'}} color={'success'} variant='contained' >
                        Login
                    </Button>
                </Col>
            </Col>

        </Row>
    </Wrapper>



  )
}
 