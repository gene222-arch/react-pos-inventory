import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />


const AlertPopUpMessage = ({
        open,
        handleClose,
        severity = 'success', 
        successMessage = 'Success', 
        errorMessage='Unable to save changes. Please fix the errors and try again',
        warningMessage = '',
        infoMessage = '',
        globalMessage = '',
        hideDuration = 3000
    }) => 
{

    const handleErrorMessage = (severity) => 
    {
        let message = '';

        switch (severity) {
            case 'success':
                message = globalMessage || successMessage;
                break;

            case 'error':
                message = globalMessage || errorMessage;
                break;

            case 'warning':
                message = globalMessage || warningMessage;
                break;

            case 'info':
                message = globalMessage || infoMessage;
                break;
            default:
                message = 'No message set';
                break;
        }

        return message;
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={hideDuration}
                onClose={handleClose}
            >
            <> 
                <Alert severity={severity}>
                {
                    handleErrorMessage(severity)
                }
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Alert>

            </> 
            </Snackbar>
        </>
    );
}

export default AlertPopUpMessage