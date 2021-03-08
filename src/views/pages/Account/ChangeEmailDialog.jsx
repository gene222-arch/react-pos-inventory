import React, {useState, lazy} from 'react';
import { changeEmailAsync } from './../../../services/account/account';
import { prepareSetErrorMessages } from './../../../utils/errorMessages';
import {useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const CHANGE_EMAIL_DEFAULT_PROPS = {
    new_email: '',
    new_email_confirmation: ''
};


const ChangeEmailDialog = ({open, handleClose}) => 
{

    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [emails, setEmails] = useState(CHANGE_EMAIL_DEFAULT_PROPS);
    const [errorMessages, setErrorMessages] = useState(CHANGE_EMAIL_DEFAULT_PROPS);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');

    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };

    const handleEmailOnChange = (e) => setEmails({...emails, [e.target.name]: e.target.value});
    
    const changeEmail = async () =>
    {
        setLoading(true);
        const result = await changeEmailAsync(emails);

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setAlertMessage('Unable to save changes. Please fix the errors and try again');
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }
        else 
        {
            handleClose();
            setAlertSeverity('success');
            setAlertMessage(result.message);
            setTimeout(() => history.go(0), 2000);
        }

        setOpenAlert(true);
        setTimeout(() => setLoading(false), 2000);
    }



    return (
        <div>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />

            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                disableBackdropClick
            >
                <DialogTitle id="form-dialog-title">Change email</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You will no longer be able to sign in to your account using genephillip2222@gmail.com
                    </DialogContentText>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                name='new_email'
                                error={Boolean(errorMessages.new_email)}
                                helperText={errorMessages.new_email}
                                autoFocus
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                onChange={handleEmailOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                name='new_email_confirmation'
                                error={Boolean(errorMessages.new_email_confirmation)}
                                helperText={errorMessages.new_email_confirmation}
                                autoFocus
                                margin="dense"
                                label="Confirm email"
                                type="email"
                                fullWidth
                                onChange={handleEmailOnChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleClose} 
                        color="primary"
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={changeEmail} 
                        color="primary"
                        disabled={loading}
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        </div>  
    );
}


export default ChangeEmailDialog;