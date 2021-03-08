import React, {useState, lazy} from 'react';
import {useHistory} from 'react-router-dom'
import { changePasswordAsync } from '../../../services/account/account';
import { prepareSetErrorMessages } from './../../../utils/errorMessages';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const CHANGE_PASSWORD_DEFAULT_PROPS = {
    new_password: '',
    new_password_confirmation: ''
};


const ChangePasswordDialog = ({open, handleClose}) => 
{
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [passwords, setPasswords] = useState(CHANGE_PASSWORD_DEFAULT_PROPS);
    const [errorMessages, setErrorMessages] = useState(CHANGE_PASSWORD_DEFAULT_PROPS);
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

    const handlePasswordOnChange = (e) => setPasswords({...passwords, [e.target.name]: e.target.value});
    
    const changePassword = async () =>
    {
        setLoading(true);
        const result = await changePasswordAsync(passwords);

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
                <DialogTitle id="form-dialog-title">Change password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Changing your password will sign you out of Back Office and Dashboard app on all devices
                    </DialogContentText>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.new_password)}
                                helperText={errorMessages.new_password}
                                name='new_password'
                                autoFocus
                                margin="dense"
                                label="Password"
                                type="password"
                                fullWidth
                                value={passwords.new_password}
                                onChange={handlePasswordOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.new_password_confirmation)}
                                helperText={errorMessages.new_password_confirmation}
                                name='new_password_confirmation'
                                autoFocus
                                margin="dense"
                                label="Confirm password"
                                type="password"
                                fullWidth
                                value={passwords.new_password_confirmation}
                                onChange={handlePasswordOnChange}
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
                        onClick={changePassword} 
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


export default ChangePasswordDialog;