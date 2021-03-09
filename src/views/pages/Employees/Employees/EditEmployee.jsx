import React, { useState, useEffect, lazy } from 'react';
import Loading from '../../../../components/Loading'
import * as Employees_ from '../../../../services/employees/employees'
import * as Role_ from '../../../../services/roles-permissions/roles'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider, FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { createPageUseStyles } from '../../../../assets/material-styles/styles'
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const EMPLOYEE_DEFAULT_PROPS = {
    employee_id: 0,
    name: '',
    email: '',
    phone: '',
    role: ''
};


const EditEmployee = ({match}) => 
{

    const classes = createPageUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [roles, setRoles] = useState([]);
    
    const {employeeId} = match.params;

    const [employee, setEmployee] = useState(EMPLOYEE_DEFAULT_PROPS);
    const [errorMessages, setErrorMessages] = useState(EMPLOYEE_DEFAULT_PROPS);
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

    const handleEmployeeOnChange = (e) => setEmployee({...employee, [e.target.name]: e.target.value});

    const fetchRoles = async () => 
    {
        const result = await Role_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setRoles(result.data);
        }
    }


    const fetchEmployee = async () => 
    {
        const result = await Employees_.fetchAsync({
            employee_id: employeeId
        });

        if (result.status === 'Success')
        {
            setEmployee(result.data);
        }

        setLoadingData(false);
    }


    const updateEmployee = async () => 
    {
        setLoading(true);

        const result = await Employees_.updateAsync(employee);

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }
        else
        {
            setAlertSeverity('success');
            setAlertMessage(result.message)
            setTimeout(() => history.push('/employees'), 2000);
        }

        setOpenAlert(true);
        setTimeout(() =>  setLoading(false), 2000);
    }



    useEffect(() => {
        fetchRoles();
        fetchEmployee();

        return () => {
            setRoles([]);
            setEmployee(EMPLOYEE_DEFAULT_PROPS);
        }
    }, []);


    return loadingData 
        ? <Loading />
        : (
        <>
             <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
            <Card className={classes.cardContainer}>
                <Grid container spacing={1} justify='center'>
                    <CardHeader
                        avatar={
                            <AccountBoxIcon className={classes.headerIcon}/>
                        }
                    />
                </Grid>
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.name)}
                                helperText={errorMessages.name}
                                name="name"
                                label="Name"
                                fullWidth
                                margin='dense'
                                value={employee.name}
                                onChange={handleEmployeeOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.email)}
                                helperText={errorMessages.email}
                                name="email"
                                label="Email"
                                fullWidth
                                margin='dense'
                                inputProps={{
                                    startadornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmailIcon className={classes.textFieldIcons}/>
                                        </InputAdornment>
                                    ),
                                }}
                                value={employee.email}
                                onChange={handleEmployeeOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.phone)}
                                helperText={errorMessages.phone}
                                name="phone"
                                label="Phone"
                                fullWidth
                                margin='dense'
                                InputProps={{
                                    startdornment: (
                                        <InputAdornment position="start">
                                            <PhoneAndroidIcon className={classes.textFieldIcons}/>
                                        </InputAdornment>
                                    ),
                                }}
                                value={employee.phone}
                                onChange={handleEmployeeOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl 
                            className={classes.formControl}
                            error={Boolean(errorMessages.role)}
                        >
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                name='role'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                margin='dense'
                                value={employee.role}
                                onChange={handleEmployeeOnChange}
                            >
                                {
                                    employeeId !== 1 
                                        && (
                                            roles.map((role, index) => (
                                                <MenuItem key={role.id} value={role.name}>
                                                    {role.name}
                                                </MenuItem>
                                            ))
                                        )
                                }
                                
                            </Select>
                            <FormHelperText>{
                                Boolean(errorMessages.role)
                                    ? errorMessages.role
                                    : ''    
                            }</FormHelperText>
                        </FormControl>  
                    </Grid>
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
                            onClick={updateEmployee}
                            disabled={loading}
                        >
                            UPDATE
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default EditEmployee
