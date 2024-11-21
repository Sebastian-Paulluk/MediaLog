import './AlertDialog.scss'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogTypes {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleDeleteCategory: () => void;
}



export const AlertDialog: React.FC<DialogTypes> = ({open, setOpen, handleDeleteCategory}) => {

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm =()=> {
      handleDeleteCategory();
      handleClose();
    }



    return (
      <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="alert-dialog"
          >
            <DialogTitle id="alert-dialog-title">
              {"Delete category?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will erase all the items associated with this category as well
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>CANCEL</Button>
              <Button onClick={handleConfirm} autoFocus>CONFIRM</Button>
            </DialogActions>

          </Dialog>
      </React.Fragment>
  );
}