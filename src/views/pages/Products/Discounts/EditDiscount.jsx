import React, {useState, useEffect} from 'react'
import Loading from '../../../../components/Loading'
import * as Discount_ from '../../../../services/products/discounts'
import { useHistory } from 'react-router-dom'
import { 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Button, 
    CardHeader,
    } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { discountUseStyles } from '../../../../assets/material-styles/styles'
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'


const CreateDiscount = ({match}) => 
{
    const classes = discountUseStyles();
    const history = useHistory();
    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(false);

    const {discountId} = match.params; 

    const [discount, setDiscount] = useState({
        discount_id: discountId,
        name: '',
        percentage: ''    
    });
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        percentage: ''
    });

    
    const handleOnChangeDiscount = (e) => setDiscount({...discount, [e.target.name]: e.target.value});

    const fetchDiscount = async () => 
    {
        const result = await Discount_.fetchAsync({discount_id: discountId});

        if (result.status === 'Success')
        {
            const {name, percentage} = result.data;

            setDiscount({
                ...discount, 
                name: name,
                percentage: percentage
            });
            setLoadingData(false)
        }
    }

    const editDiscount = async () => 
    {
        setLoading(true);
        const result = await Discount_.updateAsync(discount);

        result.status === 'Error'
            ?  setErrorMessage(prepareSetErrorMessages(result.message, errorMessage))
            :  history.push('/products/discounts');
        
            setLoading(false);
    }


    useEffect(() => {
        fetchDiscount();

        return () => {
            setDiscount({});
        };
    }, []);

    return loadingData 
        ? <Loading />
        : (
        <>
            <Card className={classes.createDiscountCard}>
                <Grid container justify='center'>
                    <Grid item>
                        <CardHeader
                            avatar={
                                <LoyaltyIcon className={classes.discountIcon}
                                />
                            }
                        />
                    </Grid>
                </Grid>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={errorMessage.name !== ''}
                                helperText={errorMessage.name}
                                name="name"
                                label="Name"
                                fullWidth
                                value={discount.name}
                                onChange={handleOnChangeDiscount}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={errorMessage.percentage !== ''}
                                helperText={errorMessage.percentage}
                                name="percentage"
                                label="%"
                                fullWidth
                                value={discount.percentage}
                                onChange={handleOnChangeDiscount}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Grid container justify='flex-end' className={classes.btnContainer}>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.cancelBtn}
                            onClick={() => history.push('/products/discounts')}
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
                            onClick={editDiscount}
                            disabled={loading}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Card>  
        </>
    )
}

export default CreateDiscount
