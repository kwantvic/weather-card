import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import YellowButton from "../YellowButton";

import styles from "./DraggableDialog.module.scss";

type DraggableDialogProps = {
    title: string;
    onAction: () => void;
    component: JSX.Element;
}

const DraggableDialog: React.FC<DraggableDialogProps> = ({title, onAction, component}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon} onClick={handleClickOpen}>{component}</div>
            <Dialog
                className={styles.wrapper}
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle className={styles.title} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogActions className={styles.btn}>
                    <YellowButton onClick={handleClose} nameButton={"Нет"}/>
                    <YellowButton onClick={onAction} nameButton={"Да"}/>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DraggableDialog;
