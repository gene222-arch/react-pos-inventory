import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import RoomIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { createPageUseStyles } from '../../../../assets/material-styles/styles'
import * as Helper from '../../../../utils/helpers'


const EditEmployee = ({match}) => {

    const classes = createPageUseStyles();
    const history = useHistory();
    const [role, setRole] = useState('');

    const {employeeId} = match.params;

    const handleChange = (event) => {
      setRole(event.target.value);
    };
    return (
        <>
            <Card className={classes.cardContainer}>
                <Grid container spacing={1} justify='center'>
                    <CardHeader
                        avatar={
                            <AccountBoxIcon className={classes.headerIcon}/>
                        }
                        title={`Employee id#${employeeId}`}
                    />
                </Grid>
                <CardContent className={classes.cardContent}>
                        <TextField
                            id=""
                            label="Name"
                            fullWidth
                            margin='normal'
                        />
                        <TextField
                            id=""
                            label="Email"
                            fullWidth
                            margin='normal'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailIcon className={classes.textFieldIcons}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id=""
                            label="Phone"
                            fullWidth
                            margin='normal'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneAndroidIcon className={classes.textFieldIcons}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id=""
                            label="Address"
                            fullWidth
                            margin='normal'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <RoomIcon className={classes.textFieldIcons}/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                onChange={handleChange}
                                fullWidth
                                margin='normal'
                            >
                                {
                                    Helper.roleList.map((role, index) => (
                                        <MenuItem key={index} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))
                                }
                                
                            </Select>
                        </FormControl>
                    </Grid>
                </CardContent>
                <Divider className={classes.divider}/>
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.cancelBtn}
                            onClick={() => history.push('/employees')}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color="default" className={classes.addBtn}>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default EditEmployee
