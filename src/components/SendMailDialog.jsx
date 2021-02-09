import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { sendMailDialogUseStyles } from '../assets/material-styles/styles'
import SendIcon from '@material-ui/icons/Send';
import { Divider } from '@material-ui/core';

const SendMailDialog = () => {

	const classes = sendMailDialogUseStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="text" color="secondary" onClick={handleClickOpen}>
        <MailIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.dialog}>
        <DialogTitle id="form-dialog-title">
			<strong>Send purchase order email</strong>
		</DialogTitle>
		<Divider />
        <DialogContent>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="From"
						type="email"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="To"
						type="email"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Subject"
						type="text"
						value={'Purchase order from Test (PO1002)'}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<Typography variant="subtitle2" color="initial">Attachment</Typography>
				</Grid>
				<Grid item xs={12} sm={12} md={12} lg={12}>
					<Typography variant="subtitle2" color="initial">
						<PictureAsPdfIcon color='secondary'/> PO1002
					</Typography>
				</Grid>
			</Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='text' color="default" className={classes.cancelBtn}>
			Cancel
          </Button>
          <Button onClick={handleClose} variant='text' color="default" className={classes.sendMailBtn}>
				<SendIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default SendMailDialog