import React, {useState, lazy} from 'react'
import * as Category_ from '../../../../services/products/categories'
import { useHistory } from 'react-router-dom'
import { 
    Grid , 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    } from '@material-ui/core';
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
import { categoryUseStyles } from '../../../../assets/material-styles/styles'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));



const CreateCategory = () => 
{
    const classes = categoryUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState({ name: '' });
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

    const handleOnChangeName = (e) => setName(e.target.value);

    const handleCreateCategory = async () => 
    {
        setLoading(true);
        const result = await Category_.storeAsync({name});

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setErrorMessage(prepareSetErrorMessages(result.message, errorMessage));
        }
        else
        {
            setAlertSeverity('success');
            setAlertMessage(result.message)
            setTimeout(() => {
                history.push('/products/categories');
                setName('');
                setErrorMessage('');
            }, 2000);
        }

        setOpenAlert(true);
        setTimeout(() =>  {
            setLoading(false);
        }, 2000);
    }


    return (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />

            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Card className={classes.categoryCard}>
                        <CardContent>
                            <TextField
                                error={errorMessage.name !== ''}
                                helperText={errorMessage.name}
                                label="Category name"
                                fullWidth
                                value={name}
                                onChange={handleOnChangeName}
                            />
                        </CardContent>
                        <Grid container justify='flex-end' className={classes.btnContainer}>
                            <Grid item>
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.cancelBtn}
                                    onClick={() => history.push('/products/categories')}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.addBtn}
                                    onClick={handleCreateCategory}
                                    disabled={loading}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>  
       
                </Grid>
            </Grid>
        </>
    )
}

export default CreateCategory
