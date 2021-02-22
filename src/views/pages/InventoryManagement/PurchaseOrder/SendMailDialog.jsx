import React, {useState} from 'react';
import SyncLoader from '../../../../components/SyncLoader'
import * as PurchaseOrder_ from '../../../../services/inventory-management/purchaseOrders'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MailIcon from '@material-ui/icons/Mail';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { sendMailDialogUseStyles } from '../../../../assets/material-styles/styles'
import SendIcon from '@material-ui/icons/Send';
import { Divider } from '@material-ui/core';

const SendMailDialog = ({
	purchaseOrderId,
	supplierId,
	open,
	handleClickOpen,
	handleClose
}) => 
{

	const classes = sendMailDialogUseStyles();

	const [loading, setLoading] = useState(false);
	const [mailInfo, setMailInfo] = useState({
		purchase_order_id: purchaseOrderId,
		supplier_id: supplierId,
		subject: '',
		note: ''
	});

	const handleOnChange = (e) => setMailInfo({...mailInfo, [e.target.name]: e.target.value});

	const sendMail = async () => 
	{
		setLoading(true);
		const result = await PurchaseOrder_.mailSupplierAsync(mailInfo)

		if (result.status === 'Success')
		{			
			setLoading(false);
			handleClose();
			setMailInfo({
				purchase_order_id: purchaseOrderId,
				supplier_id: supplierId,
				subject: '',
				note: ''
			});
		}
	}

	return (
		<div>
			<Button variant="text" color="secondary" onClick={handleClickOpen}>
				<MailIcon />
			</Button>
			<Dialog 
			open={open} 
			onClose={handleClose} 
			aria-labelledby="form-dialog-title" 
			className={classes.dialog}
			disableBackdropClick={true}
		>
			{
				loading ? <SyncLoader /> :
				(
					<>
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
										name="subject"
										label="Subject"
										type="text"
										value={mailInfo.subject}
										onChange={handleOnChange}
										fullWidth
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={12} lg={12}>
									<TextField
										autoFocus
										margin="dense"
										name="note"
										label="Note"
										type="text"
										value={mailInfo.note}
										onChange={handleOnChange}
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
							<Button onClick={sendMail} variant='text' color="default" className={classes.sendMailBtn}>
									<SendIcon />
							</Button>
						</DialogActions>
					</>
				)
			}
		</Dialog>
		</div>
	);
}
export default SendMailDialog