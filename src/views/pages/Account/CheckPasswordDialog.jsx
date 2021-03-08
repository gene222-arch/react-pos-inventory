import React, {useState} from 'react';
import { checkPasswordAsync } from './../../../services/account/account';
import ChangeNameDialog from './ChangeNameDialog'
import ChangeEmailDialog from './ChangeEmailDialog'
import ChangePasswordDialog from './ChangePasswordDialog'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const CheckPasswordDialog = ({open, handleClose, toChange}) => 
{
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openChangeName, setOpenChangeName] = useState(false);
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);

    const handleCloseChangeName = () => setOpenChangeName(false);

    const handleCloseChangeEmail = () => setOpenChangeEmail(false);

    const handleCloseChangePassword = () => setOpenChangePassword(false);

    const handlePasswordOnChange = (e) => setPassword(e.target.value);

    const checkPassword = async () =>
    {
        setLoading(true);
        const result = await checkPasswordAsync({
            password: password
        });

        if (result.status === 'Error')
        {
            setErrorMessage(result.message);
        }
        else 
        {
            switch (toChange) {
                case 'name':
                        setOpenChangeName(true);
                    break;
                case 'email':
                        setOpenChangeEmail(true);
                    break;

                case 'password':
                        setOpenChangePassword(true);
                    break;
                                            
                default:
                    break;
            }

            handleClose();
        }

        setLoading(false);
    }

    return (
        <div>
            <ChangeNameDialog 
                open={openChangeName}
                handleClose={handleCloseChangeName}
            />

            <ChangeEmailDialog 
                open={openChangeEmail}
                handleClose={handleCloseChangeEmail}
            />

            <ChangePasswordDialog 
                open={openChangePassword}
                handleClose={handleCloseChangePassword}
            />
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                disableBackdropClick
            >
                <DialogTitle id="form-dialog-title">Enter your password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        For security reasons, please enter your password to continue
                    </DialogContentText>
                    <TextField
                        error={Boolean(errorMessage)}
                        helperText={errorMessage}
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handlePasswordOnChange}
                    />
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
                        onClick={checkPassword} 
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


export default CheckPasswordDialog;