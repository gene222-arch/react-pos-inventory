import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) 
{
    return <Slide direction="up" ref={ref} {...props} />;
});

const ApplyDiscountDialog = ({
        discountId, 
        discountValue,
        open,
        handleClose,
        handleApplyDiscountOnClick
    }) =>
{

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Add discount</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure to apply a <strong>{discountValue}</strong>% discount to all customer items?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        CANCEL
                    </Button>
                    <Button 
                        variant='contained' 
                        onClick={() => handleApplyDiscountOnClick(discountId)} 
                        color="secondary"
                    >
                        APPLY
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default ApplyDiscountDialog