import React, {useState} from 'react'
import { Button, Typography } from '@mui/material'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function OrdersDialogue({dialogueState, change}) {


  return (
    
    <Dialog
    fullWidth={true}
      open={dialogueState.isVisible}
      onClose={change.onDialogueClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Status'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {"Do you want to change the status of this order."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          variant='contained'
          color='success'
          autoFocus
          onClick={(e)=>{ change.onDialogueOkay(dialogueState.order_id) }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>

  )
}
