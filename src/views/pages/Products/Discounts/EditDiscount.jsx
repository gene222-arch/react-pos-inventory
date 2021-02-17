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
import { createDiscountUseStyles } from '../../../../assets/material-styles/styles'


const CreateDiscount = ({match}) => 
{
    const classes = createDiscountUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const {discountId} = match.params; 

    const [discount, setDiscount] = useState({
        discount_id: discountId,
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
            setLoading(false)
        }
    }

    const editDiscount = async () => 
    {
        setLoading(true);
        const result = await Discount_.updateAsync(discount);

        if (result.status === 'Success')
        {
            history.push('/products/discounts')
        }
    }


    useEffect(() => {
        fetchDiscount();

        return () => {
            setDiscount({});
        };
    }, []);

    return loading 
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
                            onClick={editDiscount}
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
