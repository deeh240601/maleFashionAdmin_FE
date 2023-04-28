import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({ message, type, confirmDelete, cancel, open }) {

    const handleClickConfirm = () => {
        confirmDelete();
    };
    const handleClickCancel = () => {
        cancel();
    };

    return (
        <Dialog
            open={open}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogTitle>
                {'Use Google\'s location service?'}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClickCancel}>Hủy</Button>
                <Button onClick={handleClickConfirm} autoFocus>
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
}
