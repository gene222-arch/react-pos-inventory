import React, {useState, lazy} from 'react';
import { changeNameAsync } from './../../../services/account/account';
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



const ChangeNameDialog = ({open, handleClose}) => 
{
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const [new_name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState({new_name: ''});

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


    const handleNameOnChange = (e) => setName(e.target.value);
    
    const changeName = async () =>
    {
        setLoading(true);
        const result = await changeNameAsync({
            new_name: new_name
        });

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setAlertMessage('Unable to save changes. Please fix the errors and try again');
            setErrorMessage(prepareSetErrorMessages(result.message, errorMessage));
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
                <DialogTitle id="form-dialog-title">Change name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your name will be updated upon save.
                    </DialogContentText>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessage.new_name)}
                                helperText={errorMessage.new_name}
                                autoFocus
                                margin="dense"
                                label="Name"
                                fullWidth
                                value={new_name}
                                onChange={handleNameOnChange}
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
                        onClick={changeName} 
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


export default ChangeNameDialog;