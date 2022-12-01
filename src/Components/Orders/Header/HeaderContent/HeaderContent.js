import React from 'react'
import './HeaderContent.css'
import InputBase from '@mui/material/InputBase'
import YoutubeIcon from '@mui/icons-material/YouTube'
import Search from '@mui/icons-material/SearchOutlined'
import { Typography } from '@mui/material'
import CameraIcon from '@mui/icons-material/CameraAltOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';
import KartIcon from '@mui/icons-material/ShoppingCartOutlined';
import ArrowIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from 'react-router'

export default function HeaderContent({change}) {


  return (


        <div className="px-2 header-content-wrapper">
            <div className='gridSub '>   
              <Typography sx={{color:'#457848', fontSize:20, fontWeight:1000,marginLeft:'10px'}} >
                Orders
              </Typography>
              <div onClick={(e)=>{ change.logout() }}>
                <Typography  sx={{color:'#457848', fontSize:12, fontWeight:1000,marginLeft:'10px'}} >
                  Logout
                </Typography>              
            </div>

            </div>
        </div>

  )
}
