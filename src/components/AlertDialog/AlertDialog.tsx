import './AlertDialog.scss'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface DialogTypes {
    title: string;
    text: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    handleConfirmAction: (e?: React.MouseEvent) => void;
    setOpenFoldersMenu?: (state: boolean) => void;
}

export const AlertDialog: React.FC<DialogTypes> = ({title, text, open, setOpen, handleConfirmAction, setOpenFoldersMenu}) => {

    const handleClose = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();  // Detener la propagación
        setOpen(false);
    };

    const handleConfirm = (e?: React.MouseEvent) => {
        handleConfirmAction(e);
        handleClose(e);
        // El siguiente if tiene la funcion de cerrar el folders container
        // al confirmar la eliminacion de una carpeta.
        // Actualmente esta deshabilitado.
        // Para habilitarlo descomentar la linea de adentro.
        if (setOpenFoldersMenu) {
          //setOpenFoldersMenu(false);
        };
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={(e, reason) => {
                    if (reason === "backdropClick") {
                        (e as React.MouseEvent).stopPropagation();  // Evitar propagación si se hace clic en el fondo
                    }
                    handleClose(e as React.MouseEvent);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className="alert-dialog"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => {e.stopPropagation(); handleClose(e);}}>CANCEL</Button>
                    <Button onClick={(e) => handleConfirm(e)} autoFocus>CONFIRM</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
