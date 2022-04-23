import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import styles from "./DraggableDialog.module.scss";
import {OrangeButton} from "../OrangeButton";
import DialogContentText from '@mui/material/DialogContentText';
import {DialogContent} from "@mui/material";

type DraggableDialogProps = {
    title: string;
    onAction: () => void;
    component: JSX.Element;
}

const DraggableDialog: React.FC<DraggableDialogProps> = ({title, onAction, component}) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleClose = (e: React.MouseEvent) => {
        setOpen(false);
        e.stopPropagation();
    };

    function onConsent(e: React.MouseEvent) {
        onAction();
        handleClose(e);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon} onClick={handleClickOpen}>{component}</div>
            <Dialog
                className={styles.wrapper}
                open={open}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogContent>
                    <DialogContentText className={styles.title} id="draggable-dialog-title">
                        {title}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className={styles.btn}>
                    <div><OrangeButton text={"Yes"} onClick={(e) => onConsent(e)}/></div>
                    <div><OrangeButton text={"No"} onClick={handleClose}/></div>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DraggableDialog;
