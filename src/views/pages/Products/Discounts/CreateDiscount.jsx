import React, {useState} from 'react'
import * as Discount_ from '../../../../services/products/discounts'
import Loading from '../../../../components/Loading'
import { useHistory } from 'react-router-dom'
import { 
    FormHelperText , 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Button, 
    InputLabel, 
    Avatar, 
    CardHeader,
    Divider, IconButton
    } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { createDiscountUseStyles } from '../../../../assets/material-styles/styles'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'

const CreateDiscount = () => 
{
    const classes = createDiscountUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [discount, setDiscount] = useState({
        name: '',
        percentage: '',
    });


    const handleOnChangeDiscount = (e) => setDiscount({...discount, [e.target.name]: e.target.value});

    const createDiscount = async () => 
    {
        setLoading(true);
        const result = await Discount_.storeAsync(discount);

        if (result.status === 'Success')
        {
            history.push('/products/discounts');
        }
        else 
        {
            setLoading(false);
        }
    }


    return loading 
        ? <Loading />
        : (
            <>
            <Card className={classes.createDiscountCard}>
                <Grid container justify='center'>
                    <Grid item>
                        <CardHeader
                            avatar={
                                <LoyaltyIcon className={classes.discountIcon}/>
                            }
                        />
                    </Grid>
                </Grid>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                name="name"
                                label="Name"
                                fullWidth
                                value={discount.name}
                                onChange={handleOnChangeDiscount}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
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
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.addBtn}
                            onClick={createDiscount}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Card>  
        </>
    )
}

export default CreateDiscount
